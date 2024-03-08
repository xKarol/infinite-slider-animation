type Options = {
  rootElement: HTMLElement;
  images: string[];
  direction?: "up" | "down";
  gap?: number;
  speed?: number;
};

export class InfiniteSlider {
  private options: Required<Options>;
  private moveElement: HTMLDivElement | undefined;
  progress: number;
  maxProgress: number = 0;
  isPaused: boolean = true;
  private animationFrameId: number | undefined;

  constructor(options: Options) {
    this.options = { speed: 1, direction: "up", gap: 16, ...options };
    this.progress = 0;

    const { rootElement, images, gap, direction } = this.options;

    rootElement.setAttribute("style", `--gap: ${gap}px;`);
    this.createMoveElement();
    images.forEach((url) => this.createImageElement(url));
    images.forEach((url) => this.createImageElement(url));

    this.waitForImagesLoad().then(() => {
      this.maxProgress = this.getMaxProgress();

      if (direction === "down") {
        this.progress = -this.maxProgress;
      }

      this.start();
    });
  }

  async waitForImagesLoad() {
    if (!this.moveElement) throw new Error("moveElement does not exist.");
    await Promise.all(
      Array.from(this.moveElement.querySelectorAll("img"))
        .filter((img) => !img.complete)
        .map(
          (img) =>
            new Promise((resolve) => {
              img.onload = img.onerror = resolve;
            })
        )
    );
  }

  getMaxProgress() {
    if (!this.moveElement) throw new Error("moveElement does not exist.");
    return (this.moveElement.clientHeight + this.options.gap) / 2;
  }

  createMoveElement() {
    const { rootElement, gap } = this.options;

    this.moveElement = document.createElement("div");
    this.moveElement.style.display = `flex`;
    this.moveElement.style.flexDirection = `column`;
    this.moveElement.style.gap = `${gap}px`;
    rootElement.appendChild(this.moveElement);
  }

  createImageElement(imgSrc: string) {
    const img = document.createElement("img");
    img.src = imgSrc;
    if (!this.moveElement) {
      throw new Error("createImageElement: moveElement does not exist.");
    }
    this.moveElement.appendChild(img);
    return img;
  }

  updatePosition() {
    const multiplier = this.options.speed;

    this.progress += 1 * multiplier;

    switch (this.options.direction) {
      case "up":
        if (this.progress > this.maxProgress) this.progress = 0;
        break;
      case "down":
        if (this.progress > 0) this.progress = -this.maxProgress;
        break;
    }

    if (this.options.direction === "up") return -this.progress;
    return this.progress;
  }

  animationLoop() {
    if (!this.moveElement) {
      throw new Error("updatePosition: moveElement does not exist.");
    }
    this.moveElement.style.transform = `translateY(${this.updatePosition()}px)`;
    this.animationFrameId = window.requestAnimationFrame(
      this.animationLoop.bind(this)
    );
  }

  start() {
    if (!this.isPaused) return;
    this.isPaused = false;

    window.requestAnimationFrame(this.animationLoop.bind(this));
  }

  stop() {
    if (this.isPaused) return;
    this.isPaused = true;
    window.cancelAnimationFrame(this.animationFrameId!);
    this.animationFrameId = undefined;
  }
}

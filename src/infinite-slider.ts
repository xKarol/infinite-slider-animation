type Options = {
  rootElement: HTMLElement;
  images: string[];
  direction?: "up" | "down";
  gap?: number;
};

export class InfiniteSlider {
  private options: Required<Options>;
  private moveElement: HTMLDivElement | undefined;
  progress: number;
  private maxProgress: number;
  isPaused: boolean = true;
  private intervalId: number | undefined;

  constructor(options: Options) {
    this.options = { direction: "up", gap: 16, ...options };
    this.progress = 0;

    const { rootElement, images, gap, direction } = this.options;

    rootElement.setAttribute("style", `--gap: ${gap}px;`);
    this.createMoveElement();
    images.forEach((url) => this.createImageElement(url));
    images.forEach((url) => this.createImageElement(url));

    if (!this.moveElement) throw new Error("moveElement does not exist.");
    this.maxProgress = (this.moveElement.clientHeight + gap) / 2;
    if (direction === "down") {
      this.progress = -this.maxProgress;
    }
    this.start();
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
    switch (this.options.direction) {
      case "up":
        this.progress--;
        if (this.progress < -this.maxProgress) this.progress = 0;
        break;
      case "down":
        this.progress++;
        if (this.progress > 0) this.progress = -this.maxProgress;
        break;
    }
    return this.progress;
  }

  animationLoop() {
    if (!this.moveElement) {
      throw new Error("updatePosition: moveElement does not exist.");
    }
    this.updatePosition();
    this.moveElement.style.transform = `translateY(${this.progress}px)`;
  }

  start() {
    if (!this.isPaused) return;
    this.isPaused = true;

    this.intervalId = setInterval(
      () => window.requestAnimationFrame(this.animationLoop.bind(this)),
      5
    );
  }

  stop() {
    if (this.isPaused) return;
    this.isPaused = false;
    clearInterval(this.intervalId!);
    this.intervalId = undefined;
  }
}

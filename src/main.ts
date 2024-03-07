import "./style.css";

const gap: number = 16;
const direction: "up" | "down" = "up";

const col1Element = document.querySelector<HTMLDivElement>("#col1")!;

col1Element.setAttribute("style", `--gap: ${gap}px;`);

const moveContainerElement = document.querySelector<HTMLDivElement>(
  "#col1 #move-container"
)!;

moveContainerElement.innerHTML += moveContainerElement.innerHTML;

const maxProgress = (moveContainerElement.clientHeight + gap) / 2;
let progress = 0;

if (direction === "down") {
  progress = -maxProgress;
}

function animation() {
  switch (direction) {
    case "up":
      progress--;
      if (progress < -maxProgress) progress = 0;
      break;
    case "down":
      progress++;
      if (progress > 0) progress = -maxProgress;
      break;
  }
  moveContainerElement.style.transform = `translate(0, ${progress}px)`;
}

setInterval(() => window.requestAnimationFrame(animation), 5);

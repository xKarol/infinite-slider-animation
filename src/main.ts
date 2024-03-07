import "./style.css";

const gap: number = 16;

const col1Element = document.querySelector<HTMLDivElement>("#col1")!;

col1Element.setAttribute("style", `--gap: ${gap}px;`);

const moveContainerElement = document.querySelector<HTMLDivElement>(
  "#col1 #move-container"
)!;

moveContainerElement.innerHTML += moveContainerElement.innerHTML;

let progress = 0;
const maxProgress = (moveContainerElement.clientHeight + gap) / 2;

function animation() {
  progress++;
  moveContainerElement.style.transform = `translate(0, -${progress}px)`;
  if (progress > maxProgress) progress = 0;
}

setInterval(() => window.requestAnimationFrame(animation), 5);

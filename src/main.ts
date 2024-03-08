import { InfiniteSlider } from "./infinite-slider";
import "./style.css";

new InfiniteSlider({
  images: [
    "https://placehold.co/150x200",
    "https://placehold.co/150x250",
    "https://placehold.co/150x300",
  ],
  rootElement: document.querySelector<HTMLDivElement>("#col1")!,
  direction: "down",
  gap: 16,
});

new InfiniteSlider({
  images: [
    "https://placehold.co/150x300",
    "https://placehold.co/150x250",
    "https://placehold.co/150x200",
  ],
  rootElement: document.querySelector<HTMLDivElement>("#col2")!,
  direction: "up",
  gap: 16,
});

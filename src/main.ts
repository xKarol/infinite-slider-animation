import { InfiniteSlider } from "./infinite-slider";
import "./style.css";
import image1Url from "/1.avif";
import image2Url from "/2.avif";
import image3Url from "/3.avif";

import image4Url from "/4.avif";
import image5Url from "/5.avif";
import image6Url from "/6.avif";

new InfiniteSlider({
  images: [image1Url, image2Url, image3Url],
  rootElement: document.querySelector<HTMLDivElement>("#col1")!,
  direction: "down",
  gap: 16,
  speed: 1,
});

new InfiniteSlider({
  images: [image4Url, image5Url, image6Url],
  rootElement: document.querySelector<HTMLDivElement>("#col2")!,
  direction: "up",
  gap: 16,
  speed: 1,
});

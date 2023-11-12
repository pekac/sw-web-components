"use strict";

const NUM_OF_BLOBS = 8;

const svgCrapo = `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" height="0">
  <defs>
    <filter id="goog">
      <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
      <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
      <feBlend in="SourceGraphic" in2="goo" />
    </filter>
    <filter id="goo">
      <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
      <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
      <feBlend in="SourceGraphic" in2="goo"/>
   </filter>
  </defs>
</svg>`;

class LiquidDrip extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.attachStyles("../components/liquid-drip/style.css");
  }

  attachStyles(filePath) {
    /* extend class with method */
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = filePath;

    this.shadowRoot.appendChild(link);
  }

  /* mount */
  connectedCallback() {
    this.render();
  }

  /* unmount */
  disconnectedCallback() {
    console.log("Liquid removed from page.");
  }

  generateBlobs() {
    const blobs = [];
    let num = NUM_OF_BLOBS;
    while (num > 0) {
      const blob = document.createElement("div");
      blob.classList.add("blob");

      blobs.push(blob);

      num--;
    }

    return blobs;
  }

  render() {
    const container = document.createElement("div");
    container.classList.add("container");

    const blobContainer = document.createElement("div");
    blobContainer.classList.add("blobs");

    const title = document.createElement("h1");
    title.classList.add("text");
    title.innerHTML = "LIQUID<br>DRIP";

    const liquid = document.createElement("div");
    liquid.classList.add("liquid");

    const blobs = this.generateBlobs();

    blobContainer.appendChild(liquid);
    for (const blob of blobs) {
      blobContainer.appendChild(blob);
    }

    const svgElement = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    svgElement.innerHTML = svgCrapo;

    container.appendChild(blobContainer);
    container.appendChild(title);
    container.appendChild(svgElement);
    this.shadowRoot.appendChild(container);
  }
}

window.customElements.define("liquid-drip", LiquidDrip);

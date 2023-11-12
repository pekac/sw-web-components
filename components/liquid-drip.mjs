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

    const style = document.createElement("style");
    style.textContent = `
  b {
    font-size: 28px;
    color: #FFF;
  }
  
  .container {
    width: 300px;
    height: 500px;
    margin: 15px auto;
    background: #6cd2ff;
    overflow: hidden;
    position: relative;
    box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
  }
  
  .text {
    position: absolute;
    left: 50%;
    top: 45%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: #6cd2ff;
    font-size: 64px;
    font-weight: 900;
  }
  
  .liquid {
    width: 120%;
    height: 10px;
    position: absolute;
    top: -2%;
    left: -10%;
    background: #FFF;
    border-radius: 10%;
    animation: liquid 5s infinite;
  }
  
  .blobs {
    filter: url("#goo");
    width: 100%;
    height: 100%;
    position: relative;
  }
  .blobs .blob {
    width: 30px;
    height: 30px;
    margin: 0 5px 0px 0;
    background: #FFF;
    border-radius: 50%;
    position: absolute;
    top: 0;
    animation: drip_one 5s infinite;
  }
  .blobs .blob:nth-child(1) {
    left: -14%;
  }
  .blobs .blob:nth-child(2) {
    left: -1%;
  }
  .blobs .blob:nth-child(3) {
    left: 12%;
  }
  .blobs .blob:nth-child(4) {
    left: 25%;
  }
  .blobs .blob:nth-child(5) {
    left: 38%;
  }
  .blobs .blob:nth-child(6) {
    left: 51%;
  }
  .blobs .blob:nth-child(7) {
    left: 64%;
  }
  .blobs .blob:nth-child(8) {
    left: 77%;
  }
  .blobs .blob:nth-child(9) {
    left: 90%;
  }
  .blobs .blob:nth-of-type(4n-7) {
    width: 65px;
    animation: drip_four 5s infinite;
  }
  .blobs .blob:nth-of-type(3n-2) {
    width: 26px;
  }
  .blobs .blob:nth-of-type(2) {
    width: 22px;
  }
  .blobs .blob:nth-of-type(8) {
    animation: drip_five 5s infinite;
  }
  .blobs .blob:nth-of-type(4n+2) {
    height: 56px;
    animation: drip_two 5s infinite;
  }
  .blobs .blob:nth-of-type(6n-2) {
    height: 42px;
    animation: drip_three 5s infinite;
  }
  
  @keyframes drip_one {
    from {
      top: 0;
    }
    to {
      top: 103%;
    }
  }
  @keyframes drip_two {
    from {
      top: 0;
    }
    to {
      top: 104%;
    }
  }
  @keyframes drip_three {
    from {
      top: 0;
      height: 52px;
    }
    to {
      top: 102%;
      height: 132px;
    }
  }
  @keyframes drip_four {
    from {
      top: 0;
      width: 65px;
      height: 30px;
    }
    to {
      top: 102%;
      width: 75px;
      height: 45px;
    }
  }
  @keyframes drip_five {
    from {
      top: 0;
      height: 30px;
    }
    to {
      top: 102%;
      height: 72px;
    }
  }
  @keyframes liquid {
    from {
      height: 15px;
    }
    to {
      height: 109%;
    }
  }
`;

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(style);
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

    container.appendChild(blobContainer);
    container.appendChild(title);
    container.innerHTML += svgCrapo;

    this.shadowRoot.appendChild(container);
  }
}

window.customElements.define("liquid-drip", LiquidDrip);

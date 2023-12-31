"use strict";
/* style */
import style from "./style.css" assert { type: "css" };
/* core */
import { html } from "../../core/html/parser.mjs";
import { sheetToElement } from "../../core/css/utils.mjs";

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
    const el = sheetToElement(style);
    this.shadowRoot.appendChild(el);
  }

  /* mount */
  connectedCallback() {
    this.render();
  }

  /* unmount */
  disconnectedCallback() {
    console.log("Liquid removed from page.");
  }

  render() {
    const template = html(`
      <div class="container">
        <div class="blobs">
          <div class="liquid"></div>
          <div class="blob"></div>
          <div class="blob"></div>
          <div class="blob"></div>
          <div class="blob"></div>
          <div class="blob"></div>
          <div class="blob"></div>
          <div class="blob"></div>
          <div class="blob"></div>
        </div>   
        <h1 class="title">
          LIQUID DRIP
        </h1>
        <a class="credits" href="https://codepen.io/pareshd/pen/xgOEQb">Drip credits</a>
      </div>
    `);

    const svgElement = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    svgElement.innerHTML = svgCrapo;

    template.appendChild(svgElement);
    this.shadowRoot.appendChild(template);
  }
}

window.customElements.define("liquid-drip", LiquidDrip);

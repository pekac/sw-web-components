"use strict";

import { html } from "../../core/html-parser.mjs";

class SideNav extends HTMLElement {
  static observedAttributes = ["links"];

  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.attachStyles("../components/side-nav/style.css"); // fix
  }

  get links() {
    return JSON.parse(this.getAttribute("links"));
  }

  set links(value) {
    this.setAttribute("links", JSON.stringify(value));
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

  /* update */
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "links" && oldValue !== newValue) {
      this.render();
    }
  }

  /* unmount */
  disconnectedCallback() {
    console.log("Nav removed from page.");
  }

  render() {
    const template = html(`
      <nav class="side-nav">
        <ul class="nav-inner">
          ${this.links.map(
            ({ url, title }) => `
              <li class="nav-item">
                <a class="nav-link" href="${url}">${title}</a>
              </li>
            `
          )}
        </ul>
      </nav>
    `);

    const prevNav = this.shadowRoot.querySelector("nav.side-nav");
    if (prevNav) {
      this.shadowRoot.removeChild(prevNav);
    }

    this.shadowRoot.appendChild(template);
  }
}

window.customElements.define("side-nav", SideNav);

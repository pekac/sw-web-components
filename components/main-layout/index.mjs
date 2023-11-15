"use strict";

import { html } from "../../core/html-parser.mjs";

class MainLayout extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.attachStyles("../components/main-layout/style.css");
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
    console.log("Layout removed from page.");
  }

  render() {
    const template = html(`
      <div class="layout">
        <header class="header">
          <h3>Header</h3>
        </header>
        <div class="main">
          <side-nav links='[{"title": "Page 1","url": "/pages/page1.html"},{"title": "Page 2","url": "/pages/page2.html"}]'>
          </side-nav>
          <main class="main-content">
            <slot></slot>
          </main>
        </div>
      </div>
    `);

    this.shadowRoot.appendChild(template);
  }
}

window.customElements.define("main-layout", MainLayout);

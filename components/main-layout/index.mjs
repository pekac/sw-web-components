"use strict";

/* core */
import { html } from "../../core/html-parser.mjs";
/* components */

const style = document.createElement("style");
style.textContent = ``;

class MainLayout extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(style);
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
      <div style="display: flex; flex-direction: column; min-height: 100vh; gap: 0;">
        <header style="padding: 20px; text-align:center; color: white;">
          <h3>Header</h3>
        </header>
        <div style="display: flex; flex-direction: row; flex-grow: 1;">
          <side-nav links='[{"title": "Page 2","url": "/pages/page2.html"}, {"title": "Favorites", "url": "/favorites.html"}, {"title": "Search", "url": "/search.html"}]'>
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

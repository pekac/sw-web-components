"use strict";
/* style */
import style from "./style.css" assert { type: "css" };
/* core */
import { html } from "../../core/html/parser.mjs";
import { sheetToElement } from "../../core/css/utils.mjs";
/* components */
import "../side-nav/index.mjs";

class MainLayout extends HTMLElement {
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
    console.log("Layout removed from page.");
  }

  render() {
    const template = html(`
      <div class="layout">
        <header class="header">
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

"use strict";

const style = document.createElement("style");
style.textContent = ``;

class Layout extends HTMLElement {
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
    <div style="display: flex; flex-direction: column; min-height: 100vh; gap: 0;">
      <header>Header</header>
      <div style="display: flex; flex-direction: row; flex-grow: 1;">
        <side-nav></side-nav>
        <main>{children}</main>
      </div>
    </div>;
  }
}

window.customElements.define("layout", Layout);

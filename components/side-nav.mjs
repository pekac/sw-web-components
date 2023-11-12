"use strict";

const style = document.createElement("style");
style.textContent = `
  .side-nav {
    height: 100%;
  }

  .nav-inner {
    list-style: none;
    padding: 25px;
    margin: 0;
  }

  .nav-item {
    padding: 10px 0;
    margin-bottom: 10px;
  }

  .nav-link {
    color: #fff;
    font-weight: bold;
    text-decoration: none;
  }
`;

class SideNav extends HTMLElement {
  static observedAttributes = ["links"];

  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(style);
  }

  get links() {
    return JSON.parse(this.getAttribute("links"));
  }

  set links(value) {
    this.setAttribute("links", JSON.stringify(value));
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

  createNavLink(link) {
    const li = document.createElement("li");
    li.classList.add("nav-item");

    const a = document.createElement("a");
    a.classList.add("nav-link");
    a.href = link.url;
    a.innerHTML = link.title;

    li.appendChild(a);
    return li;
  }

  render() {
    const nav = document.createElement("nav");
    nav.classList.add("side-nav");

    const navContent = document.createElement("ul");
    navContent.classList.add("nav-inner");
    const linkItems = this.links.map(this.createNavLink);

    for (const link of linkItems) {
      navContent.appendChild(link);
    }

    nav.appendChild(navContent);

    const prevNav = this.shadowRoot.querySelector("nav.side-nav");
    if (prevNav) {
      this.shadowRoot.removeChild(prevNav);
    }

    this.shadowRoot.appendChild(nav);
  }
}

window.customElements.define("side-nav", SideNav);

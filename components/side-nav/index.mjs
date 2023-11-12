"use strict";

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

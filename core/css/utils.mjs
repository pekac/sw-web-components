"use strict";

function sheetToElement(styleSheet) {
  let content = "";

  for (const rule of styleSheet.rules) {
    content += rule.cssText;
  }

  const element = document.createElement("style");
  element.textContent = content;

  return element;
}

export { sheetToElement };

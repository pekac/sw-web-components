import {
  PARSER_STATE,
  isCloseTagEnd,
  isCloseTagStart,
  isOpenTagEnd,
  isOpenTagStart,
  isReadingElement,
  isReadingInnerContent,
  isSelfTagEnd,
} from "./parser-state.mjs";

const attributePattern = /(\S+?)=['"]([^'"]*?)['"]/g;

function createElement(openTag) {
  const [tag, attrsText = ""] = openTag.split(/ (.+)/);

  console.log("tag", tag);
  console.log("attrsText", attrsText);

  const element = document.createElement(tag);

  const matches = attrsText.matchAll(attributePattern);
  const arr = [...matches];
  for (const [_, name, value] of arr) {
    element.setAttribute(name, value);
  }

  return element;
}

function html(markup) {
  const parentStack = [];
  let dom = null;
  let state = PARSER_STATE.INIT;
  let currentTag = "";
  let innerContent = "";
  for (const char of markup) {
    if (isOpenTagStart(char)) {
      state = PARSER_STATE.OPEN_TAG_START;
      continue;
    }

    if (isOpenTagEnd(state, char)) {
      state = PARSER_STATE.OPEN_TAG_END;
      const element = createElement(currentTag);

      if (dom === null) {
        dom = element;
      } else {
        const parent = parentStack[parentStack.length - 1];
        parent.appendChild(element);
      }

      parentStack.push(element);
      currentTag = "";
      continue;
    }

    if (isSelfTagEnd(state, char)) {
      state = PARSER_STATE.SELF_TAG_END;
      continue;
    }

    if (isCloseTagStart(state, char)) {
      state = PARSER_STATE.CLOSE_TAG_START;
      const parent = parentStack[parentStack.length - 1];
      if (parent && innerContent !== "") {
        parent.innerHTML = innerContent;
        innerContent = "";
      }
      continue;
    }

    if (isCloseTagEnd(state, char)) {
      parentStack.pop();
      state = PARSER_STATE.CLOSE_TAG_END;
      continue;
    }

    if (isReadingElement(state, char)) {
      state = PARSER_STATE.READING_ELEMENT;
      currentTag += char;
      continue;
    }

    if (isReadingInnerContent(state, char)) {
      state = PARSER_STATE.INNER_CONTENT;
      if (char !== " ") {
        innerContent += char;
      }
      continue;
    }
  }

  return dom;
}

export { html };

import {
  PARSER_STATE,
  isCloseTagEnd,
  isCloseTagStart,
  isOpenTagEnd,
  isOpenTagStart,
  isReadingElement,
  isSelfTagEnd,
} from "./parser-state.mjs";

const attributePattern = /(\S+?)=['"]([^'"]*?)['"]/g;

function createElement(openTag) {
  const [tag, attrsText] = openTag.split(/ (.+)/);
  const element = document.createElement(tag);

  const matches = attrsText.matchAll(attributePattern);
  for (const [_, name, value] of matches) {
    element.setAttribute(name, value);
  }
}

function html(markup) {
  let dom = null;
  let state = PARSER_STATE.INIT;
  let currentTag = "";
  for (const char of markup) {
    if (isOpenTagStart(char)) {
      state = PARSER_STATE.OPEN_TAG_START;
      continue;
    }

    if (isOpenTagEnd(state, char)) {
      state = PARSER_STATE.OPEN_TAG_END;
      const element = createElement(currentTag);
      currentTag = "";
      continue;
    }

    if (isSelfTagEnd(state, char)) {
      state = PARSER_STATE.SELF_TAG_END;
      continue;
    }

    if (isCloseTagStart(state, char)) {
      state = PARSER_STATE.CLOSE_TAG_START;
      continue;
    }

    if (isCloseTagEnd(state, char)) {
      state = PARSER_STATE.CLOSE_TAG_END;
      continue;
    }

    if (isReadingElement(state)) {
      state = PARSER_STATE.READING_ELEMENT;
      currentTag += char;
    }
  }
}

export { html };

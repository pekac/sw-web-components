const PARSER_STATE = {
  INIT: -1,
  OPEN_TAG_START: 0,
  OPEN_TAG_END: 1,
  SELF_TAG_END: 2,
  CLOSE_TAG_START: 3,
  CLOSE_TAG_END: 4,
  INNER_CONTENT: 5,
  READING_ELEMENT: 6,
};

const SPECIAL_CHARS = new Set(["<", "/", ">"]);

function isOpenTagStart(char) {
  return char === "<";
}

function isCloseTagStart(state, char) {
  return char === "/" && state === PARSER_STATE.OPEN_TAG_START;
}

function isSelfTagEnd(state, char) {
  return char === "/" && state === PARSER_STATE.READING_ELEMENT;
}

function isOpenTagEnd(state, char) {
  return char === ">" && state === PARSER_STATE.READING_ELEMENT;
}

function isCloseTagEnd(state, char) {
  return char === ">" && state === PARSER_STATE.CLOSE_TAG_START;
}

function isReadingElement(state, char) {
  return (
    (state === PARSER_STATE.OPEN_TAG_START ||
      state === PARSER_STATE.READING_ELEMENT) &&
    !SPECIAL_CHARS.has(char)
  );
}

function isReadingInnerContent(state, char) {
  return (
    (!SPECIAL_CHARS.has(char) && state === PARSER_STATE.OPEN_TAG_END) ||
    state === PARSER_STATE.INNER_CONTENT
  );
}

function transition(state = PARSER_STATE.INIT, char) {
  if (isOpenTagStart(char)) {
    return PARSER_STATE.OPEN_TAG_START;
  }

  if (isOpenTagEnd(state, char)) {
    return PARSER_STATE.OPEN_TAG_END;
  }

  if (isSelfTagEnd(state, char)) {
    return PARSER_STATE.SELF_TAG_END;
  }

  if (isCloseTagStart(state, char)) {
    return PARSER_STATE.CLOSE_TAG_START;
  }

  if (isCloseTagEnd(state, char)) {
    return PARSER_STATE.CLOSE_TAG_END;
  }

  if (isReadingElement(state, char)) {
    return PARSER_STATE.READING_ELEMENT;
  }

  if (isReadingInnerContent(state, char)) {
    return PARSER_STATE.INNER_CONTENT;
  }

  return PARSER_STATE.INIT;
}

export { PARSER_STATE, transition };

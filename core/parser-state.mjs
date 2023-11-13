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
  return (
    char === ">" &&
    (state === PARSER_STATE.READING_ELEMENT ||
      state === PARSER_STATE.SELF_TAG_END)
  );
}

function isCloseTagEnd(state, char) {
  return char === ">" && state === PARSER_STATE.CLOSE_TAG_START;
}

function isReadingElement(state) {
  return state === PARSER_STATE.OPEN_TAG_START;
}

export {
  PARSER_STATE,
  isOpenTagStart,
  isCloseTagStart,
  isSelfTagEnd,
  isOpenTagEnd,
  isCloseTagEnd,
  isReadingElement,
};

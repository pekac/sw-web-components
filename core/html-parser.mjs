import { PARSER_STATE, transition } from "./parser-state.mjs";

const attributePattern = /(\S+?)=['"]([^'"]*?)['"]/g;

function createElement(openTag) {
  const [tag, attrsText = ""] = openTag.split(/ (.+)/);
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
  let currentTag = "";
  let innerContent = "";
  let state = PARSER_STATE.INIT;
  for (const char of markup) {
    state = transition(state, char);

    switch (state) {
      case PARSER_STATE.READING_ELEMENT: {
        currentTag += char;
        break;
      }

      case PARSER_STATE.INNER_CONTENT: {
        if (char !== " ") {
          innerContent += char;
        }
        break;
      }

      case PARSER_STATE.OPEN_TAG_END: {
        const element = createElement(currentTag);
        if (dom === null) {
          dom = element;
        } else {
          const parent = parentStack[parentStack.length - 1];
          parent.appendChild(element);
        }

        parentStack.push(element);
        currentTag = "";
        break;
      }

      case PARSER_STATE.CLOSE_TAG_START: {
        const parent = parentStack[parentStack.length - 1];
        if (parent && innerContent !== "") {
          parent.innerHTML = innerContent;
          innerContent = "";
        }
        break;
      }

      case PARSER_STATE.CLOSE_TAG_END: {
        parentStack.pop();
        break;
      }

      case PARSER_STATE.OPEN_TAG_START:
      case PARSER_STATE.SELF_TAG_END:
      default:
        continue;
    }
  }

  return dom;
}

export { html };

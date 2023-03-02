"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.replace.js");
require("core-js/modules/es.string.search.js");
require("core-js/modules/esnext.string.replace-all.js");
require("core-js/modules/es.string.match.js");
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.array.reverse.js");
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function toKey(str) {
  return str.replace(/ /g, '-');
}
function interpretHeader(line) {
  const preheader = ['end-para', ''];
  const trimline = line.replace(/^[ ]*/g, '');
  if (trimline.search(/^[#]{6}/) !== -1) {
    return [preheader, ['h6', trimline.substring(6)]];
  }
  if (trimline.search(/^[#]{5}/) !== -1) {
    return [preheader, ['h5', trimline.substring(5)]];
  }
  if (trimline.search(/^[#]{4}/) !== -1) {
    return [preheader, ['h4', trimline.substring(4)]];
  }
  if (trimline.search(/^[#]{3}/) !== -1) {
    return [preheader, ['h3', trimline.substring(3)]];
  }
  if (trimline.search(/^[#]{2}/) !== -1) {
    return [preheader, ['h2', trimline.substring(2)]];
  }
  if (trimline.search(/^[#]{1}/) !== -1) {
    return [preheader, ['h1', trimline.substring(1)]];
  }
  if (trimline.search(/^[ ]*[=]+[= \r\n]*$/) !== -1) {
    return [['h1-alt', '']];
  }
  if (trimline.search(/^[ ]*[-]+[- \r\n]*$/) !== -1) {
    return [['h2-alt', '']];
  }
  return null;
}
function interpretPara(line) {
  if (line.search(/^>[ ]*$/) !== -1) {
    return [['end-para', ''], ['start-block', '']];
  }
  if (line.search(/^\s*$/) !== -1) {
    return [['end-para', '']];
  }
  if (line.search(/( ){2}$/) !== -1 || line.search(/(<br>)$/) !== -1) {
    return [['text', line.replace(/(<br>)$/, '')], ['br', '']];
  }
  return null;
}
function interpretEmphasis(line) {
  let markedLine = line;
  markedLine = markedLine.replace(/\\\*/g, '$!AST!$');
  markedLine = markedLine.replace(/\\_/g, '$!UND!$');
  markedLine = markedLine.replace(/(__|\*\*)/g, '$!ST!$');
  markedLine = markedLine.replace(/(_|\*)/g, '$!EM!$');
  markedLine = markedLine.replaceAll('$!AST!$', '*');
  markedLine = markedLine.replaceAll('$!UND!$', '_');
  const segments = markedLine.split('$');
  const tags = [];
  let inStr = false;
  let inEm = false;
  let lastText = '';
  segments.forEach(seg => {
    if (seg === '!ST!' || seg === '!EM!') {
      if (inStr && inEm) {
        tags.push(['stem', lastText]);
      }
      if (inStr && !inEm) {
        tags.push(['st', lastText]);
      }
      if (!inStr && inEm) {
        tags.push(['em', lastText]);
      }
      if (!inStr && !inEm) {
        tags.push(['text', lastText]);
      }
      if (seg === '!EM!') {
        inEm = !inEm;
      }
      if (seg === '!ST!') {
        inStr = !inStr;
      }
      lastText = '';
    } else {
      lastText = seg;
    }
  });
  if (lastText) {
    tags.push(['text', lastText.concat(' ')]);
  }
  if (tags.length > 0) {
    return tags;
  }
  return null;
}
function interpretList(line) {
  const ulRegex = /^[ ]*[-+*]{1}[ ]+/;
  if (line.search(ulRegex) !== -1) {
    return [['end-para', ''], ['ul', line.replace(ulRegex, '')]];
  }
  return null;
}
function interpretLink(line) {
  if (line.search(/^\[.+?\]\(.+?\)$/) !== -1) {
    return [['a', [line.match(/^\[.+?\]/)[0].replace(/[[\]]/g, ''), line.match(/\(.+?\)$/)[0].replace(/[()]|( ".+?")/g, ''), line.match(/\(.+?\)$/)[0].replace(/(.+? ")|("[ ]*\))/g, '')]]];
  }
  return null;
}
function interpretLine(line) {
  if (interpretHeader(line)) {
    return interpretHeader(line);
  }
  if (interpretPara(line)) {
    return interpretPara(line);
  }
  if (interpretList(line)) {
    return interpretList(line);
  }
  if (interpretLink(line)) {
    return interpretLink(line);
  }
  if (interpretEmphasis(line)) {
    return interpretEmphasis(line);
  }
  return [['text', line.concat(' ')]];
}
const PARA_CONTENT = ['text', 'br', 'stem', 'st', 'em', 'a', 'start-block'];
function condenseParagraph(tags, index) {
  const lines = [];
  for (let i = index - 1; i > -1 && PARA_CONTENT.includes(tags[i][0]); i -= 1) {
    const line = tags[i];
    switch (line[0]) {
      case 'start-block':
        return /*#__PURE__*/_react.default.createElement("blockquote", {
          key: "block-".concat(index)
        }, /*#__PURE__*/_react.default.createElement("p", null, lines.reverse()));
      case 'a':
        lines.push( /*#__PURE__*/_react.default.createElement("a", {
          key: "a-".concat(i),
          href: line[1][1],
          title: line[1][2]
        }, line[1][0]));
        break;
      case 'stem':
        lines.push( /*#__PURE__*/_react.default.createElement("em", {
          key: "em-".concat(i)
        }, /*#__PURE__*/_react.default.createElement("strong", null, line[1])));
        break;
      case 'em':
        lines.push( /*#__PURE__*/_react.default.createElement("em", {
          key: "em-".concat(i)
        }, line[1]));
        break;
      case 'st':
        lines.push( /*#__PURE__*/_react.default.createElement("strong", {
          key: "strong-".concat(i)
        }, line[1]));
        break;
      case 'text':
        lines.push(line[1]);
        break;
      case 'br':
        lines.push( /*#__PURE__*/_react.default.createElement("br", {
          key: "br-".concat(i)
        }));
        break;
      default:
    }
  }
  if (lines.length === 0) {
    return null;
  }
  return /*#__PURE__*/_react.default.createElement("p", {
    key: "p-".concat(index)
  }, lines.reverse());
}
function processIntertags(inter) {
  const intertags = inter;
  const tags = [];
  intertags.forEach((intertag, index) => {
    switch (intertag[0]) {
      case 'raw-html':
        tags.push(intertag[1]);
        break;
      case 'start-block':
        if (intertags[index + 2][0][0] === 'h') {
          intertags[index + 2] = ['raw-html', /*#__PURE__*/_react.default.createElement("blockquote", {
            key: "blockheader-".concat(toKey(intertags[index + 2][1]))
          }, processIntertags([intertags[index + 2]]))];
          intertags[index] = ['text', ''];
        }
        break;
      case 'ul':
        tags.push( /*#__PURE__*/_react.default.createElement("li", {
          key: "ul-".concat(toKey(intertag[1]))
        }, intertag[1]));
        break;
      case 'end-para':
        tags.push(condenseParagraph(intertags.slice(0, index), index));
        break;
      case 'h2-alt':
        tags.push(condenseParagraph(intertags.slice(0, index - 1), index - 1));
        tags.push( /*#__PURE__*/_react.default.createElement("h2", {
          key: "h2-".concat(index - 1)
        }, intertags[index - 1][1]));
        break;
      case 'h1-alt':
        tags.push(condenseParagraph(intertags.slice(0, index - 1), index - 1));
        tags.push( /*#__PURE__*/_react.default.createElement("h1", {
          key: "h1-".concat(index - 1)
        }, intertags[index - 1][1]));
        break;
      case 'h6':
        tags.push( /*#__PURE__*/_react.default.createElement("h6", {
          key: "h6-".concat(toKey(intertag[1]))
        }, intertag[1]));
        break;
      case 'h5':
        tags.push( /*#__PURE__*/_react.default.createElement("h5", {
          key: "h5-".concat(toKey(intertag[1]))
        }, intertag[1]));
        break;
      case 'h4':
        tags.push( /*#__PURE__*/_react.default.createElement("h4", {
          key: "h4-".concat(toKey(intertag[1]))
        }, intertag[1]));
        break;
      case 'h3':
        tags.push( /*#__PURE__*/_react.default.createElement("h3", {
          key: "h3-".concat(toKey(intertag[1]))
        }, intertag[1]));
        break;
      case 'h2':
        tags.push( /*#__PURE__*/_react.default.createElement("h2", {
          key: "h2-".concat(toKey(intertag[1]))
        }, intertag[1]));
        break;
      case 'h1':
        tags.push( /*#__PURE__*/_react.default.createElement("h1", {
          key: "h1-".concat(toKey(intertag[1]))
        }, intertag[1]));
        break;
      default:
    }
  });
  return tags;
}
function MarkdownParser(_ref) {
  let {
    md
  } = _ref;
  const blockmd = md.replace(/\n>/g, '\n>\n').replace(/^>/g, '>\n');
  const linkmd = blockmd.replace(/\[.+?\]\(.+?\)/gim, '\n$&\n');
  const lines = linkmd.split('\n');
  const intertags = [];
  lines.forEach((line, index) => {
    const linetags = interpretLine(line, index);
    linetags.forEach(linetag => {
      intertags.push(linetag);
    });
  });
  intertags.push(['end-para', '']);
  return processIntertags(intertags);
}
var _default = MarkdownParser;
exports.default = _default;
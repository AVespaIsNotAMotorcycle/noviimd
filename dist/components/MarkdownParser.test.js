"use strict";

var _react = require("@testing-library/react");
var _MarkdownParser = _interopRequireDefault(require("./MarkdownParser"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
describe('headers', () => {
  const lineContent = 'Lorem ipsum';
  test('renders header 6', () => {
    const md = "###### ".concat(lineContent);
    (0, _react.render)( /*#__PURE__*/React.createElement(_MarkdownParser.default, {
      md: md
    }));
    const header = _react.screen.getByText(lineContent);
    expect(header.nodeName).toBe('H6');
  });
  test('renders header 5', () => {
    const md = "##### ".concat(lineContent);
    (0, _react.render)( /*#__PURE__*/React.createElement(_MarkdownParser.default, {
      md: md
    }));
    const header = _react.screen.getByText(lineContent);
    expect(header.nodeName).toBe('H5');
  });
  test('renders header 4', () => {
    const md = "#### ".concat(lineContent);
    (0, _react.render)( /*#__PURE__*/React.createElement(_MarkdownParser.default, {
      md: md
    }));
    const header = _react.screen.getByText(lineContent);
    expect(header.nodeName).toBe('H4');
  });
  test('renders header 3', () => {
    const md = "### ".concat(lineContent);
    (0, _react.render)( /*#__PURE__*/React.createElement(_MarkdownParser.default, {
      md: md
    }));
    const header = _react.screen.getByText(lineContent);
    expect(header.nodeName).toBe('H3');
  });
  test('renders header 2', () => {
    const md = "## ".concat(lineContent);
    (0, _react.render)( /*#__PURE__*/React.createElement(_MarkdownParser.default, {
      md: md
    }));
    const header = _react.screen.getByText(lineContent);
    expect(header.nodeName).toBe('H2');
  });
  test('renders header 1', () => {
    const md = "# ".concat(lineContent);
    (0, _react.render)( /*#__PURE__*/React.createElement(_MarkdownParser.default, {
      md: md
    }));
    const header = _react.screen.getByText(lineContent);
    expect(header.nodeName).toBe('H1');
  });
  test('renders header 1 alt syntax', () => {
    const md = "".concat(lineContent, "\n======");
    (0, _react.render)( /*#__PURE__*/React.createElement(_MarkdownParser.default, {
      md: md
    }));
    const header = _react.screen.getByText(lineContent);
    expect(header.nodeName).toBe('H1');
  });
  test('renders header 2 alt syntax', () => {
    const md = "".concat(lineContent, "\n------");
    (0, _react.render)( /*#__PURE__*/React.createElement(_MarkdownParser.default, {
      md: md
    }));
    const header = _react.screen.getByText(lineContent);
    expect(header.nodeName).toBe('H2');
  });
});
describe('paragraphs', () => {
  test('create 2 p tags', () => {
    const md = "one\ntwo\n\nthree\nfour";
    (0, _react.render)( /*#__PURE__*/React.createElement(_MarkdownParser.default, {
      md: md
    }));
    const p11 = _react.screen.getByText(/one/);
    const p12 = _react.screen.getByText(/two/);
    expect(p11).toBe(p12);
    const p21 = _react.screen.getByText(/three/);
    const p22 = _react.screen.getByText(/four/);
    expect(p21).toBe(p22);
  });
  test('one p tag w br via spaces', () => {
    const md = "one\ntwo  \nthree\nfour";
    (0, _react.render)( /*#__PURE__*/React.createElement(_MarkdownParser.default, {
      md: md
    }));
    const p22 = _react.screen.getByText(/four/);
    let hasbr = false;
    Object.keys(p22).forEach(key => {
      const val = p22[key];
      if (val.children) {
        Object.keys(val.children).forEach(chKey => {
          if (val.children[chKey].type === 'br') {
            hasbr = true;
          }
        });
      }
    });
    expect(hasbr).toBe(true);
  });
  test('one p tag w br via <br>', () => {
    const md = "one\ntwo<br>\nthree\nfour";
    (0, _react.render)( /*#__PURE__*/React.createElement(_MarkdownParser.default, {
      md: md
    }));
    const p22 = _react.screen.getByText(/four/);
    let hasbr = false;
    Object.keys(p22).forEach(key => {
      const val = p22[key];
      if (val.children) {
        Object.keys(val.children).forEach(chKey => {
          if (val.children[chKey].type === 'br') {
            hasbr = true;
          }
        });
      }
    });
    expect(hasbr).toBe(true);
  });
  test('three p tags', () => {
    const md = "Lorem\n\nipsum\n\ndolor sit amet";
    (0, _react.render)( /*#__PURE__*/React.createElement(_MarkdownParser.default, {
      md: md
    }));
    _react.screen.getByText('Lorem');
    _react.screen.getByText('ipsum');
    _react.screen.getByText('dolor sit amet');
  });
});
describe('emphasis', () => {
  test('bold text with __', () => {
    const md = "Lorem ipsum __dolor__ sit amet";
    (0, _react.render)( /*#__PURE__*/React.createElement(_MarkdownParser.default, {
      md: md
    }));
    const bold = _react.screen.getByText('dolor');
    expect(bold.nodeName).toBe('STRONG');
  });
  test('bold text with **', () => {
    const md = "Lorem ipsum **dolor** sit amet";
    (0, _react.render)( /*#__PURE__*/React.createElement(_MarkdownParser.default, {
      md: md
    }));
    const bold = _react.screen.getByText('dolor');
    expect(bold.nodeName).toBe('STRONG');
  });
  test('bold text within a word with __', () => {
    const md = "Lorem ipsum d__olo__r sit amet";
    (0, _react.render)( /*#__PURE__*/React.createElement(_MarkdownParser.default, {
      md: md
    }));
    const bold = _react.screen.getByText('olo');
    expect(bold.nodeName).toBe('STRONG');
  });
  test('bold text within a word with **', () => {
    const md = "Lorem ipsum d**olo**r sit amet";
    (0, _react.render)( /*#__PURE__*/React.createElement(_MarkdownParser.default, {
      md: md
    }));
    const bold = _react.screen.getByText('olo');
    expect(bold.nodeName).toBe('STRONG');
  });
  test('italic text with __', () => {
    const md = "Lorem ipsum _dolor_ sit amet";
    (0, _react.render)( /*#__PURE__*/React.createElement(_MarkdownParser.default, {
      md: md
    }));
    const italic = _react.screen.getByText('dolor');
    expect(italic.nodeName).toBe('EM');
  });
  test('italic text with **', () => {
    const md = "Lorem ipsum *dolor* sit amet";
    (0, _react.render)( /*#__PURE__*/React.createElement(_MarkdownParser.default, {
      md: md
    }));
    const italic = _react.screen.getByText('dolor');
    expect(italic.nodeName).toBe('EM');
  });
  test('italic text within a word with __', () => {
    const md = "Lorem ipsum d_olo_r sit amet";
    (0, _react.render)( /*#__PURE__*/React.createElement(_MarkdownParser.default, {
      md: md
    }));
    const italic = _react.screen.getByText('olo');
    expect(italic.nodeName).toBe('EM');
  });
  test('italic text within a word with **', () => {
    const md = "Lorem ipsum d*olo*r sit amet";
    (0, _react.render)( /*#__PURE__*/React.createElement(_MarkdownParser.default, {
      md: md
    }));
    const italic = _react.screen.getByText('olo');
    expect(italic.nodeName).toBe('EM');
  });
  test('italic and bold text with ** and *', () => {
    const md = "**Lorem** ipsem *dolor* sit amet";
    (0, _react.render)( /*#__PURE__*/React.createElement(_MarkdownParser.default, {
      md: md
    }));
    const bold = _react.screen.getByText('Lorem');
    expect(bold.nodeName).toBe('STRONG');
    const italic = _react.screen.getByText('dolor');
    expect(italic.nodeName).toBe('EM');
  });
  test('mixed italic/bold with *', () => {
    const md = "Lorem ipsum **d*olo*r** sit amet";
    (0, _react.render)( /*#__PURE__*/React.createElement(_MarkdownParser.default, {
      md: md
    }));
    const bold1 = _react.screen.getByText('d');
    const italic = _react.screen.getByText('olo');
    const bold2 = _react.screen.getByText('r');
    expect(bold1.nodeName).toBe('STRONG');
    expect(italic.nodeName).toBe('STRONG');
    expect(italic.parentElement.nodeName).toBe('EM');
    expect(bold2.nodeName).toBe('STRONG');
  });
  test('can escape *', () => {
    const md = "this \\*is\\* a sentence";
    (0, _react.render)( /*#__PURE__*/React.createElement(_MarkdownParser.default, {
      md: md
    }));
    const text = _react.screen.getByText("this *is* a sentence");
    expect(text.nodeName).toBe('P');
  });
  test('can escape _', () => {
    const md = "this \\_is\\_ a sentence";
    (0, _react.render)( /*#__PURE__*/React.createElement(_MarkdownParser.default, {
      md: md
    }));
    const text = _react.screen.getByText("this _is_ a sentence");
    expect(text.nodeName).toBe('P');
  });
  test('can escape **', () => {
    const md = "this \\*\\*is\\*\\* a sentence";
    (0, _react.render)( /*#__PURE__*/React.createElement(_MarkdownParser.default, {
      md: md
    }));
    const text = _react.screen.getByText("this **is** a sentence");
    expect(text.nodeName).toBe('P');
  });
  test('can escape __', () => {
    const md = "this \\_\\_is\\_\\_ a sentence";
    (0, _react.render)( /*#__PURE__*/React.createElement(_MarkdownParser.default, {
      md: md
    }));
    const text = _react.screen.getByText("this __is__ a sentence");
    expect(text.nodeName).toBe('P');
  });
});
describe('lists', () => {
  test('unordered list with -', () => {
    const md = "- First\n- Second\n- Third";
    (0, _react.render)( /*#__PURE__*/React.createElement(_MarkdownParser.default, {
      md: md
    }));
    const bullet1 = _react.screen.getByText('First');
    const bullet2 = _react.screen.getByText('Second');
    const bullet3 = _react.screen.getByText('Third');
    expect(bullet1.nodeName).toBe('LI');
    expect(bullet2.nodeName).toBe('LI');
    expect(bullet3.nodeName).toBe('LI');
  });
  test('unordered list with *', () => {
    const md = "* First\n* Second\n* Third";
    (0, _react.render)( /*#__PURE__*/React.createElement(_MarkdownParser.default, {
      md: md
    }));
    const bullet1 = _react.screen.getByText('First');
    const bullet2 = _react.screen.getByText('Second');
    const bullet3 = _react.screen.getByText('Third');
    expect(bullet1.nodeName).toBe('LI');
    expect(bullet2.nodeName).toBe('LI');
    expect(bullet3.nodeName).toBe('LI');
  });
  test('unordered list with +', () => {
    const md = "+ First\n+ Second\n+ Third";
    (0, _react.render)( /*#__PURE__*/React.createElement(_MarkdownParser.default, {
      md: md
    }));
    const bullet1 = _react.screen.getByText('First');
    const bullet2 = _react.screen.getByText('Second');
    const bullet3 = _react.screen.getByText('Third');
    expect(bullet1.nodeName).toBe('LI');
    expect(bullet2.nodeName).toBe('LI');
    expect(bullet3.nodeName).toBe('LI');
  });
});
describe('links', () => {
  test('link w/o title', () => {
    const md = "Here's a link: [www.samuelmebersole.com](https://www.samuelmebersole.com)";
    (0, _react.render)( /*#__PURE__*/React.createElement(_MarkdownParser.default, {
      md: md
    }));
    const link = _react.screen.getByText('www.samuelmebersole.com');
    expect(link.nodeName).toBe('A');
  });
  test('multiple links w/o title in one line', () => {
    const md = "Link one: [google](https://www.google.com) link two: [github](https://www.github.com)";
    (0, _react.render)( /*#__PURE__*/React.createElement(_MarkdownParser.default, {
      md: md
    }));
    const linkOne = _react.screen.getByText('google');
    expect(linkOne.nodeName).toBe('A');
    const linkTwo = _react.screen.getByText('github');
    expect(linkTwo.nodeName).toBe('A');
  });
});
describe('blockquotes', () => {
  test('create 2 p tags', () => {
    const md = "> one\ntwo\n\n> three\nfour";
    (0, _react.render)( /*#__PURE__*/React.createElement(_MarkdownParser.default, {
      md: md
    }));
    const p11 = _react.screen.getByText(/one/);
    const p12 = _react.screen.getByText(/two/);
    const p21 = _react.screen.getByText(/three/);
    const p22 = _react.screen.getByText(/four/);
    expect(p11.parentElement.nodeName).toBe('BLOCKQUOTE');
    expect(p12.parentElement.nodeName).toBe('BLOCKQUOTE');
    expect(p21.parentElement.nodeName).toBe('BLOCKQUOTE');
    expect(p22.parentElement.nodeName).toBe('BLOCKQUOTE');
  });
  test('one p tag w br via spaces', () => {
    const md = "> one\ntwo  \nthree\nfour";
    (0, _react.render)( /*#__PURE__*/React.createElement(_MarkdownParser.default, {
      md: md
    }));
    const p22 = _react.screen.getByText(/four/);
    expect(p22.parentElement.nodeName).toBe('BLOCKQUOTE');
  });
  test('one p tag w br via <br>', () => {
    const md = "> one\ntwo<br>\nthree\nfour";
    (0, _react.render)( /*#__PURE__*/React.createElement(_MarkdownParser.default, {
      md: md
    }));
    const p22 = _react.screen.getByText(/four/);
    expect(p22.parentElement.nodeName).toBe('BLOCKQUOTE');
  });
  test('three p tags', () => {
    const md = "> Lorem\n\n> ipsum\n\n> dolor sit amet";
    (0, _react.render)( /*#__PURE__*/React.createElement(_MarkdownParser.default, {
      md: md
    }));
    expect(_react.screen.getByText('Lorem').parentElement.nodeName).toBe('BLOCKQUOTE');
    expect(_react.screen.getByText('ipsum').parentElement.nodeName).toBe('BLOCKQUOTE');
    expect(_react.screen.getByText('dolor sit amet').parentElement.nodeName).toBe('BLOCKQUOTE');
  });
  test('header tag in block quotes', () => {
    const md = "\n> ###### This is a header6 block quote\n> ##### This is a header5 block quote\n> #### This is a header4 block quote\n> ### This is a header3 block quote\n> ## This is a header2 block quote\n> # This is a header1 block quote\n";
    (0, _react.render)( /*#__PURE__*/React.createElement(_MarkdownParser.default, {
      md: md
    }));
    const h6 = _react.screen.getByText('This is a header6 block quote');
    expect(h6.nodeName).toBe('H6');
    expect(h6.parentElement.nodeName).toBe('BLOCKQUOTE');
    const h5 = _react.screen.getByText('This is a header5 block quote');
    expect(h5.nodeName).toBe('H5');
    expect(h5.parentElement.nodeName).toBe('BLOCKQUOTE');
    const h4 = _react.screen.getByText('This is a header4 block quote');
    expect(h4.nodeName).toBe('H4');
    expect(h4.parentElement.nodeName).toBe('BLOCKQUOTE');
    const h3 = _react.screen.getByText('This is a header3 block quote');
    expect(h3.nodeName).toBe('H3');
    expect(h3.parentElement.nodeName).toBe('BLOCKQUOTE');
    const h2 = _react.screen.getByText('This is a header2 block quote');
    expect(h2.nodeName).toBe('H2');
    expect(h2.parentElement.nodeName).toBe('BLOCKQUOTE');
    const h1 = _react.screen.getByText('This is a header1 block quote');
    expect(h1.nodeName).toBe('H1');
    expect(h1.parentElement.nodeName).toBe('BLOCKQUOTE');
  });
});
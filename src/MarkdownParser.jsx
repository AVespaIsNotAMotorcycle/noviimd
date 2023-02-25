import React from 'react';

function convertHeaderAltSyntax(lines) {
  const nlines = [];
  lines.forEach((line, index) => {
    if (index === 0) { nlines.push(line); return; }
    const last = nlines.length - 1;
    if (line.search(/^[ ]*[=]+[= \r\n]*$/) !== -1) {
      nlines[last] = '# '.concat(nlines[last]);
      return;
    } else if (line.search(/^[ ]*[-]+[- \r\n]*$/) !== -1) {
      nlines[last] = '## '.concat(nlines[last]);
      return;
    }
    nlines.push(line);
  });
  return nlines;
}

function interpretHeader(line, index) {
  const preheader = ['end-para', ''];
  if (line.search(/^[#]{6}/) !== -1) { return [preheader, ['h6', line.substring(6)]]; }
  if (line.search(/^[#]{5}/) !== -1) { return [preheader, ['h5', line.substring(5)]]; }
  if (line.search(/^[#]{4}/) !== -1) { return [preheader, ['h4', line.substring(4)]]; }
  if (line.search(/^[#]{3}/) !== -1) { return [preheader, ['h3', line.substring(3)]]; }
  if (line.search(/^[#]{2}/) !== -1) { return [preheader, ['h2', line.substring(2)]]; }
  if (line.search(/^[#]{1}/) !== -1) { return [preheader, ['h1', line.substring(1)]]; }
  if (line.search(/^[ ]*[=]+[= \r\n]*$/) !== -1) { return [['h1-alt', '']] }
  if (line.search(/^[ ]*[-]+[- \r\n]*$/) !== -1) { return [['h2-alt', '']] }
  return null;
}

function interpretPara(line, index) {
  if (line.search(/^\s*$/) !== -1) { return [['end-para', '']]; }
  if (line.search(/[  ]$/) !== -1
     || line.search(/[<br>]$/) !== -1) {
    return [['text', line], ['br', '']];
  }
  return null;
}

function interpretEmphasis(line, index) {
  let markedLine = line;
  markedLine = markedLine.replace(/(__|\*\*)/g, '$!ST!$');
  markedLine = markedLine.replace(/(_|\*)/g, '$!EM!$');
  const segments = markedLine.split('$');
  const tags = [];
  let inStr = false;
  let inEm = false;
  let lastText = '';
  segments.forEach((seg, index) => {
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
      }
      if (seg === '!EM!') { inEm = !inEm; }
      if (seg === '!ST!') { inStr = !inStr;}
    }
    else {
      lastText = seg;
    }
  });
  if (tags.length > 0) { return tags; }
  return null;
}

function interpretLine(line, index, flags) {
  if (interpretHeader(line, index)) { return interpretHeader(line, index); }
  if (interpretPara(line, index)) { return interpretPara(line, index); }
  if (interpretEmphasis(line, index)) { return interpretEmphasis(line, index); }
  return [['text', line]];
}

const PARA_CONTENT = ['text', 'br', 'stem', 'st', 'em'];
function condenseParagraph(tags, index) {
  const lines = [];
  let startIndex = index - 1;
  for (
    let i = index - 1;
    (i > -1 && PARA_CONTENT.includes(tags[i][0]));
    i -= 1
  ) {
    const line = tags[i];
    switch (line[0]) {
      case 'stem':
        lines.push(<em key={`em-${i}`}><strong>{line[1]}</strong></em>);
        break;
      case 'em':
        lines.push(<em key={`em-${i}`}>{line[1]}</em>);
        break;
      case 'st':
        lines.push(<strong key={`strong-${i}`}>{line[1]}</strong>)
        break;
      case 'text':
        lines.push(line[1]);
        break;
      case 'br':
        lines.push(<br key={`br-${i}`}/>);
        break;
      default:
        return;
    }
  }
  if (lines.length === 0) { return null; }
  return <p key={`p-${index}`}>{lines.reverse()}</p>
}

function processIntertags(intertags) {
  const tags = [];
  intertags.forEach((intertag, index) => {
    switch (intertag[0]) {
      case 'end-para':
        tags.push(condenseParagraph(intertags.splice(0, index), index));
        break;
      case 'h2-alt':
        tags.push(condenseParagraph(intertags.splice(0, index - 1), index - 1));
        tags.push(<h2 key={`h2-${index - 1}`}>{intertags[index - 1][1]}</h2>);
        break;
      case 'h1-alt':
        tags.push(condenseParagraph(intertags.splice(0, index - 1), index - 1));
        tags.push(<h1 key={`h1-${index - 1}`}>{intertags[index - 1][1]}</h1>);
        break;
      case 'h6':
        tags.push(<h6 key={`h6-${index}`}>{intertag[1]}</h6>);
        break;
      case 'h5':
        tags.push(<h5 key={`h5-${index}`}>{intertag[1]}</h5>);
        break;
      case 'h4':
        tags.push(<h4 key={`h4-${index}`}>{intertag[1]}</h4>);
        break;
      case 'h3':
        tags.push(<h3 key={`h3-${index}`}>{intertag[1]}</h3>);
        break;
      case 'h2':
        tags.push(<h2 key={`h2-${index}`}>{intertag[1]}</h2>);
        break;
      case 'h1':
        tags.push(<h1 key={`h1-${index}`}>{intertag[1]}</h1>);
        break;
      default:
        return;
    }
  });
  return tags;
}

function MarkdownParser({ md }) {
  let lines = md.split('\n');
  let intertags = [];
  lines.forEach((line, index) => {
    const linetags = interpretLine(line, index);
    linetags.forEach((linetag) => {
      intertags.push(linetag);
    });
  });
  intertags.push(['end-para', ''])
  return processIntertags(intertags);
}

export default MarkdownParser;

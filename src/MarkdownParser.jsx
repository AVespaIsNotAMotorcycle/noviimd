import React from 'react';

function convertHeaderAltSyntax(lines) {
  const nlines = [];
  lines.forEach((line, index) => {
    if (index === 0) { nlines.push(line); return; }
    const last = nlines.length - 1;
    if (line.search(/^[= \r\n]*$/) !== -1) {
      nlines[last] = '# '.concat(nlines[last]);
      return;
    } else if (line.search(/^[- \r\n]*$/) !== -1) {
      nlines[last] = '## '.concat(nlines[last]);
      return;
    }
    nlines.push(line);
  });
  return nlines;
}

function interpretHeader(line, index) {
  if (line.search(/^[#]{6}/) !== -1) { return <h6 key={`S{index}`}>{line.substring(6)}</h6>; }
  if (line.search(/^[#]{5}/) !== -1) { return <h5 key={`S{index}`}>{line.substring(5)}</h5>; }
  if (line.search(/^[#]{4}/) !== -1) { return <h4 key={`S{index}`}>{line.substring(4)}</h4>; }
  if (line.search(/^[#]{3}/) !== -1) { return <h3 key={`S{index}`}>{line.substring(3)}</h3>; }
  if (line.search(/^[#]{2}/) !== -1) { return <h2 key={`S{index}`}>{line.substring(2)}</h2>; }
  if (line.search(/^[#]{1}/) !== -1) { return <h1 key={`S{index}`}>{line.substring(1)}</h1>; }

  return null;
}

function interpretLine(line, index) {
  if (interpretHeader(line, index)) { return interpretHeader(line, index); }

  return null;
}

function MarkdownParser({ md }) {
  let lines = md.split('\n');
  lines = convertHeaderAltSyntax(lines);
  const tags = lines.map((line, index) => interpretLine(line, index));
  return tags;
}

export default MarkdownParser;

import { render, screen } from '@testing-library/react';
import MarkdownParser from './MarkdownParser';

describe('renders individual lines', () => {
  const lineContent = 'Lorem ipsum';

  test('renders header 6', () => {
    const md = `###### ${lineContent}`;
    render(<MarkdownParser md={md} />);
    const header = screen.getByText(lineContent);
    expect(header.nodeName).toBe('H6');
  });

  test('renders header 5', () => {
    const md = `##### ${lineContent}`;
    render(<MarkdownParser md={md} />);
    const header = screen.getByText(lineContent);
    expect(header.nodeName).toBe('H5');
  });

  test('renders header 4', () => {
    const md = `#### ${lineContent}`;
    render(<MarkdownParser md={md} />);
    const header = screen.getByText(lineContent);
    expect(header.nodeName).toBe('H4');
  });

  test('renders header 3', () => {
    const md = `### ${lineContent}`;
    render(<MarkdownParser md={md} />);
    const header = screen.getByText(lineContent);
    expect(header.nodeName).toBe('H3');
  });

  test('renders header 2', () => {
    const md = `## ${lineContent}`;
    render(<MarkdownParser md={md} />);
    const header = screen.getByText(lineContent);
    expect(header.nodeName).toBe('H2');
  });

  test('renders header 1', () => {
    const md = `# ${lineContent}`;
    render(<MarkdownParser md={md} />);
    const header = screen.getByText(lineContent);
    expect(header.nodeName).toBe('H1');
  });

  test('renders header 1 alt syntax', () => {
    const md = `${lineContent}\n======`;
    render(<MarkdownParser md={md} />);
    const header = screen.getByText(lineContent);
    expect(header.nodeName).toBe('H1');
  });

  test('renders header 2 alt syntax', () => {
    const md = `${lineContent}\n------`;
    render(<MarkdownParser md={md} />);
    const header = screen.getByText(lineContent);
    expect(header.nodeName).toBe('H2');
  });
})

describe('paragraphs', () => {
  test('create 2 p tags', () => {
    const md = `one\ntwo\n\nthree\nfour`;
    render(<MarkdownParser md={md} />);
    const p11 = screen.getByText(/one/);
    const p12 = screen.getByText(/two/);
    expect(p11).toBe(p12);
    const p21 = screen.getByText(/three/);
    const p22 = screen.getByText(/four/);
    expect(p21).toBe(p22);
  });

  test('one p tag w br via spaces', () => {
    const md = `one\ntwo  \nthree\nfour`;
    render(<MarkdownParser md={md} />);
    const p22 = screen.getByText(/four/);
    let hasbr = false;
    Object.keys(p22).forEach((key) => {
      const val = p22[key];
      if (val.children) {
        Object.keys(val.children).forEach((chKey) => {
          if (val.children[chKey].type === 'br') { hasbr = true; }
        });
      }
    });
    expect(hasbr).toBe(true);
  })

  test('one p tag w br via <br>', () => {
    const md = `one\ntwo<br>\nthree\nfour`;
    render(<MarkdownParser md={md} />);
    const p22 = screen.getByText(/four/);
    let hasbr = false;
    Object.keys(p22).forEach((key) => {
      const val = p22[key];
      if (val.children) {
        Object.keys(val.children).forEach((chKey) => {
          if (val.children[chKey].type === 'br') { hasbr = true; }
        });
      }
    });
    expect(hasbr).toBe(true);
  })
});

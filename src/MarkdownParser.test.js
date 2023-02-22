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

  test('renders header 2', () => {
    const md = `${lineContent}\n------`;
    render(<MarkdownParser md={md} />);
    const header = screen.getByText(lineContent);
    expect(header.nodeName).toBe('H2');
  });
})

A markdown parser for React. Implementing the syntax defined at https://www.markdownguide.org/basic-syntax/

Install via `npm install noviimd`

Usage: `import NoviiMD from 'noviimd'; <NoviiMD md={your markdown here} />`

- [X] Headings
- [X] Paragraphs
- [X] Line breaks
- [X] Emphasis
  - [X] Bold text
  - [x] Italic text
  - [X] Bold and italic text
  - [X] Allow escaping of \* \*\* \_ and \_\_
- [X] Blockquotes
  - [X] Paragraph content
  - [X] Headers
- [ ] Lists
  - [X] Unordered lists
  - [ ] Ordered lists
  - [ ] Indented blocks and sub lists
- [ ] Code
- [ ] Horizontal rules
- [ ] Links
  - [X] Links with the \[\]\(\) format
  - [ ] Links with the <> format
  - [ ] Emphasis on links
  - [ ] Links as code
  - [ ] Reference style links
- [ ] Images
- [ ] Escaping characters
- [ ] HTML
  - [X] \<br\> tags supported

import React, { useState } from 'react';
import './App.css';

import MarkdownParser from './MarkdownParser';
import TextField from './TextField';

function App() {
  const [markdown, setMarkdown] = useState('');

  return (
    <div className="App">
      <TextField
        onChange={(e) => {
          setMarkdown(e.target.value);
        }}
        placeholder="Enter some markdown here!"
      />
      <MarkdownParser md={markdown} />
    </div>
  );
}

export default App;

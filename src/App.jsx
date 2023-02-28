import React, { useState } from 'react';
import './App.css';

import MarkdownParser from './MarkdownParser';
import TextField from './TextField';

function App() {
  const [markdown, setMarkdown] = useState('');

  return (
    <div className="flex-container">
      <div className="flex-item">
        <TextField
          className="content textarea"
          onChange={(e) => {
            setMarkdown(e.target.value);
          }}
          placeholder="Enter some markdown here!"
        />
      </div>
      <div className="flex-divider" />
      <div className="flex-item">
        <div className="content scroll">
          <MarkdownParser md={markdown} />
        </div>
      </div>
    </div>
  );
}

export default App;

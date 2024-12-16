import React, { useState } from 'react';
import { Editor } from '@monaco-editor/react';
import './css/IDE.css';

export default function IDE() {
  const [code, setCode] = useState('// Start coding here...');
  const [output, setOutput] = useState('');
  const [language, setLanguage] = useState('javascript');

  const runCode = () => {
    if (language === 'javascript') {
      try {
        const result = eval(code); // BE CAREFUL: Use eval only for trusted input
        setOutput(result.toString());
      } catch (err) {
        setOutput(`Error: ${err.message}`);
      }
    } else {
      // Placeholder for backend execution
      setOutput('Backend execution needed for non-JS languages.');
    }
  };

  return (
    <div className="ide-container">
      {/* Editor Section */}
      <div className="editor-section">
        <div className="controls">
          <h3>Code Editor</h3>
          <div>
            <select
              onChange={(e) => setLanguage(e.target.value)}
              value={language}
              className="language-select"
            >
              <option value="javascript">JavaScript</option>
              
            </select>
            <button onClick={runCode} className="run-button">
              Run
            </button>
          </div>
        </div>
        <Editor
          height="calc(100vh - 70px)"
          language={language}
          value={code}
          onChange={(value) => setCode(value || '')}
          theme="vs-dark"
        />
      </div>

      {/* Console Section */}
      <div className="console-section">
        <h3>Console Output</h3>
        <pre className="output-box">{output}</pre>
      </div>
    </div>
  );
}

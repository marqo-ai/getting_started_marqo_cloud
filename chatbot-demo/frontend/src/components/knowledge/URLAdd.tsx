import React, { useState } from 'react';

import './URLAdd.css';

interface URLAddProps {
  onSubmit: (url: string) => void;
}

function URLAdd({ onSubmit }: URLAddProps) {
  const [url, setUrl] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  const handleSubmit = () => {
    onSubmit(url);
    setUrl('');
  };

  return (
    <div className="url-add">
      <input
        className="url-add-input"
        value={url}
        onChange={handleChange}
        placeholder="Paste your URL here..."
      />
      <br />
      <div className="url-add-footer">
        <button className="url-add-submit" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default URLAdd;

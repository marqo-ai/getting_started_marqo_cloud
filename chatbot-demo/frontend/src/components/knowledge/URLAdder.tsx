import React from 'react';
import URLAdd from './URLAdd';
import { API_BASE_URL } from '../../constants';

const URLAdder = () => {
  async function handleSubmit(url: string) {
    console.log(url);
    await fetch(API_BASE_URL + '/addWebpage', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        URL: url,
      }),
    });
  }

  return (
    <div>
      <URLAdd onSubmit={handleSubmit} />
    </div>
  );
};

export default URLAdder;

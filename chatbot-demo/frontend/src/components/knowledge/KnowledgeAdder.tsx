import React from 'react';
import DocumentAdd from './DocumentAdd';
import { API_BASE_URL } from '../../constants';

const KnowledgeAdder: React.FC = () => {
  async function handleSubmit(text: string) {
    // Send the text to your API here
    console.log(text);
    await fetch(API_BASE_URL + '/addKnowledge', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        document: text,
      }),
    });
  }

  return <DocumentAdd onSubmit={handleSubmit} />;
};

export default KnowledgeAdder;

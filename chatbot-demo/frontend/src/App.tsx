import React from 'react';
import marqoLogo from './MarqoLogo.svg';
import './App.css';
import ChatWindow from './components/chat/ChatWindow';
import KnowledgeAdder from './components/knowledge/KnowledgeAdder';
import URLAdder from './components/knowledge/URLAdder';

function App() {
  return (
    <main className="App">
      <div>
        <div className="marqo-logo-container">
          <img className="marqo-logo" src={marqoLogo} alt="Marqo logo" />
        </div>
        <h3>Chat</h3>
        <ChatWindow />
        <h3>Add Knowledge</h3>
        <KnowledgeAdder />
        <h3>Add Webpage</h3>
        <URLAdder />
      </div>
    </main>
  );
}

export default App;

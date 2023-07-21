import React from 'react';
import marqoLogo from './MarqoLogo.svg';
import './App.css';
import ChatWindow from './components/chat/ChatWindow';

function App() {
  return (
    <main className="App">
      <div>
        <div className="marqo-logo-container">
          <img className="marqo-logo" src={marqoLogo} alt="Marqo logo" />
          <p>Instruct the agent to 'search' for something to make use of Marqo.</p>
        </div>
        <ChatWindow />
      </div>
    </main>
  );
}

export default App;

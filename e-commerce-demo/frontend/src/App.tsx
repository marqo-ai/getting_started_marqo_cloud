import { Provider } from 'react-redux';
import { useState } from 'react';
import ResultsDisplay from './components/results/resultsDisplay';
import SearchBar from './components/search/searchBar';
import './App.css';
import Logo from './components/logo/logo';
import store from './store/store';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
          <Logo />
          <SearchBar/>
          <ResultsDisplay/>
        </header>
      </div>
    </Provider>
  );
}

export default App;

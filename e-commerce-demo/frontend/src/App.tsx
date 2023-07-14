import React from "react";
import { useState } from "react";
import logo from "./logo.svg";
import ResultsDisplay from "./components/results/resultsDisplay";
import SearchBar from "./components/search/searchBar";
import "./App.css";
import Logo from "./components/logo/logo";

function App() {
  const [query, setQuery] = useState<string>("");
  const [moreOf, setMoreOf] = useState<string>("");
  const [lessOf, setLessOf] = useState<string>("");

  return (
    <div className="App">
      <header className="App-header">
        <Logo />
        <SearchBar
          onSearch={(query: string, moreOf: string, lessOf: string) => {
            setQuery(query);
            setMoreOf(moreOf);
            setLessOf(lessOf);
          }}
        />
        <ResultsDisplay query={query} moreOf={moreOf} lessOf={lessOf} />
      </header>
    </div>
  );
}

export default App;

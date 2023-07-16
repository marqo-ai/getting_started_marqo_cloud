import { useState } from 'react';
import './searchBar.css';

const SearchBar = ({
  onSearch,
}: {
  onSearch: (query: string, moreOf: string, lessOf: string) => void;
}) => {
  const [query, setQuery] = useState<string>('');
  const [moreOf, setMoreOf] = useState<string>('');
  const [lessOf, setLessOf] = useState<string>('');

  const handleSubmit = () => {
    onSearch(query, moreOf, lessOf);
  };

  const handleQueryChange = (e: any) => {
    setQuery(e.target.value);
  };

  const handleMoreChange = (e: any) => {
    setMoreOf(e.target.value);
  };

  const handleLessChange = (e: any) => {
    setLessOf(e.target.value);
  };

  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="search-bar">
      <input
        className="search-bar-input"
        type="text"
        placeholder="Search for this..."
        value={query}
        onChange={handleQueryChange}
        onKeyDown={handleKeyPress}
      />
      <input
        className="search-bar-input"
        type="text"
        placeholder="More of this..."
        value={moreOf}
        onChange={handleMoreChange}
        onKeyDown={handleKeyPress}
      />
      <input
        className="search-bar-input"
        type="text"
        placeholder="Less of this..."
        value={lessOf}
        onChange={handleLessChange}
        onKeyDown={handleKeyPress}
      />
      <button className="search-button" onClick={handleSubmit}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;

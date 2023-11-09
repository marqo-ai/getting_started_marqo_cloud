import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { fetchProducts } from '../../slices/resultsSlice';
import { AppDispatch } from '../../store/store';

import './searchBar.css';

type SearchBarProps = {
  enableMoreOf: boolean;
  enableLessOf: boolean;
};

const SearchBar = ({ enableMoreOf = true, enableLessOf = true }: SearchBarProps) => {
  const [query, setQuery] = useState<string>('');
  const [moreOf, setMoreOf] = useState<string>('');
  const [lessOf, setLessOf] = useState<string>('');

  const dispatch = useDispatch<AppDispatch>();
  const favourites = useSelector((state: RootState) => state.favourites.terms);
  const customInstructions = useSelector(
    (state: RootState) => state.customInstructions.instructions,
  );
  const searchSettings = useSelector((state: RootState) => state.searchSettings);
  const style = useSelector((state: RootState) => state.searchStyle.style);
  const advancedSettings = useSelector((state: RootState) => state.advancedSettings);

  const handleSubmit = () => {
    dispatch(
      fetchProducts({
        query,
        moreOf,
        lessOf,
        customInstructions,
        favourites,
        searchSettings,
        style,
        advancedSettings,
      }),
    );
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
      {enableMoreOf && (
        <input
          className="search-bar-input"
          type="text"
          placeholder="More of this..."
          value={moreOf}
          onChange={handleMoreChange}
          onKeyDown={handleKeyPress}
        />
      )}
      {enableLessOf && (
        <input
          className="search-bar-input"
          type="text"
          placeholder="Less of this..."
          value={lessOf}
          onChange={handleLessChange}
          onKeyDown={handleKeyPress}
        />
      )}
      <button className="search-button" onClick={handleSubmit}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;

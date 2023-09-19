import { ThreeDots } from 'react-loader-spinner';
import ProductCard from '../product/productCard';
import { searchResult } from '../../types/types';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { addFavourite } from '../../slices/favouritesSlice';
import './resultsDisplay.css';

const ResultsDisplay = () => {
  const searchResults = useSelector((state: RootState) => state.results.products);
  const status = useSelector((state: RootState) => state.results.status);
  const error = useSelector((state: RootState) => state.results.error);

  const isLoading = status === 'loading';

  const dispatch = useDispatch();

  const handleNewFavourite = (term: string) => {
    dispatch(addFavourite(term));
  };

  return (
    <div className="search-results">
      <div className={`result-display ${isLoading ? 'loading' : ''}`}>
        {isLoading ? (
          <ThreeDots color="#020659" height="100" width="100" />
        ) : error ? (
          <div className="error">Error: {error}</div>
        ) : (
          searchResults.map((result: searchResult) => (
            <ProductCard key={result.id} product={result} onFavourite={handleNewFavourite} />
          ))
        )}
      </div>
    </div>
  );
};

export default ResultsDisplay;

import { ThreeDots } from 'react-loader-spinner';
import ProductCard from '../product/productCard';
import { searchResult } from '../../types/types';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { addFavourite, removeFavourite } from '../../slices/favouritesSlice';
import { Image, notification } from 'antd';
import { HeartFilled, ExclamationCircleOutlined } from '@ant-design/icons';
import './resultsDisplay.css';

const ResultsDisplay = () => {
  const searchResults = useSelector((state: RootState) => state.results.products);
  const status = useSelector((state: RootState) => state.results.status);
  const error = useSelector((state: RootState) => state.results.error);
  const favouriteTerms = useSelector((state: RootState) => state.favourites.terms);

  const [api, contextHolder] = notification.useNotification();

  const isLoading = status === 'loading';

  const dispatch = useDispatch();

  const handleFavouriteImageError = (term: string) => () => {
    api['warning']({
      message: 'Warning!',
      description: (
        <>
          <ExclamationCircleOutlined style={{ color: '#020659' }} />
          <span className="favourite-notification-image-error">
            {' '}
            The image for {term} could not be loaded. Please try again later.
          </span>
        </>
      ),
      placement: 'bottomRight',
    });
    dispatch(removeFavourite(term));
  };

  const handleNewFavourite = (term: string, type: string) => {
    if (favouriteTerms.length >= 10) {
      openFavouriteFullErrorNotification();
      return;
    }

    if (favouriteTerms.includes(term)) {
      openFavouriteWarningNotification();
      return;
    }

    if (type === 'name') {
      openNotification(<>{term}</>);
    } else {
      openNotification(
        <Image
          className="favourite-notification-image"
          src={term}
          alt={'Favourited Image'}
          width={100}
          height={140}
          onError={handleFavouriteImageError(term)}
        />,
      );
    }
    dispatch(addFavourite(term));
  };

  const openNotification = (description: JSX.Element) => {
    api.open({
      message: 'Favourite Added!',
      description: description,
      icon: <HeartFilled style={{ color: '#020659' }} />,
      placement: 'bottomRight',
    });
  };

  const openFavouriteWarningNotification = () => {
    api['warning']({
      message: 'Warning!',
      description: 'This item is already favourited!',
      placement: 'bottomRight',
    });
  };

  const openFavouriteFullErrorNotification = () => {
    api['error']({
      message: 'Error!',
      description: 'The maximum number of favourites is 10.',
      placement: 'bottomRight',
    });
  };

  return (
    <div className="search-results">
      {contextHolder}
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

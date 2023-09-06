import { useState, useEffect } from 'react';
import { Space, Tag } from 'antd';

import "./favouriteTags.css"

type FavouriteTagsProps = {
  favourites: string[];
  onDeleteFavourite: (term: string) => void;
  onResetFavourites: () => void;
};

const FavouriteTags = ({favourites, onDeleteFavourite, onResetFavourites}: FavouriteTagsProps) => {

  const [favClassName, setFavClassName] = useState<string>("invisible-favourites");

  useEffect(() => {
    if (favourites.length > 0) {
      setFavClassName("visible-favourites");
    } else {
      setFavClassName("invisible-favourites");
    }
  }, [favourites])

  return (
    <div className={`favourite-tags ${favClassName}`}>
      {/* {favourites.length > 0 && <div>Favourites</div>} */}
      <div className='fav-heading'>Favourites</div>
      <Space wrap>
        {favourites.map((favourite) => (
          <Tag
            key={favourite}
            closeIcon
            onClose={() => onDeleteFavourite(favourite)}
            color="green"
          >
            {favourite}
          </Tag>
        ))}
      </Space>
      {/* {favourites.length > 0 && <button onClick={onResetFavourites}>Clear</button>} */}
      <button onClick={onResetFavourites}>Clear</button>
    </div>
  );
}

export default FavouriteTags;
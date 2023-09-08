import { useState } from 'react';
import { Product } from '../../types/types';
import { Image, Button } from 'antd';
import { HeartFilled } from '@ant-design/icons';
import './productCard.css';

const ProductCard = ({
  product,
  onFavourite,
}: {
  product: Product;
  onFavourite: (content: string) => void;
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  const favoriteName = () => {
    console.log(`Favorited name: ${product.name}`);
    onFavourite(product.name);
  };

  const favoriteImage = () => {
    console.log(`Favorited image: ${product.image_url}`);
    onFavourite(product.image_url);
  };

  return (
    <div id={product.id} className={`product-card ${isLoaded ? 'loaded' : ''}`}>
      <div className="card">
        {/* <img src={product.image_url} alt={product.name} onLoad={handleImageLoad} /> */}
        <Image width={250} src={product.image_url} alt={product.name} onLoad={handleImageLoad} />
        <div className="meta">
          <div className="title">{product.name}</div>
          <div className="price">${product.price}</div>
        </div>
        <div className="actions">
          <Button type="primary" onClick={favoriteName}>
            <HeartFilled /> Name
          </Button>
          <Button type="primary" onClick={favoriteImage}>
            <HeartFilled /> Image
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

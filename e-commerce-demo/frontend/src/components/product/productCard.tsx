import { useState } from "react";
import { Card, Image } from "antd";
import "./productCard.css";

const { Meta } = Card;

interface Product {
  id: string;
  name: string;
  price: number;
  image_url: string;
}

const ProductCard = ({ product }: { product: Product }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div id={product.id} className={`product-card ${isLoaded ? "loaded" : ""}`}>
      <Card
        hoverable
        style={{ width: 240 }}
        cover={<Image src={product.image_url} onLoad={handleImageLoad} />}
      >
        <Meta title={product.name} description={`$${product.price}`} />
      </Card>
    </div>
  );
};

export default ProductCard;

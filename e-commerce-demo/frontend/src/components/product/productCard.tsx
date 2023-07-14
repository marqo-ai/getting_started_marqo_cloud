import React, { useState } from "react";
import "./productCard.css";

interface Product {
  id: string;
  name: string;
  price: number;
  image_url: string;
}

const ProductCard = ({ product }: { product: Product }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  console.log("Product card for", product.name);
  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div id={product.id} className={`product-card ${isLoaded ? "loaded" : ""}`}>
      <img
        className="product-image"
        src={product.image_url}
        alt={product.name}
        onLoad={handleImageLoad}
      />
      <h3 className="product-name">{product.name}</h3>
      <p className="product-price">${product.price}</p>
    </div>
  );
};

export default ProductCard;

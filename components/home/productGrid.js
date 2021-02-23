import { useState } from "react";
import ProductCard from "./productCard";

const productGrid = ({ products, addToCart, cartData }) => {
  const [selectedId, setSelectedId] = useState(null);

  return products.map((product, index) => {
    let isSelected = selectedId == product.ProductId;
    return (
      <ProductCard
        key={index}
        isSelected={isSelected}
        setSelectedId={setSelectedId}
        product={product}
        addToCart={addToCart}
        cartData={cartData}
      />
    );
  });
};

export default productGrid;

import { useState } from "react";
import ProductCard from "./productCard";
import { LargeLoader } from "../loaders";

const productGrid = ({ products, addToCart, cartData }) => {
  const [selectedId, setSelectedId] = useState(null);
  if (products == null || products.length < 1) return <LargeLoader />;
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

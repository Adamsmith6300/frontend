import productSection from "./productSection";

import { useState } from "react";
import Product from "./product";

const productGrid = ({ products, addToCart, cartData }) => {
  const [selectedId, setSelectedId] = useState(null);

  return products.map((product, index) => {
    let isSelected = selectedId == product.ProductId;
    return (
      <Product
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

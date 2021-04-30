import { useState } from "react";
import ProductCard from "./productCard";
import { Loader } from "semantic-ui-react";

const productGrid = ({ products, addToCart, cartData }) => {
  const [selectedId, setSelectedId] = useState(null);
  if (products == null || products.length < 1)
    return <Loader inline="centered" active />;
  return products.map((product, index) => {
    let isSelected = selectedId == product.ProductId;
    return (
      <ProductCard
        key={product.ProductId + index}
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

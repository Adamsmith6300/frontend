import { useState } from "react";
import ProductCard from "./productCard";
import { Loader } from "semantic-ui-react";

const productGrid = ({ products, addToCart, cartData }) => {
  const [selectedId, setSelectedId] = useState(null);
  if (products == null) return <Loader inline="centered" active />;
  if (products.length < 1)
    return (
      <div className="mb-12">
        <p>No Products</p>
      </div>
    );
  products = products.filter((product) => product.price >= 1);
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

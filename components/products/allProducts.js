import { useState } from "react";
import ProductCard from "./productCard";
const categories = ["Home + decor", "healthy + beauty", "jewellery"];

const pOIS = [80, 120, 260, 200, 150, 60, 200, 260];

const allProducts = ({ products, addToCart, cartData }) => {
  const [selectedId, setSelectedId] = useState(null);
  if (products != undefined && products.length > 0) {
    products = products.map((product, index) => {
      let isSelected = selectedId == product.ProductId;
      return (
        <ProductCard
          key={product.ProductId}
          product={product}
          addToCart={addToCart}
          cartData={cartData}
          isSelected={isSelected}
          setSelectedId={setSelectedId}
          category={categories[product.category]}
          pointOfInterest={pOIS[index]}
        />
      );
    });
  }

  return <ul className="card-list">{products}</ul>;
};

export default allProducts;

import { useState } from "react";
import MProductCard from "./mProductCard.js";
const pOIS = [80, 120, 260, 200, 150, 60, 200, 260];

const merchantProducts = ({ products, addToCart, cartData }) => {
  const [selectedIdP, setSelectedIdP] = useState(null);
  if (products != undefined && products.length > 0) {
    products = products.map((product, index) => {
      let isSelected = selectedIdP == product.ProductId;
      return (
        <MProductCard
          key={product.ProductId}
          product={product}
          addToCart={addToCart}
          cartData={cartData}
          isSelected={isSelected}
          setSelectedId={setSelectedIdP}
          //   category={categories[product.category]}
          //   pointOfInterest={pOIS[index]}
        />
      );
    });
  }

  return <ul className="card-list--mProducts">{products}</ul>;
};

export default merchantProducts;

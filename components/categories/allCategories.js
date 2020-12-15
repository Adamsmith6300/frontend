import { useState } from "react";
import CategoryCard from "./catgeoryCard";

const allCategories = ({ categories, addToCart, cartData, router }) => {
  const [selectedId, setSelectedId] = useState(null);
  if (categories != undefined && categories.length > 0) {
    categories = categories.map((category, index) => {
      let isSelected = selectedId == category.CategoryIndex;
      return (
        <CategoryCard
          key={category.name}
          category={category}
          addToCart={addToCart}
          cartData={cartData}
          isSelected={isSelected}
          router={router}
          setSelectedId={setSelectedId}
        />
      );
    });
  }

  return <ul className="card-list">{categories}</ul>;
};

export default allCategories;

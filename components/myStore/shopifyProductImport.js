import { useState } from "react";

const index = ({ prod, selectedProducts, setSelectedProducts }) => {
  const [selected, setSelected] = useState(false);
  let bgColor = selected ? "bg-green-100" : "bg-white";
  return (
    <li
      onClick={(e) => {
        e.stopPropagation();
        const newSelected = [...selectedProducts];
        if (selected) {
          let i = newSelected.indexOf(prod.id);
          newSelected.splice(i, 1);
          setSelectedProducts([...newSelected]);
        } else {
          newSelected.push(prod.id);
          setSelectedProducts([...newSelected]);
        }
        setSelected(!selected);
      }}
      className={`grid grid-cols-3 place-items-center cursor-pointer border-t border-b w-full py-2 px-2 ${bgColor}`}
    >
      <img
        src={prod.image ? prod.image.src : "./shopify_logo.png"}
        className="w-24"
      />
      <span>{prod.title ? prod.title : "No title"}</span>
      {prod.variants ? <span>{prod.variants.length} variants</span> : null}
    </li>
  );
};

export default index;

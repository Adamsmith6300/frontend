// import { useState } from "react";
// import { updateProductDetails } from "../../../store/helpers";
// import { Dropdown } from "semantic-ui-react";

const index = ({
  index,
  product,
  // categories,
  selectedProducts,
  setSelectedProducts,
  selectedProduct,
  setSelectedProduct,
  callDeleteProducts,
}) => {
  const imgSrc = product.images[0].src;
  let selected = selectedProducts.indexOf(product.ProductId);
  return (
    <div
      className={`${
        selected != -1 ? "border-red-300 border-2" : null
      } w-250 p-2 m-2 cursor-pointer relative`}
      onClick={() => {
        if (selected == -1) {
          setSelectedProducts([...selectedProducts, product.ProductId]);
        } else {
          let newSelected = [...selectedProducts];
          newSelected.splice(selected, 1);
          setSelectedProducts([...newSelected]);
        }
      }}
    >
      <div className="h-250 w-full">
        <img className="h-full mb-2" src={imgSrc} alt="" align="top" />
      </div>
      <p>
        <span>{product.title}</span>
      </p>
      <p>${product.price}</p>
      {/* <Dropdown
        className="mt-2"
        selection
        placeholder="Select a Category"
        options={categories}
        onChange={(e, { value }) => {
          setCurValue(value);
          updateCategory(value);
        }}
        value={curValue}
      /> */}
      <div className="flex justify-between my-3">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSelectedProduct(index);
          }}
          className="text-blue-400"
        >
          Edit
        </button>
        {/* <button
          onClick={(e) => {
            e.stopPropagation();
            callDeleteProducts({
              products: [product.ProductId],
              MerchantId: product.MerchantId,
            });
          }}
          className="text-red-400"
        >
          Delete
        </button> */}
      </div>
    </div>
  );
};

export default index;

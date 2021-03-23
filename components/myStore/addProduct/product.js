import { useState } from "react";
import { updateProductDetails } from "../../../store/helpers";
import { Dropdown } from "semantic-ui-react";

const index = ({
  product,
  categories,
  selectedProducts,
  setSelectedProducts,
  callDeleteProducts,
}) => {
  const imgSrc = product.image.src;
  categories = categories.map((cat, index) => {
    return {
      key: cat.name,
      text: cat.name,
      value: cat.CategoryIndex,
    };
  });
  const [curValue, setCurValue] = useState(
    product.category ? product.category : null
  );
  let selected = selectedProducts.indexOf(product.ProductId);
  const updateCategory = async (value) => {
    try {
      let resp = await updateProductDetails(product.ProductId, {
        category: value,
        MerchantId: product.MerchantId,
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div
      className={`w-250 m-2 cursor-pointer relative`}
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
      {selected != -1 ? (
        <div className="bg-red-400 bg-opacity-25 w-full h-full absolute z-50"></div>
      ) : null}
      <div className="grid place-content-end w-full h-150 overflow-hidden">
        <img className="w-full mb-2" src={imgSrc} alt="" align="top" />
      </div>
      <p>
        <span>{product.title}</span>
      </p>
      <p>${product.variants[0].price}</p>
      <Dropdown
        className="mt-2"
        selection
        placeholder="Select a Category"
        options={categories}
        onChange={(e, { value }) => {
          setCurValue(value);
          updateCategory(value);
        }}
        value={curValue}
      />
      <button
        onClick={(e) => {
          e.stopPropagation();
          callDeleteProducts({
            products: [product.ProductId],
            MerchantId: product.MerchantId,
          });
        }}
        className="text-red-400 my-3"
      >
        Delete Product
      </button>
    </div>
  );
};

export default index;

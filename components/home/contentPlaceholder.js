import { memo, useState } from "react";
import Link from "next/link";
import { checkMerchant } from "../../store/helpers";

export const ContentPlaceholder = memo(({ product, addToCart, cartData }) => {
  let isMerchant = checkMerchant();
  const [selectedVariant, setSelectedVariant] = useState(0);
  let s = {};
  if (product.options) {
    for (let k = 0; k < product.options.length; ++k) {
      s["option" + (k + 1)] = product.options[k].values[0];
    }
  }
  const [selectedOptions, setSelectedOptions] = useState({ ...s });
  const [qty, setQty] = useState(1);
  let visiblePrice = product.variants
    ? product.variants[selectedVariant].price
    : product.price;

  let inventory = product.variants
    ? product.variants[selectedVariant].inventory_quantity
    : 1;
  let options = null;
  if (product.options) {
    options = product.options.map((option, index) => {
      let vals = option.values.map((val, ind) => {
        return (
          <option key={ind + val} value={val}>
            {val}
          </option>
        );
      });

      return (
        <div key={option.name}>
          <p>{option.name}</p>
          <select
            onChange={(e) => {
              let newOptions = {
                ...selectedOptions,
                ["option" + (index + 1)]: e.target.value,
              };
              for (let i = 0; i < product.variants.length; ++i) {
                let variant = product.variants[i];
                let correctOptionCount = 0;
                for (let k = 0; k < Object.values(newOptions).length; ++k) {
                  if (
                    variant["option" + (k + 1)] ==
                    newOptions["option" + (k + 1)]
                  ) {
                    correctOptionCount++;
                  }
                }
                if (correctOptionCount == Object.values(newOptions).length) {
                  setSelectedVariant(i);
                  break;
                }
              }
              setSelectedOptions({ ...newOptions });
            }}
            name="options"
            className="product-options"
          >
            {vals}
          </select>
        </div>
      );
    });
  }
  return (
    <div className="content-container">
      <p className="text-3xl flex justify-between">
        <span>{product.title}</span>
        <span className="w-150 text-center">${visiblePrice}</span>
      </p>
      <Link href={`/merchants/${product.MerchantId}`}>
        <p className="cursor-pointer text-black text-xl my-2">
          by {product.storename}
        </p>
      </Link>
      {!isMerchant ? (
        <div className="my-6 mx-auto">
          {options != null ? <div>{options}</div> : null}
          <div className="flex justify-between w-150 mr-5 my-2">
            <button
              className="btn-no-size p-2 px-5"
              onClick={() => setQty(Math.max(1, qty - 1))}
            >
              -
            </button>
            <span className="leading-loose mx-3 text-2xl">{qty}</span>
            <button
              className="btn-no-size p-2 px-4"
              onClick={() =>
                setQty(
                  Math.min(inventory ? Number.MAX_VALUE : inventory, qty + 1)
                )
              }
            >
              +
            </button>
          </div>
          <button
            className="standard-btn my-2"
            onClick={() => {
              // let title = product.title;
              // if (
              //   product.variants[selectedVariant].title &&
              //   product.variants[selectedVariant].title != "Default Title"
              // ) {
              //   title = product.variants[selectedVariant].title;
              // }
              addToCart(
                {
                  ...product,
                  chosenVariant: product.variants[selectedVariant],
                  // title: title,
                },
                cartData,
                qty
              );
            }}
          >
            Add to Cart
          </button>
        </div>
      ) : null}
      <p>{product.body_html ? product.body_html : product.description}</p>
    </div>
  );
});

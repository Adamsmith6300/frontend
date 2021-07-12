import { memo, useState } from "react";
import Link from "next/link";
import { checkMerchant, roundToTwo } from "../../store/helpers";
import { Loader } from "semantic-ui-react";

export const ContentPlaceholder = memo(
  ({ product, addToCart, cartData, currentIndex, setCurrentIndex }) => {
    const isMerchant = checkMerchant();
    const [selectedVariant, setSelectedVariant] = useState(
      product.variants.length > 0 ? 0 : null
    );
    const [loading, setLoading] = useState(false);
    let s = {};
    if (product.options) {
      for (let k = 0; k < product.options.length; ++k) {
        s["option_" + product.options[k].id] = product.options[k].values[0];
      }
    }
    const [selectedOptions, setSelectedOptions] = useState({ ...s });
    const [qty, setQty] = useState(1);
    let visiblePrice =
      selectedVariant != null
        ? product.variants[selectedVariant].price
        : product.price;
    visiblePrice = roundToTwo(visiblePrice);
    let inventory =
      selectedVariant != null
        ? product.variants[selectedVariant].stock
        : product.stock;
    if (product.stockUnlimited) {
      inventory = Number.MAX_VALUE;
    }
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
          <div key={option.name} className="w-300 mx-auto ">
            <p className="text-left">{option.name}</p>
            <select
              onChange={(e) => {
                let newOptions = {
                  ...selectedOptions,
                  ["option_" + option.id]: e.target.value,
                };
                let newOptionVals = Object.values(newOptions);
                for (let i = 0; i < product.variants.length; ++i) {
                  let variant = product.variants[i];
                  let correctOptionCount = 0;
                  for (let k = 0; k < newOptionVals.length; ++k) {
                    for (let j = 0; j < variant.optionValues.length; ++j) {
                      if (variant.optionValues[j].value == newOptionVals[k]) {
                        correctOptionCount++;
                      }
                    }
                  }
                  if (correctOptionCount == newOptionVals.length) {
                    setSelectedVariant(i);
                    if (variant.image != null) {
                      setCurrentIndex(variant.image.displayIndex);
                    }
                    break;
                  }
                }
                setSelectedOptions({ ...newOptions });
              }}
              name="options"
              className="product-options  p-2"
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
        {/* {!isMerchant ? ( */}
        <div className="my-6 mx-auto">
          {options != null ? <div className="">{options}</div> : null}
          <div className="flex justify-between w-150 mx-auto my-2">
            {inventory >= qty ? (
              <>
                <button
                  className="btn-no-size p-2 px-5"
                  onClick={() => setQty(Math.max(1, qty - 1))}
                >
                  -
                </button>
                <span className="leading-loose mx-3 text-2xl">{qty}</span>
                <button
                  disabled={qty + 1 > inventory}
                  className={`btn-no-size-color p-2 px-4 ${
                    qty + 1 > inventory
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-black"
                  }`}
                  onClick={() => {
                    setQty(
                      Math.min(
                        inventory ? Number.MAX_VALUE : inventory,
                        qty + 1
                      )
                    );
                  }}
                >
                  +
                </button>
              </>
            ) : (
              <p className="text-red-500">OUT OF STOCK</p>
            )}
          </div>
          <div className="w-full text-center">
            <button
              className="standard-btn my-2"
              onClick={async () => {
                setLoading(true);
                setTimeout(() => {
                  setLoading(false);
                }, 300);
                addToCart(
                  {
                    ...product,
                    chosenVariant:
                      selectedVariant != null
                        ? product.variants[selectedVariant]
                        : null,
                  },
                  cartData,
                  qty
                );
              }}
            >
              {loading ? (
                <Loader className="inline" active size="mini" inverted />
              ) : (
                "Add To Cart"
              )}
            </button>
          </div>
        </div>
        {/* ) : null} */}
        <p>{product.description}</p>
      </div>
    );
  }
);

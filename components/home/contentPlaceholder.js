import { memo, useState, useEffect } from "react";
import Link from "next/link";
import { roundToTwo } from "../../store/helpers";
import { Loader } from "semantic-ui-react";
import axios from "axios";
import moment from "moment";
import { add_to_cart_event } from "../../utils/gtag";
const daysOfWeek = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

export const ContentPlaceholder = memo(
  ({ product, addToCart, cartData, currentIndex, setCurrentIndex }) => {
    let isAlcohol = product.category == 8 || product.category == 9;
    const [selectedVariant, setSelectedVariant] = useState(
      product.variants.length > 0 ? 0 : null
    );
    const [loading, setLoading] = useState(false);
    const [fetchingMerchant, setFetchingMerchant] = useState(isAlcohol);
    const [storeOpen, setStoreOpen] = useState(true);
    const [nextDayOpen, setNextDayOpen] = useState(null);

    useEffect(() => {
      async function fetchMerchant() {
        try {
          const resp = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/market/merchants/${product.MerchantId}`
          );
          let today = moment().format("dddd").toLowerCase();
          if (!("pickupDays" in resp.data.info)) {
            setStoreOpen(false);
          } else {
            if (resp.data.info["pickupDays"][today]["closed"]) {
              setStoreOpen(false);
              let count = 0;
              for (let i = daysOfWeek.indexOf(today); count < 7; ++i) {
                if (!resp.data.info["pickupDays"][daysOfWeek[i]]["closed"]) {
                  setNextDayOpen(daysOfWeek[i]);
                  break;
                }
                count++;
                if (i == 6) i = -1;
              }
            }
          }
          setFetchingMerchant(false);
        } catch (err) {
          console.log(err);
        }
      }
      if (isAlcohol) fetchMerchant();
    }, []);

    let displayCartButtons = true;
    if (isAlcohol && !storeOpen) displayCartButtons = false;
    let s = {};
    if (product.options) {
      for (let k = 0; k < product.options.length; ++k) {
        s["option_" + product.options[k].id] = product.options[k].values[0];
      }
    }
    const [selectedOptions, setSelectedOptions] = useState({ ...s });
    const [qty, setQty] = useState(1);
    let visiblePrice = product.price;
    let inventory = product.stock;
    if (product.stockUnlimited) {
      inventory = Number.MAX_VALUE;
    }
    if (selectedVariant != null) {
      visiblePrice = product.variants[selectedVariant].price;
      inventory = product.variants[selectedVariant]["stockUnlimited"]
        ? Number.MAX_VALUE
        : product.variants[selectedVariant].stock;
    }
    if (visiblePrice < 1) visiblePrice = product.price;
    visiblePrice = roundToTwo(visiblePrice);
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
        <Link href={`/vendors/${product.MerchantId}`}>
          <p className="cursor-pointer text-black text-xl my-2">
            by {product.storename}
          </p>
        </Link>
        {isAlcohol ? (
          <p className="text-gray-600 text-xl my-2">
            Must be 19+ and not intoxicated to order.
          </p>
        ) : null}
        {fetchingMerchant ? (
          <div className="w-full text-center py-6">
            <Loader className="inline" active size="medium" />
          </div>
        ) : displayCartButtons ? (
          <div className="my-6 mx-auto">
            {options != null ? <div className="">{options}</div> : null}
            {inventory >= qty ? (
              <>
                <div className="flex justify-between w-150 mx-auto my-2">
                  <>
                    <button
                      className="btn-no-size-color bg-green-900 p-2 px-5"
                      onClick={() => setQty(Math.max(1, qty - 1))}
                    >
                      -
                    </button>
                    <span className="leading-loose mx-3 text-2xl">{qty}</span>
                    <button
                      disabled={qty + 1 > inventory}
                      className={`btn-no-size-color bg-green-900 p-2 px-4 ${
                        qty + 1 > inventory
                          ? "bg-gray-300 cursor-not-allowed"
                          : "bg-green-900"
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
                </div>
                <div className="w-full text-center">
                  <button
                    className="btn-no-size-color py-4 px-5 bg-green-900 my-2"
                    onClick={async () => {
                      setLoading(true);
                      setTimeout(() => {
                        setLoading(false);
                      }, 400);
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
                      add_to_cart_event(
                        {
                          ...product,
                          chosenVariant:
                            selectedVariant != null
                              ? product.variants[selectedVariant]
                              : null,
                        },
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
              </>
            ) : (
              <p className="text-red-500 text-center">Sold Out</p>
            )}
          </div>
        ) : (
          <p className="text-red-500 my-3">
            {product.storename} is closed today.{" "}
            {nextDayOpen != null
              ? "Please come back " + nextDayOpen + "."
              : null}
          </p>
        )}
        {product.html_description ? (
          <div
            dangerouslySetInnerHTML={{
              __html: product.description,
            }}
          ></div>
        ) : (
          <p className="whitespace-pre-wrap pb-6">{product.description}</p>
        )}
      </div>
    );
  }
);

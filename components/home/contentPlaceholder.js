import { memo, useState } from "react";
import { checkMerchant } from "../../store/helpers";

export const ContentPlaceholder = memo(({ product, addToCart, cartData }) => {
  let isMerchant = checkMerchant();

  const [qty, setQty] = useState(1);
  let inventory = product.variants ? product.variants[0].inventory_quantity : 1;
  return (
    <div className="content-container">
      <p className="text-3xl flex justify-between">
        <span>{product.title}</span>
        <span className="w-150 text-center">
          ${product.variants ? product.variants[0].price : product.price}
        </span>
      </p>
      {!isMerchant ? (
        <div className="my-6 flex flex-wrap mx-auto justify-center">
          <div className="flex justify-between w-150 mr-5">
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
            className="standard-btn"
            onClick={() => {
              let title = product.title;
              if (
                product.variants[0].title &&
                product.variants[0].title != "Default Title"
              ) {
                title = product.variants[0].title;
              }
              addToCart(
                { ...product, ...product.variants[0], title: title },
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

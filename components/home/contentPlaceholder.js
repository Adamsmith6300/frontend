import { memo, useState } from "react";

// import { motion, useInvertedScale } from "framer-motion";

export const ContentPlaceholder = memo(({ product, addToCart, cartData }) => {
  const [qty, setQty] = useState(1);
  return (
    <div className="content-container">
      <p className="text-3xl flex justify-between">
        <span>{product.title}</span>
        <span className="w-150 text-center">${product.price}</span>
      </p>
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
                Math.min(
                  product.stock ? Number.MAX_VALUE : product.stock,
                  qty + 1
                )
              )
            }
          >
            +
          </button>
        </div>
        <button
          className="standard-btn"
          onClick={() => addToCart(product, cartData, qty)}
        >
          Add to Cart
        </button>
      </div>
      <p>{product.description}</p>
    </div>
  );
});

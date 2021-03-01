import { Button } from "semantic-ui-react";
import { motion } from "framer-motion";
import CartSummary from "./cartSummary";

const variants = {
  open: {
    x: 10,
    transition: {
      x: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    x: 350,
    transition: {
      x: { stiffness: 1000, velocity: -100 },
    },
  },
};

const index = ({ toggle, cartData, addToCart, removeFromCart }) => {
  const items = Object.entries(cartData.items).map((entry, index) => {
    let item = entry[1];
    let mainImageUrl =
      item.source == "loma"
        ? `${process.env.NEXT_PUBLIC_MERCHANT_IMAGE_URL}/${
            item.MerchantId
          }/products/${item.ProductId}/${item.images[item.mainImage || 0]}`
        : item.images[item.mainImage || 0];

    return (
      <div key={entry[0]} className="flex justify-start w-full my-3">
        <div className="w-1/3 overflow-x-hidden mr-4 flex justify-center">
          <img src={mainImageUrl} className="h-100" />
        </div>
        <div className="w-2/3 text-left">
          <p className="text-lg">
            {item.title.length > 70
              ? item.title.substring(0, 67) + "..."
              : item.title}
          </p>
          <p className="text-base text-grey-300 mb-1">${item.price}</p>
          <button
            className="btn-no-size p-2 px-5"
            onClick={() => removeFromCart(item, cartData, 1)}
          >
            -
          </button>
          <span className="p-2 px-4">{item.qty}</span>
          <button
            className="btn-no-size p-2 px-4"
            onClick={() => addToCart(item, cartData, 1)}
          >
            +
          </button>
          <button
            className="ml-4 text-red-500"
            onClick={() => removeFromCart(item, cartData, item.qty)}
          >
            remove
          </button>
        </div>
      </div>
    );
  });
  return (
    <motion.div
      variants={variants}
      className="w-full h-full px-4 front absolute"
    >
      <p className="flex justify-end">
        <span
          onClick={toggle}
          className="cursor-pointer px-8 p-4 text-2xl font-bold"
        >
          CLOSE
        </span>
      </p>
      {items.length > 0 ? (
        <>
          <div className="w-full h-400 overflow-y-auto text-center">
            {items}
          </div>
          <CartSummary cartData={cartData} toggle={toggle} />
        </>
      ) : (
        <p className="mt-12 text-xl font-bold text-center">
          Your cart is empty!
        </p>
      )}
    </motion.div>
  );
};

export default index;

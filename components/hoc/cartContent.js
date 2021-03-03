import { Button } from "semantic-ui-react";
import { motion } from "framer-motion";
import CartSummary from "./cartSummary";
import CartItems from "./cartItems";

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
      {Object.entries(cartData.items).length > 0 ? (
        <>
          <div className="w-full h-400 overflow-y-auto text-center">
            <CartItems
              cartData={cartData}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
            />
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

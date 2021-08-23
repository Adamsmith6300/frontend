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
      className="w-full h-full pl-2 pr-12 pt-8 front absolute md:pr-6 md:pt-0"
    >
      <p className="flex justify-end">
        {/* <span
          onClick={toggle}
          className="cursor-pointer px-8 p-4 text-2xl font-bold"
        >
          CLOSE
        </span> */}
        <button
          className="cursor-pointer py-4 text-2xl font-bold"
          onClick={toggle}
        >
          <svg width="23" height="23" viewBox="0 0 23 23">
            <path
              // variants={{
              //   closed: { d: "M 2 2.5 L 50 2.5" },
              //   open: { d: "M 3 16.5 L 17 2.5" },
              // }}
              d="M 3 16.5 L 17 2.5"
              fill="transparent"
              strokeWidth="2"
              stroke="hsl(0, 100%, 1%)"
              strokeLinecap="round"
            />
            <path
              // variants={{
              //   closed: { d: "M 2 16.346 L 50 16.346" },
              //   open: { d: "M 3 2.5 L 17 16.346" },
              // }}
              d="M 3 2.5 L 17 16.346"
              fill="transparent"
              strokeWidth="2"
              stroke="hsl(0, 100%, 1%)"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </p>
      {Object.entries(cartData.items).length > 0 ? (
        <>
          <div className="w-full h-70vh overflow-y-auto text-center">
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

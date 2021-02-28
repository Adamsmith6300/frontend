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
    let mainImageUrl = `${process.env.NEXT_PUBLIC_MERCHANT_IMAGE_URL}/${
      item.MerchantId
    }/products/${item.ProductId}/${item.images[item.mainImage]}`;

    return (
      <div key={entry[0]} className="flex justify-center">
        <img src={mainImageUrl} className="h-16 mr-4" />
        <div>
          <p>{item.title}</p>
          <p>${item.price}</p>
          <Button
            className="text-black"
            onClick={() => removeFromCart(item, cartData, 1)}
          >
            -
          </Button>
          <span>{item.qty}</span>
          <Button
            className="text-black"
            onClick={() => addToCart(item, cartData, 1)}
          >
            +
          </Button>
          <Button
            className=""
            color="red"
            onClick={() => removeFromCart(item, cartData, item.qty)}
          >
            remove
          </Button>
        </div>
      </div>
    );
  });
  return (
    <motion.div
      variants={variants}
      className="w-full h-full cartContent front absolute"
    >
      <p className="flex justify-end">
        <span
          onClick={toggle}
          className="cursor-pointer px-8 p-4 text-2xl font-bold"
        >
          CLOSE
        </span>
      </p>
      {/* <h2 className="text-3xl font-bolder text-center">CART</h2> */}
      {items.length > 0 ? (
        <>
          <div className="w-1/3 sm:w-4/5 text-center mx-auto">{items}</div>
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

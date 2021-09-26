import { useRef } from "react";
import { motion, useCycle } from "framer-motion";
import { useDimensions } from "../../utils/use-dimensions";
import { CartMenuToggle } from "./cartMenuToggle";
import CartContent from "./cartContent";

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(3200px at 80px 80px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(30px at 210px 80px)",
    transition: {
      delay: 0.2,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

const Cart = ({
  toggleCart,
  showCart,
  cartData,
  addToCart,
  removeFromCart,
}) => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const cartContainerRef = useRef(null);
  const { height } = useDimensions(cartContainerRef);
  let itemCount = 0;
  for (let i = 0; i < Object.entries(cartData.items).length; ++i) {
    itemCount += Object.entries(cartData.items)[i][1].qty;
  }
  console.log(cartData);
  return (
    <motion.nav
      initial={false}
      animate={isOpen ? "open" : "closed"}
      custom={height}
      ref={cartContainerRef}
      variants={sidebar}
      className={`cart-nav ${isOpen ? "front" : ""}`}
    >
      <motion.div
        className={`cart-background ${isOpen ? "front" : ""}`}
        variants={sidebar}
      />
      <CartContent
        toggle={() => toggleOpen()}
        cartData={cartData}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
      />
      <CartMenuToggle
        itemCount={itemCount}
        toggle={() => toggleOpen()}
        isOpen={isOpen}
      />
    </motion.nav>
  );
};
export default Cart;

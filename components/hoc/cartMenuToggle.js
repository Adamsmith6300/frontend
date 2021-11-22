import { motion } from "framer-motion";
import { AiOutlineShoppingCart } from "react-icons/ai";

const variants = {
  open: {
    opacity: 0,
    // transition: {
    //   y: { stiffness: 1000, velocity: -100 },
    // },
  },
  closed: {
    opacity: 1,
    // transition: {
    //   y: { stiffness: 1000 },
    // },
  },
};

export const CartMenuToggle = ({ toggle, isOpen, itemCount }) => (
  <motion.button
    className={`cart-menu-toggle-btn ${isOpen ? "" : ""}`}
    onClick={toggle}
    variants={variants}
  >
    <span className="text-green-900 text-3xl">
      <span className="text-sm cart-item-count">
        {itemCount > 9 ? "9+" : itemCount}
      </span>
      <AiOutlineShoppingCart className="inline cursor-pointer" />
    </span>
  </motion.button>
);

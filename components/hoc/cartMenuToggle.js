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

export const CartMenuToggle = ({ toggle, isOpen }) => (
  <motion.button
    className={`cart-menu-toggle-btn ${isOpen ? "" : ""}`}
    onClick={toggle}
    variants={variants}
  >
    <span className="text-black text-3xl">
      <AiOutlineShoppingCart className="inline cursor-pointer" />
    </span>
    {/* <svg width="23" height="23" viewBox="0 0 23 23">
      <Path
        variants={{
          closed: { d: "M 2 2.5 L 50 2.5" },
          open: { d: "M 3 16.5 L 17 2.5" },
        }}
      />
      <Path
        d="M 2 9.423 L 50 9.423"
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 },
        }}
        transition={{ duration: 0.1 }}
      />
      <Path
        variants={{
          closed: { d: "M 2 16.346 L 50 16.346" },
          open: { d: "M 3 2.5 L 17 16.346" },
        }}
      />
    </svg> */}
  </motion.button>
);

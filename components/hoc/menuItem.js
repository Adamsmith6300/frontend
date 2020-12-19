import { motion } from "framer-motion";
import Link from "next/link";

export const menuItemVariants = {
  open: {
    y: 0,
    opacity: 1,
    // height: "auto",
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    // height: "0",
    transition: {
      y: { stiffness: 1000 },
      // delay: 0.5,
    },
  },
};

export const MenuItem = ({ item, isOpen }) => {
  if (item.link != undefined) {
    return (
      <Link href={item.link}>
        <motion.li
          variants={menuItemVariants}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-placeholder">
            <p>{item.title}</p>
          </div>
        </motion.li>
      </Link>
    );
  } else {
    return (
      <motion.li
        onClick={item.action}
        variants={menuItemVariants}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.3 }}
      >
        <div className="text-placeholder">
          <p>{item.title}</p>
        </div>
      </motion.li>
    );
  }
};

import { motion } from "framer-motion";
import Link from "next/link";

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

export const MenuItem = ({ item }) => {
  if (item.link != undefined) {
    return (
      <Link href={item.link}>
        <motion.li
          variants={variants}
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
        variants={variants}
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

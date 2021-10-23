import { motion } from "framer-motion";
import { useState } from "react";
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

export const MenuItem = ({ item, isOpen, asPath }) => {
  const [expand, setExpand] = useState(false);
  const activeLink = asPath == item.link;
  let textStyle = activeLink ? "text-black" : "text-gray-600";
  textStyle += " h-12 w-full uppercase hover:text-black";

  if (item.categories) {
    let subCatStyle = "my-5 hover:text-black ";
    let cats = item.categories.map((cat, index) => {
      let link = `/${item.title}?category=${cat.CategoryIndex}`;
      if (cat.CategoryIndex == -1) link = `/${item.title}`;
      let catStyle = subCatStyle;
      catStyle += asPath == link ? "text-black" : "text-gray-600";
      return (
        <Link key={index} href={link} passHref>
          <motion.li
            className={catStyle}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            {cat.name}
          </motion.li>
        </Link>
      );
    });
    return (
      <motion.li
        onClick={() => setExpand(!expand)}
        variants={menuItemVariants}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.3 }}
      >
        <div className={`uppercase w-full min-h-40 ${expand ? "py-3" : ""}`}>
          <p
            className={`${
              asPath.includes(item.title) ? "text-black" : "text-gray-600"
            } w-full uppercase hover:text-black`}
          >
            {item.title}
          </p>
          {expand ? (
            <ul className="pl-2 pb-3">
              <Link href={`/${item.title}`} passHref>
                <motion.li
                  key={item.title}
                  className={`
                  ${subCatStyle} ${
                    activeLink ? "text-black" : "text-gray-600"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  All {item.title}
                </motion.li>
              </Link>
              {cats}
            </ul>
          ) : null}
        </div>
      </motion.li>
    );
  }

  if (item.link != undefined) {
    return (
      <Link href={item.link} passHref>
        <motion.li
          variants={menuItemVariants}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.3 }}
        >
          <div>
            <p className={textStyle}>{item.title}</p>
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
        <div>
          <p className={textStyle}>{item.title}</p>
        </div>
      </motion.li>
    );
  }
};

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { logoutSession, isLoggedIn, checkMerchant } from "../../store/helpers";
import { MenuItem, menuItemVariants } from "./menuItem";

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

export const Navigation = ({ isOpen }) => {
  const router = useRouter();

  const [isMerchant, updateIsMerchant] = useState(false);
  const [loggedIn, updateLoggedIn] = useState(false);

  useEffect(() => {
    updateLoggedIn(isLoggedIn());
    updateIsMerchant(checkMerchant());
  }, []);

  let navItems = [];

  if (loggedIn) {
    navItems.unshift({ title: "my account", link: "/my-account" });
    // navItems.push({
    //   title: "logout",
    //   action: () => {
    //     logoutSession();
    //     clearFlag("successfulLogin");
    //     router.push("/");
    //   },
    // });
  } else {
    navItems.unshift({ title: "signup", link: "/signup" });
    navItems.unshift({ title: "login", link: "/login" });
  }
  if (isMerchant && loggedIn) {
    navItems.unshift({ title: "my shop", link: "/my-shop" });
  }

  navItems = [
    { title: "merchants", link: "/" },
    { title: "categories", link: "/categories" },
    { title: "products", link: "/products" },
    { title: "contact", link: "/contact" },
    ...navItems,
  ];

  return (
    <motion.ul
      className={`side-menu-list ${isOpen ? "" : "w-0"}`}
      variants={variants}
    >
      {navItems.map((item, index) => (
        <MenuItem item={item} key={index} isOpen={isOpen} />
      ))}
    </motion.ul>
  );
};

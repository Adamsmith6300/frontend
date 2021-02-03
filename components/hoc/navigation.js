import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { logoutSession, isLoggedIn, checkMerchant } from "../../store/helpers";
import { MenuItem, menuItemVariants } from "./menuItem";

const variants = {
  open: {
    x: 10,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.2,
    },
  },
  closed: {
    x: 300,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
      when: "afterChildren",
    },
  },
};

export const Navigation = ({ isOpen, clearFlag }) => {
  const router = useRouter();

  const [isMerchant, updateIsMerchant] = useState(false);
  const [loggedIn, updateLoggedIn] = useState(false);

  useEffect(() => {
    updateLoggedIn(isLoggedIn());
    updateIsMerchant(checkMerchant());
  }, []);

  let navItems = [];
  let secondaryNavItems = [];

  if (loggedIn) {
    secondaryNavItems.unshift({
      title: "my account",
      link: "/my-account",
      linkStyle: "secondary",
    });
    secondaryNavItems.push({
      title: "logout",
      action: () => {
        logoutSession();
        clearFlag("successfulLogin");
        router.push("/");
      },
      linkStyle: "secondary",
    });
  } else {
    secondaryNavItems.unshift({
      title: "signup",
      link: "/signup",
      linkStyle: "secondary",
    });
    secondaryNavItems.unshift({
      title: "login",
      link: "/login",
      linkStyle: "secondary",
    });
  }
  if (isMerchant && loggedIn) {
    secondaryNavItems.unshift({
      title: "my shop",
      link: "/my-shop",
      linkStyle: "secondary",
    });
  }

  navItems = [
    { title: "home", link: "/", linkStyle: "primary" },
    { title: "merchants", link: "/merchants", linkStyle: "primary" },
    { title: "products", link: "/products", linkStyle: "primary" },
    { title: "about", link: "/about", linkStyle: "primary" },
  ];

  secondaryNavItems.push({
    title: "contact",
    link: "/contact",
    linkStyle: "secondary",
  });

  return (
    <motion.ul
      className={`side-menu-list ${isOpen ? "front" : ""}`}
      variants={variants}
    >
      {navItems.map((item, index) => (
        <MenuItem item={item} key={index} isOpen={isOpen} />
      ))}
      <hr className="mt-12 mb-6 hr--menu" />
      {secondaryNavItems.map((item, index) => (
        <MenuItem item={item} key={index} isOpen={isOpen} />
      ))}
    </motion.ul>
  );
};

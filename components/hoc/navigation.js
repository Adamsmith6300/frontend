import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { isLoggedIn, checkMerchant } from "../../store/helpers";
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

export const Navigation = ({
  isOpen,
  clearFlag,
  categories,
  logoutPerson,
  isGuest,
}) => {
  const router = useRouter();

  ////////////////// PASS THIS DOWN FROM LAYOUT ////////////////////
  const [isMerchant, updateIsMerchant] = useState(false);
  const [loggedIn, updateLoggedIn] = useState(false);
  useEffect(() => {
    updateLoggedIn(isLoggedIn());
    updateIsMerchant(checkMerchant());
  }, []);
  //////////////////////////////////////////////////////////////////
  let navItems = [];
  let secondaryNavItems = [];
  let homeLink = "/";

  if (loggedIn) {
    homeLink = "/marketplace";
    if (!isGuest) {
      secondaryNavItems.unshift({
        title: "my account",
        link: "/my-account",
        linkStyle: "secondary",
      });
    }
    secondaryNavItems.push({
      title: "logout",
      action: () => {
        logoutPerson();
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
      title: "my store",
      link: "/my-store",
      linkStyle: "secondary",
    });
  }

  navItems = [
    { title: "home", link: homeLink, linkStyle: "primary" },
    { title: "vendors", link: "/vendors", linkStyle: "primary" },
    {
      title: "products",
      link: "/products",
      linkStyle: "primary",
      categories: categories,
    },
    { title: "about", link: "/about", linkStyle: "primary" },
    { title: "how it works", link: "/how-it-works", linkStyle: "primary" },
  ];
  if (!isMerchant && !isGuest) {
    navItems.push({
      title: "become a vendor",
      link: "/become-a-vendor",
      linkStyle: "primary",
    });
  }

  return (
    <motion.ul
      className={`side-menu-list ${isOpen ? "front" : ""}`}
      variants={variants}
    >
      {navItems.map((item, index) => (
        <MenuItem
          item={item}
          key={index}
          isOpen={isOpen}
          asPath={router.asPath}
        />
      ))}
      <hr className="mt-12 mb-6 hr--menu" />
      {secondaryNavItems.map((item, index) => (
        <MenuItem
          item={item}
          key={index}
          isOpen={isOpen}
          asPath={router.asPath}
        />
      ))}
    </motion.ul>
  );
};

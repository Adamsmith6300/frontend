import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { logoutSession, isLoggedIn, checkMerchant } from "../../store/helpers";

const nav = ({ toggleCart, showCart, clearFlag }) => {
  const router = useRouter();

  const [isMerchant, updateIsMerchant] = useState(false);
  const [loggedIn, updateLoggedIn] = useState(false);

  useEffect(() => {
    updateLoggedIn(isLoggedIn());
    updateIsMerchant(checkMerchant());
  }, []);

  let navItems = [{ title: "cart", action: () => toggleCart(!showCart) }];

  if (loggedIn) {
    navItems.unshift({ title: "my account", link: "/my-account" });
    navItems.push({
      title: "logout",
      action: () => {
        logoutSession();
        clearFlag("successfulLogin");
        router.push("/");
      },
    });
  } else {
    navItems.unshift({ title: "signup", link: "/signup" });
    navItems.unshift({ title: "login", link: "/login" });
  }
  if (isMerchant && loggedIn) {
    navItems.unshift({ title: "my shop", link: "/my-shop" });
  }

  navItems = [
    { title: "home", link: "/" },
    { title: "categories", link: "/categories" },
    { title: "products", link: "/products" },
    ...navItems,
  ];
  navItems = navItems.map((item, index) => {
    if (item.link != undefined) {
      return (
        <Link href={item.link} key={index}>
          <span className="cursor-pointer px-4 mx-3 py-4 shadow-md text-gray-600 hover:text-gray-800">
            {item.title}
          </span>
        </Link>
      );
    } else {
      return (
        <span
          key={index}
          onClick={item.action}
          className="cursor-pointer px-4 mx-3 py-4 shadow-md text-gray-600 hover:text-gray-800"
        >
          {item.title}
        </span>
      );
    }
  });

  return (
    <div className="">
      <div className="flex justify-end">{navItems}</div>
    </div>
  );
};

export default nav;

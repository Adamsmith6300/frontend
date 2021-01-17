import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Head from "next/head";
import Link from "next/link";
import { Button } from "semantic-ui-react";
import actions from "../../store/actions";
import { SideMenu } from "./sideMenu";

import { logoutSession, isLoggedIn, checkMerchant } from "../../store/helpers";

import Nav from "./nav";
import Cart from "./cart";

const Layout = ({
  children,
  toggleCart,
  showCart,
  cartData,
  addToCart,
  removeFromCart,
  setCart,
  clearFlag,
}) => {
  const [isMerchant, updateIsMerchant] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);
  // const [isAuthed, setIsAuthed] = useState(null);

  useEffect(() => {
    const cartString = localStorage.getItem("cart");
    if (cartString != undefined) {
      const cart = JSON.parse(cartString);
      setCart(cart);
    }
    updateIsMerchant(checkMerchant());
    setIsAuthed(isLoggedIn());
  }, []);

  return (
    <div className="container">
      <Head>
        <title>Loma</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://db.onlinewebfonts.com/c/9550467e9991316a81acde7241010891?family=TeeFranklinW01-Light"
          rel="stylesheet"
          type="text/css"
        />
      </Head>
      <h1 className="h-16 w-full loma-padding absolute top-0 left-0 font-bold uppercase text-black text-5xl">
        Loma
      </h1>
      <SideMenu clearFlag={clearFlag} />
      <Cart
        toggleCart={toggleCart}
        showCart={showCart}
        cartData={cartData}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
      />
      {children}
      {/* {!isMerchant && isAuthed ? (
        <div className="w-full bottom-0 left-0 relative py-12">
          <ul className="flex justify-center">
            <li className="text-xl">
              <Link href="/merchant-application">
                <Button color="black">Become a Merchant</Button>
              </Link>
            </li>
          </ul>
        </div>
      ) : null} */}
      <div className="text-transparent text-xxs w-3 h-3 absolute bottom-0">
        Font made from{" "}
        <a href="http://www.onlinewebfonts.com">oNline Web Fonts</a>is licensed
        by CC BY 3.0
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleCart: (showCart) => dispatch(actions.toggleCart(showCart)),
    addToCart: (product, oldCart) =>
      dispatch(actions.addToCart(product, oldCart)),
    removeFromCart: (product, oldcart, qty) =>
      dispatch(actions.removeFromCart(product, oldcart, qty)),
    setCart: (cart) => dispatch(actions.setCart(cart)),
    clearFlag: (flag) => dispatch(actions.clearFlag(flag)),
  };
};

export default connect((state) => state, mapDispatchToProps)(Layout);

import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import actions from "../../store/actions";
import { SideMenu } from "./sideMenu";
import { logoutSession, isLoggedIn, checkMerchant } from "../../store/helpers";
import Cart from "./cart";
import Footer from "./footer";

const Layout = ({
  children,
  toggleCart,
  showCart,
  cartData,
  addToCart,
  removeFromCart,
  setCart,
  clearFlag,
  getCategories,
  categories,
}) => {
  const [isMerchant, updateIsMerchant] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    const cartString = localStorage.getItem("cart");
    if (cartString != undefined) {
      const cart = JSON.parse(cartString);
      setCart(cart);
    }
    updateIsMerchant(checkMerchant());
    setIsAuthed(isLoggedIn());
    if (categories == null) {
      getCategories();
    }
  }, []);

  return (
    <div className="loma-container">
      <Head>
        <title>Loma</title>
        <link rel="icon" href="/favicon.png" />
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
      <Link href={isAuthed ? "/marketplace" : "/"}>
        <img
          src="/loma.png"
          className="h-16 absolute loma-logo cursor-pointer"
        />
      </Link>
      <SideMenu categories={categories} clearFlag={clearFlag} />
      {!isMerchant ? (
        <Cart
          toggleCart={toggleCart}
          showCart={showCart}
          cartData={cartData}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      ) : null}
      {children}
      <Footer isAuthed={isAuthed} />
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
    addToCart: (product, oldCart, qty = 1) =>
      dispatch(actions.addToCart(product, oldCart, qty)),
    removeFromCart: (product, oldcart, qty) =>
      dispatch(actions.removeFromCart(product, oldcart, qty)),
    setCart: (cart) => dispatch(actions.setCart(cart)),
    clearFlag: (flag) => dispatch(actions.clearFlag(flag)),
    getCategories: () => dispatch(actions.getCategories()),
  };
};

export default connect(
  (state) => state,
  mapDispatchToProps
)(withRouter(Layout));

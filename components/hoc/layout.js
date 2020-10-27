import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Head from "next/head";
import Link from "next/link";
import { Button } from "semantic-ui-react";
import actions from "../../store/actions";

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

  //use effect-->get cart from local storage
  useEffect(() => {
    const cartString = localStorage.getItem("cart");
    if (cartString != undefined) {
      const cart = JSON.parse(cartString);
      setCart(cart);
    }
    updateIsMerchant(checkMerchant());
  }, []);

  return (
    <div className="ui container">
      <Head>
        <title>LOMA</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav toggleCart={toggleCart} showCart={showCart} clearFlag={clearFlag} />
      {children}
      {!isMerchant ? (
        <div className="w-full bottom-0 left-0 absolute py-12">
          <ul className="flex justify-center">
            <li className="text-xl">
              <Link href="/merchant-application">
                <Button color="black">Become a Merchant</Button>
              </Link>
            </li>
          </ul>
        </div>
      ) : null}
      {showCart ? (
        <Cart
          toggleCart={toggleCart}
          showCart={showCart}
          cartData={cartData}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      ) : null}
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

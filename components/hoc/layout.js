import React, { useEffect } from "react";
import { connect } from "react-redux";
import Head from "next/head";
import actions from "../../store/actions";

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
}) => {
  //use effect-->get cart from local storage
  useEffect(() => {
    const cartString = localStorage.getItem("cart");
    if (cartString != undefined) {
      const cart = JSON.parse(cartString);
      setCart(cart);
    }
  }, []);

  return (
    <div className="ui container">
      <Head>
        <title>LOMA</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav toggleCart={toggleCart} showCart={showCart} />
      {children}
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
  };
};

export default connect((state) => state, mapDispatchToProps)(Layout);

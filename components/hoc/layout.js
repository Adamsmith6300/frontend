import React, { Component } from "react";
import Head from "next/head";
import Nav from "./nav";
import Cart from "./cart";

const Layout = ({
  children,
  toggleCart,
  showCart,
  cartData,
  addToCart,
  removeFromCart,
}) => {
  //use effect-->get cart from local storage

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

export default Layout;

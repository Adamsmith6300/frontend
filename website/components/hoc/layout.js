//lib
import React, { Component } from "react";
import Head from "next/head";

import Nav from "../nav";

class Layout extends Component {
  render() {
    return (
      <div className="ui container">
        <Head>
          <title>LOMA</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Nav />
        {this.props.children}
      </div>
    );
  }
}

export default Layout;

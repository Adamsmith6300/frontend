import React from "react";
import App from "next/app";
import Router from "next/router";
import { wrapper } from "../store";
import "semantic-ui-css/semantic.min.css";
import "../styles/tailwindplus.css";
import "../styles/index.css";
import "../styles/sideMenu.css";
import "../styles/responsive.css";
import * as gtag from "../utils/gtag";

// Notice how we track pageview when route is changed
Router.events.on("routeChangeComplete", (url) => gtag.pageview(url));

class MyApp extends App {
  getStaticProps = async ({ Component, ctx }) => {
    return {
      pageProps: {
        ...(Component.getStaticProps ? await Component.getStaticProps() : {}),
        pathname: ctx.pathname,
      },
    };
  };

  render() {
    const { Component, pageProps } = this.props;
    return <Component {...pageProps} />;
  }
}

export default wrapper.withRedux(MyApp);

import React from "react";
import App from "next/app";
import "semantic-ui-css/semantic.min.css";
import { wrapper } from "../store";
import "../styles/index.css";
import "../styles/sideMenu.css";
import "../styles/responsive.css";

class MyApp extends App {
  getStaticProps = async ({ Component, ctx }) => {
    // ctx.store.dispatch({ type: "TOE", payload: "was set in _app" });
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

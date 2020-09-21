import React from "react";
import App from "next/app";
import "semantic-ui-css/semantic.min.css";
import { wrapper } from "../store";
import "../styles/index.css";

class MyApp extends App {
  getInitialProps = async ({ Component, ctx }) => {
    // ctx.store.dispatch({ type: "TOE", payload: "was set in _app" });

    return {
      pageProps: {
        // Call page-level getInitialProps
        ...(Component.getInitialProps
          ? await Component.getInitialProps(ctx)
          : {}),
        // Some custom thing for all pages
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

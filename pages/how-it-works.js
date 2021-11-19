import { useState } from "react";
import Layout from "../components/hoc/layout";
import { connect } from "react-redux";
import Head from "next/head";

const Page = ({}) => {
  return (
    <Layout>
      <Head>
        <title>How It Works - Loma</title>
      </Head>
      <div className="my-account-container">
        <>
          <h3 className="text-3xl">How It Works</h3>
        </>
      </div>
    </Layout>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect((state) => state, mapDispatchToProps)(Page);

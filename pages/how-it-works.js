import { useState } from "react";
import Layout from "../components/hoc/layout";
import { connect } from "react-redux";
import Head from "next/head";
import Banner from "../components/home/banner";

const Page = ({}) => {
  return (
    <Layout>
      <Head>
        <title>How It Works - Loma</title>
      </Head>
      <Banner bgSrc={"/passion.jpg"} empty />
      <div className="text-center mt-12 mb-24 px-8 md:px-20">
        <div className="flex flex-wrap justify-center max-w-1040 mx-auto py-12">
          <div className="text-left w-full md:w-1/2 max-w-700">
            <h2>How It Works</h2>
            <p className="my-6">
              1. Place an order from one or more vendors. We charge $7 for
              delivery, plus a 5% service charge on your subtotal (to cover
              processing fees). No minimum order size.
            </p>
            <p className="my-6">
              2. Our drivers pick-up and deliver your order to your door, always
              in hybrid/electric vehicles (1-2 days).
            </p>
            <p className="my-6">
              3. Our vendors are paid for their items, receiving 100% of the
              cost.
            </p>
          </div>
          <div className="w-full md:w-1/2 grid place-content-center mt-16 md:mt-0">
            <img className="h-200" src="/how-it-works.png" />
          </div>
        </div>
      </div>
    </Layout>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect((state) => state, mapDispatchToProps)(Page);

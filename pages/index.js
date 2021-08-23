import Layout from "../components/hoc/layout";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "next/router";
import { checkMerchant, isLoggedIn } from "../store/helpers";
import actions from "../store/actions";
import Banner from "../components/home/banner";
import OffsetBanner from "../components/home/offsetBanner";
import ProductSection from "../components/home/productSection";
import MerchantSection from "../components/home/merchantSection";
import SmallAboutSection from "../components/home/smallAboutSection";
import Head from "next/head";

const Page = ({ addToCart, cartData, router, clearFlag }) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loggedIn = isLoggedIn();
    const merchant = checkMerchant();
    if (loggedIn) {
      if (merchant) {
        router.push("/my-store");
        clearFlag("successfulLogin");
      } else {
        router.push("/marketplace");
        clearFlag("successfulLogin");
      }
    }
    setLoading(false);
  }, []);
  return (
    <Layout>
      <Head>
        <title>Home - Loma</title>
      </Head>
      <OffsetBanner
        bgSrc={"/firstBanner.jpg"}
        heading={"Shop Local With Loma"}
        content={
          "Based out of Vancouver BC, Loma is an online marketplace for local vendors. Pick and choose a variety of items from different vendors and have your order delivered to your door for one delivery fee."
        }
        link={"/signup"}
        left
      />
      <ProductSection
        heading={"Featured Products"}
        link={"/products"}
        addToCart={addToCart}
        cartData={cartData}
      />
      <SmallAboutSection />
      <MerchantSection heading={"Featured Vendors"} link={"/vendors"} />
      <Banner
        bgSrc={"/secondBanner.jpg"}
        heading={"A Sustainable Solution"}
        content={
          "Shopping local helps reduce emmissions! At Loma we prioritize ethical and sustainably conscious businesses. We only deliver with hybrid or electric vehicles, and all our packaging is biodegradable."
        }
        link={"/signup"}
      />
      <ProductSection
        heading={"Jewellery + Accessories"}
        category={1}
        link={"/products?category=1"}
        addToCart={addToCart}
        cartData={cartData}
      />
      <ProductSection
        heading={"Home + Living"}
        category={2}
        link={"/products?category=2"}
        addToCart={addToCart}
        cartData={cartData}
      />
    </Layout>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMerchants: () => dispatch(actions.getMerchants()),
    addToCart: (product, oldCart, qty) =>
      dispatch(actions.addToCart(product, oldCart, qty)),
    clearFlag: (flag) => dispatch(actions.clearFlag(flag)),
  };
};

export default connect((state) => state, mapDispatchToProps)(withRouter(Page));

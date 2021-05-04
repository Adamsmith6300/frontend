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
      <OffsetBanner
        bgSrc={"/firstBanner.jpg"}
        heading={"Support Local Merchants"}
        content={
          "Based out of Vancouver BC, Loma is an online marketplace for local merchants. Pick and choose a variety of items from different merchants, then have your order delivered for one low delivery fee."
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
      <MerchantSection heading={"Featured Merchants"} link={"/merchants"} />
      <Banner
        bgSrc={"/secondBanner.jpg"}
        heading={"Started in Vancouver"}
        content={
          "Support your local businesses! Support your local businesses! Support your local businesses! Support your local businesses! Support your local businesses!"
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
      {/* <iframe
        className="w-full h-400"
        src="https://cdn.forms-content.sg-form.com/102dc890-ab88-11eb-bc4e-9a7ef5f1d536"
      /> */}
    </Layout>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMerchants: () => dispatch(actions.getMerchants()),
    addToCart: (product, oldCart, qty = 1) =>
      dispatch(actions.addToCart(product, oldCart, qty)),
    clearFlag: (flag) => dispatch(actions.clearFlag(flag)),
  };
};

export default connect((state) => state, mapDispatchToProps)(withRouter(Page));

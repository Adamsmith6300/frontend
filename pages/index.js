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
import { LargeLoader } from "../components/loaders";

const Page = ({
  addToCart,
  cartData,
  router,
  getCategories,
  categories,
  clearFlag,
}) => {
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
    if (categories == null) {
      getCategories();
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
          "Based out of Vancouver BC, Loma is a marketplace for local vendors with sustainable delivery. Pick and choose a variety of items from different vendors and have your order delivered to your door. We deliver in hybrid/electric vehicles with sustainable packaging materials!"
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
          "Shopping local helps reduce emmissions! At Loma we prioritize ethical and sustainably conscious businesses. We only deliver with hybrid or electric vehicles, and all our packaging is sustainable."
        }
        link={"/signup"}
      />
      {categories != null ? (
        categories.map((cat, index) => {
          return (
            <ProductSection
              key={cat.CategoryIndex + cat.name}
              heading={cat.name}
              category={cat.CategoryIndex}
              link={"/products?category=" + cat.CategoryIndex}
              addToCart={addToCart}
              cartData={cartData}
            />
          );
        })
      ) : (
        <LargeLoader />
      )}
    </Layout>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMerchants: () => dispatch(actions.getMerchants()),
    addToCart: (product, oldCart, qty) =>
      dispatch(actions.addToCart(product, oldCart, qty)),
    clearFlag: (flag) => dispatch(actions.clearFlag(flag)),
    getCategories: () => dispatch(actions.getCategories()),
  };
};

export default connect((state) => state, mapDispatchToProps)(withRouter(Page));

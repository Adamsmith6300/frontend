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
import MailingListSignup from "../components/mailingListSignup";

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
      <div className="py-1 hidden lg:block w-full">
        <h2 className="text-center text-3xl py-6 px-2 shadow-lg border border-1">
          Free delivery on your first order! Use code FIRSTFREE at checkout.
        </h2>
      </div>
      <OffsetBanner
        bgSrc={"/firstBanner.jpg"}
        heading={"Local Shopping, Sustainable Delivery"}
        content={
          "Loma is a Vancouver-based marketplace for local vendors with sustainable delivery. We take no fees from vendors, deliver in hybrid/electric vehicles and use sustainable packaging materials!"
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
          if (cat.product_count <= 0) return null;
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
      <div className="w-full mt-24 text-center">
        <p className="font-bold text-3xl px-6 pb-6 w-full md:w-300 mx-auto">
          Subscribe to hear about special updates from Loma!
        </p>
        <MailingListSignup />
      </div>
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

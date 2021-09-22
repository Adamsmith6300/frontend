import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "next/router";
import Link from "next/link";
import actions from "../store/actions";
import { isLoggedIn, checkMerchant } from "../store/helpers";

import Layout from "../components/hoc/layout";
import ProductSection from "../components/home/productSection";
import MerchantSection from "../components/home/merchantSection";
import SmallAboutSection from "../components/home/smallAboutSection";
import { LargeLoader } from "../components/loaders";
import Head from "next/head";

const Page = ({ addToCart, cartData, getCategories, categories, router }) => {
  const [isMerchant, updateIsMerchant] = useState(false);
  const [loggedIn, updateLoggedIn] = useState(false);

  useEffect(() => {
    const l = isLoggedIn();
    updateLoggedIn(l);
    const m = checkMerchant();
    updateIsMerchant(m);
    if (!l && !m) {
      router.push("/");
    }
    if (categories == null) {
      getCategories();
    }
  }, []);

  return (
    <Layout>
      <Head>
        <title>Marketplace - Loma</title>
      </Head>
      {/* <div className="h-500 w-500 max-w-full mx-auto pt-5 text-center">
        <h1 className="text-center text-4xl font-bold">
          Thank you for signing up!
        </h1>
        <p className="my-4">
          Our market is not open yet. Stay tuned for an email about our launch
          date.
        </p>
        {isMerchant ? (
          <>
            <p>
              If you have signed up as a vendor, you can start preparing your
              store:
            </p>
            <p className="py-5 text-center">
              <Link href="/my-store">
                <span className="btn-no-size-color px-5 py-2 bg-black cursor-pointer">
                  My Store
                </span>
              </Link>
            </p>
          </>
        ) : (
          <>
            <p>
              If you would like to become a vendor, please visit the vendor sign
              up page:
            </p>
            <p className="py-5 text-center">
              <Link href="/become-a-vendor">
                <span className="btn-no-size-color px-5 py-2 bg-black cursor-pointer">
                  Become a Vendor
                </span>
              </Link>
            </p>
          </>
        )}
      </div> */}
      <ProductSection
        heading={"Featured Products"}
        link={"/products"}
        addToCart={addToCart}
        cartData={cartData}
      />
      <MerchantSection heading={"Featured Vendors"} link={"/vendors"} />
      <SmallAboutSection />
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

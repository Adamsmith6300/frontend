import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "next/router";

import actions from "../store/actions";
import { isLoggedIn, checkMerchant } from "../store/helpers";

import Layout from "../components/hoc/layout";
import ProductSection from "../components/home/productSection";
import MerchantSection from "../components/home/merchantSection";
import { LargeLoader } from "../components/loaders";

const Page = ({
  addToCart,
  cartData,
  clearFlag,
  getCategories,
  categories,
  router,
}) => {
  const [isMerchant, updateIsMerchant] = useState(false);
  const [loggedIn, updateLoggedIn] = useState(false);

  useEffect(() => {
    let l = isLoggedIn();
    updateLoggedIn(l);
    let m = checkMerchant();
    updateIsMerchant(m);
    if (!l || !m) {
      router.push("/");
    }
    if (categories == null) {
      getCategories();
    }
  }, []);

  return (
    <Layout>
      <ProductSection
        heading={"Featured Products"}
        link={"/products"}
        addToCart={addToCart}
        cartData={cartData}
      />
      <MerchantSection heading={"Some of our Merchants"} link={"/merchants"} />
      {categories != null ? (
        categories.map((cat, index) => {
          return (
            <ProductSection
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
    addToCart: (product, oldCart, qty = 1) =>
      dispatch(actions.addToCart(product, oldCart, qty)),
    clearFlag: (flag) => dispatch(actions.clearFlag(flag)),
    getCategories: () => dispatch(actions.getCategories()),
  };
};

export default connect((state) => state, mapDispatchToProps)(withRouter(Page));

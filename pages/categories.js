import { useEffect } from "react";
import Layout from "../components/hoc/layout";
import { connect } from "react-redux";

import { withRouter } from "next/router";
import actions from "../store/actions";
import AllCategories from "../components/categories/allCategories";

const Page = ({
  getCategories,
  categories,
  addToCart,
  cartData,
  clearFlag,
  router,
}) => {
  useEffect(() => {
    getCategories();
  }, []);

  return (
    <Layout>
      <AllCategories
        categories={categories}
        addToCart={addToCart}
        cartData={cartData}
        router={router}
      />
    </Layout>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCategories: () => dispatch(actions.getCategories()),
    addToCart: (product, oldCart) =>
      dispatch(actions.addToCart(product, oldCart)),
    clearFlag: (flag) => dispatch(actions.clearFlag(flag)),
  };
};

export default connect((state) => state, mapDispatchToProps)(withRouter(Page));

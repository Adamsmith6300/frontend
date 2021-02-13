import { useEffect } from "react";
import Layout from "../components/hoc/layout";
import { connect } from "react-redux";
// import { wrapper } from "../store";
import actions from "../store/actions";
import AllMerchants from "../components/merchants/allMerchants";

const Page = ({ getMerchants, merchants, addToCart, cartData, clearFlag }) => {
  useEffect(() => {
    if (merchants == null || merchants.length == 0) {
      getMerchants();
    }
  }, []);

  return (
    <Layout>
      <AllMerchants
        merchants={merchants}
        addToCart={addToCart}
        cartData={cartData}
      />
    </Layout>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMerchants: () => dispatch(actions.getMerchants()),
    addToCart: (product, oldCart) =>
      dispatch(actions.addToCart(product, oldCart)),
    clearFlag: (flag) => dispatch(actions.clearFlag(flag)),
  };
};

export default connect((state) => state, mapDispatchToProps)(Page);

import { useEffect } from "react";
import Layout from "../components/hoc/layout";
import { connect } from "react-redux";
// import { wrapper } from "../store";
import actions from "../store/actions";
import MerchantGrid from "../components/home/merchantGrid";

const Page = ({
  getMerchants,
  merchants = [],
  addToCart,
  cartData,
  clearFlag,
}) => {
  useEffect(() => {
    if (merchants == null || merchants.length == 0) {
      getMerchants();
    }
  }, []);

  return (
    <Layout>
      <div className="flex flex-wrap justify-start max-w-1040 mx-auto">
        <MerchantGrid merchants={merchants} />
      </div>
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

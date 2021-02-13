import { useEffect } from "react";
import Layout from "../components/hoc/layout";
import { connect } from "react-redux";
import actions from "../store/actions";
import Banner from "../components/home/banner";
import ProductSection from "../components/home/productSection";
import { add } from "lodash";

const Page = ({ getMerchants, merchants, addToCart, cartData, clearFlag }) => {
  useEffect(() => {
    if (merchants == null || merchants.length == 0) {
      getMerchants();
    }
  }, []);

  return (
    <Layout>
      <Banner
        bgSrc={"/firstBanner.jpg"}
        heading={"Only Local"}
        content={
          "Support your local businesses! Support your local businesses! Support your local businesses! Support your local businesses! Support your local businesses!"
        }
      />
      <ProductSection
        heading={"Featured Products"}
        link={"/products"}
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

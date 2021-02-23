import Layout from "../components/hoc/layout";
import { connect } from "react-redux";
import actions from "../store/actions";
import Banner from "../components/home/banner";
import ProductSection from "../components/home/productSection";
import MerchantSection from "../components/home/merchantSection";
import SmallAboutSection from "../components/home/smallAboutSection";

const Page = ({ addToCart, cartData, clearFlag }) => {
  return (
    <Layout>
      <Banner
        bgSrc={"/firstBanner.jpg"}
        heading={"Only Local"}
        content={
          "Support your local businesses! Support your local businesses! Support your local businesses! Support your local businesses! Support your local businesses!"
        }
        link={"/signup"}
      />
      <ProductSection
        heading={"Featured Products"}
        link={"/products"}
        addToCart={addToCart}
        cartData={cartData}
      />
      <MerchantSection heading={"Some of our Merchants"} link={"/merchants"} />
      <Banner
        bgSrc={"/secondBanner.jpg"}
        heading={"Started in Vancouver"}
        content={
          "Support your local businesses! Support your local businesses! Support your local businesses! Support your local businesses! Support your local businesses!"
        }
        link={"/signup"}
      />
      <ProductSection
        heading={"Popular"}
        link={"/products"}
        addToCart={addToCart}
        cartData={cartData}
      />
      <SmallAboutSection />
      <ProductSection
        heading={"Home + Garden"}
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

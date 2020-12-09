import { useEffect } from "react";
import Layout from "../components/hoc/layout";
import { connect } from "react-redux";
// import { wrapper } from "../store";
import actions from "../store/actions";
import { motion } from "framer-motion";
import AllProducts from "../components/products/allProducts";

const Page = ({ getProducts, products, addToCart, cartData, clearFlag }) => {
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Layout>
      <AllProducts
        products={products}
        addToCart={addToCart}
        cartData={cartData}
      />
    </Layout>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProducts: () => dispatch(actions.getProducts()),
    addToCart: (product, oldCart) =>
      dispatch(actions.addToCart(product, oldCart)),
    clearFlag: (flag) => dispatch(actions.clearFlag(flag)),
  };
};

export default connect((state) => state, mapDispatchToProps)(Page);

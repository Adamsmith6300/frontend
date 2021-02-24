import { useEffect } from "react";
import Layout from "../components/hoc/layout";
import { connect } from "react-redux";
// import { wrapper } from "../store";
import actions from "../store/actions";
import ProductGrid from "../components/home/productGrid";

const Page = ({ getProducts, products, addToCart, cartData, clearFlag }) => {
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Layout>
      <div className="flex flex-wrap justify-start max-w-1250 mx-auto">
        <ProductGrid
          products={products}
          addToCart={addToCart}
          cartData={cartData}
        />
      </div>
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

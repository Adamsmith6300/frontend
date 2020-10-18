import { useEffect } from "react";
import Layout from "../components/hoc/layout";
import { connect } from "react-redux";
// import { wrapper } from "../store";
import actions from "../store/actions";
import { Button } from "semantic-ui-react";

const Page = ({ getProducts, products, addToCart, cartData, clearFlag }) => {
  if (products != undefined && products.length > 0) {
    products = products.map((product, index) => {
      let mainImageUrl = `${process.env.NEXT_PUBLIC_PRODUCT_IMAGE_URL}/${
        product.MerchantId
      }/${product.ProductId}/${product.images[product.mainImage]}`;

      return (
        <div
          key={product.ProductId}
          className="border border-grey-300 p-3 w-1/3"
        >
          <img src={mainImageUrl} className="w-full" />
          <p>{product.title}</p>
          <p>${product.price}</p>
          <Button onClick={() => addToCart(product, cartData)}>
            Add to Cart
          </Button>
        </div>
      );
    });
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Layout>
      <h1 className="text-3xl text-center">Products</h1>
      <div className="w-4/5 mx-auto">{products}</div>
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

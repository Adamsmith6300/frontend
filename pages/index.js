import { useEffect } from "react";
import Layout from "../components/hoc/layout";
import { connect } from "react-redux";
// import { wrapper } from "../store";
import actions from "../store/actions";

import { Button } from "semantic-ui-react";

const Page = ({ getProducts, products }) => {
  if (products != undefined && products.length > 0) {
    products = products.map((product, index) => {
      let mainImageUrl = `${process.env.NEXT_PUBLIC_PRODUCT_IMAGE_URL}/${
        product.MerchantId
      }/${product.ProductId}/${product.images[product.mainImage]}`;

      return (
        <div
          key={product.ProductId}
          className="border border-grey-300 p-3 w-300"
        >
          <img src={mainImageUrl} className="w-full" />
          {product.title}
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

// export const getStaticProps = wrapper.getStaticProps(({ store, preview }) => {
//   axios
//     .get(`${process.env.NEXT_PUBLIC_API_URL}/market/products`)
//     .then(function (response) {
//       store.dispatch({
//         type: actions.GET_PRODUCTS,
//         payload: response.data,
//       });
//     })
//     .catch(function (error) {
//       store.dispatch({
//         type: actions.ERROR,
//         payload: "FAILED TO GET PRODUCTS",
//       });
//     });
// });

const mapDispatchToProps = (dispatch) => {
  return {
    setTest: (val) => dispatch(actions.setTest(val)),
    getProducts: () => dispatch(actions.getProducts()),
  };
};

export default connect((state) => state, mapDispatchToProps)(Page);

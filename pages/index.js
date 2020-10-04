import Layout from "../components/hoc/layout";
import { connect } from "react-redux";
import { wrapper } from "../store";
import { Button } from "semantic-ui-react";

import actions from "../store/actions";
import axios from "axios";

const Page = (props) => {
  // if (products != undefined && products.length > 0) {
  //   products = products.map((product, index) => {
  //     return (<li key={product.ProductId}>{product.title}</li>)
  //   })
  // }
  console.log("SERVER SIDE PROPS:", props);

  return (
    <Layout>
      <h1 className="text-3xl text-center">LOMA</h1>
      <ul>{/* {products} */}</ul>
    </Layout>
  );
};

export const getStaticProps = wrapper.getStaticProps(({ store, preview }) => {
  axios
    .get(`${process.env.NEXT_PUBLIC_API_URL}/market/products`)
    .then(function (response) {
      store.dispatch({
        type: actions.GET_PRODUCTS,
        payload: response.data,
      });
    })
    .catch(function (error) {
      store.dispatch({
        type: actions.ERROR,
        payload: "FAILED TO GET PRODUCTS",
      });
    });
});

const mapDispatchToProps = (dispatch) => {
  return { setTest: (val) => dispatch(actions.setTest(val)) };
};

export default connect((state) => state, mapDispatchToProps)(Page);

import Layout from "../components/hoc/layout";
import { connect } from "react-redux";
import actions from "../store/actions";
import { withRouter } from "next/router";

import Checkout from "../components/checkout/index";

const Page = ({
  successfulLogin,
  checkout,
  cartData,
  setActiveCheckout,
  postNewOrder,
}) => {
  //reroute if carts empty or show msg
  return (
    <Layout>
      <h1 className="text-3xl text-center">Checkout</h1>
      <Checkout
        activeCheckoutStep={checkout.activeStep}
        setActiveCheckout={setActiveCheckout}
        postNewOrder={postNewOrder}
        cartData={cartData}
      />
    </Layout>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveCheckout: (stepNo) => dispatch(actions.setActiveCheckout(stepNo)),
    postNewOrder: (OrderId) => dispatch(actions.postNewOrder(OrderId)),
  };
};

export default connect((state) => state, mapDispatchToProps)(withRouter(Page));

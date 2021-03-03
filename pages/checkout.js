import { useEffect, useState } from "react";
import Layout from "../components/hoc/layout";
import { connect } from "react-redux";
import actions from "../store/actions";
import { withRouter } from "next/router";
import { isLoggedIn, fetchAccountData } from "../store/helpers";
import { LargeLoader } from "../components/loaders";
import Checkout from "../components/checkout/index";
import OrderSummary from "../components/checkout/orderSummary";

const Page = ({
  router,
  cartData,
  postNewOrder,
  personInfo,
  addToCart,
  removeFromCart,
}) => {
  //reroute if carts empty or show msg
  const [personInfoCheckout, setPersonInfo] = useState(personInfo);
  // const [loggedIn, updateLoggedIn] = useState(false);

  useEffect(() => {
    // updateLoggedIn(isLoggedIn());
    if (!isLoggedIn()) {
      router.push("/");
    }
    console.log(cartData);
    const call = async () => {
      try {
        let resp = await fetchAccountData();
        setPersonInfo(resp.data.info);
      } catch (err) {
        console.log("Error fetching person info", err);
      }
    };
    if (!personInfo) {
      call();
    }
  }, []);

  return (
    <Layout>
      {personInfoCheckout ? (
        <>
          <h1 className="text-3xl text-center">Checkout</h1>
          <OrderSummary
            cartData={cartData}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
          />
          <Checkout
            personInfo={personInfoCheckout}
            // activeCheckoutStep={checkout.activeStep}
            // setActiveCheckout={setActiveCheckout}
            postNewOrder={postNewOrder}
            cartData={cartData}
          />
        </>
      ) : (
        <LargeLoader />
      )}
    </Layout>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (product, oldCart, qty = 1) =>
      dispatch(actions.addToCart(product, oldCart, qty)),
    removeFromCart: (product, oldcart, qty) =>
      dispatch(actions.removeFromCart(product, oldcart, qty)),
    postNewOrder: (OrderId) => dispatch(actions.postNewOrder(OrderId)),
  };
};

export default connect((state) => state, mapDispatchToProps)(withRouter(Page));

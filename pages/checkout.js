import { useEffect, useState } from "react";
import Layout from "../components/hoc/layout";
import { connect } from "react-redux";
import actions from "../store/actions";
import { withRouter } from "next/router";
import { isLoggedIn, fetchAccountData } from "../store/helpers";
import { LargeLoader } from "../components/loaders";
import Checkout from "../components/checkout/index";
import OrderSummary from "../components/checkout/orderSummary";
import OrderConfirmation from "../components/checkout/orderConfirmation";

const Page = ({
  router,
  cartData,
  confirmPayment,
  personInfo,
  addToCart,
  removeFromCart,
}) => {
  //reroute if carts empty or show msg
  const [personInfoCheckout, setPersonInfo] = useState(personInfo);
  const [billingInfo, setBillingInfo] = useState({});
  const [orderNo, setOrderNo] = useState(null);

  useEffect(() => {
    let loggedIn = isLoggedIn();
    if (!loggedIn) {
      router.push("/");
    }
    const call = async () => {
      try {
        let resp = await fetchAccountData();
        setPersonInfo({ ...resp.data.info, saveDeliveryDetails: true });
      } catch (err) {
        console.log("Error fetching person info", err);
      }
    };
    if (!personInfo && loggedIn) {
      call();
    }
  }, []);

  return (
    <Layout>
      {!orderNo ? (
        <>
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
                setPersonInfo={setPersonInfo}
                setOrderNo={setOrderNo}
                confirmPayment={confirmPayment}
                cartData={cartData}
                billingInfo={billingInfo}
                setBillingInfo={setBillingInfo}
              />
            </>
          ) : (
            <LargeLoader />
          )}
        </>
      ) : (
        <OrderConfirmation orderNo={orderNo} />
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
    confirmPayment: (OrderId) => dispatch(actions.confirmPayment(OrderId)),
  };
};

export default connect((state) => state, mapDispatchToProps)(withRouter(Page));

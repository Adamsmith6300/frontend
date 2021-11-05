import { useEffect, useState } from "react";
import Layout from "../components/hoc/layout";
import { connect } from "react-redux";
import actions from "../store/actions";
import { withRouter } from "next/router";
import { isLoggedIn, fetchAccountData, checkGuest } from "../store/helpers";
import { LargeLoader } from "../components/loaders";
import Checkout from "../components/checkout/index";
import OrderSummary from "../components/checkout/orderSummary";
import OrderConfirmation from "../components/checkout/orderConfirmation";
import Head from "next/head";

const Page = ({
  router,
  cartData,
  confirmPayment,
  personInfo,
  addToCart,
  removeFromCart,
  setCart,
  submitLogin,
}) => {
  //reroute if carts empty or show msg
  const [personInfoCheckout, setPersonInfo] = useState(personInfo);
  const [billingInfo, setBillingInfo] = useState({});
  const [orderNo, setOrderNo] = useState(null);
  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => {
    const call = async (loggedInAsGuest = false) => {
      try {
        let resp = await fetchAccountData();
        setPersonInfo({
          ...resp.data.info,
          saveDeliveryDetails: !loggedInAsGuest,
        });
      } catch (err) {
        console.log("Error fetching person info", err);
      }
    };
    if ("guest" in router.query && router.query["guest"]) {
      //login as guest
      const loginGuest = async () => {
        try {
          let resp = await submitLogin({
            email: "guest@shoploma.ca",
            password: "Lomaguest123!",
          });
          setIsGuest(true);
        } catch (err) {
          console.log("Logging in Guest", err);
        }
        try {
          let resp = await fetchAccountData();
          setPersonInfo({ ...resp.data.info, saveDeliveryDetails: false });
        } catch (err) {
          console.log("Error fetching person info", err);
        }
      };
      loginGuest();
      return;
    }
    let loggedIn = isLoggedIn();
    let loggedInAsGuest = checkGuest();
    setIsGuest(loggedInAsGuest);
    if (!loggedIn) {
      router.push("/");
    }
    if (!personInfo && loggedIn) {
      call(loggedInAsGuest);
    }
  }, []);
  return (
    <Layout loading={!personInfoCheckout}>
      <Head>
        <title>Checkout - Loma</title>
      </Head>
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
                setCart={setCart}
                isGuest={isGuest}
              />
            </>
          ) : null}
        </>
      ) : (
        <OrderConfirmation orderNo={orderNo} />
      )}
    </Layout>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitLogin: (formData) => dispatch(actions.submitLogin(formData)),
    addToCart: (product, oldCart, qty = 1) =>
      dispatch(actions.addToCart(product, oldCart, qty)),
    removeFromCart: (product, oldcart, qty) =>
      dispatch(actions.removeFromCart(product, oldcart, qty)),
    confirmPayment: (OrderId) => dispatch(actions.confirmPayment(OrderId)),
    setCart: (cart) => dispatch(actions.setCart(cart)),
  };
};

export default connect((state) => state, mapDispatchToProps)(withRouter(Page));

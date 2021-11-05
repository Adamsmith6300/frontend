import Email from "./email";
import DeliveryDetails from "./deliveryDetails";
import BillingDetails from "./billingDetails";
import Payment from "./payment";
import { useState } from "react";

const index = ({
  setOrderNo,
  confirmPayment,
  cartData,
  personInfo,
  setPersonInfo,
  billingInfo,
  setBillingInfo,
  setCart,
  isGuest,
}) => {
  const [activeCheckoutStep, setActiveCheckout] = useState(1);

  return (
    <div className="w-full lg:w-1/2 mx-auto text-center">
      <Email
        activeCheckoutStep={activeCheckoutStep}
        setActiveCheckout={setActiveCheckout}
        setPersonInfo={setPersonInfo}
        personInfo={personInfo}
        isGuest={isGuest}
        step={1}
      />
      <DeliveryDetails
        personInfo={personInfo}
        setPersonInfo={setPersonInfo}
        activeCheckoutStep={activeCheckoutStep}
        setActiveCheckout={setActiveCheckout}
        step={2}
        isGuest={isGuest}
      />
      <BillingDetails
        personInfo={personInfo}
        setPersonInfo={setPersonInfo}
        billingInfo={billingInfo}
        setBillingInfo={setBillingInfo}
        activeCheckoutStep={activeCheckoutStep}
        setActiveCheckout={setActiveCheckout}
        step={3}
        isGuest={isGuest}
      />
      <Payment
        setOrderNo={setOrderNo}
        personInfo={personInfo}
        // setPersonInfo={setPersonInfo}
        activeCheckoutStep={activeCheckoutStep}
        setActiveCheckout={setActiveCheckout}
        confirmPayment={confirmPayment}
        cartData={cartData}
        step={4}
        setCart={setCart}
        isGuest={isGuest}
      />
    </div>
  );
};

export default index;

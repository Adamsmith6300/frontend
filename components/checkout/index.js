import Email from "./email";
import DeliveryDetails from "./deliveryDetails";
import Payment from "./payment";
import { useState } from "react";

const index = ({
  setOrderNo,
  confirmPayment,
  cartData,
  personInfo,
  setPersonInfo,
}) => {
  const [activeCheckoutStep, setActiveCheckout] = useState(2);

  return (
    <div className="w-1/2 mx-auto text-center">
      <Email
        activeCheckoutStep={activeCheckoutStep}
        setActiveCheckout={setActiveCheckout}
        setPersonInfo={setPersonInfo}
        personInfo={personInfo}
      />
      <DeliveryDetails
        personInfo={personInfo}
        setPersonInfo={setPersonInfo}
        activeCheckoutStep={activeCheckoutStep}
        setActiveCheckout={setActiveCheckout}
      />
      <Payment
        setOrderNo={setOrderNo}
        personInfo={personInfo}
        // setPersonInfo={setPersonInfo}
        activeCheckoutStep={activeCheckoutStep}
        setActiveCheckout={setActiveCheckout}
        confirmPayment={confirmPayment}
        cartData={cartData}
      />
    </div>
  );
};

export default index;

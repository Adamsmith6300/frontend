import Email from "./email";
import DeliveryDetails from "./deliveryDetails";
import Payment from "./payment";
import { useState } from "react";

const index = ({
  // activeCheckoutStep,
  // setActiveCheckout,
  postNewOrder,
  cartData,
  personInfo,
}) => {
  const [activeCheckoutStep, setActiveCheckout] = useState(1);

  return (
    <div className="w-1/2 mx-auto text-center">
      <Email
        email={personInfo.email || ""}
        activeCheckoutStep={activeCheckoutStep}
        setActiveCheckout={setActiveCheckout}
      />
      <DeliveryDetails
        personInfo={personInfo}
        activeCheckoutStep={activeCheckoutStep}
        setActiveCheckout={setActiveCheckout}
      />
      <Payment
        activeCheckoutStep={activeCheckoutStep}
        setActiveCheckout={setActiveCheckout}
        postNewOrder={postNewOrder}
        cartData={cartData}
      />
    </div>
  );
};

export default index;

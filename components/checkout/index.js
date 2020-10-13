import Email from "./email";
import DeliveryDetails from "./deliveryDetails";
import Payment from "./payment";

const index = ({
  activeCheckoutStep,
  setActiveCheckout,
  postNewOrder,
  cartData,
}) => {
  return (
    <div className="w-1/2 mx-auto text-center pt-12">
      <Email
        activeCheckoutStep={activeCheckoutStep}
        setActiveCheckout={setActiveCheckout}
      />
      <DeliveryDetails
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

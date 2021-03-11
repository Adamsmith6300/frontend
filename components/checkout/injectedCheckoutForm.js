import { ElementsConsumer } from "@stripe/react-stripe-js";
import CheckoutForm from "./checkoutForm";

const InjectedCheckoutForm = ({
  confirmPayment,
  cartData,
  setOrderNo,
  personInfo,
}) => {
  return (
    <ElementsConsumer>
      {({ elements, stripe }) => (
        <CheckoutForm
          elements={elements}
          stripe={stripe}
          confirmPayment={confirmPayment}
          cartData={cartData}
          setOrderNo={setOrderNo}
          personInfo={personInfo}
        />
      )}
    </ElementsConsumer>
  );
};
export default InjectedCheckoutForm;

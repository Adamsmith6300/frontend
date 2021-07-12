import { ElementsConsumer } from "@stripe/react-stripe-js";
import CheckoutForm from "./checkoutForm";

const InjectedCheckoutForm = ({
  confirmPayment,
  cartData,
  setOrderNo,
  personInfo,
  setCart,
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
          setCart={setCart}
        />
      )}
    </ElementsConsumer>
  );
};
export default InjectedCheckoutForm;

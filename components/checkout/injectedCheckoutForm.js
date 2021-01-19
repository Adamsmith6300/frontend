import { ElementsConsumer } from "@stripe/react-stripe-js";
import CheckoutForm from "./checkoutForm";

const InjectedCheckoutForm = ({ postNewOrder, cartData }) => {
  return (
    <ElementsConsumer>
      {({ elements, stripe }) => (
        <CheckoutForm
          elements={elements}
          stripe={stripe}
          postNewOrder={postNewOrder}
          cartData={cartData}
        />
      )}
    </ElementsConsumer>
  );
};
export default InjectedCheckoutForm;

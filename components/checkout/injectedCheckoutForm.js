import { ElementsConsumer } from "@stripe/react-stripe-js";
import CheckoutForm from "./checkoutForm";

const InjectedCheckoutForm = () => {
  return (
    <ElementsConsumer>
      {({ elements, stripe }) => (
        <CheckoutForm elements={elements} stripe={stripe} />
      )}
    </ElementsConsumer>
  );
};
export default InjectedCheckoutForm;

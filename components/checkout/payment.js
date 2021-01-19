import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import InjectedCheckoutForm from "./injectedCheckoutForm";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_API_KEY);

const payment = ({
  activeCheckoutStep,
  setActiveCheckout,
  postNewOrder,
  cartData,
}) => {
  const step = 3;
  const isActive = activeCheckoutStep == step;

  return (
    <div className="border border-grey-400 p-3 m-3">
      <p>
        3. Confirm & Pay{" "}
        {activeCheckoutStep > step ? (
          <span onClick={() => setActiveCheckout(step)}>Edit</span>
        ) : null}
      </p>

      {isActive ? (
        <>
          <Elements stripe={stripePromise}>
            <InjectedCheckoutForm
              postNewOrder={postNewOrder}
              cartData={cartData}
            />
          </Elements>
        </>
      ) : null}
    </div>
  );
};

export default payment;

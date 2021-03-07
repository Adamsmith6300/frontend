import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import InjectedCheckoutForm from "./injectedCheckoutForm";
import { FcCheckmark } from "react-icons/fc";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_API_KEY);

const payment = ({
  activeCheckoutStep,
  setActiveCheckout,
  confirmPayment,
  cartData,
  setOrderNo,
  personInfo,
}) => {
  const step = 3;
  const isActive = activeCheckoutStep == step;

  return (
    <div className="p-3 m-3">
      <p className="flex justify-between border-b">
        <span>
          3. Confirm & Pay
          {activeCheckoutStep > step ? (
            <FcCheckmark className="inline ml-3 mb-1" />
          ) : null}
        </span>
        {activeCheckoutStep > step ? (
          <span
            className="cursor-pointer"
            onClick={() => setActiveCheckout(step)}
          >
            Edit
          </span>
        ) : null}
      </p>

      {isActive ? (
        <>
          <Elements stripe={stripePromise}>
            <InjectedCheckoutForm
              confirmPayment={confirmPayment}
              cartData={cartData}
              setOrderNo={setOrderNo}
              personInfo={personInfo}
            />
          </Elements>
        </>
      ) : null}
    </div>
  );
};

export default payment;

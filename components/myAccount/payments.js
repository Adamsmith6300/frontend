import { Button } from "semantic-ui-react";
import { getAccountLink } from "../../store/helpers";

const Payments = ({ stripe_onboard_complete }) => {
  async function callGetAccLink() {
    try {
      let resp = await getAccountLink();
      if (resp.data) {
        window.open(resp.data.url);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="px-5 pb-8 text-center">
      {stripe_onboard_complete ? (
        <>
          <h2 className="text-black text-3xl">
            Open your Stripe dashboard to view payments
          </h2>
          <button
            className="btn-no-size px-12 py-3 mt-6"
            onClick={() => window.open("https://dashboard.stripe.com/")}
          >
            OPEN STRIPE
          </button>
        </>
      ) : (
        <>
          <h2 className="text-black text-3xl mb-3">
            Connect your account to Stripe
          </h2>
          <p>
            We use Stripe to make sure you get paid on time and keep your
            personal and bank details secure.
          </p>
          <button
            className="btn-no-size px-12 py-3 mt-6"
            onClick={() => callGetAccLink()}
          >
            SET UP PAYMENTS
          </button>
        </>
      )}
    </div>
  );
};

export default Payments;

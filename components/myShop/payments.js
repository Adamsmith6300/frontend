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
          <Button
            color="black"
            onClick={() => window.open("https://dashboard.stripe.com/")}
          >
            OPEN STRIPE
          </Button>
        </>
      ) : (
        <>
          <h2 className="text-black text-3xl">
            Connect your account to Stripe
          </h2>
          <p>
            We use Stripe to make sure you get paid on time and keep your
            personal and bank details secure.
          </p>
          <Button color="black" onClick={() => callGetAccLink()}>
            SET UP PAYMENTS
          </Button>
        </>
      )}
    </div>
  );
};

export default Payments;

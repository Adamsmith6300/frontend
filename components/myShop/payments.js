import { Button } from "semantic-ui-react";
import { getAccountLink } from "../../store/helpers";

const Payments = ({}) => {
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
    <div className="px-5 pt-5 text-center">
      <h2>Connect your account to Stripe</h2>
      <p>
        We use Stripe to make sure you get paid on time and keep your personal
        and bank details secure.
      </p>
      <Button color="black" onClick={() => callGetAccLink()}>
        SET UP PAYMENTS
      </Button>
    </div>
  );
};

export default Payments;

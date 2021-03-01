import { Button } from "semantic-ui-react";
import Link from "next/link";
import { isLoggedIn } from "../../store/helpers";

const index = ({ cartData, toggle }) => {
  return (
    <div>
      <p className="flex justify-between pr-1">
        <span>Subtotal:</span>
        <span>${cartData.total}</span>
      </p>
      <p className="text-base">
        Taxes and delivery fees calculated at checkout.
      </p>
      {isLoggedIn() ? (
        <Link href="/checkout">
          <button className="standard-btn" onClick={toggle}>
            Checkout
          </button>
        </Link>
      ) : (
        <div className="mt-3 text-center">
          <p className="text-red-500">Must have an account to order.</p>
          <Link href="/login">
            <button className="my-2 standard-btn" onClick={toggle}>
              Login
            </button>
          </Link>
          <p>OR</p>
          <Link href="/signup">
            <button className="my-2 standard-btn" onClick={toggle}>
              Signup
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default index;

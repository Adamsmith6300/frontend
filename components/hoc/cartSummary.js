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
      {/* <p className="text-base font-bold text-center">
        Remember to use FIRSTFREE for free delivery on your first order!
      </p> */}
      <div className="mt-3 text-center">
        {isLoggedIn() ? (
          <Link href="/checkout">
            <button
              className="btn-no-size-color bg-green-900 px-6 py-4"
              onClick={toggle}
            >
              Checkout
            </button>
          </Link>
        ) : (
          <>
            <div>
              <Link href="/checkout?guest=true">
                <button
                  className="my-2 btn-no-size-color bg-green-900 px-6 py-4"
                  onClick={toggle}
                >
                  Guest Checkout
                </button>
              </Link>
            </div>
            {/* <div>
              <Link href="/login">
                <button className="my-2 standard-btn" onClick={toggle}>
                  Login
                </button>
              </Link>
            </div>
            <div>
              <Link href="/signup">
                <button className="my-2 standard-btn" onClick={toggle}>
                  Signup
                </button>
              </Link>
            </div> */}
          </>
        )}
      </div>
    </div>
  );
};

export default index;

import { Button } from "semantic-ui-react";
import Link from "next/link";
import { isLoggedIn } from "../../store/helpers";

const index = ({ cartData, toggle }) => {
  return (
    <div>
      <p>${cartData.total}</p>
      <p>Taxes and delivery fees calculated at checkout.</p>
      {isLoggedIn() ? (
        <Link href="/checkout">
          <Button className="text-black" onClick={toggle}>
            Checkout
          </Button>
        </Link>
      ) : (
        <>
          <Link href="/login">
            <Button className="text-black" onClick={toggle}>
              Login
            </Button>
          </Link>
          <p>Or</p>
          <Link href="/signup">
            <Button className="text-black" onClick={toggle}>
              Signup
            </Button>
          </Link>
        </>
      )}
    </div>
  );
};

export default index;

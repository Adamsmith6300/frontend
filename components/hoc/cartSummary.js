import { Button } from "semantic-ui-react";
import Link from "next/link";
import { isLoggedIn } from "../../store/helpers";

const index = ({ cartData, toggleCart }) => {
  return (
    <div>
      <p>${cartData.total}</p>
      <p>Taxes and delivery fees calculated at checkout.</p>
      {isLoggedIn() ? (
        <Link href="/checkout">
          <Button onClick={() => toggleCart(false)}>Checkout</Button>
        </Link>
      ) : (
        <>
          <Link href="/login">
            <Button onClick={() => toggleCart(false)}>Login</Button>
          </Link>
          <p>Or</p>
          <Link href="/signup">
            <Button onClick={() => toggleCart(false)}>Signup</Button>
          </Link>
        </>
      )}
    </div>
  );
};

export default index;

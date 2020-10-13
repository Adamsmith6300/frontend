import { Button } from "semantic-ui-react";
import Link from "next/link";

const index = ({ cartData, toggleCart }) => {
  return (
    <div>
      <p>${cartData.total}</p>
      <p>Taxes and delivery fees calculated at checkout.</p>
      <Link href="/checkout">
        <Button onClick={() => toggleCart(false)}>Checkout</Button>
      </Link>
    </div>
  );
};

export default index;

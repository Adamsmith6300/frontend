import Link from "next/link";
import { FcCheckmark } from "react-icons/fc";

const orderConfirmation = ({ orderNo }) => {
  return (
    <div className="my-account-container text-center">
      <h1 className="font-bold text-3xl mb-6">
        Order Confirmed
        <FcCheckmark className="inline ml-3 mb-3" />
      </h1>
      <p className="my-3">Thank you for your order!</p>
      <p className="my-3">
        Your order <span className="font-bold">#{orderNo}</span> has been
        processed.
      </p>
      <p className="my-3">You will receive a confirmation email shortly.</p>
      <p className="my-3">Click the link below to return to the marketplace.</p>
      <Link href="/marketplace">
        <button className="standard-btn my-3">Shop</button>
      </Link>
    </div>
  );
};

export default orderConfirmation;

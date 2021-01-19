import moment from "moment";
const index = ({ order, setSelectedOrder }) => {
  return (
    <div>
      <span
        className="cursor-pointer border px-4 ml-2 py-1"
        onClick={() => setSelectedOrder(null)}
      >
        Back
      </span>
      <li className="cursor-pointer p-3 border border-1 w-350 m-2 text-base">
        <p>Order# {order.OrderId.slice(-12)}</p>
        <p>{order.items.length} Product(s)</p>{" "}
        <p>
          Date of Order:{" "}
          {moment.unix(order.paymentIntent.created).format("MMMM Do YYYY")}
        </p>
        <p>Total: {"$$$"}</p>
      </li>
    </div>
  );
};

export default index;

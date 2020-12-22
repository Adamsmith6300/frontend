import moment from "moment";

export default ({ orders }) => {
  orders = orders.map((order, index) => {
    return (
      <li
        key={order.OrderId}
        className="cursor-pointer p-3 border border-1 w-350 m-2 text-base"
      >
        <p>Order# {order.OrderId.slice(-12)}</p>
        <p>{order.items.length} Product(s)</p>{" "}
        <p>
          Date of Order:{" "}
          {moment.unix(order.paymentIntent.created).format("MMMM Do YYYY")}
        </p>
        <p>Total: {"$$$"}</p>
      </li>
    );
  });
  return <ul className="flex flex-wrap h-500 overflow-y-auto">{orders}</ul>;
};

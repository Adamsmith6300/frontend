import moment from "moment";
import { useState } from "react";
import SelectedOrder from "./selectedOrder";

export default ({ orders }) => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  let orderList = orders.map((order, index) => {
    return (
      <li
        onClick={() => setSelectedOrder(selectedOrder == index ? null : index)}
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

  if (selectedOrder != null) {
    let order = orders[selectedOrder];
    return (
      <SelectedOrder
        key={order.OrderId}
        order={order}
        setSelectedOrder={setSelectedOrder}
      />
    );
  } else {
    return (
      <ul className="flex flex-wrap h-500 overflow-y-auto">{orderList}</ul>
    );
  }
};

import moment from "moment";
import { useState } from "react";
import SelectedOrder from "./selectedOrder";
import Link from "next/link";

const myOrders = ({ orders }) => {
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
          Date of Order: {moment.unix(order.created).format("MMMM Do YYYY")}
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
      <ul className="flex flex-wrap py-5 overflow-y-auto">
        {orderList.length > 0 ? (
          orderList
        ) : (
          <div className="w-full">
            <p className="w-full text-center text-3xl bolder mb-3">
              You don't have any orders yet!
            </p>
            <p className="w-full text-center mb-6">
              Visit the shop to start your order.
            </p>
            <div className="w-full text-center">
              <Link href="/">
                <button className="standard-btn">Shop</button>
              </Link>
            </div>
          </div>
        )}
      </ul>
    );
  }
};
export default myOrders;

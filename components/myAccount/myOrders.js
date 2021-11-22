import moment from "moment";
import { useState } from "react";
import SelectedOrder from "./selectedOrder";
import Link from "next/link";
import { getStatus } from "./selectedOrder";

const myOrders = ({ orders }) => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  let orderList = orders.map((order, index) => {
    let image =
      order.items[0].chosenVariant &&
      order.items[0].chosenVariant != null &&
      order.items[0].chosenVariant.image != null
        ? order.items[0].chosenVariant.image.src
        : order.items[0].images[0].src;
    return (
      <li
        onClick={() =>
          setSelectedOrder(
            selectedOrder == order.OrderId ? null : order.OrderId
          )
        }
        key={order.OrderId}
        className="cursor-pointer flex justify-start place-items-center p-3 border border-1 w-350 max-w-full my-2 md:m-2 text-base"
      >
        <div className="w-100 h-75 overflow-hidden">
          <img src={image} className="h-full" />
        </div>
        <div className="w-200 pl-3">
          <p className="text-lg">{order.items.length} Product(s)</p>
          <p className="text-lg">Status: {getStatus(order.orderStatus)}</p>
          <p className="text-lg">
            Ordered: {moment.unix(order.created).format("MMMM Do YYYY")}
          </p>
        </div>
      </li>
    );
  });

  if (selectedOrder != null) {
    let order = orders[0];
    for (let i = 0; i < orders.length; ++i) {
      if (orders[i]["OrderId"] == selectedOrder) {
        order = orders[i];
      }
    }
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
                <button className="btn-no-size-color bg-green-900 px-8 py-3 ">
                  Shop
                </button>
              </Link>
            </div>
          </div>
        )}
      </ul>
    );
  }
};
export default myOrders;

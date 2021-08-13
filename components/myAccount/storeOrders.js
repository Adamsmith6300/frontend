import moment from "moment";
import { useState } from "react";
import SelectedStoreOrder from "./selectedStoreOrder";
import { getStatus } from "./selectedStoreOrder";

const storeOrders = ({
  orders,
  setShowModal,
  setModalContent,
  setSelectedOrderId,
}) => {
  const [selectedOrder, setSelectedOrder] = useState(null);

  const genOrders = (orders) => {
    return orders.map((order, index) => {
      let image =
        order.items[0].chosenVariant &&
        order.items[0].chosenVariant != null &&
        order.items[0].chosenVariant.image != null
          ? order.items[0].chosenVariant.image.src
          : order.items[0].images[0].src;
      return (
        <li
          onClick={() =>
            setSelectedOrder(selectedOrder == index ? null : index)
          }
          key={order.OrderId}
          className="cursor-pointer flex justify-start place-items-center p-3 border border-1 w-350 max-w-screen m-2 text-base"
        >
          <div className="w-100 h-75 overflow-hidden">
            <img src={image} className="h-full" />
          </div>
          <div className="w-200 pl-3">
            <p className="text-lg">{order.items.length} Item(s)</p>
            <p className="text-lg">Status: {getStatus(order.orderStatus)}</p>
            <p className="text-lg">
              Ordered: {moment.unix(order.created).format("MMMM Do YYYY")}
            </p>
          </div>
        </li>
      );
    });
  };
  let pastOrders = orders.filter((order) => {
    return order.orderStatus == "delivered";
  });
  let newOrders = orders.filter((order) => {
    return order.orderStatus != "delivered";
  });
  newOrders = genOrders(newOrders);
  pastOrders = genOrders(pastOrders);

  if (selectedOrder != null) {
    let order = orders[selectedOrder];
    return (
      <SelectedStoreOrder
        key={order.OrderId}
        order={order}
        setSelectedOrder={setSelectedOrder}
        setShowModal={setShowModal}
        setModalContent={setModalContent}
        setSelectedOrderId={setSelectedOrderId}
      />
    );
  } else {
    return (
      <ul className="flex flex-wrap py-5 overflow-y-auto">
        <>
          <p className="text-3xl w-full">New Orders</p>
          {newOrders.length > 0 ? (
            newOrders
          ) : (
            <p className="my-3">No new orders</p>
          )}
        </>
        <>
          <p className="text-3xl w-full mt-3">Previous Orders</p>
          {pastOrders.length > 0 ? (
            pastOrders
          ) : (
            <p className="my-3">No previous orders</p>
          )}
        </>
      </ul>
    );
  }
};
export default storeOrders;

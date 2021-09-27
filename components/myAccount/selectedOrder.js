import moment from "moment";
import { BsFillCircleFill } from "react-icons/bs";
import Link from "next/link";

export const getStatus = (status) => {
  switch (status) {
    case "payment_approved":
      return (
        <span>
          picking up
          <BsFillCircleFill className="inline text-yellow-300 ml-1" />
        </span>
      );
    case "out_for_delivery":
      return (
        <span>
          out for delivery
          <BsFillCircleFill className="inline  text-blue-400 ml-2" />
        </span>
      );
    case "delivered":
      return (
        <span>
          delivered
          <BsFillCircleFill className="inline text-green-300 ml-2" />
        </span>
      );
  }
};
const index = ({ order, setSelectedOrder }) => {
  let items = order.items.map((item, index) => {
    let image =
      item.chosenVariant &&
      item.chosenVariant != null &&
      item.chosenVariant.image != null
        ? item.chosenVariant.image.src
        : item.images[0].src;
    let price =
      item.chosenVariant && item.chosenVariant != null
        ? item.chosenVariant.price
        : item.price;
    if (price < 1) price = item.price;
    return (
      <div className="flex justify-start place-items-center mb-3">
        <div className="w-100 h-75 overflow-hidden">
          <img src={image} className="h-full" />
        </div>
        <div className="w-200 pl-3">
          <p className="text-lg">{item.title}</p>

          <Link href={`/vendors/${item.MerchantId}`}>
            <p className="cursor-pointer text-lg">by {item.storename}</p>
          </Link>
          <p className="text-lg">Price: ${price}</p>
          <p className="text-lg">Quantity: {item.qty}</p>
        </div>
      </div>
    );
  });

  return (
    <div className="md:pl-2">
      <button
        className="btn-no-size-color bg-black px-6 py-2"
        onClick={() => setSelectedOrder(null)}
      >
        Back
      </button>
      <p className="text-3xl my-3">Order Details</p>
      <div className="p-3 border border-1 sm:max-w-screen-sm text-base">
        <p className="text-lg">{order.items.length} Product(s)</p>
        <p className="text-lg">Status: {getStatus(order.orderStatus)}</p>
        <p className="text-lg">Order # {order.OrderId}</p>
        <p className="text-lg">
          Ordered: {moment.unix(order.created).format("MMMM Do YYYY")}
        </p>
        <p className="text-lg">Total: ${order.chargeDetails.total}</p>
      </div>
      <p className="text-3xl my-3">Delivery</p>
      <div className="p-3 border border-1 sm:max-w-screen-sm text-base">
        <p className="text-lg">
          {order.deliveryInfo.address}
          {order.deliveryInfo.address2
            ? ", " + order.deliveryInfo.address2
            : null}
        </p>
        <p className="text-lg">{order.deliveryInfo.city}</p>
        <p className="text-lg">BC</p>
        <p className="text-lg">{order.deliveryInfo.postalcode}</p>
      </div>
      <p className="text-3xl my-3">Billing</p>
      <div className="p-3 border border-1 sm:max-w-screen-sm text-base">
        <p className="text-lg">
          {order.billingInfo.address}{" "}
          {order.billingInfo.address2
            ? ", " + order.billingInfo.address2
            : null}
        </p>
        <p className="text-lg">{order.billingInfo.city}</p>
        <p className="text-lg">BC</p>
        <p className="text-lg">{order.billingInfo.postalcode}</p>
      </div>

      <p className="text-3xl my-3">Items</p>
      <div className="p-3 pb-0 border border-1 sm:max-w-screen-sm text-base">
        {items}
      </div>

      <p className="text-3xl my-3">Summary</p>
      <div className="text-gray-600 p-3 pb-0 border border-1 sm:max-w-screen-sm text-base">
        <p className="flex justify-between">
          <span>Subtotal</span>
          <span>${order.chargeDetails.subtotal}</span>
        </p>
        <p className="flex justify-between">
          <span>Delivery Fee</span>
          <span>${order.chargeDetails.deliveryFee}</span>
        </p>
        <p className="flex justify-between">
          <span>Service Fee (10%)</span>
          <span>${order.chargeDetails.serviceFee}</span>
        </p>
        <p className="flex justify-between text-black">
          <span>Total</span>
          <span>${order.chargeDetails.total}</span>
        </p>
      </div>
    </div>
  );
};

export default index;

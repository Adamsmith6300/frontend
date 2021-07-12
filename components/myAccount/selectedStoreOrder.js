import moment from "moment";
import { BsFillCircleFill } from "react-icons/bs";

export const getStatus = (status) => {
  switch (status) {
    case "ordered":
      return (
        <span>
          prepare for pickup
          <BsFillCircleFill className="inline text-yellow-300 ml-1" />
        </span>
      );
    case "out_for_delivery":
      return (
        <span>
          picked up
          <BsFillCircleFill className="inline text-blue-400 ml-2" />
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
    let chosenVariant = item.chosenVariant && item.chosenVariant != null;
    let image = item.images[0].src,
      price = item.price,
      optionValues = null;
    if (chosenVariant) {
      image = item.chosenVariant.image.src;
      price = item.chosenVariant.price;
      optionValues = item.chosenVariant.optionValues.map((option, index) => {
        return (
          <span
            key={index + option.value}
            className="border rounded-3xl bg-gray-300 p-1 px-3 mr-1 my-1 inline h-10"
          >
            {option.value}
          </span>
        );
      });
    }
    return (
      <div className="flex justify-start place-items-center mb-3">
        <div className="w-100 h-75 overflow-hidden">
          <img src={image} className="h-full" />
        </div>
        <div className="w-200 pl-3">
          <p className="text-lg">{item.title}</p>
          {optionValues ? <p className="text-lg">{optionValues}</p> : null}
          <p className="text-lg">Price: ${price}</p>
          <p className="text-lg">Quantity: {item.qty}</p>
        </div>
      </div>
    );
  });

  return (
    <div className="pl-2">
      <button
        className="btn-no-size-color bg-black px-6 py-2"
        onClick={() => setSelectedOrder(null)}
      >
        Back
      </button>
      <p className="text-3xl my-3">Order Details</p>
      <div className=" p-3 border border-1 w-350 text-base">
        <p className="text-lg">{order.items.length} Item(s)</p>
        <p className="text-lg">Status: {getStatus(order.status)}</p>
        <p className="text-lg">Order # {order.OrderId}</p>
        <p className="text-lg">
          Ordered: {moment.unix(order.created).format("MMMM Do YYYY")}
        </p>
      </div>
      <p className="text-3xl my-3">Items</p>
      <div className=" p-3 pb-0 border border-1 w-350 text-base">{items}</div>
    </div>
  );
};

export default index;

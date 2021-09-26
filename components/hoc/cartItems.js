import { roundToTwo } from "../../store/helpers";

const cartItems = ({ cartData, addToCart, removeFromCart }) => {
  if (!cartData || !cartData.items) return null;
  return Object.entries(cartData.items).map((entry, index) => {
    let item = entry[1];
    let mainImageUrl = item.images[0].src;
    let visiblePrice = item.price;
    let optionVals = [];
    if (item.chosenVariant && item.chosenVariant != null) {
      if (item.chosenVariant.image != null) {
        mainImageUrl = item.images[item.chosenVariant.image.displayIndex].src;
      }
      visiblePrice = item.chosenVariant.price;
      optionVals = item.chosenVariant.optionValues.map((option, index) => {
        return option.value;
      });
    }
    if (visiblePrice < 1) visiblePrice = item.price;
    visiblePrice = roundToTwo(visiblePrice);
    return (
      <div key={entry[0]} className="flex justify-start w-full my-6">
        <div className="w-1/3 overflow-x-hidden mr-4 flex justify-center">
          <img src={mainImageUrl} className="h-100" />
        </div>
        <div className="w-2/3 text-left">
          <p className="text-lg">
            {item.title.length > 70
              ? item.title.substring(0, 67) + "..."
              : item.title}
          </p>
          {optionVals.length > 0 ? (
            <p className="text-sm">
              {optionVals.map((val, index) => {
                return (
                  <span
                    key={val}
                    className="border rounded-3xl bg-gray-300 p-1 px-3 mr-1 my-1 inline h-10"
                  >
                    {val}
                  </span>
                );
              })}
            </p>
          ) : null}
          <p className="text-base text-grey-300 mb-1">${visiblePrice}</p>
          <button
            className="btn-no-size p-2 px-5"
            onClick={() => removeFromCart(item, cartData, 1)}
          >
            -
          </button>
          <span className="p-2 px-4">{item.qty}</span>
          <button
            className="btn-no-size p-2 px-4"
            onClick={() => addToCart(item, cartData, 1)}
          >
            +
          </button>
          <button
            className="mt-2 text-red-500 block"
            onClick={() => removeFromCart(item, cartData, item.qty)}
          >
            remove
          </button>
        </div>
      </div>
    );
  });
};

export default cartItems;

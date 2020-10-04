import { Button } from "semantic-ui-react";
import CartSummary from "./cartSummary";
const index = ({
  toggleCart,
  showCart,
  cartData,
  addToCart,
  removeFromCart,
}) => {
  const items = Object.entries(cartData.items).map((entry, index) => {
    let item = entry[1];
    let mainImageUrl = `${process.env.NEXT_PUBLIC_PRODUCT_IMAGE_URL}/${
      item.MerchantId
    }/${item.ProductId}/${item.images[item.mainImage]}`;
    return (
      <div key={entry[0]} className="flex justify-center">
        <img src={mainImageUrl} className="h-32 mr-4" />
        <div>
          <p>{item.title}</p>
          <p>${item.price}</p>
          <Button onClick={() => removeFromCart(item, cartData, 1)}>-</Button>
          <span>{item.qty}</span>
          <Button onClick={() => addToCart(item, cartData)}>+</Button>
          <Button
            className=""
            color="red"
            onClick={() => removeFromCart(item, cartData, -1)}
          >
            remove
          </Button>
        </div>
      </div>
    );
  });
  return (
    <div className="w-full h-full z-10 absolute bg-green-200 top-0 left-0">
      <p className="flex justify-end">
        <span
          onClick={() => toggleCart(false)}
          className="cursor-pointer px-8 p-4 text-2xl font-bold"
        >
          CLOSE
        </span>
      </p>
      <h2 className="text-3xl font-bolder text-center">CART</h2>
      {items.length > 0 ? (
        <>
          <div className="w-1/3 sm:w-4/5 text-center mx-auto">{items}</div>
          <CartSummary cartData={cartData} />
        </>
      ) : (
        <p className="text-xl font-bold text-center">Your cart is empty!</p>
      )}
    </div>
  );
};

export default index;

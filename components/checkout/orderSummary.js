import CartItems from "../hoc/cartItems";

const orderSummary = ({ cartData, addToCart, removeFromCart }) => {
  return (
    <div className="w-full lg:w-1/2 p-6 mx-auto text-center pt-12">
      <CartItems
        cartData={cartData}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
      />
    </div>
  );
};

export default orderSummary;

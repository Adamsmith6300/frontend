import CartItems from "../hoc/cartItems";

const orderSummary = ({ cartData, addToCart, removeFromCart }) => {
  return (
    <div className="w-1/2 mx-auto text-center pt-12">
      <CartItems
        items={cartData.items}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
      />
    </div>
  );
};

export default orderSummary;

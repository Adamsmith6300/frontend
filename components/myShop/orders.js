const Orders = ({ orders }) => {
  let orderList = [];
  if (orders && orders.length > 0) {
    orderList = orders;
  }
  orderList = orderList.map((order, index) => {
    return <p key={index + order.OrderId}>{order.OrderId}</p>;
  });
  return (
    <div>
      <h2>Orders</h2>
      {orderList.length > 0 ? orderList : <p>You don't have any orders yet!</p>}
    </div>
  );
};

export default Orders;

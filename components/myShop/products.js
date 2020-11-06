const Products = ({ products }) => {
  let productList = [];
  if (products && products.length > 0) {
    productList = products;
  }
  productList = productList.map((prod, index) => {
    return <p key={index + prod.title}>{prod.title}</p>;
  });
  return (
    <div>
      <h2>Products</h2>

      {productList.length > 0 ? (
        productList
      ) : (
        <p>You don't have any products yet!</p>
      )}
    </div>
  );
};

export default Products;

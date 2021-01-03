import Product from "./product";
import SelectedProduct from "./selectedProduct";
import { useState } from "react";

const Products = ({ products }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  let productList = products.map((prod, index) => {
    return (
      <Product
        key={index + prod.title}
        product={prod}
        index={index}
        selectedProduct={selectedProduct}
        setSelectedProduct={setSelectedProduct}
      />
    );
  });

  if (selectedProduct != null) {
    return (
      <SelectedProduct
        key={products[selectedProduct].ProductId}
        setSelectedProduct={setSelectedProduct}
        product={products[selectedProduct]}
      />
    );
  } else {
    return (
      <div className="flex flex-wrap">
        {productList.length > 0 ? (
          productList
        ) : (
          <p>You don't have any products yet!</p>
        )}
      </div>
    );
  }
};

export default Products;

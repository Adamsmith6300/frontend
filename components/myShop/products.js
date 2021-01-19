import Product from "./product";
import SelectedProduct from "./selectedProduct";
import NewProductForm from "./newProductForm";
import { useState } from "react";
import { BsPlusCircle } from "react-icons/bs";

const Products = ({ products, callFetchMerchData, MerchantId }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newProductForm, showNewProductForm] = useState(false);
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

  if (newProductForm) {
    return (
      <NewProductForm
        MerchantId={MerchantId}
        showNewProductForm={showNewProductForm}
      />
    );
  }
  if (selectedProduct != null) {
    return (
      <SelectedProduct
        key={products[selectedProduct].ProductId}
        setSelectedProduct={setSelectedProduct}
        product={products[selectedProduct]}
        callFetchMerchData={callFetchMerchData}
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
        <div
          onClick={() => showNewProductForm(true)}
          className="w-32 h-24 m-2 cursor-pointer text-center pt-8"
        >
          <p className="text-lg text-center">
            <span className="mr-1">Add Product</span>
            <BsPlusCircle className="inline text-sm" />
          </p>
        </div>
      </div>
    );
  }
};

export default Products;

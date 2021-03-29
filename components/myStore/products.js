import { useState } from "react";
import { deleteProducts } from "../../store/helpers";
import Product from "./addProduct/product";
// import SelectedProduct from "./addProduct/selectedProduct";
// import NewProductForm from "./addProduct/newProductForm";

const Products = ({
  products,
  callFetchMerchData,
  MerchantId,
  setShowModal,
  setModalContent,
  categories,
}) => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  // const [newProductForm, showNewProductForm] = useState(false);

  const callDeleteProducts = async (payload) => {
    try {
      let resp = await deleteProducts(payload);
      console.log(resp);
    } catch (err) {
      console.log(err);
    }
  };

  let productList = products.map((prod, index) => {
    return (
      <Product
        key={index + prod.title}
        product={prod}
        categories={categories}
        index={index}
        selectedProducts={selectedProducts}
        setSelectedProducts={setSelectedProducts}
        callDeleteProducts={callDeleteProducts}
      />
    );
  });

  // if (newProductForm) {
  //   return (
  //     <NewProductForm
  //       MerchantId={MerchantId}
  //       showNewProductForm={showNewProductForm}
  //     />
  //   );
  // }
  // if (selectedProduct != null) {
  //   return (
  //     <SelectedProduct
  //       key={products[selectedProduct].ProductId}
  //       setSelectedProduct={setSelectedProduct}
  //       product={products[selectedProduct]}
  //       callFetchMerchData={callFetchMerchData}
  //     />
  //   );
  // } else {
  return (
    <>
      {selectedProducts && selectedProducts.length > 0 ? (
        <button
          onClick={() =>
            callDeleteProducts({
              products: selectedProducts,
              MerchantId: MerchantId,
            })
          }
          className="btn-no-size-color bg-red-400 px-8 py-4 m-2"
        >
          Delete Selected
        </button>
      ) : null}
      <div className="flex flex-wrap justify-start max-w-1250 mx-auto">
        {productList.length > 0 ? (
          productList
        ) : (
          <p className="text-3xl text-center w-full font-bold">
            You don't have any products yet! Start by importing from your store.
          </p>
        )}
        {/* <div
            onClick={() => showNewProductForm(true)}
            className="w-32 h-24 m-2 cursor-pointer text-center pt-8"
          >
            <p className="text-lg text-center">
              <span className="mr-1">Add Product</span>
              <BsPlusCircle className="inline text-sm" />
            </p>
          </div> */}
      </div>
      <button
        className="btn-shadowed mt-8 mx-auto px-16 py-4 grid grid-cols-2 place-items-center"
        onClick={() => {
          setModalContent("shopifyImport");
          setShowModal(true);
        }}
      >
        <span>Import from</span>
        <img className="h-12" src="./shopify_logo.png" />
      </button>
    </>
  );
  // }
};

export default Products;

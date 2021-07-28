import { useState } from "react";
import { deleteProducts } from "../../store/helpers";
import Product from "./addProduct/product";
import EditProductForm from "./addProduct/editProductForm";
import NewProductForm from "./addProduct/newProductForm";
import { BsPlusCircle } from "react-icons/bs";

const Products = ({
  products,
  callFetchMerchData,
  MerchantId,
  setShowModal,
  setModalContent,
  categories,
  setLoading,
  storename,
}) => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [newProductForm, showNewProductForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const callDeleteProducts = async (payload) => {
    try {
      setLoading(true);
      let resp = await deleteProducts(payload);
      callFetchMerchData();
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
        selectedProduct={selectedProduct}
        setSelectedProduct={setSelectedProduct}
        callDeleteProducts={callDeleteProducts}
      />
    );
  });

  if (newProductForm) {
    return (
      <NewProductForm
        MerchantId={MerchantId}
        showNewProductForm={showNewProductForm}
        callFetchMerchData={callFetchMerchData}
        setLoading={setLoading}
        storename={storename}
        categories={categories}
      />
    );
  }
  if (selectedProduct != null) {
    return (
      <EditProductForm
        key={products[selectedProduct].ProductId}
        setSelectedProduct={setSelectedProduct}
        product={products[selectedProduct]}
        callFetchMerchData={callFetchMerchData}
        setLoading={setLoading}
        categories={categories}
      />
    );
  } else {
    return (
      <>
        <div className="flex flex-wrap justify-center max-w-1250 mx-auto">
          {productList.length > 0 ? (
            productList
          ) : (
            <p className="text-3xl text-center w-full font-bold">
              You don't have any products yet! Start by adding some below
            </p>
          )}
          <div className="m-2 mt-8 w-full flex flex-wrap justify-center">
            <button
              onClick={() => showNewProductForm(true)}
              className="btn-no-size-color bg-black px-8 py-4 m-2"
            >
              <span>Add Product</span>
              {/* <BsPlusCircle className="inline text-sm" /> */}
            </button>

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
          </div>
        </div>
        {/* <button
        className="btn-shadowed mt-8 mx-auto px-8 lg:px-16 py-4 grid grid-cols-2 place-items-center"
        onClick={() => {
          setModalContent("shopifyImport");
          setShowModal(true);
        }}
      >
        <span>Import from</span>
        <img className="h-12" src="./shopify_logo.png" />
      </button> */}
      </>
    );
  }
};

export default Products;

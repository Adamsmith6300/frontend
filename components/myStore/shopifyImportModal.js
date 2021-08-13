import { useState, useEffect } from "react";
import { Loader } from "semantic-ui-react";

import {
  getAuthUrl,
  getShopifyProducts,
  importProducts,
} from "../../store/helpers";

import ShopifyProductImport from "./shopifyProductImport";
// import ProductToImport from "./productToImport";

const index = ({ myShop, closeModal, callFetchMerchData }) => {
  const [step, setStep] = useState(myShop.info.connectedStore ? 1 : 0);
  const [shopifyStoreName, updateShopifyStoreName] = useState(null);
  const [shopifyProducts, updateShopifyProducts] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const connectShopifyStore = async () => {
    let auth_url = await getAuthUrl(shopifyStoreName);
    setStep(1);
  };

  const callGetShopifyProducts = async () => {
    let response = await getShopifyProducts();
    updateShopifyProducts(response.data);
  };

  const submitImport = async (e) => {
    e.stopPropagation();
    setLoading(true);
    let response = await importProducts(selectedProducts);
    await callFetchMerchData();
    setLoading(false);
    setStep(2);
  };

  useEffect(() => {
    if (!shopifyProducts && step == 1) {
      callGetShopifyProducts();
    }
  }, []);

  let productList = shopifyProducts
    ? shopifyProducts.map((prod, index) => {
        return (
          <ShopifyProductImport
            setSelectedProducts={setSelectedProducts}
            selectedProducts={selectedProducts}
            key={prod.id}
            prod={prod}
          />
        );
      })
    : [];

  switch (step) {
    case 0:
      return (
        <div className="grid place-items-center w-full">
          <p className="text-center text-2xl font-bold mb-12">
            Connect your Shopify store
          </p>
          <div className="w-300">
            <input
              className="inline pl-3 py-1 h-10 bg-gray-200 mb-6"
              name="shopifyStoreName"
              type="text"
              onChange={(e) => updateShopifyStoreName(e.target.value)}
            />
            <span>.myshopify.com</span>
          </div>
          <button
            className="btn-no-size-color px-8 py-3 bg-black ml-2"
            onClick={(e) => {
              e.stopPropagation();
              connectShopifyStore();
            }}
          >
            Connect
          </button>
        </div>
      );
    case 1:
      return (
        <div className="grid place-items-center w-full">
          {shopifyProducts && !loading ? (
            <>
              <p className="text-center text-2xl font-bold">
                Select Products to import
              </p>
              <ul className="list-reset my-6 overflow-y-auto max-h-500 w-full">
                {productList}
              </ul>
              <p className="mb-6">
                {selectedProducts.length} product(s) selected to import
              </p>
              <button
                disabled={selectedProducts.length <= 0}
                className={`btn-no-size-color px-8 py-3 ml-2 ${
                  selectedProducts.length <= 0
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-black cursor-pointer"
                }`}
                onClick={(e) => submitImport(e)}
              >
                Confirm & Import
              </button>
            </>
          ) : (
            <Loader inline="centered" active />
          )}
        </div>
      );
    case 2:
      return (
        <div className="grid place-items-center w-full">
          <p className="text-center text-2xl font-bold mb-6">
            Successfully imported products!
          </p>

          <button
            className="btn-no-size-color px-8 py-3 bg-black ml-2"
            onClick={(e) => {
              e.stopPropagation();
              closeModal();
            }}
          >
            Close
          </button>
        </div>
      );
  }
};

export default index;

import { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { useRouter } from "next/router";

import actions from "../store/actions";

import Layout from "../components/hoc/layout";
import { LargeLoader } from "../components/loaders";
import ProductGrid from "../components/home/productGrid";

const Page = ({ addToCart, cartData, clearFlag }) => {
  const [products, setProducts] = useState(null);
  const router = useRouter();
  useEffect(() => {
    const getProducts = async () => {
      const { category } = router.query;
      let url = `${process.env.NEXT_PUBLIC_API_URL}/market/products?`;
      if (category) {
        url += "&category=" + category;
      }
      return await axios.get(url);
    };
    getProducts()
      .then((resp) => {
        setProducts(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Layout>
      <div className="flex flex-wrap justify-start max-w-1250 mx-auto">
        {products != null ? (
          <ProductGrid
            products={products}
            addToCart={addToCart}
            cartData={cartData}
          />
        ) : (
          <LargeLoader />
        )}
      </div>
    </Layout>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProducts: () => dispatch(actions.getProducts()),
    addToCart: (product, oldCart) =>
      dispatch(actions.addToCart(product, oldCart)),
    clearFlag: (flag) => dispatch(actions.clearFlag(flag)),
  };
};

export default connect((state) => state, mapDispatchToProps)(Page);

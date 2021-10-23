import { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import { Loader } from "semantic-ui-react";

import actions from "../store/actions";

import Layout from "../components/hoc/layout";
import { LargeLoader } from "../components/loaders";
import ProductGrid from "../components/home/productGrid";
import Head from "next/head";

const Page = ({ categories, addToCart, cartData, clearFlag }) => {
  const [products, setProducts] = useState(null);
  const [startKey, setStartKey] = useState(null);
  const [moreProducts, setMoreProducts] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const router = useRouter();
  let path = router.asPath;
  const lim = 8;
  const getProducts = async (start = null) => {
    const { category } = router.query;
    let url = `${process.env.NEXT_PUBLIC_API_URL}/market/products?lim=${lim}`;
    if (category) {
      url += "&category=" + category;
    }
    if (start != null) {
      url += "&start=" + start;
    }
    return await axios.get(url);
  };
  useEffect(() => {
    setProducts(null);
    getProducts()
      .then((resp) => {
        setProducts(resp.data.Products);
        if (resp.data.LastEvaluatedKey) {
          setStartKey([resp.data.LastEvaluatedKey.ProductId]);
          setMoreProducts(true);
        } else {
          setMoreProducts(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [path]);

  return (
    <Layout loading={products == null}>
      <Head>
        <title>Products - Loma</title>
      </Head>
      {categories != null && router.query.category != null ? (
        <h2 className="text-3xl text-center">
          {
            categories.filter((cat) => {
              return cat.CategoryIndex == router.query.category;
            })[0]["name"]
          }
        </h2>
      ) : null}
      <div className="flex flex-wrap justify-center xl:justify-start max-w-1250 mx-auto">
        {products != null ? (
          <>
            <ProductGrid
              products={products}
              addToCart={addToCart}
              cartData={cartData}
            />
            {moreProducts ? (
              <div className="w-full text-center py-12">
                {loadingProducts ? (
                  <Loader active inline="centered" />
                ) : (
                  <button
                    onClick={() => {
                      setLoadingProducts(true);
                      getProducts(startKey[0])
                        .then((resp) => {
                          setProducts([...products, ...resp.data.Products]);
                          if (resp.data.LastEvaluatedKey) {
                            setStartKey([resp.data.LastEvaluatedKey.ProductId]);
                          } else {
                            setMoreProducts(false);
                          }
                          setLoadingProducts(false);
                        })
                        .catch((err) => {
                          console.log(err);
                          setLoadingProducts(false);
                        });
                    }}
                    className="btn-no-size-color px-6 py-2 bg-black"
                  >
                    Load more
                  </button>
                )}
              </div>
            ) : null}
          </>
        ) : null}
      </div>
    </Layout>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    // getProducts: () => dispatch(actions.getProducts()),
    addToCart: (product, oldCart, qty) =>
      dispatch(actions.addToCart(product, oldCart, qty)),
    clearFlag: (flag) => dispatch(actions.clearFlag(flag)),
    getCategories: () => dispatch(actions.getCategories()),
  };
};

export default connect((state) => state, mapDispatchToProps)(Page);

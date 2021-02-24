import { useEffect, useState } from "react";
import Layout from "../../components/hoc/layout";
import { connect } from "react-redux";
import actions from "../../store/actions";
import { useRouter } from "next/router";
import axios from "axios";
import { LargeLoader } from "../../components/loaders";
import ProductGrid from "../../components/home/productGrid";

const Page = ({ addToCart, cartData }) => {
  const [merchant, setMerchant] = useState(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchMerchant() {
      try {
        const { MerchantId } = router.query;
        console.log("MerchantId", MerchantId);
        const resp = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/market/merchants/${MerchantId}`
        );
        console.log(resp.data);
        setMerchant(resp.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchMerchant();
  }, []);

  let bgStyle =
    merchant != null
      ? { backgroundImage: `url(${merchant.info.bannerImage})` }
      : {};

  return (
    <Layout>
      {merchant != null ? (
        <>
          <div style={bgStyle} className="bg-img merchant--banner" />
          <div className="px-64 pt-12">
            <h1 className="text-5xl my-12 flex justify-between">
              <span>{merchant.info.busname}</span>
              <a href={merchant.info.website} target="_blank">
                <button className="btn-no-size px-8 py-4">Visit Website</button>
              </a>
            </h1>
            <div className="flex flex-wrap justify-start max-w-1250 mx-auto">
              <ProductGrid
                products={merchant.products}
                addToCart={addToCart}
                cartData={cartData}
              />
            </div>
            {merchant.info.about != null ? (
              <div>
                <p>About {merchant.info.busname}</p>
                <p>{merchant.info.about}</p>
              </div>
            ) : null}
          </div>
        </>
      ) : (
        <LargeLoader />
      )}
    </Layout>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (product, oldCart) =>
      dispatch(actions.addToCart(product, oldCart)),
    clearFlag: (flag) => dispatch(actions.clearFlag(flag)),
  };
};

export default connect((state) => state, mapDispatchToProps)(Page);

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
        const resp = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/market/merchants/${MerchantId}`
        );
        setMerchant(resp.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchMerchant();
  }, []);

  let bannerUrl;
  if (merchant && merchant.info.bannerImage) {
    bannerUrl = merchant.info.bannerImage.includes("http")
      ? merchant.info.bannerImage
      : `${process.env.NEXT_PUBLIC_MERCHANT_IMAGE_URL}/${merchant.info.MerchantId}/${merchant.info.bannerImage}`;
  } else {
    bannerUrl = `${process.env.NEXT_PUBLIC_MERCHANT_IMAGE_URL}/sampleBanner`;
  }

  let bgStyle = { backgroundImage: `url(${bannerUrl})` };

  return (
    <Layout>
      {merchant != null ? (
        <>
          <div style={bgStyle} className="bg-img merchant--banner" />
          <div className="pt-6 px-6 lg:px-64 lg:pt-12">
            <h1 className="text-5xl lg:my-12 flex justify-center lg:justify-between">
              <span>{merchant.info.storename}</span>
              {/* <a
                className="lg:inline hidden btn-no-size px-8 py-4"
                href={merchant.info.website}
                target="_blank"
              >
                Visit Website
              </a> */}
            </h1>
            <div className="flex flex-wrap justify-start max-w-1250 mx-auto">
              <ProductGrid
                products={merchant.products}
                addToCart={addToCart}
                cartData={cartData}
              />
            </div>
            {/* <div className="text-center">
              <a
                className="block lg:hidden mt-12"
                href={merchant.info.website}
                target="_blank"
              >
                <button className="btn-no-size px-8 py-4">Visit Website</button>
              </a>
            </div> */}
            {merchant.info.about != null && merchant.info.about.length > 0 ? (
              <div className="pt-12">
                <p className="font-medium mb-3">
                  About {merchant.info.storename}:
                </p>
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
    addToCart: (product, oldCart, qty) =>
      dispatch(actions.addToCart(product, oldCart, qty)),
    clearFlag: (flag) => dispatch(actions.clearFlag(flag)),
  };
};

export default connect((state) => state, mapDispatchToProps)(Page);

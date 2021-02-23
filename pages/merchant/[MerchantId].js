import { useEffect, useState } from "react";
import Layout from "../../components/hoc/layout";
import { connect } from "react-redux";
import actions from "../../store/actions";
import { useRouter } from "next/router";
import axios from "axios";
import { LargeLoader } from "../../components/loaders";

const Page = ({}) => {
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

  return (
    <Layout>
      {merchant != null ? <h1>{merchant.info.busname}</h1> : <LargeLoader />}
    </Layout>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearFlag: (flag) => dispatch(actions.clearFlag(flag)),
  };
};

export default connect((state) => state, mapDispatchToProps)(Page);

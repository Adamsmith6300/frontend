import React, { useEffect, useState } from "react";
import Layout from "../components/hoc/layout";
import { connect } from "react-redux";
import actions from "../store/actions";
import { withRouter } from "next/router";
import Link from "next/link";
import { LargeLoader } from "../components/loaders";
import Account from "../components/myAccount/account";
import {
  isLoggedIn,
  checkMerchant,
  fetchAccountData,
  fetchMerchantData,
} from "../store/helpers";

const Page = ({ router, myShop, setMerchantData }) => {
  const [loggedIn, updateLoggedIn] = useState(null);
  const [accountData, setAccountData] = useState(null);
  const [isMerchant, updateIsMerchant] = useState(false);
  const [loading, setLoading] = useState(false);

  async function callFetchAccountData() {
    try {
      let resp = await fetchAccountData();
      setAccountData(resp.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      router.push("/");
    }
  }

  async function callFetchMerchData() {
    try {
      let resp = await fetchMerchantData();
      setMerchantData(resp.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    let l = isLoggedIn();
    console.log(l);
    updateLoggedIn(l);
    let m = checkMerchant();
    updateIsMerchant(m);
    if (!l) {
      router.push("/");
    }
    if (!accountData) {
      callFetchAccountData();
    }
    if (!myShop && m) {
      callFetchMerchData();
    }
  }, []);

  return (
    <Layout loading={loading}>
      {loggedIn && accountData != null ? (
        <>
          <Account
            isMerchant={isMerchant}
            accountData={accountData}
            myShop={myShop}
            callFetchMerchData={callFetchMerchData}
            callFetchAccountData={callFetchAccountData}
            setLoading={setLoading}
          />
        </>
      ) : null}
    </Layout>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearFlag: (flag) => dispatch(actions.clearFlag(flag)),
    setMerchantData: (data) => dispatch(actions.setMerchantData(data)),
  };
};

export default connect((state) => state, mapDispatchToProps)(withRouter(Page));

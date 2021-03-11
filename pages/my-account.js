import React, { useEffect, useState } from "react";
import Layout from "../components/hoc/layout";
import { connect } from "react-redux";
import actions from "../store/actions";
import { withRouter } from "next/router";
import Link from "next/link";
import { isLoggedIn, checkMerchant } from "../store/helpers";
import { LargeLoader } from "../components/loaders";
import Account from "../components/myAccount/account";
import { fetchAccountData } from "../store/helpers";

const Page = ({ router }) => {
  const [loggedIn, updateLoggedIn] = useState(null);
  const [accountData, setAccountData] = useState(null);

  async function callFetchAccountData() {
    try {
      let resp = await fetchAccountData();
      setAccountData(resp.data);
    } catch (err) {
      console.log(err);
      router.push("/");
    }
  }

  useEffect(() => {
    updateLoggedIn(isLoggedIn());
    if (!loggedIn && loggedIn != null) {
      router.push("/");
    }
    if (accountData == null) {
      callFetchAccountData();
    }
    let merchant = checkMerchant();
    if (merchant) {
      router.push("/my-store");
    }
  }, []);

  return (
    <Layout>
      {loggedIn && accountData != null ? (
        <>
          <Account
            accountData={accountData}
            callFetchAccountData={callFetchAccountData}
          />
        </>
      ) : (
        <LargeLoader />
      )}
    </Layout>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearFlag: (flag) => dispatch(actions.clearFlag(flag)),
  };
};

export default connect((state) => state, mapDispatchToProps)(withRouter(Page));

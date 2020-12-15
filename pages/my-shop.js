import React, { useEffect, useState } from "react";
import Layout from "../components/hoc/layout";
import { connect, useStore } from "react-redux";
import actions from "../store/actions";
import { withRouter } from "next/router";
import Link from "next/link";
import { Button, Checkbox, Form, Input, TextArea } from "semantic-ui-react";
import { isLoggedIn, checkMerchant, fetchMerchantData } from "../store/helpers";
import ShopMenu from "../components/myShop/shopMenu";
import { Orders, Products, StoreDetails, Payments } from "../components/myShop";

const Page = ({ router, myShop, setMerchantData }) => {
  const [isMerchant, updateIsMerchant] = useState(false);
  const [loggedIn, updateLoggedIn] = useState(false);
  const [checkedAuth, updateCheckedAuth] = useState(false);
  const [activeSection, updateActiveSection] = useState(2);
  const [merchantDataExists, setMerchantDataExists] = useState(
    Object.keys(myShop).length > 0
  );
  useEffect(() => {
    updateLoggedIn(isLoggedIn());
    updateIsMerchant(checkMerchant());
    updateCheckedAuth(true);

    async function callFetchMerchData() {
      try {
        let resp = await fetchMerchantData();
        setMerchantData(resp.data);
        setMerchantDataExists(true);
      } catch (err) {
        console.log(err);
      }
    }

    if (!merchantDataExists) {
      callFetchMerchData();
    }
  }, []);

  if ((!loggedIn || !isMerchant) && checkedAuth) {
    router.push("/");
  }

  let sections = [
    <Orders orders={myShop.orders} />,
    <Products products={myShop.products} />,
    <StoreDetails info={myShop.info} />,
    <Payments />,
  ];

  return (
    <Layout>
      {myShop.info ? (
        <h1 className="text-3xl text-center text-black">
          Welcome, {myShop.info.name}!
        </h1>
      ) : null}
      <div className="flex text-black">
        <ShopMenu
          activeSection={activeSection}
          updateActiveSection={updateActiveSection}
        />
        {sections[activeSection]}
      </div>
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

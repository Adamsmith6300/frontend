import React, { useEffect, useState, useRef } from "react";
import Layout from "../components/hoc/layout";
import { connect, useStore } from "react-redux";
import actions from "../store/actions";
import { withRouter } from "next/router";
import Link from "next/link";
import { Accordion, Icon, Button } from "semantic-ui-react";
import { isLoggedIn, checkMerchant, fetchMerchantData } from "../store/helpers";
import {
  Orders,
  Products,
  StoreDetails,
  Payments,
  Banner,
} from "../components/myShop";
import { LargeLoader } from "../components/loaders";

const Page = ({ router, myShop, setMerchantData }) => {
  const [isMerchant, updateIsMerchant] = useState(false);
  const [loggedIn, updateLoggedIn] = useState(false);
  const [checkedAuth, updateCheckedAuth] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [merchantDataExists, setMerchantDataExists] = useState(
    Object.keys(myShop).length > 0
  );

  async function callFetchMerchData() {
    try {
      let resp = await fetchMerchantData();
      setMerchantData(resp.data);
      setMerchantDataExists(true);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    updateLoggedIn(isLoggedIn());
    updateIsMerchant(checkMerchant());
    updateCheckedAuth(true);

    if (!merchantDataExists) {
      callFetchMerchData();
    }
  }, []);

  if ((!loggedIn || !isMerchant) && checkedAuth) {
    router.push("/");
  }

  return (
    <Layout>
      {myShop.info ? (
        <div className="my-account-container">
          <Banner
            MerchantId={myShop.info.MerchantId}
            name={myShop.info.name}
            bannerImageName={myShop.info.bannerImage}
          />
          <Accordion fluid styled>
            <Accordion.Title
              active={activeIndex === 0}
              index={0}
              onClick={() => setActiveIndex(activeIndex === 0 ? -1 : 0)}
            >
              <Icon name="dropdown" />
              Orders
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 0}>
              <Orders orders={myShop.orders} />
            </Accordion.Content>

            <Accordion.Title
              active={activeIndex === 1}
              index={1}
              onClick={() => setActiveIndex(activeIndex === 1 ? -1 : 1)}
            >
              <Icon name="dropdown" />
              Products
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 1}>
              <Products products={myShop.products} />
            </Accordion.Content>
            <Accordion.Title
              active={activeIndex === 2}
              index={2}
              onClick={() => setActiveIndex(activeIndex === 2 ? -1 : 2)}
            >
              <Icon name="dropdown" />
              Shop Details
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 2}>
              <StoreDetails
                info={myShop.info}
                callFetchMerchData={callFetchMerchData}
              />
            </Accordion.Content>
            <Accordion.Title
              active={activeIndex === 3}
              index={3}
              onClick={() => setActiveIndex(activeIndex === 3 ? -1 : 3)}
            >
              <Icon name="dropdown" />
              Payments
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 3}>
              <Payments />
            </Accordion.Content>
          </Accordion>
        </div>
      ) : (
        <LargeLoader />
      )}
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

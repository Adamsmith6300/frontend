import { Accordion, Icon, Button } from "semantic-ui-react";
import { useState } from "react";
import MyOrders from "./myOrders";
import StoreOrders from "./storeOrders";
import AccountDetails from "./accountDetails";
import Payments from "./payments";

const index = ({
  accountData,
  myShop,
  isMerchant,
  callFetchAccountData,
  callFetchMerchData,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  let info = myShop ? myShop.info : accountData.info;
  let mId = myShop ? myShop.info.MerchantId : null;
  return (
    <div className="my-account-container">
      <Accordion id="account-details" fluid styled>
        <Accordion.Title
          active={activeIndex === 0}
          index={0}
          onClick={() => setActiveIndex(activeIndex === 0 ? -1 : 0)}
        >
          <Icon name="dropdown" />
          Account Details
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 0}>
          <AccountDetails
            info={info}
            isMerchant={isMerchant}
            mId={mId}
            callFetchMerchData={callFetchMerchData}
            callFetchAccountData={callFetchAccountData}
          />
        </Accordion.Content>
        <Accordion.Title
          active={activeIndex === 1}
          index={1}
          onClick={() => setActiveIndex(activeIndex === 1 ? -1 : 1)}
        >
          <Icon name="dropdown" />
          {isMerchant ? "Store Orders" : "Orders"}
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 1}>
          {isMerchant ? (
            <StoreOrders orders={myShop.orders} />
          ) : (
            <MyOrders orders={accountData.orders} />
          )}
        </Accordion.Content>
        {isMerchant && myShop ? (
          <>
            <Accordion.Title
              active={activeIndex === 2}
              index={2}
              onClick={() => setActiveIndex(activeIndex === 2 ? -1 : 2)}
            >
              <Icon name="dropdown" />
              Payments
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 2}>
              <Payments
                stripe_onboard_complete={myShop.info.stripe_onboard_complete}
              />
            </Accordion.Content>
          </>
        ) : null}
      </Accordion>
    </div>
  );
};
export default index;

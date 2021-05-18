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
  const [activeIndex, setActiveIndex] = useState(-1);
  let info = myShop ? myShop.info : accountData.info;
  let mId = myShop ? myShop.info.MerchantId : null;
  return (
    <div className="my-account-container">
      <>
        <h3 className="text-3xl">My Account</h3>
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
            Orders
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 1}>
            <MyOrders orders={accountData.orders} />
          </Accordion.Content>
        </Accordion>
        {isMerchant && myShop ? (
          <>
            <h3 className="mt-8 text-3xl">My Store</h3>
            <Accordion id="account-details" fluid styled>
              <Accordion.Title
                active={activeIndex === 2}
                index={2}
                onClick={() => setActiveIndex(activeIndex === 2 ? -1 : 2)}
              >
                <Icon name="dropdown" />
                Store Orders
              </Accordion.Title>
              <Accordion.Content active={activeIndex === 2}>
                <StoreOrders orders={myShop.orders} />
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
                <Payments
                  stripe_onboard_complete={myShop.info.stripe_onboard_complete}
                />
              </Accordion.Content>
            </Accordion>
          </>
        ) : null}
      </>
    </div>
  );
};
export default index;

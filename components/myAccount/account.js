import { Accordion, Icon, Button } from "semantic-ui-react";
import { useState } from "react";
import MyOrders from "./myOrders";
import AccountDetails from "./accountDetails";
import Link from "next/link";
const index = ({ accountData, callFetchAccountData }) => {
  const [activeIndex, setActiveIndex] = useState(-1);
  let info = accountData.info;
  return (
    <div className="my-account-container">
      <h2 className="w-full text-center text-black text-3xl mb-5">
        Welcome {info.name},
      </h2>
      <Accordion fluid styled>
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
      <div>
        <p>Want to become a merchant?</p>
        <Link href="/merchant-application">
          <Button color="black">Apply now!</Button>
        </Link>
      </div>
    </div>
  );
};
export default index;

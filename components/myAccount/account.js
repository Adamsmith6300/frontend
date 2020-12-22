import { Accordion, Icon } from "semantic-ui-react";
import { useState } from "react";
import MyOrders from "./myOrders";

const index = ({ accountData }) => {
  const [activeIndex, setActiveIndex] = useState(-1);
  let info = accountData.info;
  return (
    <div className="my-account-container">
      <h2 className="w-full text-center text-black text-3xl mb-5">
        Welcome, {info.firstname}
      </h2>
      <Accordion fluid styled>
        <Accordion.Title
          active={activeIndex === 0}
          index={0}
          onClick={() => setActiveIndex(activeIndex === 0 ? -1 : 0)}
        >
          <Icon name="dropdown" />
          My Info
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 0}>
          <ul className="list-reset mx-auto">
            <li>First Name: {info.firstname}</li>
            <li>Last Name: {info.lastname}</li>
            <li>Email Address: {info.email}</li>
            <li>Shipping Address: {info.address}</li>
          </ul>
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
    </div>
  );
};
export default index;

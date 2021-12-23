import { Fragment, useState } from "react";
import { Accordion, Icon, Dropdown } from "semantic-ui-react";

const index = ({ vendors }) => {
  const [activeIndex, setActiveIndex] = useState(-1);

  return (
    <>
      <h3 className="text-3xl">All Vendors</h3>
      <Accordion id="account-details" fluid styled>
        {vendors.map((vendor, i) => {
          return (
            <Fragment key={vendor.MerchantId}>
              <Accordion.Title
                key={vendor.MerchantId}
                active={activeIndex === vendor.MerchantId}
                index={vendor.MerchantId}
                onClick={() => {
                  setActiveIndex(
                    activeIndex === vendor.MerchantId ? -1 : vendor.MerchantId
                  );
                }}
              >
                <p>
                  <Icon name="dropdown" />
                  {vendor.storename}
                </p>
              </Accordion.Title>
              <Accordion.Content active={activeIndex === vendor.MerchantId}>
                <ul>
                  {Object.entries(vendor).map((e, i) => {
                    if (e[0] === "pickupDays") {
                      return (
                        <li>
                          <p className="font-bold text-lg">{e[0]}:</p>
                          <ul className="pl-2">
                            {Object.entries(e[1]).map((day, j) => {
                              return (
                                <li>
                                  {day[0]}:{JSON.stringify(day[1])}
                                </li>
                              );
                            })}
                          </ul>
                        </li>
                      );
                    }
                    return (
                      <li key={e[1]}>
                        <span className="font-bold">{e[0]}: </span>
                        {e[1]}
                      </li>
                    );
                  })}
                </ul>
              </Accordion.Content>
            </Fragment>
          );
        })}
      </Accordion>
    </>
  );
};

export default index;

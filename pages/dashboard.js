import { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import { Loader } from "semantic-ui-react";
import { Accordion, Icon, Dropdown } from "semantic-ui-react";

import Layout from "../components/hoc/layout";
import { LargeLoader } from "../components/loaders";
import Head from "next/head";
import { isLoggedIn, checkAllPower } from "../store/helpers";

const Page = ({}) => {
  const [orders, setOrders] = useState(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [editOrderStatus, setEditOrderStatus] = useState(null);
  const [editMOrderStatus, setEditMOrderStatus] = useState(null);

  const [startKey, setStartKey] = useState(null);
  const [moreOrders, setMoreOrders] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const router = useRouter();
  let path = router.asPath;
  const lim = 25;

  const getOrders = async (start = null) => {
    const authRes = JSON.parse(localStorage.getItem("AuthResults"));
    let url = `${process.env.NEXT_PUBLIC_API_URL}/people/orders?lim=${lim}`;
    if (start != null) {
      url += "&starta=" + start;
    }
    return await axios.get(url, {
      headers: {
        Authorization: authRes["IdToken"],
      },
    });
  };

  useEffect(() => {
    let l = isLoggedIn();
    let p = checkAllPower();
    if (!l || !p) {
      router.push("/");
      return;
    }
    setOrders(null);
    getOrders()
      .then((resp) => {
        console.log(resp.data.orders);
        setOrders(resp.data.orders);
        if (resp.data.LastEvaluatedKey) {
          setStartKey([resp.data.LastEvaluatedKey.OrderId]);
          setMoreOrders(true);
        } else {
          setMoreOrders(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [path]);

  const isEditingMOrder = (m) => {
    return (
      editMOrderStatus != null &&
      editMOrderStatus["MerchantId"] == m["MerchantId"] &&
      editMOrderStatus["OrderId"] == m["OrderId"]
    );
  };

  const mOrderStatuses = [
    {
      key: "picked_up",
      text: "picked_up",
      value: "picked_up",
    },
    {
      key: "ready_for_pickup",
      text: "ready_for_pickup",
      value: "ready_for_pickup",
    },
    {
      key: "ordered",
      text: "ordered",
      value: "ordered",
    },
  ];
  const orderStatuses = [
    {
      key: "out_for_delivery",
      text: "out_for_delivery",
      value: "out_for_delivery",
    },
    {
      key: "delivered",
      text: "delivered",
      value: "delivered",
    },
  ];

  return (
    <Layout loading={orders == null}>
      <Head>
        <title>Dashboard - Loma</title>
      </Head>
      <div className="flex flex-wrap justify-center xl:justify-start max-w-1250 mx-auto">
        {orders != null ? (
          <>
            <h3 className="text-3xl">All Orders</h3>
            <Accordion id="account-details" fluid styled>
              {orders.map((order, i) => {
                return (
                  <>
                    <Accordion.Title
                      key={order.OrderId}
                      active={activeIndex === i}
                      index={i}
                      onClick={() => setActiveIndex(activeIndex === i ? -1 : i)}
                    >
                      <p className="flex justify-between">
                        <span>
                          <Icon name="dropdown" />
                          Order ID:{" "}
                          {order.OrderId.substring(order.OrderId.length - 8)}
                        </span>
                        <span className="font-bold ml-3">
                          {order.created_at}
                        </span>
                      </p>
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === i}>
                      <p>
                        <span className="font-bold">Deliver To: </span>
                        {JSON.stringify(order.deliveryInfo)}
                      </p>
                      <p>
                        <span className="font-bold">Email: </span>
                        {order.email}
                      </p>
                      <p>
                        <span className="font-bold">Charge Details: </span>
                        {JSON.stringify(order.chargeDetails)}
                      </p>
                      <p className="my-3">
                        <span className="font-bold">
                          Order Status: {order.orderStatus}
                        </span>
                        <button className="btn-no-size-color bg-red-600 px-4 py-2 ml-5">
                          Update
                        </button>
                      </p>
                      <p className="font-bold">Items:</p>
                      {order.merchantOrders.map((m, index) => {
                        let storename = m["items"][0]["storename"];
                        let editing = isEditingMOrder(m);
                        let items = m["items"].map((item, ind) => {
                          return (
                            <li className="flex">
                              <img
                                className="h-100"
                                src={item["images"][0]["src"]}
                              />
                              <div className="ml-3">
                                <p>{item["title"]}</p>
                                {"chosenVariant" in item &&
                                item["chosenVariant"] != null ? (
                                  <p>
                                    {item["chosenVariant"]["optionValues"].map(
                                      (val, e) => {
                                        return (
                                          <span className="border rounded-3xl bg-gray-300 p-1 px-3 mr-1 my-1 inline h-10">
                                            {val["value"]}
                                          </span>
                                        );
                                      }
                                    )}
                                  </p>
                                ) : null}
                                <p>Quantity: {item["qty"]}</p>
                              </div>
                            </li>
                          );
                        });
                        return (
                          <div className="my-5">
                            <p className="font-bold">{storename}</p>
                            <p className="my-3">
                              Status: {m["orderStatus"]}
                              {editing ? (
                                <>
                                  <button
                                    onClick={() => {
                                      setEditMOrderStatus(null);
                                    }}
                                    className="btn-no-size-color bg-black px-4 py-2 ml-5"
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    onClick={() => {
                                      console.log("updating...");
                                      console.log(editMOrderStatus);
                                    }}
                                    className="btn-no-size-color bg-green-500 px-4 py-2 ml-5"
                                  >
                                    Save
                                  </button>
                                </>
                              ) : (
                                <button
                                  onClick={() => {
                                    setEditMOrderStatus({
                                      MerchantId: m["MerchantId"],
                                      OrderId: m["OrderId"],
                                    });
                                  }}
                                  className="btn-no-size-color bg-black px-4 py-2 ml-5"
                                >
                                  Update
                                </button>
                              )}
                            </p>
                            {editing ? (
                              <Dropdown
                                className="w-full my-3"
                                selection
                                placeholder="Select new status"
                                options={mOrderStatuses}
                                onChange={(e, { value }) => {
                                  console.log(value);
                                  // updateFormData({
                                  //   ...formData,
                                  //   category: value,
                                  // });
                                }}
                                // value={formData["category"]}
                              />
                            ) : null}
                            <ul>{items}</ul>
                          </div>
                        );
                      })}
                    </Accordion.Content>
                  </>
                );
              })}
            </Accordion>

            {moreOrders ? (
              <div className="w-full text-center py-12">
                {loadingOrders ? (
                  <Loader active inline="centered" />
                ) : (
                  <button
                    onClick={() => {
                      setLoadingOrders(true);
                      getOrders(startKey[0])
                        .then((resp) => {
                          setOrders([...orders, ...resp.data.orders]);
                          if (resp.data.LastEvaluatedKey) {
                            setStartKey([resp.data.LastEvaluatedKey.OrderId]);
                          } else {
                            setMoreOrders(false);
                          }
                          setLoadingOrders(false);
                        })
                        .catch((err) => {
                          console.log(err);
                          setLoadingProducts(false);
                        });
                    }}
                    className="btn-no-size-color px-8 py-4 bg-green-900"
                  >
                    Load more
                  </button>
                )}
              </div>
            ) : null}
          </>
        ) : null}
      </div>
    </Layout>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect((state) => state, mapDispatchToProps)(Page);

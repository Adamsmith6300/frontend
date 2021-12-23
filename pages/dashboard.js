import { useEffect, useState, Fragment } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import { Loader } from "semantic-ui-react";
import { Accordion, Icon, Dropdown } from "semantic-ui-react";

import Layout from "../components/hoc/layout";
import MerchantsContact from "../components/dashboard/merchantsContact";
import Head from "next/head";
import { isLoggedIn, checkAllPower } from "../store/helpers";

const Page = ({}) => {
  const [orders, setOrders] = useState(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [editOrderStatus, setEditOrderStatus] = useState(null);
  const [editMOrderStatus, setEditMOrderStatus] = useState(null);
  const [orderStatusVal, setOrderStatusVal] = useState(null);
  const [mOrderStatusVal, setMOrderStatusVal] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(null);
  const [startKey, setStartKey] = useState(null);
  const [moreOrders, setMoreOrders] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(false);

  const [vendors, setVendors] = useState(null);

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

  const getVendors = async () => {
    const authRes = JSON.parse(localStorage.getItem("AuthResults"));
    let url = `${process.env.NEXT_PUBLIC_API_URL}/people/merchants`;
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
    refreshOrders();
    getVendors()
      .then((resp) => {
        setVendors(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [path]);

  const refreshOrders = () => {
    getOrders()
      .then((resp) => {
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
  };

  const isEditingMOrder = (m) => {
    return (
      editMOrderStatus != null &&
      editMOrderStatus["MerchantId"] == m["MerchantId"] &&
      editMOrderStatus["OrderId"] == m["OrderId"]
    );
  };
  const isEditingOrder = (orderId) => {
    return editOrderStatus != null && editOrderStatus["OrderId"] == orderId;
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
    {
      key: "payment_approved",
      text: "payment_approved",
      value: "payment_approved",
    },
  ];

  const submitOrderStatusUpdate = async () => {
    try {
      const authRes = JSON.parse(localStorage.getItem("AuthResults"));
      let url = `${process.env.NEXT_PUBLIC_API_URL}/people/orders/${editOrderStatus.OrderId}`;
      let payload = { orderStatus: orderStatusVal };
      let mIds = [];
      for (let i = 0; i < orders.length; ++i) {
        if (orders[i]["OrderId"] == editOrderStatus.OrderId) {
          for (let j = 0; j < orders[i]["merchantOrders"].length; ++j) {
            mIds.push(orders[i]["merchantOrders"][j]["MerchantId"]);
            if (orders[i]["merchantOrders"][j]["orderStatus"] != "picked_up") {
              setError("All items must be picked up first!");
              setUpdating(false);
              return;
            }
          }
        }
      }
      if (orderStatusVal == "delivered") {
        payload["MerchantIds"] = mIds;
      }
      let resp = await axios.post(url, payload, {
        headers: {
          Authorization: authRes["IdToken"],
        },
      });
      refreshOrders();
    } catch (err) {
      console.log(err);
    }
    clearState();
    setUpdating(false);
  };

  const submitMOrderStatusUpdate = async () => {
    try {
      const authRes = JSON.parse(localStorage.getItem("AuthResults"));
      let url = `${process.env.NEXT_PUBLIC_API_URL}/people/orders/${editMOrderStatus.OrderId}`;
      let payload = { orderStatus: mOrderStatusVal, ...editMOrderStatus };
      let resp = await axios.post(url, payload, {
        headers: {
          Authorization: authRes["IdToken"],
        },
      });
      refreshOrders();
    } catch (err) {
      console.log(err);
    }
    clearState();
    setUpdating(false);
  };

  const clearState = () => {
    setEditOrderStatus(null);
    setEditMOrderStatus(null);
    setOrderStatusVal(null);
    setMOrderStatusVal(null);
    setError(null);
  };

  return (
    <Layout loading={orders == null || vendors == null}>
      <Head>
        <title>Dashboard - Loma</title>
      </Head>
      <div className="flex flex-wrap justify-center xl:justify-start max-w-1250 mx-auto">
        {orders != null ? (
          <>
            <h3 className="text-3xl">All Orders</h3>
            <Accordion id="account-details" fluid styled>
              {orders.map((order, i) => {
                let statusBubbleClass = "bg-yellow-300";
                if (order.orderStatus == "out_for_delivery") {
                  statusBubbleClass = "bg-blue-400";
                }
                if (order.orderStatus == "delivered") {
                  statusBubbleClass = "bg-green-300";
                }
                let editing = isEditingOrder(order.OrderId);
                return (
                  <Fragment key={order.OrderId}>
                    <Accordion.Title
                      key={order.OrderId}
                      active={activeIndex === i}
                      index={i}
                      onClick={() => {
                        clearState();
                        setActiveIndex(activeIndex === i ? -1 : i);
                      }}
                    >
                      <div className="flex justify-between">
                        <div>
                          <p>
                            <Icon name="dropdown" />
                            Order ID:{" "}
                            {order.OrderId.substring(order.OrderId.length - 8)}
                          </p>
                          <p className="font-bold ml-3">{order.created_at}</p>
                        </div>
                        <p
                          className={`border rounded-3xl p-1 px-3 mr-1 my-1 inline h-10 ${statusBubbleClass}`}
                        >
                          {order.orderStatus}
                        </p>
                      </div>
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === i}>
                      <p>
                        <span className="font-bold">Deliver To: </span>
                        <ul>
                          {Object.entries(order.deliveryInfo).map((e, i) => {
                            return (
                              <li key={e[1]}>
                                {e[0]}:{e[1]}
                              </li>
                            );
                          })}
                        </ul>
                      </p>
                      <p>
                        <span className="font-bold">Email: </span>
                        {order.email}
                      </p>
                      <p>
                        <span className="font-bold">Charge Details: </span>
                        <ul>
                          {Object.entries(order.chargeDetails).map((e, i) => {
                            return (
                              <li key={e[1]}>
                                {e[0]}:{e[1]}
                              </li>
                            );
                          })}
                        </ul>
                      </p>
                      {error != null ? (
                        <p className="text-red-600">{error}</p>
                      ) : null}
                      <div className="my-3">
                        <span className="font-bold mr-5">
                          Order Status: {order.orderStatus}
                        </span>
                        {updating ? (
                          <Loader size="small" active inline />
                        ) : editing ? (
                          <>
                            <button
                              onClick={() => {
                                clearState();
                              }}
                              className="btn-no-size-color bg-black px-4 py-2"
                            >
                              Cancel
                            </button>
                            {orderStatusVal !== null ? (
                              <button
                                onClick={() => {
                                  setUpdating(true);
                                  submitOrderStatusUpdate();
                                }}
                                className="btn-no-size-color bg-green-500 px-4 py-2 ml-5"
                              >
                                Save
                              </button>
                            ) : null}
                          </>
                        ) : (
                          <button
                            onClick={() => {
                              clearState();
                              setEditOrderStatus({
                                OrderId: order.OrderId,
                              });
                            }}
                            className="btn-no-size-color bg-black px-4 py-2"
                          >
                            Update
                          </button>
                        )}
                        {editing ? (
                          <Dropdown
                            className="w-full my-3"
                            selection
                            placeholder="Select new order status"
                            options={orderStatuses}
                            onChange={(e, { value }) => {
                              setOrderStatusVal(value);
                            }}
                          />
                        ) : null}
                      </div>
                      <p className="font-bold">Items:</p>
                      {order.merchantOrders.map((m, index) => {
                        let storename = m["items"][0]["storename"];
                        let editing = isEditingMOrder(m);
                        let items = m["items"].map((item, ind) => {
                          return (
                            <li
                              className="flex"
                              key={item["ProductId"] + m["OrderId"] + ind}
                            >
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
                                          <span
                                            key={val["value"]}
                                            className="border rounded-3xl bg-gray-300 p-1 px-3 mr-1 my-1 inline h-10"
                                          >
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
                          <div
                            className="my-5"
                            key={m["MerchantId"] + m["OrderId"]}
                          >
                            <p className="font-bold">{storename}</p>
                            <div className="my-3">
                              <span className="mr-5">
                                Status: {m["orderStatus"]}
                              </span>
                              {updating ? (
                                <Loader size="small" active inline />
                              ) : editing ? (
                                <>
                                  <button
                                    onClick={() => {
                                      clearState();
                                    }}
                                    className="btn-no-size-color bg-black px-4 py-2 ml-5"
                                  >
                                    Cancel
                                  </button>
                                  {mOrderStatusVal !== null ? (
                                    <button
                                      onClick={() => {
                                        setUpdating(true);
                                        submitMOrderStatusUpdate();
                                      }}
                                      className="btn-no-size-color bg-green-500 px-4 py-2 ml-5"
                                    >
                                      Save
                                    </button>
                                  ) : null}
                                </>
                              ) : (
                                <button
                                  onClick={() => {
                                    clearState();
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
                            </div>
                            {editing ? (
                              <Dropdown
                                className="w-full my-3"
                                selection
                                placeholder="Select new status"
                                options={mOrderStatuses}
                                onChange={(e, { value }) => {
                                  setMOrderStatusVal(value);
                                }}
                                // value={formData["category"]}
                              />
                            ) : null}
                            <ul>{items}</ul>
                          </div>
                        );
                      })}
                    </Accordion.Content>
                  </Fragment>
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
        {vendors != null ? <MerchantsContact vendors={vendors} /> : null}
      </div>
    </Layout>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect((state) => state, mapDispatchToProps)(Page);

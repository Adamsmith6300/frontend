import { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import { Loader } from "semantic-ui-react";
import { Accordion, Icon, Button } from "semantic-ui-react";

import Layout from "../components/hoc/layout";
import { LargeLoader } from "../components/loaders";
import Head from "next/head";
import { isLoggedIn, checkAllPower } from "../store/helpers";

const Page = ({}) => {
  const [orders, setOrders] = useState(null);
  const [activeIndex, setActiveIndex] = useState(-1);

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

  return (
    <Layout loading={orders == null}>
      <Head>
        <title>Dashboard - Loma</title>
      </Head>
      <div className="flex flex-wrap justify-center xl:justify-start max-w-1250 mx-auto">
        {orders != null ? (
          <>
            <h3 className="text-3xl">All Order</h3>
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
                  setLoading={setLoading}
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
            {orders.map((order, i) => {
              return (
                <div key={order.OrderId}>
                  <p>{order.OrderId}</p>
                </div>
              );
            })}
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

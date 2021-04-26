import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "next/router";
import axios from "axios";
import { Loader } from "semantic-ui-react";

import actions from "../store/actions";

import Layout from "../components/hoc/layout";
import MerchantGrid from "../components/home/merchantGrid";
import { LargeLoader } from "../components/loaders";

const Page = ({ addToCart, cartData, clearFlag, router }) => {
  const [merchants, setMerchants] = useState(null);
  const [startKey, setStartKey] = useState(null);
  const [moreMerchants, setMoreMerchants] = useState(true);
  const [loadingMerchants, setLoadingMerchants] = useState(false);
  const lim = 8;

  const getMerchants = async (starta = null, startb = null) => {
    // const { lim } = router.query;
    let url = `${process.env.NEXT_PUBLIC_API_URL}/market/merchants?lim=${lim}`;
    if (starta != null && startb != null) {
      url += "&starta=" + starta + "&startb=" + startb;
    }
    return await axios.get(url);
  };

  useEffect(() => {
    getMerchants()
      .then((resp) => {
        setMerchants(resp.data.Merchants);
        if (resp.data.LastEvaluatedKey) {
          setStartKey([
            resp.data.LastEvaluatedKey.MerchantId,
            resp.data.LastEvaluatedKey.PersonId,
          ]);
        } else {
          setMoreMerchants(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Layout>
      <div className="flex flex-wrap justify-start max-w-1040 mx-auto">
        {merchants != null ? (
          <>
            <MerchantGrid merchants={merchants} />
            {moreMerchants ? (
              <div className="w-full text-center">
                {loadingMerchants ? (
                  <Loader active inline="centered" />
                ) : (
                  <button
                    onClick={() => {
                      setLoadingMerchants(true);
                      getMerchants(startKey[0], startKey[1])
                        .then((resp) => {
                          setMerchants([...merchants, ...resp.data.Merchants]);
                          if (resp.data.LastEvaluatedKey) {
                            setStartKey([
                              resp.data.LastEvaluatedKey.MerchantId,
                              resp.data.LastEvaluatedKey.PersonId,
                            ]);
                          } else {
                            setMoreMerchants(false);
                          }
                          setLoadingMerchants(false);
                        })
                        .catch((err) => {
                          console.log(err);
                          setLoadingMerchants(false);
                        });
                    }}
                    className="btn-no-size-color px-6 py-2 bg-black"
                  >
                    Load more
                  </button>
                )}
              </div>
            ) : null}
          </>
        ) : (
          <LargeLoader />
        )}
      </div>
    </Layout>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (product, oldCart) =>
      dispatch(actions.addToCart(product, oldCart)),
    clearFlag: (flag) => dispatch(actions.clearFlag(flag)),
  };
};

export default connect((state) => state, mapDispatchToProps)(withRouter(Page));

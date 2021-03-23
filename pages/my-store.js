import React, { useEffect, useState } from "react";
import Layout from "../components/hoc/layout";
import { connect } from "react-redux";
import actions from "../store/actions";
import { withRouter } from "next/router";
import {
  isLoggedIn,
  checkMerchant,
  fetchMerchantData,
  updateStoreDetails,
} from "../store/helpers";
import { Products, Banner, ShopifyImportModal } from "../components/myStore";
import { LargeLoader } from "../components/loaders";
import Modal from "../components/modal";

const Page = ({
  router,
  myShop,
  setMerchantData,
  getCategories,
  categories,
}) => {
  const [isMerchant, updateIsMerchant] = useState(false);
  const [loggedIn, updateLoggedIn] = useState(false);
  const [website, updateWebsite] = useState(myShop ? myShop.info.website : "");
  const [about, updateAbout] = useState(myShop ? myShop.info.about : "");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const callFetchMerchData = async () => {
    try {
      let resp = await fetchMerchantData();
      setMerchantData(resp.data);
      updateAbout(resp.data.info.about);
      updateWebsite(resp.data.info.website);
    } catch (err) {
      console.log(err);
    }
  };

  // const callGetCategories = async () => {
  //   try {
  //     let resp = await getCategories();
  //     console.log(resp);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  useEffect(() => {
    let l = isLoggedIn();
    updateLoggedIn(l);
    let m = checkMerchant();
    updateIsMerchant(m);
    if (!l || !m) {
      router.push("/");
    }
    if (!myShop) {
      callFetchMerchData();
    }
    if (categories == null) {
      getCategories();
    }
  }, []);

  const handleUpdateStore = async (data) => {
    setLoading(true);
    data["MerchantId"] = myShop.info.MerchantId;
    let resp = await updateStoreDetails(data);
    if (resp.status == 200) {
      callFetchMerchData().then(() => {
        setLoading(false);
      });
    } else {
      console.log("ERROR! Failed to update shop details");
      window.location.reload();
    }
  };

  return (
    <Layout>
      {myShop ? (
        <div>
          <Banner
            MerchantId={myShop.info.MerchantId}
            name={myShop.info.name}
            bannerImageName={myShop.info.bannerImage}
          />
          <div className="px-64 pt-12">
            <h1 className="text-5xl my-12 flex justify-between">
              <span>{myShop.info.storename}</span>
            </h1>
            {loading ? (
              <LargeLoader />
            ) : (
              <div className="my-12">
                <p className="font-bold">Website URL</p>
                <div className="my-3">
                  <input
                    value={website}
                    className="w-full pl-3 py-1 h-10 bg-gray-200 mb-6"
                    name="website"
                    type="text"
                    onChange={(e) => updateWebsite(e.target.value)}
                  />
                  {website != myShop.info.website ? (
                    <>
                      <button
                        className="btn-no-size-color px-12 py-3 bg-green-600 mr-2"
                        onClick={() => {
                          handleUpdateStore({ website: website });
                        }}
                      >
                        Save
                      </button>
                      <button
                        className="btn-no-size-color px-8 py-3 bg-black ml-2"
                        onClick={() => {
                          updateWebsite(myShop.info.website);
                        }}
                      >
                        Cancel
                      </button>
                    </>
                  ) : null}
                </div>
                <p className="font-bold">About</p>
                <div className="my-3">
                  <textarea
                    placeholder={
                      myShop.info.about && myShop.info.about.length > 0
                        ? myShop.info.about
                        : "Tell your store visitors about " +
                          myShop.info.storename
                    }
                    className="w-full pl-3 py-1 mb-6 h-10 bg-gray-200"
                    label="about"
                    name="about"
                    value={about}
                    onChange={(e) => updateAbout(e.target.value)}
                  />
                  {about != myShop.info.about ? (
                    <>
                      <button
                        className="btn-no-size-color px-12 py-3 bg-green-600 mr-2"
                        onClick={() => {
                          handleUpdateStore({ about: about });
                        }}
                      >
                        Save
                      </button>
                      <button
                        className="btn-no-size-color px-8 py-3 bg-black ml-2"
                        onClick={() => {
                          updateAbout(myShop.info.about);
                        }}
                      >
                        Cancel
                      </button>
                    </>
                  ) : null}
                </div>
              </div>
            )}
            <Products
              MerchantId={myShop.info.MerchantId}
              products={myShop.products}
              callFetchMerchData={callFetchMerchData}
              setShowModal={setShowModal}
              categories={categories}
            />
          </div>
        </div>
      ) : (
        <LargeLoader />
      )}
      {showModal && myShop != null ? (
        <Modal open={setShowModal}>
          <div className="flex justify-end">
            <button className={``} onClick={() => setShowModal(false)}>
              <svg width="23" height="23" viewBox="0 0 23 23">
                <path
                  d="M 3 16.5 L 17 2.5"
                  fill="transparent"
                  strokeWidth="2"
                  stroke="hsl(0, 0%, 0%)"
                  strokeLinecap="round"
                />
                <path
                  d="M 3 2.5 L 17 16.346"
                  fill="transparent"
                  strokeWidth="2"
                  stroke="hsl(0, 0%, 0%)"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
          <ShopifyImportModal open={setShowModal} myShop={myShop} />
        </Modal>
      ) : null}
    </Layout>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearFlag: (flag) => dispatch(actions.clearFlag(flag)),
    setMerchantData: (data) => dispatch(actions.setMerchantData(data)),
    getCategories: () => dispatch(actions.getCategories()),
  };
};

export default connect((state) => state, mapDispatchToProps)(withRouter(Page));

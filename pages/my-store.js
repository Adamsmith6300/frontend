import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "next/router";
import { BsFillCircleFill } from "react-icons/bs";
import { TextArea, Input } from "semantic-ui-react";
import actions from "../store/actions";
import {
  isLoggedIn,
  checkMerchant,
  fetchMerchantData,
  updateStoreDetails,
} from "../store/helpers";

import Layout from "../components/hoc/layout";
import {
  Products,
  Banner,
  ShopifyImportModal,
  ChangeListedModal,
  GetStarted,
} from "../components/myStore";
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
  const [modalContent, setModalContent] = useState(null);
  const [getStarted, showGetStarted] = useState(false);

  const closeModal = () => {
    setShowModal(false);
    setModalContent(null);
  };

  const callFetchMerchData = async () => {
    try {
      let resp = await fetchMerchantData();
      setMerchantData(resp.data);
      updateAbout(resp.data.info.about);
      updateWebsite(resp.data.info.website);
      if (
        !("hasLoggedIn" in resp.data.info) ||
        !resp.data.info["hasLoggedIn"]
      ) {
        showGetStarted(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

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
          <div className="pt-6 px-6 lg:px-64 lg:pt-12">
            {/* {getStarted ? (
              <GetStarted showGetStarted={showGetStarted} />
            ) : (
              <p
                className="cursor-pointer"
                onClick={() => showGetStarted(true)}
              >
                Show setup instructions
              </p>
            )} */}
            <h1
              className={`text-5xl ${
                getStarted ? "my-12" : "mt-3 mb-12"
              } flex justify-between`}
            >
              <span>{myShop.info.storename}</span>
            </h1>
            <p className="text-2xl font-bold">
              {myShop.info.listed ? (
                <>
                  <BsFillCircleFill className="inline text-green-400 mr-2" />
                  Listed
                </>
              ) : (
                <>
                  <BsFillCircleFill className="inline text-yellow-400 mr-2" />
                  Not Listed
                </>
              )}
              <button
                onClick={() => {
                  setModalContent("changeListed");
                  setShowModal(true);
                }}
                className="btn-no-size-color bg-black px-4 py-2 ml-4"
              >
                Change
              </button>
            </p>
            {loading ? (
              <LargeLoader />
            ) : (
              <div className="my-12">
                <p className="font-bold">Website URL</p>
                <div className="my-3">
                  <input
                    className="w-full my-3 h-10"
                    value={website}
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
                  {/* 1px solid rgba(34,36,38,.15) */}
                  <textarea
                    placeholder={
                      myShop.info.about && myShop.info.about.length > 0
                        ? myShop.info.about
                        : "Tell your store visitors about " +
                          myShop.info.storename
                    }
                    className="w-full pl-3 py-1 mb-6 h-32"
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
              setModalContent={setModalContent}
              categories={categories}
            />
          </div>
        </div>
      ) : (
        <LargeLoader />
      )}
      {showModal && myShop != null && modalContent != null ? (
        <Modal
          close={() => {
            closeModal();
          }}
        >
          <div className="flex justify-end">
            <button
              onClick={() => {
                closeModal();
              }}
            >
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
          {modalContent == "shopifyImport" ? (
            <ShopifyImportModal
              closeModal={closeModal}
              myShop={myShop}
              callFetchMerchData={callFetchMerchData}
            />
          ) : null}
          {modalContent == "changeListed" ? (
            <ChangeListedModal
              closeModal={closeModal}
              myShop={myShop}
              callFetchMerchData={callFetchMerchData}
            />
          ) : null}
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

import React, { useEffect, useState } from "react";
import Layout from "../components/hoc/layout";
import { connect } from "react-redux";
import actions from "../store/actions";
import { withRouter } from "next/router";
import Link from "next/link";
import Account from "../components/myAccount/account";
import UpdateOrderStatusModal from "../components/myAccount/updateOrderStatusModal";
import Modal from "../components/modal";
import {
  isLoggedIn,
  checkMerchant,
  fetchAccountData,
  fetchMerchantData,
} from "../store/helpers";

const Page = ({ router, myShop, setMerchantData }) => {
  const [loggedIn, updateLoggedIn] = useState(null);
  const [accountData, setAccountData] = useState(null);
  const [isMerchant, updateIsMerchant] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const closeModal = () => {
    setShowModal(false);
    setModalContent(null);
    setSelectedOrderId(null);
  };

  async function callFetchAccountData() {
    try {
      let resp = await fetchAccountData();
      setAccountData(resp.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      router.push("/");
    }
  }

  async function callFetchMerchData() {
    try {
      let resp = await fetchMerchantData();
      setMerchantData(resp.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    let l = isLoggedIn();
    updateLoggedIn(l);
    let m = checkMerchant();
    updateIsMerchant(m);
    if (!l) {
      router.push("/");
    }
    if (!accountData) {
      callFetchAccountData();
    }
    if (!myShop && m) {
      callFetchMerchData();
    }
  }, []);

  return (
    <Layout loading={loading}>
      {loggedIn && accountData != null ? (
        <>
          <Account
            isMerchant={isMerchant}
            accountData={accountData}
            myShop={myShop}
            callFetchMerchData={callFetchMerchData}
            callFetchAccountData={callFetchAccountData}
            setLoading={setLoading}
            setShowModal={setShowModal}
            setModalContent={setModalContent}
            setSelectedOrderId={setSelectedOrderId}
          />
        </>
      ) : null}
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
          {modalContent == "updateOrderStatus" ? (
            <UpdateOrderStatusModal
              closeModal={closeModal}
              callFetchMerchData={callFetchMerchData}
              selectedOrderId={selectedOrderId}
              MerchantId={myShop.info.MerchantId}
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
  };
};

export default connect((state) => state, mapDispatchToProps)(withRouter(Page));

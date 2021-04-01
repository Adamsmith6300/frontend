import { useState } from "react";
import { Loader } from "semantic-ui-react";

import { reviewStore, updateStoreDetails } from "../../store/helpers";

const index = ({ myShop, closeModal, callFetchMerchData }) => {
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);

  const submitForReview = async () => {
    try {
      let resp = await reviewStore();
      await callFetchMerchData();
      setSuccessMsg(
        "Successfully submitted request for approval. You will receive an email once approved."
      );
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const submitListStore = async (list) => {
    try {
      let resp = await updateStoreDetails({
        listed: list,
        MerchantId: myShop.info.MerchantId,
      });
      await callFetchMerchData();
      setSuccessMsg("Successfully updated store listing.");
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  let content = (
    <button
      className="btn-no-size-color px-8 py-3 bg-black ml-2"
      onClick={(e) => {
        e.stopPropagation();
        closeModal();
      }}
    >
      Close
    </button>
  );
  if (!myShop.info.listed && myShop.info.status == "approved") {
    content = (
      <>
        <p className="text-center text-2xl font-bold mb-12">
          Are you ready to list your store in the market?
        </p>
        <button
          className="btn-no-size-color px-8 py-3 bg-black ml-2"
          onClick={(e) => {
            e.stopPropagation();
            setLoading(true);
            submitListStore(true);
          }}
        >
          Confirm
        </button>
      </>
    );
  }
  if (myShop.info.listed && myShop.info.status == "approved") {
    content = (
      <>
        <p className="text-center text-2xl font-bold mb-12">
          Remove store listing from market? This can be changed back anytime.
        </p>
        <button
          className="btn-no-size-color px-8 py-3 bg-black ml-2"
          onClick={(e) => {
            e.stopPropagation();
            setLoading(true);
            submitListStore(false);
          }}
        >
          Confirm
        </button>
      </>
    );
  }
  if (!myShop.info.listed && myShop.info.status != "approved") {
    content = (
      <>
        <p className="text-center text-2xl font-bold mb-12">
          All stores must be reviewed before they can be listed.
        </p>
        <button
          className="btn-no-size-color px-8 py-3 bg-black ml-2"
          onClick={(e) => {
            e.stopPropagation();
            setLoading(true);
            submitForReview();
          }}
        >
          Submit for review
        </button>
      </>
    );
  }
  if (loading) {
    content = <Loader inline="centered" active />;
  }
  if (successMsg) {
    content = (
      <>
        <p className="text-center text-2xl font-bold mb-12">{successMsg}</p>
        <button
          className="btn-no-size-color px-8 py-3 bg-black ml-2"
          onClick={(e) => {
            e.stopPropagation();
            closeModal();
          }}
        >
          Close
        </button>
      </>
    );
  }
  if (myShop.info.status == "pending_approval") {
    content = (
      <>
        <p className="text-center text-2xl font-bold mb-12">
          Your store is pending approval. Once approved you will be able to list
          your store.
        </p>
        <button
          className="btn-no-size-color px-8 py-3 bg-black ml-2"
          onClick={(e) => {
            e.stopPropagation();
            closeModal();
          }}
        >
          Close
        </button>
      </>
    );
  }
  return (
    <div className="grid place-items-center w-300 mx-auto pt-6">{content}</div>
  );
};

export default index;

import { useState } from "react";
import { Loader } from "semantic-ui-react";
import { updateMerchantOrderStatus } from "../../store/helpers";

const index = ({
  closeModal,
  callFetchMerchData,
  selectedOrderId,
  MerchantId,
}) => {
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);

  const updateOrderStatus = async () => {
    try {
      let resp = await updateMerchantOrderStatus({
        OrderId: selectedOrderId,
        MerchantId: MerchantId,
      });
      console.log(resp);
      await callFetchMerchData();
      setSuccessMsg("Successfully updated order status.");
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  let content = (
    <>
      <p className="text-center text-2xl font-bold mb-6 lg:mb-12 ">
        Are you sure this order is ready for pickup?
      </p>
      <button
        className="btn-no-size-color px-8 py-3 bg-black ml-2"
        onClick={(e) => {
          e.stopPropagation();
          setLoading(true);
          updateOrderStatus();
        }}
      >
        Confirm
      </button>
    </>
  );
  if (loading) {
    content = <Loader inline="centered" active />;
  }
  if (successMsg) {
    content = (
      <>
        <p className="text-center text-2xl font-bold mb-6 lg:mb-12 ">
          {successMsg}
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
    <div className="grid place-items-center lg:w-300 mx-auto pt-6">
      {content}
    </div>
  );
};

export default index;

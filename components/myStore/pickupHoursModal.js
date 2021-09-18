import { useState } from "react";
import { Loader, Radio, Dropdown } from "semantic-ui-react";

import { updateStoreDetails } from "../../store/helpers";

const hours = [
  { key: "12:00AM", text: "12:00AM", value: "12:00AM" },
  { key: "1:00AM", text: "1:00AM", value: "1:00AM" },
  { key: "2:00AM", text: "2:00AM", value: "2:00AM" },
  { key: "3:00AM", text: "3:00AM", value: "3:00AM" },
  { key: "4:00AM", text: "4:00AM", value: "4:00AM" },
  { key: "5:00AM", text: "5:00AM", value: "5:00AM" },
  { key: "6:00AM", text: "6:00AM", value: "6:00AM" },
  { key: "7:00AM", text: "7:00AM", value: "7:00AM" },
  { key: "8:00AM", text: "8:00AM", value: "8:00AM" },
  { key: "9:00AM", text: "9:00AM", value: "9:00AM" },
  { key: "10:00AM", text: "10:00AM", value: "10:00AM" },
  { key: "11:00AM", text: "11:00AM", value: "11:00AM" },
  { key: "12:00PM", text: "12:00PM", value: "12:00PM" },
  { key: "1:00PM", text: "1:00PM", value: "1:00PM" },
  { key: "2:00PM", text: "2:00PM", value: "2:00PM" },
  { key: "3:00PM", text: "3:00PM", value: "3:00PM" },
  { key: "4:00PM", text: "4:00PM", value: "4:00PM" },
  { key: "5:00PM", text: "5:00PM", value: "5:00PM" },
  { key: "6:00PM", text: "6:00PM", value: "6:00PM" },
  { key: "7:00PM", text: "7:00PM", value: "7:00PM" },
  { key: "8:00PM", text: "8:00PM", value: "8:00PM" },
  { key: "9:00PM", text: "9:00PM", value: "9:00PM" },
  { key: "10:00PM", text: "10:00PM", value: "10:00PM" },
  { key: "11:00PM", text: "11:00PM", value: "11:00PM" },
];

const index = ({ myShop, closeModal, callFetchMerchData }) => {
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);
  const [days, setDays] = useState(
    myShop.info.pickupDays
      ? myShop.info.pickupDays
      : {
          sunday: { closed: true, start: "9:00AM", end: "5:00PM" },
          monday: { closed: true, start: "9:00AM", end: "5:00PM" },
          tuesday: { closed: true, start: "9:00AM", end: "5:00PM" },
          wednesday: { closed: true, start: "9:00AM", end: "5:00PM" },
          thursday: { closed: true, start: "9:00AM", end: "5:00PM" },
          friday: { closed: true, start: "9:00AM", end: "5:00PM" },
          saturday: { closed: true, start: "9:00AM", end: "5:00PM" },
        }
  );

  const savePickupHours = async () => {
    try {
      //   let resp = await reviewStore();
      //   await callFetchMerchData();
      setSuccessMsg("Successfully updated pickup hours.");
      setLoading(false);
    } catch (err) {
      console.log(err);
      setSuccessMsg("Failed to update pickup hours. Please try again later.");
      setLoading(false);
    }
  };

  let daySelector = Object.entries(days).map((day, index) => {
    return (
      <div key={index + day} className="my-2">
        <div className="flex justify-between">
          <span className="uppercase font-bold">
            {day[0]} ({day[1]["closed"] ? "Closed" : "Open"})
          </span>
          <div>
            <Radio
              onChange={(e) => {
                let newDay = { ...day[1] };
                newDay["closed"] = !newDay["closed"];
                let newDays = { ...days };
                newDays[day[0]] = newDay;
                setDays({ ...newDays });
              }}
              defaultChecked={!day[1]["closed"]}
              toggle
            />
          </div>
        </div>
        {!day[1]["closed"] ? (
          <div>
            <p>From:</p>
            <Dropdown
              className="w-full my-3"
              selection
              options={hours}
              onChange={(e, { value }) => {
                let newDay = { ...day[1] };
                newDay["start"] = value;
                let newDays = { ...days };
                newDays[day[0]] = newDay;
                setDays({ ...newDays });
              }}
              value={day[1]["start"]}
            />
            <p>To:</p>
            <Dropdown
              className="w-full my-3"
              selection
              options={hours}
              onChange={(e, { value }) => {
                let newDay = { ...day[1] };
                newDay["end"] = value;
                let newDays = { ...days };
                newDays[day[0]] = newDay;
                setDays({ ...newDays });
              }}
              value={day[1]["end"]}
            />
          </div>
        ) : null}
      </div>
    );
  });

  let content = (
    <>
      <p className="text-center text-2xl font-bold mb-6 lg:mb-12 ">
        Set Pickup Hours
      </p>
      <div className="w-full mb-8">{daySelector}</div>
      <div className="w-full flex justify-center">
        <button
          className="btn-no-size-color px-12 py-3 bg-green-600 mr-2"
          onClick={(e) => {
            e.stopPropagation();
            setLoading(true);
            savePickupHours();
          }}
        >
          Save
        </button>
        <button
          className="btn-no-size-color px-8 py-3 bg-black ml-2"
          onClick={(e) => {
            e.stopPropagation();
            closeModal();
          }}
        >
          Cancel
        </button>
      </div>
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

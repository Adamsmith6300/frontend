import { Button, Checkbox, Form, Input } from "semantic-ui-react";
import { useState } from "react";
import { MdModeEdit } from "react-icons/md";
import { updateAccountDetails } from "../../store/helpers";
import { LargeLoader } from "../loaders";

const contactAttr = ["fullname", "phone", "email"];
const addressAttr = ["address", "address2", "city", "province", "postalcode"];

const index = ({ info, callFetchAccountData }) => {
  const [formData, updateFormData] = useState({});
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    let resp = await updateAccountDetails(formData);
    if (resp.status == 200) {
      callFetchAccountData().then((response) => {
        setEdit(null);
        updateFormData({});
        setLoading(false);
      });
    } else {
      console.log("ERROR! Failed to update shop details");
      window.location.reload();
    }
  };

  const getLabel = (attribute) => {
    if (attribute == "fullname") {
      return "Name";
    }
    if (attribute == "postalcode") {
      return "Postal Code";
    }

    return attribute.charAt(0).toUpperCase() + attribute.slice(1);
  };

  const getAttrComponent = (attr) => {
    let val = info[attr];
    let label = getLabel(attr);
    if (edit && attr != "email") {
      return (
        <li key={index + attr} className="flex flex-wrap py-1">
          <span className="font-bold w-full pl-3 py-1">{label}:</span>
          <input
            defaultValue={val}
            className="w-full pl-3 py-1 h-10 bg-gray-200"
            name={attr}
            type="text"
            onChange={(e) => handleChange(e)}
          />
        </li>
      );
    } else {
      return (
        <li key={index + attr} className="flex flex-wrap py-1">
          <span className="font-bold w-full pl-3 py-1">{label}:</span>
          <span className="w-full pl-3 py-1 h-10 ">{val}</span>
        </li>
      );
    }
  };

  let contactDetails = [];
  let addressDetails = [];
  if (info) {
    for (let i = 0; i < contactAttr.length; ++i) {
      if (contactAttr[i] in info) {
        const comp = getAttrComponent(contactAttr[i]);
        contactDetails.push(comp);
      }
    }
    for (let i = 0; i < addressAttr.length; ++i) {
      if (addressAttr[i] in info) {
        const comp = getAttrComponent(addressAttr[i]);
        addressDetails.push(comp);
      }
    }
  }

  return (
    <div className="w-300 py-5 mx-auto">
      {loading ? (
        <LargeLoader />
      ) : (
        <>
          <p className="text-3xl bolder text-center">Contact</p>
          <ul className="list-reset py-3">{contactDetails}</ul>
          <p className="text-3xl bolder text-center mt-5">Address</p>
          <ul className="list-reset py-3 mb-5">{addressDetails}</ul>
          {edit ? (
            <div className="w-full flex flex-wrap justify-between text-center">
              {/* <div className="w-full"> */}
              <button
                className="btn-no-size-color px-8 py-3 bg-black"
                onClick={() => {
                  setEdit(null);
                  updateFormData({});
                }}
              >
                Cancel
              </button>
              {/* </div> */}
              {Object.keys(formData).length > 0 ? (
                // <div className="w-full pt-3">
                <button
                  className="btn-no-size-color px-12 py-3 bg-green-600"
                  onClick={() => handleSubmit()}
                >
                  Save
                </button>
              ) : // </div>
              null}
            </div>
          ) : (
            <button
              className="btn-no-size-color px-8 py-3 bg-black"
              onClick={() => {
                setEdit(true);
                updateFormData({});
              }}
            >
              Edit
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default index;

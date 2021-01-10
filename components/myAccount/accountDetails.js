import { Button, Checkbox, Form, Input } from "semantic-ui-react";
import { useState } from "react";
import { MdModeEdit } from "react-icons/md";
import { updateAccountDetails } from "../../store/helpers";
import { LargeLoader } from "../loaders";

const possibleAttr = [
  "address",
  "address2",
  "city",
  "phone",
  "postalcode",
  "province",
];

const index = ({ info, callFetchAccountData }) => {
  const [formData, updateFormData] = useState({});
  const [editAttr, setEditAttr] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    updateFormData({
      // ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    let resp = await updateAccountDetails(formData);
    if (resp.status == 200) {
      callFetchAccountData().then((response) => {
        setEditAttr(null);
        updateFormData({});
        setLoading(false);
      });
    } else {
      console.log("ERROR! Failed to update shop details");
      window.location.reload();
    }
  };
  let details = [];
  if (info) {
    details = Object.entries(info).map((entry, index) => {
      if (entry[0] == "PersonId") return null;
      if (editAttr == index) {
        return (
          <Input
            label={entry[0]}
            defaultValue={entry[1]}
            name={entry[0]}
            type="text"
            onChange={handleChange}
          />
        );
      } else {
        return (
          <li key={index + entry[0]}>
            <span className="font-bold">{entry[0]}:</span>
            <span className="mx-3">{entry[1]}</span>
            {possibleAttr.includes(entry[0]) ? (
              <MdModeEdit
                onClick={() => setEditAttr(index)}
                className="inline cursor-pointer"
              />
            ) : null}
          </li>
        );
      }
    });
  }
  return (
    <div>
      {loading ? (
        <LargeLoader />
      ) : (
        <>
          <ul className="list-reset">{details}</ul>
          {editAttr != null ? (
            <div className="mt-2 w-full text-center">
              <Button
                onClick={() => {
                  setEditAttr(null);
                  updateFormData({});
                }}
              >
                Cancel
              </Button>
              {Object.keys(formData).length > 0 ? (
                <Button onClick={() => handleSubmit()} color="black">
                  Save
                </Button>
              ) : null}
            </div>
          ) : null}
        </>
      )}
    </div>
  );
};

export default index;

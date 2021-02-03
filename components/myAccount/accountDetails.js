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
  "fullname",
];

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
  let details = [];
  if (info) {
    for (let i = 0; i < possibleAttr.length; ++i) {
      if (!(possibleAttr[i] in info)) {
        info[possibleAttr[i]] = "";
      }
    }
    details = Object.entries(info).map((entry, index) => {
      if (entry[0] == "PersonId") return null;
      if (edit && possibleAttr.includes(entry[0])) {
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
            {/* {possibleAttr.includes(entry[0]) ? (
              <MdModeEdit
                onClick={() => setEdit(index)}
                className="inline cursor-pointer"
              />
            ) : null} */}
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
          {edit ? (
            <div className="mt-2 w-full text-center">
              <Button
                onClick={() => {
                  setEdit(null);
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
          ) : (
            <Button
              color="yellow"
              onClick={() => {
                setEdit(true);
                updateFormData({});
              }}
            >
              Edit
            </Button>
          )}
        </>
      )}
    </div>
  );
};

export default index;

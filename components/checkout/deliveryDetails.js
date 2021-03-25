import { useState } from "react";
import { FcCheckmark } from "react-icons/fc";
import { Form, Input, TextArea, Checkbox, Message } from "semantic-ui-react";
import { verifyAddress } from "../../store/helpers";

const deliveryDetails = ({
  activeCheckoutStep,
  setActiveCheckout,
  personInfo,
  setPersonInfo,
  step,
}) => {
  const isActive = activeCheckoutStep == step;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const verifyAddressToContinue = async (personInfo) => {
    let postalcode = personInfo["postalcode"].trim().toUpperCase().slice(0, 3);
    try {
      let resp = await verifyAddress({ postalcode: postalcode });
      let valid = resp.status == 200 && resp.data == "Valid postal code";
      if (valid) {
        setActiveCheckout(activeCheckoutStep + 1);
        setLoading(false);
      } else {
        console.log("NOT VALID");
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError(
        "We currently only deliver to Vancouver, North Vancouver and West Vancouver."
      );
    }
  };

  const handleChange = (e) => {
    setPersonInfo({
      ...personInfo,
      [e.target.name]: e.target.value.trim(),
    });
  };
  return (
    <div className="p-3 m-3">
      <p className="flex justify-between border-b">
        <span>
          {step}. Delivery Details
          {activeCheckoutStep > step ? (
            <FcCheckmark className="inline ml-3 mb-1" />
          ) : null}
        </span>
        {activeCheckoutStep > step ? (
          <span
            className="cursor-pointer"
            onClick={() => setActiveCheckout(step)}
          >
            Edit
          </span>
        ) : null}
      </p>
      {isActive ? (
        <Form
          error
          loading={loading}
          onSubmit={(e) => {
            e.preventDefault();
            setLoading(true);
            verifyAddressToContinue(personInfo);
          }}
          className="flex flex-wrap text-left pt-4"
        >
          <label className="font-bold w-full ">Full Name:</label>
          <Input
            required
            className="w-full my-3 mb-6"
            value={personInfo.fullname}
            name="fullname"
            type="name"
            onChange={handleChange}
          />
          <label className="font-bold w-full ">Address:</label>
          <Input
            required
            className="w-full my-3 mb-6"
            value={personInfo.address}
            name="address"
            type="address"
            onChange={handleChange}
          />
          <label className="font-bold w-full ">
            Apartment, suite, etc. (optional):
          </label>
          <Input
            className="w-full my-3 mb-6"
            value={personInfo.address2}
            name="address2"
            type="address"
            onChange={handleChange}
          />
          <label className="font-bold w-full ">City:</label>
          <Input
            required
            className="w-full my-3 mb-6"
            value={personInfo.city}
            name="city"
            onChange={handleChange}
          />
          <label className="font-bold w-full focus:none">Country:</label>
          <Input
            readOnly
            className="w-full my-3 mb-6"
            value={"Canada"}
            name="country"
          />
          <label className="font-bold w-full ">Province:</label>
          <Input
            readOnly
            className="w-full my-3 mb-6"
            value={"British Columbia"}
            name="province"
          />
          <label className="font-bold w-full ">Postal Code:</label>
          <Input
            required
            className="w-full my-3 mb-6"
            value={personInfo.postalcode}
            name="postalcode"
            onChange={handleChange}
          />
          <label className="font-bold w-full ">Phone:</label>
          <Input
            required
            className="w-full my-3 mb-6"
            value={personInfo.phone}
            name="phone"
            type="tel"
            onChange={handleChange}
          />
          <TextArea
            placeholder="Special notes about delivery..."
            className="w-full my-3 mb-6 p-3"
            name="notes"
            value={personInfo.notes}
            onChange={handleChange}
          />
          <div className="my-3">
            <Checkbox
              onChange={() => {
                setPersonInfo({
                  ...personInfo,
                  saveDeliveryDetails: !personInfo["saveDeliveryDetails"],
                });
              }}
              defaultChecked
              label="Save delivery details for later"
            />
          </div>
          {error != null ? (
            <Message error header="Invalid Address!" content={error} />
          ) : null}
          <div className="w-full text-center">
            <button className="standard-btn" type="submit">
              Continue
            </button>
          </div>
        </Form>
      ) : null}
    </div>
  );
};

export default deliveryDetails;

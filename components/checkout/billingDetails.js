import { useState } from "react";
import { FcCheckmark } from "react-icons/fc";
import { Form, Input, TextArea, Checkbox, Message } from "semantic-ui-react";
// import { verifyAddress } from "../../store/helpers";

const billingDetails = ({
  activeCheckoutStep,
  setActiveCheckout,
  personInfo,
  setPersonInfo,
  step,
  billingInfo,
  setBillingInfo,
}) => {
  const isActive = activeCheckoutStep == step;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [same, setSame] = useState(true);

  const handleChange = (e) => {
    setBillingInfo({
      ...billingInfo,
      [e.target.name]: e.target.value.trim(),
    });
  };

  return (
    <div className="p-3 m-3">
      <p className="flex justify-between border-b">
        <span>
          {step}. Billing Details
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
            if (same) {
              let keys = [
                "fullname",
                "address",
                "address2",
                "city",
                "postalcode",
              ];
              for (let i = 0; i < keys.length; ++i) {
                billingInfo[keys[i]] = personInfo[keys[i]];
              }
              setPersonInfo({
                ...personInfo,
                billingInfo: { ...billingInfo },
              });
            } else {
              setPersonInfo({
                ...personInfo,
                billingInfo: billingInfo,
              });
            }
            setActiveCheckout(activeCheckoutStep + 1);
          }}
          className="flex flex-wrap text-left pt-4"
        >
          <div className="my-3">
            <Checkbox
              onChange={() => {
                setSame(!same);
              }}
              checked={same}
              label="Same as Delivery?"
            />
          </div>

          {!same ? (
            <>
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
                value={billingInfo.address}
                name="address"
                type="address"
                onChange={handleChange}
              />
              <label className="font-bold w-full ">
                Apartment, suite, etc. (optional):
              </label>
              <Input
                className="w-full my-3 mb-6"
                value={billingInfo.address2}
                name="address2"
                type="address"
                onChange={handleChange}
              />
              <label className="font-bold w-full ">City:</label>
              <Input
                required
                className="w-full my-3 mb-6"
                value={billingInfo.city}
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
                value={billingInfo.postalcode}
                name="postalcode"
                onChange={handleChange}
              />
            </>
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

export default billingDetails;

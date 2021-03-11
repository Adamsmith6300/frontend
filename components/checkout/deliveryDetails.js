import { FcCheckmark } from "react-icons/fc";

const deliveryDetails = ({
  activeCheckoutStep,
  setActiveCheckout,
  personInfo,
  setPersonInfo,
}) => {
  const step = 2;
  const isActive = activeCheckoutStep == step;

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
          2. Delivery Details
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
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setActiveCheckout(activeCheckoutStep + 1);
          }}
          className="flex flex-wrap text-left pt-4"
        >
          <label className="font-bold w-full pl-3 py-1">Full Name:</label>
          <input
            required
            className="w-full pl-3 py-1 my-3 mb-6 h-10 bg-gray-200"
            label="Full Name"
            value={personInfo.fullname}
            name="fullname"
            type="name"
            onChange={handleChange}
          />
          <label className="font-bold w-full pl-3 py-1">Address:</label>
          <input
            required
            className="w-full pl-3 py-1 my-3 mb-6 h-10 bg-gray-200"
            label="Address"
            value={personInfo.address}
            name="address"
            type="address"
            onChange={handleChange}
          />
          <label className="font-bold w-full pl-3 py-1">Address2:</label>
          <input
            className="w-full pl-3 py-1 my-3 mb-6 h-10 bg-gray-200"
            label="Address 2"
            value={personInfo.address2}
            name="address2"
            type="address"
            onChange={handleChange}
          />
          <label className="font-bold w-full pl-3 py-1">City:</label>
          <input
            required
            className="w-full pl-3 py-1 my-3 mb-6 h-10 bg-gray-200"
            label="City"
            value={personInfo.city}
            name="city"
            onChange={handleChange}
          />
          <label className="font-bold w-full pl-3 py-1">Province:</label>
          <input
            required
            className="w-full pl-3 py-1 my-3 mb-6 h-10 bg-gray-200"
            label="Province"
            value={personInfo.province}
            name="province"
            onChange={handleChange}
          />
          <label className="font-bold w-full pl-3 py-1">Postal Code:</label>
          <input
            required
            className="w-full pl-3 py-1 my-3 mb-6 h-10 bg-gray-200"
            label="Postal Code"
            value={personInfo.postalcode}
            name="postalcode"
            onChange={handleChange}
          />
          <label className="font-bold w-full pl-3 py-1">Phone:</label>
          <input
            required
            className="w-full pl-3 py-1 my-3 mb-6 h-10 bg-gray-200"
            label="Phone Number"
            value={personInfo.phone}
            name="phone"
            type="tel"
            onChange={handleChange}
          />
          <textarea
            placeholder="Special notes about delivery..."
            className="w-full pl-3 py-1 my-3 mb-6 h-10 bg-gray-200"
            label="Notes"
            name="notes"
            value={personInfo.notes}
            onChange={handleChange}
          />
          <div className="w-full text-center">
            <button className="standard-btn" type="submit">
              Continue
            </button>
          </div>
        </form>
      ) : null}
    </div>
  );
};

export default deliveryDetails;

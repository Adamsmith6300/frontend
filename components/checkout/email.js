import { FcCheckmark } from "react-icons/fc";

const email = ({
  activeCheckoutStep,
  setActiveCheckout,
  setPersonInfo,
  personInfo,
}) => {
  const step = 1;
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
          1. Email{" "}
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
        >
          <input
            className="w-full pl-3 py-1 my-3 mb-6 h-10 bg-gray-200"
            required
            label="Email"
            value={personInfo.email}
            placeholder="adam@email.com"
            name="email"
            type="email"
            onChange={handleChange}
          />
          <button className="standard-btn" type="submit">
            Continue
          </button>
        </form>
      ) : null}
    </div>
  );
};

export default email;

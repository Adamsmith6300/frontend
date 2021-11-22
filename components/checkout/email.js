import { FcCheckmark } from "react-icons/fc";
import { Input } from "semantic-ui-react";
import { useRouter } from "next/router";

const email = ({
  activeCheckoutStep,
  setActiveCheckout,
  setPersonInfo,
  personInfo,
  step,
  isGuest,
}) => {
  const isActive = activeCheckoutStep == step;
  const router = useRouter();

  const handleChange = (e) => {
    setPersonInfo({
      ...personInfo,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="p-3 m-3">
      <p className="flex justify-between border-b">
        <span>
          {step}. Email{" "}
          {activeCheckoutStep > step ? (
            <FcCheckmark className="inline ml-3 mb-1 text-green-900" />
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
            router.push("#deliveryDetails");
          }}
        >
          <Input
            className="w-full my-3 mb-6"
            required
            value={isGuest ? null : personInfo.email}
            placeholder="adam@email.com"
            name="email"
            type="email"
            onChange={handleChange}
          />
          <button
            className="btn-no-size-color bg-green-900 px-8 py-3 "
            type="submit"
          >
            Continue
          </button>
        </form>
      ) : null}
    </div>
  );
};

export default email;

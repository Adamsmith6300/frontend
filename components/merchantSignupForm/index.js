import React, { useState } from "react";
import { Checkbox, Form, Message } from "semantic-ui-react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Privacy from "../privacy";
import Terms from "../terms";

const index = ({ handleUserPassSubmit, setLoading }) => {
  const [formError, setFormError] = useState(null);
  const [showPwd, setShowPwd] = useState(false);
  const [showRePwd, setShowRePwd] = useState(false);
  const [modal, setModal] = useState(null);
  const [formData, updateFormData] = useState({
    agreeTermsPrivacy: "disagree",
    merchant: true,
    agreeToMarketing: false,
  });

  const policyModal = () => {
    return (
      <div className="policy-modal grid grid-cols-1 place-items-center border shadow-lg">
        {modal == "privacy" ? <Privacy /> : <Terms />}
        <button
          onClick={() => setModal(null)}
          className="btn-no-size-color bg-green-900 px-8 py-4 my-3"
        >
          CLOSE
        </button>
      </div>
    );
  };
  const validatePassword = (e) => {
    let val = e.target.value;
    if (e.target.value.length < 10) {
      setFormError("Password must be 10 characters long");
    }
    if (val.toLowerCase() == val) {
      setFormError("Password must contain at least 1 uppercase");
    }
    if (val.toUpperCase() == val) {
      setFormError("Password must contain at least 1 lowercase");
    }
    let digits = /[0-9]/;
    if (!digits.test(val)) {
      setFormError("Password must contain at least 1 number");
    }
    let symbols = /\W|_/;
    if (!symbols.test(val)) {
      setFormError("Password must contain at least 1 symbol");
    }
    if (e.target.name == "repassword") {
      if (formData["password"] != e.target.value) {
        setFormError("Passwords don't match!");
      }
    }
    if (e.target.name == "password") {
      if (
        formData["repassword"] != null &&
        formData["repassword"].length > 0 &&
        formData["repassword"] != e.target.value
      ) {
        setFormError("Passwords don't match!");
      }
    }
  };

  const handleChange = (e) => {
    if (formError != null) {
      setFormError(null);
    }
    if (e.target.name == "repassword" || e.target.name == "password") {
      validatePassword(e);
    }
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (formError != null) {
      setFormError(null);
    }
    if (formData["agreeTermsPrivacy"] == "disagree") {
      setFormError("Please agree to terms and privacy policy");
      setLoading(false);
      return;
    }
    handleUserPassSubmit(formData);
  };

  return (
    <>
      {modal != null ? policyModal() : null}
      <Form
        error={formError != null}
        onSubmit={(e) => {
          setLoading(true);
          e.preventDefault();
          handleSubmit();
        }}
      >
        <Form.Input
          label="Email"
          onChange={handleChange}
          name="email"
          required
          placeholder="adam@email.com"
          type="email"
        />
        <fieldset className="flex">
          <Form.Input
            className="w-full"
            label="Enter Password"
            type={showPwd ? "text" : "password"}
            onChange={handleChange}
            name="password"
            required
            placeholder="Password123!"
          />
          <span
            onClick={() => setShowPwd(!showPwd)}
            className="pt-2 w-50 grid place-items-center"
          >
            {showPwd ? (
              <AiOutlineEye className="text-2xl" />
            ) : (
              <AiOutlineEyeInvisible className="text-2xl" />
            )}
          </span>
        </fieldset>
        <fieldset className="flex">
          <Form.Input
            className="w-full"
            label="Confirm Password"
            type={showRePwd ? "text" : "password"}
            onChange={handleChange}
            name="repassword"
            required
            placeholder="Password123!"
          />
          <span
            onClick={() => setShowRePwd(!showRePwd)}
            className="pt-2 w-50 grid place-items-center"
          >
            {showRePwd ? (
              <AiOutlineEye className="text-2xl" />
            ) : (
              <AiOutlineEyeInvisible className="text-2xl" />
            )}
          </span>
        </fieldset>
        <Form.Field>
          <Checkbox
            onChange={() =>
              handleChange({
                target: {
                  value:
                    formData["agreeTermsPrivacy"] == "agree"
                      ? "disagree"
                      : "agree",
                  name: "agreeTermsPrivacy",
                },
              })
            }
            className="pt-1 mr-2"
          />
          <p className="inline text-base">
            <span>I accept the </span>
            <span className="cursor-pointer" onClick={() => setModal("terms")}>
              Terms + Conditions
            </span>{" "}
            <span>and acknowledge the </span>
            <span
              className="cursor-pointer"
              onClick={() => setModal("privacy")}
            >
              Privacy Policy
            </span>
          </p>
        </Form.Field>
        <Form.Field>
          <Checkbox
            checked={formData["agreeToMarketing"]}
            onChange={() =>
              handleChange({
                target: {
                  value: !formData["agreeToMarketing"],
                  name: "agreeToMarketing",
                },
              })
            }
            className="pt-1 mr-2"
          />
          <p className="inline text-base">Email me with news and promotions</p>
        </Form.Field>
        <Message error content={formError} />
        <div className="flex justify-center">
          <button
            className="btn-no-size-color bg-green-900 px-8 py-4"
            type="submit"
          >
            Next
          </button>
        </div>
      </Form>
    </>
  );
};

export default index;

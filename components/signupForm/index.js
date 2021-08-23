import React, { useState } from "react";
import Link from "next/link";
import { Button, Checkbox, Form, Input, Message } from "semantic-ui-react";
import Privacy from "../privacy";
import Terms from "../terms";

const index = ({ submitSignup, setLoading, formError, setFormError }) => {
  const [modal, setModal] = useState(null);
  const [formData, updateFormData] = useState({
    agreeTermsPrivacy: "disagree",
  });
  const policyModal = () => {
    return (
      <div className="policy-modal grid grid-cols-1 place-items-center border shadow-lg">
        {modal == "privacy" ? <Privacy /> : <Terms />}
        <button onClick={() => setModal(null)} className="standard-btn my-3">
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

  const handleSubmit = async () => {
    if (formError != null) {
      setFormError(null);
    }
    if (formData["agreeTermsPrivacy"] == "disagree") {
      setFormError("Please agree to terms and privacy policy");
      return;
    }
    await submitSignup(formData);
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
        {/* <Form.Input
          label="Full Name"
          onChange={handleChange}
          name="fullname"
          required
          placeholder="Full Name"
        /> */}
        <Form.Input
          label="Email"
          onChange={handleChange}
          name="email"
          required
          placeholder="adam@email.com"
          type="email"
        />
        <Form.Input
          label="Enter Password"
          type="password"
          onChange={handleChange}
          name="password"
          required
          placeholder="Password123!"
        />
        <Form.Input
          label="Re-enter Password"
          type="password"
          onChange={handleChange}
          name="repassword"
          required
          placeholder="Password123!"
        />
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
        <Message error content={formError} />
        <div className="flex justify-center">
          <button className="standard-btn" type="submit">
            Submit
          </button>
        </div>
      </Form>
    </>
  );
};

export default index;

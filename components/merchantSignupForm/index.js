import React, { useState } from "react";
import Link from "next/link";
import { Button, Checkbox, Form, Input, Message } from "semantic-ui-react";
// import SuccessfulSignup from "./successfulSignup";

const index = ({ handleUserPassSubmit }) => {
  const [isLoading, setLoading] = useState(false);
  const [formError, setFormError] = useState(null);
  const [modal, setModal] = useState(null);
  const [formData, updateFormData] = useState({
    agreeTermsPrivacy: "disagree",
    merchant: true,
  });

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
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = () => {
    if (formError != null) {
      setFormError(null);
    }
    if (formData["agreeTermsPrivacy"] == "disagree") {
      setFormError("Please agree to terms and privacy policy");
      return;
    }
    handleUserPassSubmit(formData);
  };

  return (
    <>
      {modal == "privacy" ? (
        <div className="py-32 fixed z-50 w-full h-full bg-white top-0">
          <p>Privacy</p>
          <button onClick={() => setModal(null)} className="standard-btn">
            CLOSE
          </button>
        </div>
      ) : null}
      {modal == "terms" ? (
        <div className="py-32 fixed z-50 w-full h-full bg-white top-0">
          <p>Terms</p>
          <button onClick={() => setModal(null)} className="standard-btn">
            CLOSE
          </button>
        </div>
      ) : null}
      <Form
        error={formError != null}
        onSubmit={(e) => {
          setLoading(true);
          e.preventDefault();
          handleSubmit();
          setLoading(false);
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
            Next
          </button>
        </div>
      </Form>
    </>
  );
};

export default index;

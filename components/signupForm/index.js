import React, { useState } from "react";
import { Button, Checkbox, Form, Input } from "semantic-ui-react";
import SuccessfulSignup from "./successfulSignup";

const index = ({ submitSignup, formError, successfulSignup }) => {
  if (successfulSignup) return <SuccessfulSignup />;

  let isValidEmail = true
    ? null
    : {
        content: "Please enter a valid email address",
        pointing: "below",
      };

  const [isLoading, setLoading] = useState(false);
  const [formData, updateFormData] = useState({
    name: "adam smith",
    email: "adamsmith6300@gmail.com",
    password: "Password123!",
  });

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = () => {
    submitSignup(formData);
  };

  return (
    <Form
      loading={isLoading}
      error={formError != undefined}
      onSubmit={(e) => {
        setLoading(true);
        e.preventDefault();
        handleSubmit();
        setLoading(false);
      }}
    >
      <Form.Input
        label="Name"
        onChange={handleChange}
        name="name"
        // required
        placeholder="Name"
      />
      <Form.Input
        label="Email"
        onChange={handleChange}
        name="email"
        // required
        placeholder="adam@email.com"
        type="email"
      />
      <Form.Input
        label="Enter Password"
        type="password"
        onChange={handleChange}
        name="password"
        // required
      />
      <Form.Input
        label="Re-enter Password"
        type="password"
        onChange={handleChange}
        name="RePassword"
        // required
      />
      <Form.Field>
        <Checkbox
          name="agreeTerms"
          label="I agree to the Terms and Conditions"
        />
      </Form.Field>
      {formError != undefined ? (
        <div className="ui error message">
          <div className="header">{formError}</div>
          <p>Please choose another username.</p>
        </div>
      ) : null}
      <Button type="submit">Submit</Button>
    </Form>
  );
};

export default index;

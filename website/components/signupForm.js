import React, { useState } from "react";
import { Button, Checkbox, Form, Input } from "semantic-ui-react";

const SignupForm = ({ submitSignup }) => {
  let isValidEmail = true
    ? null
    : {
        content: "Please enter a valid email address",
        pointing: "below",
      };

  const [isLoading, setLoading] = useState(false);
  const [formData, updateFormData] = useState({});

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleLoadingChange = (e) => setLoading(e.target.value);

  return (
    <Form
      loading={isLoading}
      onSubmit={(e) => {
        e.preventDefault();
        submitSignup(formData);
      }}
    >
      <Form.Input
        label="First Name"
        onChange={handleChange}
        name="FirstName"
        required
        placeholder="First Name"
      />

      <Form.Input
        label="Last Name"
        onChange={handleChange}
        name="LastName"
        required
        placeholder="Last Name"
      />

      <Form.Input
        label="Email"
        onChange={handleChange}
        name="Email"
        required
        placeholder="adam@email.com"
        type="email"
      />
      <Form.Input
        label="Enter Password"
        type="password"
        onChange={handleChange}
        name="Password"
        required
      />
      <Form.Input
        label="Re-enter Password"
        type="password"
        onChange={handleChange}
        name="RePassword"
        required
      />
      <Form.Field>
        <Checkbox
          name="agreeTerms"
          label="I agree to the Terms and Conditions"
        />
      </Form.Field>
      <Button type="submit">Submit</Button>
    </Form>
  );
};

export default SignupForm;

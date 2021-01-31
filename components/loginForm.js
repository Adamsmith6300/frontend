import React, { useState } from "react";
import { Button, Checkbox, Form, Input } from "semantic-ui-react";

const LoginForm = ({
  loading,
  setLoading,
  submitLogin,
  formError,
  successfulLogin,
}) => {
  let isValidEmail = true
    ? null
    : {
        content: "Please enter a valid email address",
        pointing: "below",
      };
  const [formData, updateFormData] = useState({});

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = () => {
    submitLogin(formData);
  };

  return (
    <Form
      // loading={isLoading}
      onSubmit={(e) => {
        e.preventDefault();
        setLoading(true);
        handleSubmit();
      }}
    >
      <Form.Input
        label="Email"
        placeholder="adam@email.com"
        error={isValidEmail}
        name="email"
        type="email"
        onChange={handleChange}
      />
      <Form.Input
        label="Enter Password"
        name="password"
        type="password"
        onChange={handleChange}
      />
      <Button type="submit">Login</Button>
    </Form>
  );
};

export default LoginForm;

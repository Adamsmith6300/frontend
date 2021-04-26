import React, { useState } from "react";
import { Form } from "semantic-ui-react";

const LoginForm = ({ loading, setLoading, submitLogin }) => {
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
    formData["shopify_params"] = localStorage.getItem("shopify_params");
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
        required
        type="email"
        onChange={handleChange}
      />
      <Form.Input
        label="Enter Password"
        name="password"
        type="password"
        placeholder="Password123!"
        required
        onChange={handleChange}
      />
      <div className="flex justify-center">
        <button className="standard-btn" type="submit">
          Login
        </button>
      </div>
    </Form>
  );
};

export default LoginForm;

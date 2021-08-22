import React, { useState } from "react";
import { Button, Checkbox, Form, Input } from "semantic-ui-react";

const ResendForm = ({ formError, submitResend, successfulResend }) => {
  const [formData, updateFormData] = useState({});

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    submitResend(formData);
  };

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <Form.Input
        label="Email"
        placeholder="adam@email.com"
        name="email"
        type="email"
        onChange={handleChange}
      />
      <Button type="submit">Submit</Button>
    </Form>
  );
};

export default ResendForm;

import React from "react";
import { Button, Checkbox, Form, Input } from "semantic-ui-react";

const LoginForm = () => {
  let isLoading = false;
  let isValidEmail = true
    ? null
    : {
        content: "Please enter a valid email address",
        pointing: "below",
      };
  return (
    <Form loading={isLoading}>
      <Form.Field
        id="form-input-control-error-email"
        control={Input}
        label="Email"
        placeholder="adam@email.com"
        error={isValidEmail}
      />
      <Form.Input label="Enter Password" type="password" />
      <Button type="submit">Login</Button>
    </Form>
  );
};

export default LoginForm;

import React from "react";
import { Button, Checkbox, Form, Input } from "semantic-ui-react";

const SignupForm = () => {
  let isLoading = false;
  let isValidEmail = true
    ? null
    : {
        content: "Please enter a valid email address",
        pointing: "below",
      };
  return (
    <Form loading={isLoading}>
      <Form.Field>
        <label>First Name</label>
        <input placeholder="First Name" />
      </Form.Field>
      <Form.Field>
        <label>Last Name</label>
        <input placeholder="Last Name" />
      </Form.Field>
      <Form.Field
        id="form-input-control-error-email"
        control={Input}
        label="Email"
        placeholder="adam@email.com"
        error={isValidEmail}
      />
      <Form.Input label="Enter Password" type="password" />
      <Form.Input label="Re-enter Password" type="password" />
      <Form.Field>
        <Checkbox label="I agree to the Terms and Conditions" />
      </Form.Field>
      <Button type="submit">Submit</Button>
    </Form>
  );
};

export default SignupForm;

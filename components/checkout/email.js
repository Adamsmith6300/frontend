import React, { useState } from "react";
import { Button, Input, Form } from "semantic-ui-react";

const email = ({ activeCheckoutStep, setActiveCheckout, email }) => {
  const step = 1;
  const isActive = activeCheckoutStep == step;

  const [emailData, updateEmailData] = useState(email);

  const handleChange = (e) => {
    updateEmailData(e.target.value.trim());
  };

  return (
    <div className="border border-grey-400 p-3 m-3">
      <p>
        1. Your Email{" "}
        {activeCheckoutStep > step ? (
          <span onClick={() => setActiveCheckout(step)}>Edit</span>
        ) : null}
      </p>
      {isActive ? (
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            setActiveCheckout(activeCheckoutStep + 1);
          }}
        >
          <Input
            required
            label="Email"
            value={emailData}
            placeholder="adam@email.com"
            name="email"
            type="email"
            onChange={handleChange}
          />
          <Form.Field>
            <Button type="submit">Continue</Button>
          </Form.Field>
        </Form>
      ) : null}
    </div>
  );
};

export default email;

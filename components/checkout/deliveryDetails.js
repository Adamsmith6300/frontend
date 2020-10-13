import React, { useState } from "react";
import { Button, Input, TextArea, Form } from "semantic-ui-react";

const deliveryDetails = ({ activeCheckoutStep, setActiveCheckout }) => {
  const step = 2;
  const isActive = activeCheckoutStep == step;
  const [deliveryData, updateDeliveryData] = useState({
    firstname: "adam",
    lastname: "smith",
    address1: "266 e 2nd ave",
    city: "Vancouver",
    province: "BC",
    postalcode: "v5t1b8",
    phonenumber: "6044456169",
  });

  const handleChange = (e) => {
    updateDeliveryData({
      ...deliveryData,
      [e.target.name]: e.target.value.trim(),
    });
  };
  return (
    <div className="border border-grey-400 p-3 m-3">
      <p>
        2. Delivery Details{" "}
        {activeCheckoutStep > step ? (
          <span onClick={() => setActiveCheckout(step)}>Edit</span>
        ) : null}
      </p>
      {isActive ? (
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            setActiveCheckout(activeCheckoutStep + 1);
            console.log(deliveryData);
          }}
        >
          <Input
            required
            label="first name"
            value={deliveryData.firstname}
            name="firstname"
            type="firstname"
            onChange={handleChange}
          />
          <Input
            required
            label="last name"
            value={deliveryData.lastname}
            name="lastname"
            type="lastname"
            onChange={handleChange}
          />
          <Input
            required
            label="Address 1"
            value={deliveryData.address1}
            name="address1"
            type="address"
            onChange={handleChange}
          />
          <Input
            label="Address 2"
            value={deliveryData.address2}
            name="address2"
            type="address"
            onChange={handleChange}
          />
          <Input
            required
            label="City"
            value={deliveryData.city}
            name="city"
            onChange={handleChange}
          />
          <Input
            required
            label="Province"
            value={deliveryData.province}
            name="province"
            onChange={handleChange}
          />
          <Input
            required
            label="Postal Code"
            value={deliveryData.postalcode}
            name="postalcode"
            onChange={handleChange}
          />
          <Input
            required
            label="Phone Number"
            value={deliveryData.phonenumber}
            name="phonenumber"
            type="tel"
            onChange={handleChange}
          />
          <TextArea
            placeholder="Special notes about delivery..."
            label="Notes"
            name="notes"
            value={deliveryData.notes}
            onChange={handleChange}
          />
          <Form.Field>
            <Button>Continue</Button>
          </Form.Field>
        </Form>
      ) : null}
    </div>
  );
};

export default deliveryDetails;

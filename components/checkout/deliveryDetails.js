import React, { useState } from "react";
import { Button, Input, TextArea, Form } from "semantic-ui-react";

const deliveryDetails = ({
  activeCheckoutStep,
  setActiveCheckout,
  personInfo,
}) => {
  const step = 2;
  const isActive = activeCheckoutStep == step;
  const [deliveryData, updateDeliveryData] = useState({
    fullname: personInfo.fullname,
    address1: personInfo.address,
    address2: personInfo.address2,
    city: personInfo.city,
    province: personInfo.province,
    postalcode: personInfo.postalcode,
    phone: personInfo.phone,
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
          }}
        >
          <Input
            required
            label="Full Name"
            value={deliveryData.fullname}
            name="fullname"
            type="name"
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
            value={deliveryData.phone}
            name="phone"
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

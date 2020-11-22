import React, { useState } from "react";
import { CardElement } from "@stripe/react-stripe-js";
import { Button, Form } from "semantic-ui-react";
import axios from "axios";
import { getAuth, getPersonId } from "./../../store/helpers";

const index = ({ stripe, elements, postNewOrder, cartData }) => {
  const [isLoading, updateIsLoading] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    updateIsLoading(true);
    if (!stripe || !elements) {
      return;
    }
    const payload = { PersonId: getPersonId() };
    payload.items = Object.values(cartData.items).map((item, index) => {
      return {
        ProductId: item.ProductId,
        MerchantId: item.MerchantId,
        qty: item.qty,
      };
    });
    const authorization = getAuth();
    console.log(authorization);
    const resp = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/market/order`,
      payload,
      {
        headers: {
          Authorization: authorization,
        },
      }
    );
    if (resp.status == 200) {
      const cardElement = elements.getElement(CardElement);
      const result = await stripe.confirmCardPayment(resp.data.client_secret, {
        payment_method: {
          card: cardElement,
        },
      });
      if (result.error) {
        console.log(result.error.message);
      } else {
        // The payment has been processed!
        if (result.paymentIntent.status === "succeeded") {
          await postNewOrder(resp.data.OrderId);
          console.log("Successfully processed!!!");
          localStorage.removeItem("cart");
        }
      }
    } else {
      console.log("Failed to make payment intent!", resp);
    }
    updateIsLoading(false);
  };

  return (
    <Form loading={isLoading} onSubmit={handleSubmit} className="w-3/4 mx-auto">
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <label>Billing same as delivery?</label>
      <Button type="submit" disabled={!stripe}>
        Pay
      </Button>
    </Form>
  );
};

export default index;

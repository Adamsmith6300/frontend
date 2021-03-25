import React, { useState } from "react";
import { CardElement } from "@stripe/react-stripe-js";
import { Button, Form } from "semantic-ui-react";
import axios from "axios";
import { getAuth, getPersonId, confirmPayment } from "./../../store/helpers";

const index = ({ stripe, elements, cartData, setOrderNo, personInfo }) => {
  const [isLoading, updateIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    updateIsLoading(true);
    if (!stripe || !elements) {
      return;
    }
    const payload = { ...personInfo };
    if ("username" in payload) {
      delete payload["username"];
    }
    payload.items = Object.values(cartData.items).map((item, index) => {
      return {
        ProductId: item.ProductId,
        MerchantId: item.MerchantId,
        qty: item.qty,
      };
    });
    const authorization = getAuth();
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
          try {
            let orderResp = await confirmPayment(resp.data.OrderId);
            if (orderResp.status == 200) {
              localStorage.removeItem("cart");
              setOrderNo(resp.data.OrderId);
            }
          } catch (err) {
            console.log(err);
          }
        }
      }
    } else {
      console.log("Failed to make payment intent!", resp);
    }
    updateIsLoading(false);
  };

  return (
    <Form
      loading={isLoading}
      onSubmit={(e) => {
        console.log("ordered!");
        handleSubmit(e);
      }}
      className="w-3/4 mx-auto pt-6"
    >
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
      <button
        className="btn-no-size-color px-12 py-3 bg-green-600 mt-6"
        type="submit"
        disabled={!stripe}
      >
        Pay
      </button>
    </Form>
  );
};

export default index;

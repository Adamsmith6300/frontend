import React, { useState } from "react";
import { CardElement } from "@stripe/react-stripe-js";
import { Button, Form } from "semantic-ui-react";
import axios from "axios";
import {
  getAuth,
  getPersonId,
  confirmPayment,
  roundToTwo,
} from "./../../store/helpers";

const calcFees = (cart) => {
  let fees = {
    subtotal: cart.total,
    serviceFee: roundToTwo(cart.total * 0.1),
    deliveryFee: roundToTwo(7.5),
  };
  fees["total"] = roundToTwo(
    fees["subtotal"] + fees["serviceFee"] + fees["deliveryFee"]
  );
  return fees;
};

const index = ({
  stripe,
  elements,
  cartData,
  setOrderNo,
  personInfo,
  setCart,
}) => {
  const [isLoading, updateIsLoading] = useState(false);
  const [chargeDetails, setChargeDetails] = useState(calcFees(cartData));

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
    if (cartData.items.length <= 0) {
      updateIsLoading(false);
      return;
    }
    payload.items = Object.values(cartData.items).map((item, index) => {
      return {
        ProductId: item.ProductId,
        MerchantId: item.MerchantId,
        chosenVariant: item.chosenVariant ? item.chosenVariant : null,
        qty: item.qty,
      };
    });
    payload["chargeDetails"] = chargeDetails;
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
            // if (orderResp.status == 200) {
            localStorage.removeItem("cart");
            setCart({
              items: {},
              total: 0,
            });
            setOrderNo(resp.data.OrderId);
            // }
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
    <>
      <div className="text-gray-600 px-6 py-6">
        <p className="flex justify-between">
          <span>Subtotal</span>
          <span>${chargeDetails.subtotal}</span>
        </p>
        <p className="flex justify-between">
          <span>Delivery Fee</span>
          <span>${chargeDetails.deliveryFee}</span>
        </p>
        <p className="flex justify-between">
          <span>Service Fee (10%)</span>
          <span>${chargeDetails.serviceFee}</span>
        </p>
        <p className="flex justify-between text-black">
          <span>Total</span>
          <span>${chargeDetails.total}</span>
        </p>
      </div>
      <Form
        loading={isLoading}
        onSubmit={(e) => {
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
          className={`btn-no-size-color px-12 py-3 ${
            chargeDetails.total == 0 || !stripe
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-green-600"
          } mt-6`}
          type="submit"
          disabled={chargeDetails.total == 0 || !stripe}
        >
          Pay
        </button>
      </Form>
    </>
  );
};

export default index;

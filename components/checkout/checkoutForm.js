import React, { useState } from "react";
import {
  CardCvcElement,
  CardElement,
  CardExpiryElement,
  CardNumberElement,
} from "@stripe/react-stripe-js";
import { Form, Message, Input } from "semantic-ui-react";
import axios from "axios";
import {
  getAuth,
  getPersonId,
  confirmPayment,
  roundToTwo,
} from "./../../store/helpers";
import { defaultEvent, mutateItemsGA } from "../../utils/gtag";

const calcFees = (cart, discount = null) => {
  let discountDollars = 0;
  let fees = {
    subtotal: cart.total,
    deliveryFee: roundToTwo(process.env.NEXT_PUBLIC_DELIVERY_FEE),
  };
  if (discount != null) {
    if (discount["discountValueType"] == "freeDelivery")
      discountDollars = fees["deliveryFee"];
    if (discount["discountValueType"] == "percentage")
      discountDollars = subtotal * discount["discountValue"];
    if (discount["discountValueType"] == "dollars")
      discountDollars = discount["discountValue"];
  }
  discountDollars = roundToTwo(discountDollars);
  fees["discountDollars"] = discountDollars;
  fees["serviceFee"] = roundToTwo(
    (cart.total + fees["deliveryFee"] - discountDollars) *
      process.env.NEXT_PUBLIC_SERVICE_FEE
  );
  fees["totalBeforeTax"] =
    fees["subtotal"] +
    fees["serviceFee"] +
    fees["deliveryFee"] -
    discountDollars;
  fees["tax"] = roundToTwo(
    fees["totalBeforeTax"] *
      (process.env.NEXT_PUBLIC_GST + process.env.NEXT_PUBLIC_PST)
  );
  fees["total"] = roundToTwo(fees["totalBeforeTax"] + fees["tax"]);
  return fees;
};

// const mutateItemsGA = (items) => {
//   return items.map((item, ind) => {
//     return {
//       item_id: item["ProductId"],
//       item_name: item["title"],
//       item_brand: item["storename"],
//       item_category: item["category"].toString(),
//       item_variant: item["chosenVariant"] ? item["chosenVariant"]["id"] : null,
//       price: item["chosenVariant"]
//         ? item["chosenVariant"]["price"]
//         : item["price"],
//       quantity: item["qty"],
//     };
//   });
// };

const codes = ["incorrect_cvc", "processing_error", "invalid_number"];

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
  const [formError, setFormError] = useState(null);
  const [discount, setDiscount] = useState(null);
  const [discountCode, setDiscountCode] = useState(null);
  const [discountError, setDiscountError] = useState(null);
  const [applyingDiscount, setApplyingDiscount] = useState(false);

  const applyDiscount = async () => {
    setApplyingDiscount(true);
    setDiscountError(null);
    setDiscount(null);
    //fetch discount here
    if (discountCode.trim().length > 0) {
      const authorization = getAuth();
      try {
        let payload = {
          PersonId: personInfo.PersonId,
          email: personInfo.email,
          discountCode: discountCode.trim(),
        };
        const resp = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/market/discount`,
          payload,
          {
            headers: {
              Authorization: authorization,
            },
          }
        );
        setChargeDetails(calcFees(cartData, resp.data));
        setDiscount(resp.data);
      } catch (err) {
        console.log("err:", err.response.data);
        setDiscountError(err.response.data);
        setChargeDetails(calcFees(cartData));
      }
    }
    //display error or apply discount
    setApplyingDiscount(false);
  };

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
    payload["discount"] = discount;
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
      const cardNumberElement = elements.getElement(CardNumberElement);
      const result = await stripe.confirmCardPayment(resp.data.client_secret, {
        payment_method: {
          card: cardNumberElement,
        },
      });
      if (result.error) {
        if (
          result.error.code == "card_declined" ||
          codes.indexOf(result.error.code) > -1
        ) {
          setFormError(result.error.message);
        }
        console.log(result.error);
      } else {
        // The payment has been processed!
        if (result.paymentIntent.status === "succeeded") {
          setFormError(null);
          try {
            let orderResp = await confirmPayment(resp.data.OrderId);
          } catch (err) {
            console.log(err);
          }
          try {
            defaultEvent({
              action: "purchase",
              data: {
                transaction_id: resp.data.OrderId,
                affiliation: "LOMA",
                value: chargeDetails.total,
                currency: "CAD",
                tax: 0,
                shipping: chargeDetails.deliveryFee,
                items: mutateItemsGA(Object.values(cartData.items)),
              },
            });
          } catch (err) {
            console.log(err);
          }
          localStorage.removeItem("cart");
          setCart({
            items: {},
            total: 0,
          });
          setOrderNo(resp.data.OrderId);
        }
      }
    } else {
      console.log("Failed to make payment intent!", resp);
      setFormError(
        "An error occurred while processing your order. Please try again later."
      );
    }
    updateIsLoading(false);
  };
  return (
    <>
      <div className="text-gray-600 px-6 py-6">
        <Form
          error={discountError != null}
          loading={applyingDiscount}
          onSubmit={(e) => {
            e.preventDefault();
            if (discountCode != null) applyDiscount();
          }}
          className="text-left pb-3"
        >
          <Input
            className="w-200 mt-3 h-10 mr-2"
            name="discountCode"
            type="text"
            placeholder="Enter discount code"
            onChange={(e) => setDiscountCode(e.target.value)}
          />
          <button
            type="submit"
            className="btn-no-size-color px-6 py-3 bg-green-900 mt-3 lg:mt-0"
          >
            Apply
          </button>
          <Message error content={discountError} />
        </Form>
        <p className="flex justify-between">
          <span>Subtotal</span>
          <span>${chargeDetails.subtotal}</span>
        </p>
        <p className="flex justify-between">
          <span>Delivery Fee</span>
          <span>${chargeDetails.deliveryFee}</span>
        </p>
        {discount != null ? (
          <p className="flex justify-between text-green-600">
            <span>Discount ({discount.discountCode})</span>
            <span>$-{chargeDetails.discountDollars}</span>
          </p>
        ) : null}
        <p className="flex justify-between">
          <span>
            Service Fee ({process.env.NEXT_PUBLIC_SERVICE_FEE * 100}%)
          </span>
          <span>${chargeDetails.serviceFee}</span>
        </p>
        <p className="flex justify-between">
          <span>Taxes</span>
          <span>${chargeDetails.tax}</span>
        </p>
        <p className="flex justify-between text-black">
          <span>Total</span>
          <span>${chargeDetails.total}</span>
        </p>
      </div>
      <Form
        error={formError != null}
        loading={isLoading}
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        className="w-full mx-auto pt-6"
      >
        <CardNumberElement
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
        <CardExpiryElement
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
        <CardCvcElement
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
        <Message error content={formError} />
        <button
          className={`btn-no-size-color px-12 py-3 ${
            chargeDetails.total == 0 || !stripe
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-green-900"
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

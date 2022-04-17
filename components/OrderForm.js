import { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import toast from "react-hot-toast";
export default function OrderForm({ email }) {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }
    try {
      stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
        switch (paymentIntent.status) {
          case "succeeded":
            setMessage("Payment succeeded!");
            break;
          case "processing":
            setMessage("Your payment is processing.");
            break;
          case "requires_payment_method":
            setMessage("Your payment was not successful, please try again.");
            break;
          default:
            setMessage("Something went wrong.");
            break;
        }
      });
    } catch (e) {
      setMessage("Something went wrong.");
      setIsLoading(false);
    }
  }, [stripe]);

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      alert("paying");
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `https://tendollar.site/thanks`,
          receipt_email: email,
          payment_method_data: {
            billing_details: {
              email: email,
            },
          },
        },
      });

      //   const req = await fetch("https://tendollar.site/api/purchase", {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({
      //       email: email,
      //       description: description,
      //     }),
      //   });
      //   const res = await req.json();
      //   console.log("res", res);

      if (error.type === "card_error" || error.type === "validation_error") {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occured.");
      }
      setIsLoading(false);
    } catch (e) {
      toast.error("fuck.. somethin went wrong.");
      setIsLoading(false);
    }
  };

  return (
    <div className="payment">
      <form
        id="payment-form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div className="divider"></div>
        <PaymentElement
          id="payment-element"
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
            },
          }}
        />

        <div className="order-buttons">
          {message && <div id="payment-message">{message}</div>}
          <button disabled={isLoading || !stripe || !elements} type="submit">
            {!isLoading ? "send it" : "sendin it..."}
          </button>
        </div>
      </form>
    </div>
  );
}

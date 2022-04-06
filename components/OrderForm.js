import { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function OrderForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
            fetch("/api/purchase", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: "testemail@mail.com",
                description: "test description",
              }),
            });

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

  const onSubmit = async (data) => {
    if (errors.email) {
      toast.error("Please enter a valid email address");
      return;
    }
    if (!stripe || !elements) {
      return;
    }
    setIsLoading(true);

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `https://tendollar.site/thanks`,
          receipt_email: data.email,
          payment_method_data: {
            billing_details: {
              email: data.email,
            },
            metadata: {
              description: data.description,
            },
          },
        },
      });

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
      <form id="payment-form" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          name="email"
          placeholder="email"
          {...register("email", {
            required: true,
            pattern: /^\S+@\S+$/i,
          })}
          error={errors.email}
        />

        {errors.email && (
          <span className="errors">enter a valid email address</span>
        )}
        <p>be descriptive, or not. idc</p>
        <input
          type="text"
          name="description"
          placeholder="site description"
          {...register("description", {
            required: true,
            minLength: 2,
            maxLength: 200,
          })}
        />
        {errors.description && (
          <span className="errors">
            {errors.description.type === "minLength" && (
              <>description gotta be at least 2 characters</>
            )}
            {errors.description.type === "maxLength" && (
              <>description gotta be less than 200 characters</>
            )}
            {errors.description.type === "required" && (
              <>description required</>
            )}
          </span>
        )}
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

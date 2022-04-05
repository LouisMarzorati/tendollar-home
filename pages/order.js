import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import OrderForm from "../components/OrderForm";
import Link from "next/link";
import toast from "react-hot-toast";
export async function getServerSideProps() {
  return {
    props: {
      STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY,
    },
  };
}
export default function OrderPage({ STRIPE_PUBLIC_KEY }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [sentence, setSentence] = useState("");
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(10);
  const [disableAmountInput, setDisableAmountInput] = useState(false);
  const [triedLessThanTen, setTriedLessThanTen] = useState(false);
  const [triedAmount, setTriedAmount] = useState(false);
  const [intentKey, setIntentKey] = useState("");
  useEffect(() => {
    const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);
    setStripePromise(stripePromise);
  }, []);

  const appearance = {
    theme: "stripe",
    rules: {
      ".Input:hover": {
        border: "1px solid #000",
      },
      ".Tab:hover": {
        border: "1px solid #000",
      },
    },
    variables: {
      colorPrimary: "#ffebb6",
      colorBackground: "#ffffff",
      colorDanger: "red",
      fontFamily:
        "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",
      spacingUnit: "6px",
      fontWeight: "600",
      borderRadius: "0px",
    },
  };

  const options = {
    clientSecret,
    appearance,
  };

  const validDollarAmount = (amount) => {
    var regex = /^[1-9]\d*(((,\d{3}){1})?(\.\d{0,2})?)$/;
    return regex.test(amount);
  };

  const setFailure = () => {
    window.scrollTo(0, 0);
    setLoading(false);
    setError(true);
  };

  const handlePaymentIntent = async () => {
    if (amount < 10) {
      setTriedLessThanTen(true);
      setTriedAmount(amount);
      setAmount(10);
      return;
    }
    setTriedLessThanTen(false);
    setTriedAmount(0);
    setLoading(true);
    setError(false);
    try {
      const req = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });
      const data = await req.json();
      if (data && data.clientSecret) {
        setLoading(false);
        setClientSecret(data.clientSecret);
        setIntentKey(data.intent_key);
        setDisableAmountInput(true);
      } else {
        setFailure();
      }
    } catch (err) {
      setFailure();
      setDisableAmountInput(false);
    }
  };

  const changeAmount = async () => {
    const req = await fetch("/api/cancel-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ intent_key: intentKey }),
    });

    const data = await req.json();
    setClientSecret("");
    setAmount(10);
    setDisableAmountInput(false);
  };

  return (
    <div className="order">
      <Link href="/">
        <a className="link">
          <span>bak</span>
        </a>
      </Link>
      {error && (
        <div className="error">
          <p>ah fuck, somethin went wrong </p>
        </div>
      )}
      {clientSecret && (
        <span onClick={changeAmount} className="change-amount">
          change amount?
        </span>
      )}
      <div className="order-area">
        <div className="order-text">
          {!clientSecret && (
            <>
              <p>yep, it&apos;s $10. if you wanna pay more, cool thanks.</p>
              {triedLessThanTen &&
                `did you really just try to pay $${triedAmount} you fucking idiot. yeah let's just set that back to 10.`}
            </>
          )}
          {clientSecret &&
            `you're gonna pay ${amount} dollars, and that's pretty rad.`}
        </div>
        <div className="dollar">
          $
          <input
            type="number"
            id="amount"
            name="amount"
            placeholder="Amount"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
            }}
            disabled={disableAmountInput}
          />
        </div>
        {clientSecret ? (
          <Elements options={options} stripe={stripePromise}>
            <OrderForm />
          </Elements>
        ) : (
          <div className="order-buttons">
            <span
              onClick={handlePaymentIntent}
              disabled={loading || amount === "" || !validDollarAmount(amount)}
            >
              {loading ? "orderin" : "order"}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

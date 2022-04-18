import Stripe from "stripe";
import { buffer } from "micro";
import Cors from "micro-cors";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

// Stripe requires the raw body to construct the event.
export const config = {
  api: {
    bodyParser: false,
  },
};

const cors = Cors({
  allowMethods: ["POST", "HEAD"],
});

const webhookHandler = async (req, res) => {
  if (req.method === "POST") {
    const buf = await buffer(req);
    const signature = req.headers["stripe-signature"];

    let event;
    try {
      event = stripe.webhooks.constructEvent(
        buf.toString(),
        signature,
        webhookSecret
      );
    } catch (err) {
      // On error, log and return the error message.
      console.log(`❌ Error message: ${err.message}`);
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    // Successfully constructed event.
    console.log("✅ Success:", event.id);

    switch (event.type) {
      case "payment_intent.created": {
        const intent = event.data.object;
        console.log("💰 Payment intent created:", intent.id);
        return res.status(200).send("OK");
      }
      case "payment_intent.succeeded": {
        const payment = event.data.object;
        console.dir(payment);
        if (payment && payment.metadata && payment.amount) {
          const { email, description } = payment.metadata;
          const amount = payment.amount / 1000;

          const strapi = await fetch(`${process.env.STRAPI}/orders`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.STRAPI_KEY}`,
            },
            body: JSON.stringify({
              data: {
                order_number: event.data.object.id,
                paid: amount,
                email,
                description,
              },
            }),
          });

          const result = await strapi.json();
          console.log("result ", result);
        } else {
          console.error("missing payment intent details ", event.data);
        }

        return res.status(200).send(`Webhook received: ${event.type}`);
      }
      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object;
        console.log(
          `❌ Payment failed: ${paymentIntent.last_payment_error?.message}`
        );
        return res
          .status(500)
          .send(
            `Webhook received: ${paymentIntent.last_payment_error?.message}`
          );
      }
      case "charge.captured": {
        const charge = event.data.object;
        console.log(`charge.captured: ${charge}`);

        return res.status(200).send(`Webhook received: ${event.type}`);
      }
      case "charge.succeeded": {
        const charge = event.data.object;
        console.log(`charge.captured: ${charge}`);
        return res.status(200).send(`Webhook received: ${event.type}`);
      }
      default: {
        console.warn(`Unhandled event type: ${event.type}`);
        return res.status(500).send(`Webhook received: ${event.type}`);
      }
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};

export default cors(webhookHandler);

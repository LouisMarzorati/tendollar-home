const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
	// ensure the request is a POST
	if (req.method !== "POST") {
		res.status(405).end();
		return;
	}

	// validation request
	if (!req.body.amount) {
		res.status(400).json({
			message: "Please provide an amount",
		});
		return;
	}

	const { amount } = req.body;

	// convert to cents
	const amountInCents = amount * 100;

	// Create a PaymentIntent with the order amount and currency
	const paymentIntent = await stripe.paymentIntents.create({
		amount: amountInCents,
		currency: "usd",
		payment_method_types: ["card"],
	});

	if (paymentIntent) {
		console.log("paymentIntent", paymentIntent);
		res.send({
			clientSecret: paymentIntent.client_secret,
			intent_key: paymentIntent.id,
		});
	} else {
		res.status(500).send({ error: "Payment intent failed" });
	}
}

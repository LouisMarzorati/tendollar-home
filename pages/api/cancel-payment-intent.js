const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
	if (req.method !== "POST") {
		res.status(405).end();
		return;
	}

	if (!req.body.intent_key) {
		res.status(400).json({
			message: "No payment intent provided",
		});
		return;
	}

	const intent = await stripe.paymentIntents.cancel(req.body.intent_key);

	if (intent) {
		res.send({
			intent,
		});
	} else {
		res.status(500).send({ error: "Payment intent failed" });
	}
}

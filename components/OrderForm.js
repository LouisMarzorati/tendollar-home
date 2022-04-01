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
	}, [stripe]);

	const onSubmit = async (data) => {
		// check form
		if (errors.email) {
			toast.error("Please enter a valid email address");
			return;
		}
		if (!stripe || !elements) {
			return;
		}
		setIsLoading(true);

		const { error } = await stripe.confirmPayment({
			elements,
			confirmParams: {
				return_url: "http://localhost:3000/thanks",
				receipt_email: data.email,
				payment_method_data: {
					billing_details: {
						email: data.email,
					},
					metadata: {
						email: data.email,
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
	};

	return (
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

			<input
				type="text"
				name="description"
				placeholder="site description. be descriptive, or not. it's up to you."
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
					{errors.description.type === "required" && <>description required</>}
				</span>
			)}
			<PaymentElement id="payment-element" />

			<div className="order-buttons">
				{message && <div id="payment-message">{message}</div>}
				<span disabled={isLoading || !stripe || !elements} type="submit">
					send it
				</span>
			</div>
		</form>
	);
}

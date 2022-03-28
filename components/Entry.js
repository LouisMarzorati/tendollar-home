import { useState } from "react";

export default function Entry() {
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [sentence, setSentence] = useState("");

	return (
		<div>
			<label htmlFor="email">Email</label>
			<input
				type="email"
				id="email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<label htmlFor="name">Name</label>
			<input
				type="text"
				id="name"
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>
			<label htmlFor="sentence">Sentence</label>
			<input
				type="text"
				id="sentence"
				value={sentence}
				onChange={(e) => setSentence(e.target.value)}
			/>
			<button
				onClick={() => {
					console.log(email, name, sentence);
				}}
			>
				Submit
			</button>
		</div>
	);
}

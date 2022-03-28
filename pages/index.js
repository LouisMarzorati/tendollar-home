import Head from "next/head";
import { useState } from "react";
export default function Home() {
	const [fancy, setFancy] = useState(false);
	return (
		<div className="container">
			<Head>
				<title>Ten Dollar Site</title>
				<meta name="description" content="Ten Dollar Site." />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className="main">
				<div className={`box ${fancy ? "shadow" : ""}`}>
					<div className="title">
						<span>
							<i>Your site name here!</i>
						</span>
						<span onClick={() => setFancy(!fancy)} className="title-button">
							{fancy ? "TOO FANCY" : "make it fancy"}
						</span>
					</div>
					<div className="body">
						<div>
							<span>you provide</span>
							<ul>
								<li>
									<span>$10</span>
								</li>
								<li>
									<span>a couple words</span>
								</li>
								<li>
									<span>maybe a sentence</span>
								</li>
							</ul>
							<span>we provide</span>
							<ul>
								<li>
									<span>a website</span>
								</li>
							</ul>
						</div>
						<div className="buy-now">
							<span className={`buy-now-button ${fancy ? "boucing" : ""}`}>
								buy now
							</span>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}

import Head from "next/head";

export default function Home() {
	return (
		<div className="container">
			<Head>
				<title>Ten Dollar Site</title>
				<meta name="description" content="My ten dollar site" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className="main">
				<div>lol what</div>
			</main>

			<footer className="footer">
				<a
					href="https://tendollar.site"
					target="_blank"
					rel="noopener noreferrer"
				>
					$10.site
				</a>
			</footer>
		</div>
	);
}

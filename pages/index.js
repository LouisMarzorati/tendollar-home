import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
export default function Home() {
	const [fancy, setFancy] = useState(false);
	return (
		<div className="container">
			<main className="main">
				<div className={`box ${fancy ? "shadow" : ""}`}>
					<div className="title">
						<div contentEditable className="editable">
							Your site name here!
						</div>
						<span onClick={() => setFancy(!fancy)} className="title-button">
							{fancy ? "ok, maybe less fancy" : "make it fancy"}
						</span>
					</div>
					<div className={`body ${fancy ? "fancy-body" : ""}`}>
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
									<span>a {fancy ? "fancy" : ""} website</span>
								</li>
							</ul>
							<Link href="/collection">
								<a className="link">
									<span>see the collection</span>
								</a>
							</Link>
						</div>
						<div className="buy-now">
							<Link href="/order">
								<span className={`buy-now-button ${fancy ? "boucing" : ""}`}>
									order now
								</span>
							</Link>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}

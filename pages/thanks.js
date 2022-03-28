import Link from "next/link";
export default function ThanksPage() {
	return (
		<div className="center">
			<span>thanks.</span>
			<p>
				ur site is cookin, we&apos;ll email you when it&apos;s complete. (a week
				or two)
			</p>
			<Link href="/">
				<a className="link">go home</a>
			</Link>
		</div>
	);
}

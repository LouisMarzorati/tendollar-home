import Head from "next/head";
import "../styles/globals.scss";
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";
function MyApp({ Component, pageProps }) {
	const router = useRouter();

	return (
		<>
			<Head>
				<link
					rel="apple-touch-icon"
					sizes="57x57"
					href="/fav/apple-icon-57x57.png"
				/>
				<link
					rel="apple-touch-icon"
					sizes="60x60"
					href="/fav/apple-icon-60x60.png"
				/>
				<link
					rel="apple-touch-icon"
					sizes="72x72"
					href="/fav/apple-icon-72x72.png"
				/>
				<link
					rel="apple-touch-icon"
					sizes="76x76"
					href="/fav/apple-icon-76x76.png"
				/>
				<link
					rel="apple-touch-icon"
					sizes="114x114"
					href="/fav/apple-icon-114x114.png"
				/>
				<link
					rel="apple-touch-icon"
					sizes="120x120"
					href="/fav/apple-icon-120x120.png"
				/>
				<link
					rel="apple-touch-icon"
					sizes="144x144"
					href="/fav/apple-icon-144x144.png"
				/>
				<link
					rel="apple-touch-icon"
					sizes="152x152"
					href="/fav/apple-icon-152x152.png"
				/>
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="/fav/apple-icon-180x180.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="192x192"
					href="/fav/android-icon-192x192.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href="/fav/favicon-32x32.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="96x96"
					href="/fav/favicon-96x96.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="16x16"
					href="/fav/favicon-16x16.png"
				/>
				<link rel="manifest" href="/fav/manifest.json" />
				<title>
					$10 site{" "}
					{router.pathname !== "/"
						? `• ${router.pathname.replace("/", "").replace("-", " ")}`
						: ""}
				</title>
				<meta name="title" content="tendollar.site" />
				<meta
					name="description"
					content="like ordering a website from wish.com, your dreams come true with tendollar.site"
				/>
				<meta
					name="keywords"
					content="ten dollar, ten dollar site, $10 dollar, $10 dollar site, cheap site, ten dollar website, $10 website, funny cheap, dollar general, ten dollar"
				/>
				<meta name="robots" content="index, follow" />
				<meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
				<meta name="language" content="English" />
				<meta
					property="og:image"
					content="https://tendollar.site/fav/10-dollar.png"
				/>
				<meta property="og:image:type" content="image/png" />
				<meta property="og:image:width" content="512" />
				<meta property="og:image:height" content="512" />
				<meta
					name="twitter:image"
					content="https://tendollar.site/fav/10-dollar.png"
				/>
				<meta name="twitter:image:alt" content="tendollar.site" />
				<meta name="twitter:image:width" content="512" />
				<meta name="twitter:image:height" content="512" />
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:site" content="@tendollarsite" />
				<meta name="twitter:creator" content="@tendollarsite" />
				<meta name="twitter:title" content="tendollar.site" />
				<meta
					name="twitter:description"
					content="like ordering a website from wish.com, your dreams come true with tendollar.site"
				/>
			</Head>
			<div>
				<Toaster />

				<Component {...pageProps} />
			</div>
		</>
	);
}

export default MyApp;

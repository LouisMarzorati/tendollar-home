import Image from "next/image";
import Link from "next/link";
export async function getStaticProps() {
  const { data } = await fetch(
    `${process.env.STRAPI}/sites?populate[0]=image`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.STRAPI_KEY}`,
      },
    }
  ).then((res) => res.json());

  return {
    props: {
      sites: data,
    },
    revalidate: 5000,
  };
}

export default function CollectionPage({ sites }) {
  const keyStr =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

  const triplet = (e1, e2, e3) =>
    keyStr.charAt(e1 >> 2) +
    keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
    keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
    keyStr.charAt(e3 & 63);

  const rgbDataURL = (r, g, b) =>
    `data:image/gif;base64,R0lGODlhAQABAPAA${
      triplet(0, r, g) + triplet(b, 255, 255)
    }/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`;
  return (
    <div className="collection">
      <Link href="/">
        <a className="link">
          <span>bak</span>
        </a>
      </Link>
      <div className="grid">
        {sites &&
          sites.map((site, i) => {
            return (
              <div key={site.id} className="grid-item">
                <Link href={site.url} passHref id={i + 1}>
                  <a target="_blank">
                    <Image
                      className="img img-cover"
                      placeholder="blur"
                      src={site.image?.url}
                      blurDataURL={rgbDataURL(253, 246, 228)}
                      alt={site.image?.alt}
                      width={400}
                      height={400}
                    ></Image>
                  </a>
                </Link>
              </div>
            );
          })}
      </div>
    </div>
  );
}

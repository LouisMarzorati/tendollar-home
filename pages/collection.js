import Image from "next/image";
import Link from "next/link";
export async function getServerSideProps() {
  const sites = [
    {
      url: "https://1.tendollar.site",
      name: "1.tendollar.site",
      image: "/images/1.tendollar.site.png",
    },
    {
      url: "https://2.tendollar.site",
      name: "2.tendollar.site",
      image: "/images/2.tendollar.site.png",
    },
    {
      url: "https://3.tendollar.site",
      name: "3.tendollar.site",
      image: "/images/3.tendollar.site.png",
    },
  ];
  return {
    props: {
      sites,
      ui_path: process.env.UI,
    },
  };
}

export default function CollectionPage({ sites, ui_path }) {
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
              <div key={i} className="grid-item">
                <Link href={site.url} passHref target="_blank" id={i + 1}>
                  <Image
                    className="img img-cover"
                    placeholder="blur"
                    src={site.image}
                    blurDataURL={rgbDataURL(253, 246, 228)}
                    alt={site.name}
                    width={400}
                    height={400}
                  ></Image>
                </Link>
              </div>
            );
          })}
      </div>
    </div>
  );
}

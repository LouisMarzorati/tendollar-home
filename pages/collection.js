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
                <Link href={site.url} passHref>
                  <a target="_blank">
                    <img src={site.image} alt={site.name} />
                  </a>
                </Link>
              </div>
            );
          })}
      </div>
    </div>
  );
}

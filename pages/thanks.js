import Link from "next/link";
import { useState, useEffect } from "react";
export default function ThanksPage() {
  const [order, setOrder] = useState(null);
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const orderId = query.get("payment_intent");
    if (orderId) {
      setOrder(orderId);
    }
  }, []);

  return (
    <div className="center">
      <span>thanks.</span>
      <p>
        ur site is cookin, we&apos;ll email you when it&apos;s complete. (a week
        or two)
      </p>
      <p>{order ? `order # ${order}` : ""}</p>
      <Link href="/">
        <a className="link">go home</a>
      </Link>
    </div>
  );
}

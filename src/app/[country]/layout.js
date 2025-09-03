// app/[country]/layout.js
import clientPromise from "@/lib/mongodb";
import { notFound } from "next/navigation";

export default function CountryLayout({ children, params }) {
  return <CountryHtml params={params}>{children}</CountryHtml>;
}

// ✅ Move async logic into a Server Component
async function CountryHtml({ children, params }) {
  const client = await clientPromise;
  const db = client.db(process.env.DB_NAME);

  const countryDoc = await db.collection("countries").findOne({
    countryCode: params.country,
    activeStatus: true,
  });

  if (!countryDoc) {
    notFound();
  }

  return (
    <html lang={countryDoc.countryLanguage || "en"}>
      <body>{children}</body>
    </html>
  );
}

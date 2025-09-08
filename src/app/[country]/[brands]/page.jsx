"use server";

import { notFound } from "next/navigation";
import BrandClient from "@/components/BrandClient";

// --- Fetch brand data ---
async function getBrand(country, slug) {
//   const res = await fetch(
//     `https://www.nativediscounts.com/api/brands/${slug}?country=${country}`,
//     { cache: "no-store" }
//   );
// //  if (!res.ok) throw new Error("Failed to fetch brand data");
//   return res.json();
  try {
    const res = await fetch(
      `https://www.nativediscounts.com/api/brands/${slug}?country=${country}`,
      { cache: "no-store" }
    );

    const data = await res.json();
    if (!res.ok || data?.error) return null; // ✅ handle errors
    return data;
  } catch (e) {
    return null;
  }
}

async function getCoupons(slug) {
  try {
    const res = await fetch(
      `https://www.nativediscounts.com/api/coupons/${slug}`,
      { cache: "no-store" }
    );

    const data = await res.json();
    if (!res.ok || data?.error) return []; // ✅ fallback to empty array
    return data;
  } catch (e) {
    return [];
  }
}

// --- SEO Metadata ---
export async function generateMetadata({ params }) {
  const { country, brands } = params;
  const brand = await getBrand(country, brands);

  if (!brand) {
    return {
      title: "Brand Not Found",
      description: "This brand does not exist or is unavailable.",
    };
  }

  return {
    title: brand.seoTitle || `${brand.brandName} Discount Codes`,
    description:
      brand.seoDescription ||
      `Find the latest ${brand.brandName} voucher codes and deals.`,
  };
}   

// --- Page ---
export default async function BrandPage({ params, searchParams }) {
  const { country, brands } = params;
  const rc = searchParams?.rc || null;

  const brand = await getBrand(country, brands);
  if (!brand) notFound(); // ✅ return 404 page if brand missing

  const coupons = await getCoupons(brands);

  return (
    <BrandClient brand={brand} coupons={coupons} rc={rc} country={country} />
  );
}
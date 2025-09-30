"use server";

import { notFound } from "next/navigation";
import BrandClient from "@/components/BrandClient";
const now = new Date();
const month = now.toLocaleString("default", { month: "long" });
const year = now.getFullYear();

// Function to replace placeholders
const formatSeoTitle = (template, brand, country) => {
  return template
    .replace(/\[DISCOUNT\]/g, "Discount 35% OFF")
    .replace(/\[BRAND\]/g, brand.brandName)
    .replace(/\[COUNTRY\]/g, country.toUpperCase())
    .replace(/\[MONTH\]/g, month)
    .replace(/\[YEAR\]/g, year);
};

// Use seoTitle if exists, otherwise fallback

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

const seoTitle = brand.seoTitle
  ? formatSeoTitle(brand.seoTitle, brand, brand.country)
  : `${brand.brandName} Discount Codes ${month} ${year}`; 

  const seoDescription = brand.seoDescription
    ? formatSeoTitle(brand.seoDescription, brand, brand.country)
    : `Find the latest ${brand.brandName} voucher codes and deals.`;
  return {
    
    title: seoTitle || `${brand.brandName} Discount Codes`,
    description:seoDescription
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
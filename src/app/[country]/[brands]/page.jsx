"use server";

import Image from "next/image";
import Link from "next/link";
import OfferCard from "@/components/OfferCard";
import BrandClient from "@/components/BrandClient";

// --- Fetch brand data ---
async function getBrand(country, slug) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/brands/${slug}?country=${country}`,
    { cache: "no-store" }
  );
  if (!res.ok) throw new Error("Failed to fetch brand data");
  return res.json();
}

async function getCoupons(slug) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/coupons/${slug}`,
    { cache: "no-store" }
  );
  if (!res.ok) throw new Error("Failed to fetch coupons");
  return res.json();
}

// --- SEO Metadata ---
export async function generateMetadata({ params }) {
  const { country, brands } = params;
  const brand = await getBrand(country, brands);

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
  const coupons = await getCoupons(brands);

  return (
    <BrandClient brand={brand} coupons={coupons} rc={rc} country={country} />
  );
}

   
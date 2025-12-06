"use server";

import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import BrandClient from "@/components/BrandClient";
import { metadata } from "@/app/layout";

const now = new Date();
const month = now.toLocaleString("default", { month: "long" });
const year = now.getFullYear();

// Function to replace placeholders
const formatSeoTitle = (template, brand, country) => {
  return template
    .replace(/\[DISCOUNT\]/g, "35% OFF")
    .replace(/\[BRAND\]/g, brand.brandName)
    .replace(/\[COUNTRY\]/g, country.toUpperCase())
    .replace(/\[MONTH\]/g, month)
    .replace(/\[YEAR\]/g, year);
};

// --- Fetch brand data ---
async function getBrand(country, slug) {
  try {
    const res = await fetch(
      `https://www.nativediscounts.com/api/brands/${slug}?country=${country}`,
      { cache: "no-store" }
    );

    const data = await res.json();
    if (!res.ok || data?.error) return null;
    return data;
  } catch (e) {
    return null;
  }
}

// --- Fetch coupons ---
async function getCoupons(slug) {
  try {
    const res = await fetch(
      `https://www.nativediscounts.com/api/coupons/${slug}`,
      { cache: "no-store" }
    );

    const data = await res.json();
    if (!res.ok || data?.error) return [];
    return data;
  } catch (e) {
    return [];
  }
}

// --- Fetch Similar Brands ---
async function getSimilarBrands(slug) {
  console.log(slug," Fetching similar brands"); // Debugging log
  try {
    const res = await fetch(
      `https://www.nativediscounts.com/api/similar-brands/${slug}`,
      { cache: "no-store" }
    );

    const data = await res.json();
    console.log("Similar Brands Data:", data.similarBrands); // Debugging log
    if (!res.ok || data?.error) return [];
    return data.similarBrands;
  } catch (e) {
    return [];
  }
}

// --- SEO Metadata ---
export async function generateMetadata({ params }) {
  const cookieStore = cookies();
  const locale = cookieStore.get("og_locale")?.value || "en_US";
  const { brands } = params;
  const country = "us";

  const brand = await getBrand(country, brands);
  if (!brand) {
    return {
      title: "Brand Not Found",
      description: "This brand does not exist or is unavailable.",
    };
  }

  const image = `https://www.nativediscounts.com${brand.brandLogo.replace(/\s/g, '%20')}`;

  const seoTitle = brand.seoTitle
    ? formatSeoTitle(brand.seoTitle, brand, brand.country)
    : `${brand.brandName} Discount Codes ${month} ${year}`;

  const seoDescription = brand.seoDescription
    ? formatSeoTitle(brand.seoDescription, brand, brand.country)
    : `Find the latest ${brand.brandName} voucher codes and deals.`;

  const baseUrl = "https://www.nativediscounts.com";

  return {
    title: seoTitle,
    description: seoDescription,
    metadataBase: new URL(baseUrl),

    alternates: {
      canonical: `${baseUrl}/${brands}`,
    },

    openGraph: {
      title: seoTitle,
      description: seoDescription,
      siteName: "NativeDiscounts",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${brand.brandName} Logo`,
        },
      ],
      locale: locale,
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDescription,
      images: [image],
    },
  };
}

// --- Page ---
export default async function BrandPage({ params, searchParams }) {
  const country = "us";
  const { brands } = params;
  const rc = searchParams?.rc || null;

  const brand = await getBrand(country, brands);
  if (!brand) notFound();

  const coupons = await getCoupons(brands);

  // NEW: fetch similar brands
  const similarBrands = await getSimilarBrands(brands);

  const baseUrl = "https://www.nativediscounts.com";

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Brand",
    name: brand.brandName,
    url: baseUrl,
    logo: `https://www.nativediscounts.com${brand.brandLogo.replace(/\s/g, '%20')}`,
    sameAs: [
      "https://www.facebook.com/nativediscounts",
      "https://twitter.com/nativediscounts",
      "https://www.instagram.com/nativediscounts",
    ],
  };

  return (
    <>
      <BrandClient
        brand={brand}
        coupons={coupons}
        rc={rc}
        country={country}
        similarBrands={similarBrands}  // <-- Added here
      />

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
    </>
  );
}

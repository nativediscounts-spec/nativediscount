"use server";

import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import BrandClient from "@/components/BrandClient";

const now = new Date();
const month = now.toLocaleString("default", { month: "long" });
const year = now.getFullYear();

/* =========================
   Fetch Brand
========================= */
async function getBrand(country, slug) {
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_SITE_URL + `api/brands/${slug}?country=${country}`,
      { cache: "no-store" }
    );

    const data = await res.json();
    if (!res.ok || data?.error) return null;
    return data;
  } catch {
    return null;
  }
}

/* =========================
   Fetch Coupons
========================= */
async function getCoupons(slug) {
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_SITE_URL + `api/coupons/${slug}`,
      { cache: "no-store" }
    );

    const data = await res.json();
    if (!res.ok || data?.error) return [];
    return data;
  } catch {
    return [];
  }
}

/* =========================
   Fetch Similar Brands
========================= */
async function getSimilarBrands(slug) {
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_SITE_URL + `api/similar-brands/${slug}`,
      { cache: "no-store" }
    );

    const data = await res.json();
    if (!res.ok || data?.error) return [];
    return data.similarBrands || [];
  } catch {
    return [];
  }
}

/* =========================
   SEO Helper (FIXED)
========================= */
const formatSeoTitle = (template, brand, country, coupons = []) => {
  const discount =
    coupons?.[0]?.discount && coupons[0].discount.trim() !== ""
      ? coupons[0].discount
      : "35% OFF";

  return template
    .replace(/\[DISCOUNT\]/g, discount)
    .replace(/\[BRAND\]/g, brand.brandName)
    .replace(/\[COUNTRY\]/g, country.toUpperCase())
    .replace(/\[MONTH\]/g, month)
    .replace(/\[YEAR\]/g, year);
};

/* =========================
   Metadata
========================= */
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

  // ✅ FETCH COUPONS HERE
  const coupons = await getCoupons(brands);
const selectedCoupon = coupons?.find(
  (c) => String(c.inputType) === "3"
);
  const discount =
    coupons?.length > 0 && selectedCoupon?.discount
      ? selectedCoupon.discount
      : "35% OFF";

  const seoTitle = brand.seoTitle
    ? brand.seoTitle
        .replace(/\[DISCOUNT\]/g, discount)
        .replace(/\[BRAND\]/g, brand.brandName)
        .replace(/\[COUNTRY\]/g, country.toUpperCase())
        .replace(/\[MONTH\]/g, month)
        .replace(/\[YEAR\]/g, year)
    : `${brand.brandName} ${discount} Discount Codes ${month} ${year}`;

  const seoDescription = brand.seoDescription
    ? brand.seoDescription
        .replace(/\[DISCOUNT\]/g, discount)
        .replace(/\[BRAND\]/g, brand.brandName)
        .replace(/\[COUNTRY\]/g, country.toUpperCase())
        .replace(/\[MONTH\]/g, month)
        .replace(/\[YEAR\]/g, year)
    : `Save with ${discount} ${brand.brandName} coupon codes and deals.`;

  const image = `https://www.nativediscounts.com${brand.brandLogo.replace(
    /\s/g,
    "%20"
  )}`;

  const baseUrl = "https://www.nativediscounts.com";

  return {
    title: seoTitle,
    description: seoDescription,
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
      locale,
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


/* =========================
   Page
========================= */
export default async function BrandPage({ params, searchParams }) {
  const country = "us";
  const { brands } = params;
  const rc = searchParams?.rc || null;

  const brand = await getBrand(country, brands);
  if (!brand) notFound();

  const coupons = await getCoupons(brands);
  const similarBrands = await getSimilarBrands(brands);

  const baseUrl = "https://www.nativediscounts.com";

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Brand",
    name: brand.brandName,
    url: baseUrl,
    logo: `https://www.nativediscounts.com${brand.brandLogo.replace(
      /\s/g,
      "%20"
    )}`,
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
{/* similarBrands */}
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
    </>
  );
}

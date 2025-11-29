import Link from "next/link";
import OfferCard from "@/components/OfferCard";
import RecentCouponsClient from "./RecentCouponsClient";

// ✅ SEO metadata
export async function generateMetadata() {
  return {
    title: "Recent Coupons | Native Discounts",
    description:
      "Discover the latest coupons and deals on Native Discounts. Save on your favorite brands with our up-to-date discount codes and offers.",
    keywords:
      "recent coupons, latest deals, discount codes, savings, Native Discounts",
  
    };
}

// ✅ Fetch coupons (server-side)
async function getCoupons() {
  try {
    const res = await fetch("https://www.nativediscounts.com/api/coupons/", {
      cache: "no-store",
    });
    if (!res.ok) return [];

    const data = await res.json();
    if (!Array.isArray(data)) return [];
    return data;
  } catch (error) {
    console.error("Failed to load coupons:", error);
    return [];
  }
}

// ✅ Server Component
export default async function RecentCoupons() {
  const coupons = await getCoupons();

  // Filter & prioritize
  const topInputType = coupons.filter((c) => c.inputType === "3");
  const topOfferType = coupons.filter(
    (c) => c.offerType === "1" && c.inputType !== "3"
  );
  const restOffers = coupons.filter(
    (c) => !(c.inputType === "3" || c.offerType === "1")
  );

  let finalCoupons = [...topInputType, ...topOfferType, ...restOffers];

  // Remove duplicate brands
  const seenBrands = new Set();
  finalCoupons = finalCoupons.filter((coupon) => {
    if (!coupon.brand) return true;
    if (seenBrands.has(coupon.brand)) return false;
    seenBrands.add(coupon.brand);
    return true;
  });

  // Limit to 50
  finalCoupons = finalCoupons.slice(0, 50);

  return (
      <div className="container py-4"><link rel="canonical" href={`https://www.nativediscounts.com/recent-coupons`}/>
   

      <div className="d-flex justify-content-between align-items-center mb-3">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item">
              <Link href="/">Home</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Recent Coupons
            </li>
          </ol>
        </nav>
      </div>
   <h1 className="mb-3">Recent Coupons</h1>
      {/* ✅ Hand off rendering + modal logic to client component */}
      <RecentCouponsClient coupons={finalCoupons} />
    </div>
  );
}

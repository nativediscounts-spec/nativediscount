"use client";

import useSWR from "swr";
import Link from "next/link";
import Head from "next/head";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Categories({ params }) {
  const { country } = params;

  const {
    data: categories,
    error,
    isLoading,
  } = useSWR("/api/v1/categories?limit=20", fetcher, {
    dedupingInterval: 24 * 60 * 60 * 1000, // ✅ 1 day cache
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshInterval: 0,
  });

  if (isLoading)
    return <p className="text-center py-4">Loading categories...</p>;

  if (error)
    return <p className="text-center py-4 text-red-500">Failed to load categories</p>;

  return (
    <>   <title>All Store Categories – Browse Deals, Offers & Discounts | NativeDiscounts</title>
        <meta
          name="description"
          content="Discover all store categories in one place. Browse deals, offers, and verified coupons across every niche — save more today on NativeDiscounts."
        />
     <Head>
     
      </Head>
    <div className="container py-4"><link rel="canonical" href="https://www.nativediscounts.com/cats/"/>
      <h1 className="mb-4">All Categories</h1>
      <ul className="list-group list-group-flush">
        {categories.map((cat, idx) => (
          <li
            key={idx}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <Link
              href={`/cats/${cat.pageSlug || "#"}`}
              className="text-decoration-none fw-semibold"
            >
              <img height={25} width={25} className="m-2" src={``+cat.categoryImage} />
              {cat.categoryTitle}
            </Link>
            <span>&#8250;</span> {/* right arrow › */}
          </li>
        ))}
      </ul>
    </div></>
  );
}

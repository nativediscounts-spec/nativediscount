"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Categories({params}) {
    const { country } = params;
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("/api/v1/categories?limit=20");
        if (!res.ok) throw new Error("Failed to fetch categories");
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error("Error loading categories:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchCategories();
  }, []);

  if (loading) return <p className="text-center py-4">Loading categories...</p>;

  return (
    <div className="container py-4">
      <h2 className="mb-4">All Categories</h2>
      <ul className="list-group list-group-flush">
        {categories.map((cat, idx) => (
          <li
            key={idx}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <Link
              href={`/${country}/categories/${cat.pageSlug || "#"}`}
              className="text-decoration-none fw-semibold"
            >
              {cat.categoryTitle}
            </Link>
            <span>&#8250;</span> {/* right arrow › */}
          </li>
        ))}
      </ul>
    </div>
  );
}

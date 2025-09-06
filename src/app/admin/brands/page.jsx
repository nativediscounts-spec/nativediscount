"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function BrandList() {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    fetch("/api/admin/brands")
      .then((res) => res.json())
      .then((data) => setBrands(data));
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this brand?")) return;

    await fetch(`/api/admin/brands/${id}`, { method: "DELETE" });
    setBrands(brands.filter((brand) => brand._id !== id));
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Brand List</h2>
        <Link href="/admin/brand-editor" className="btn btn-primary">
          Add New Brand
        </Link>
      </div>

      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Brand Logo</th>
            <th>Brand Name</th>
            <th>Category</th>
            <th>Status</th>
            <th>Featured</th>
            <th>Popular</th>
            <th>Trending</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {brands.length > 0 ? (
            brands.map((brand) => (
              <tr key={brand._id}>
                <td>
                  {brand.brandLogo ? (
                    <img
                      src={brand.brandLogo}
                      alt={brand.brandName}
                      style={{ width: "60px" }}
                    />
                  ) : (
                    "N/A"
                  )}
                </td>
                <td>{brand.brandName}</td>
                <td>{brand.categoryTitle}</td>
                <td>{brand.status}</td>
                <td>{brand.featuredBrand ? "Yes" : "No"}</td>
                <td>{brand.popularBrand ? "Yes" : "No"}</td>
                <td>{brand.trendingBrand ? "Yes" : "No"}</td>
                <td>
                  <Link
                    href={`/admin/brand-editor?id=${brand._id}`}
                    className="btn btn-sm btn-warning me-2"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(brand._id)}
                    className="btn btn-sm btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center">
                No brands found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

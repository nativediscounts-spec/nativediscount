"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CouponTable() {
  const [coupons, setCoupons] = useState([]);
  const [filters, setFilters] = useState({
    country: "",
    brand: "",
    offerType: "",
  });

  // 🔹 Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    fetchCoupons();
  }, []);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const fetchCoupons = async () => {
    const res = await fetch("/api/admin/coupons");
    const data = await res.json();
    setCoupons(data);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this coupon?")) return;
    await fetch(`/api/admin/coupons/${id}`, { method: "DELETE" });
    fetchCoupons();
  };

  // 🔹 Apply filters
  const filteredCoupons = coupons.filter((c) => {
    return (
      (filters.country ? c.country === filters.country : true) &&
      (filters.brand
        ? c.brand?.toLowerCase().includes(filters.brand.toLowerCase())
        : true) &&
      (filters.offerType ? c.offerType === filters.offerType : true)
    );
  });

  // 🔹 Pagination logic
  const totalPages = Math.ceil(filteredCoupons.length / pageSize);
  const paginatedCoupons = filteredCoupons.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-4">
        {/* <select
          value={filters.country}
          onChange={(e) =>
            setFilters((f) => ({ ...f, country: e.target.value }))
          }
          className="border p-2 rounded"
        >
          <option value="">All Countries</option>
          <option value="uk">UK</option>
          <option value="in">India</option>
          <option value="us">US</option>
        </select> */}

        <input
          type="text"
          placeholder="Search Brand"
          value={filters.brand}
          onChange={(e) =>
            setFilters((f) => ({ ...f, brand: e.target.value }))
          }
          className="border p-2 rounded"
        />

        <select
          value={filters.offerType}
          onChange={(e) =>
            setFilters((f) => ({ ...f, offerType: e.target.value }))
          }
          className="border p-2 rounded"
        >
          <option value="">All Offer Types</option>
          <option value="1">Coupon</option>
          <option value="2">Deal</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-3 py-2">Brand</th>
              <th className="border px-3 py-2">Type</th>
              <th className="border px-3 py-2">Title</th>
              <th className="border px-3 py-2">Likes</th>
              <th className="border px-3 py-2" width="120">Start Date</th>
              <th className="border px-3 py-2" width="100">End Date</th>
              <th className="border px-3 py-2">Stat</th>
              <th className="border px-3 py-2">Status</th>
              <th className="border px-3 py-2" width="150">Action</th>
            </tr>
          </thead>

          <tbody>
            {paginatedCoupons.map((c) => (
              <tr key={c._id} className="hover:bg-gray-50">
                <td className="border px-3 py-2">{c.brand}</td>
                <td className="border px-3 py-2">
                  {c.offerType === "1" ? "Coupon" : "Deal"}
                </td>
                <td className="border px-3 py-2">{c.title}</td>
                <td className="border px-3 py-2">{c.likes}</td>
                <td className="border px-3 py-2">{c.startDate}</td>
                <td className="border px-3 py-2">{c.endDate}</td>
                <td className="border px-3 py-2">{c.stat || "-"}</td>
                <td className="border px-3 py-2">
                  {c.enabled ? "Active" : "Inactive"}
                </td>
                <td className="border px-3 py-2">
                  <Link
                    href={`/admin/coupons-editor?id=${c._id}`}
                    className="btn btn-sm btn-warning me-2 text-blue-600 hover:underline mr-2"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(c._id)}
                    className="btn btn-sm btn-danger text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {paginatedCoupons.length === 0 && (
              <tr>
                <td
                  colSpan={9}
                  className="border px-3 py-2 text-center text-gray-500"
                >
                  No coupons found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
   {totalPages > 1 && (
  <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-4 gap-2">
    <small className="text-muted">
      Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
    </small>

    <nav>
      <ul className="pagination pagination-sm mb-0 shadow-sm rounded-pill bg-white px-2">
        {/* Prev */}
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button
            className="page-link border-0 rounded-pill"
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            ‹
          </button>
        </li>

        {/* First page */}
        <li className={`page-item ${currentPage === 1 ? "active" : ""}`}>
          <button
            className="page-link border-0 rounded-pill"
            onClick={() => setCurrentPage(1)}
          >
            1
          </button>
        </li>

        {/* Left dots */}
        {currentPage > 4 && (
          <li className="page-item disabled">
            <span className="page-link border-0 bg-transparent">…</span>
          </li>
        )}

        {/* Nearest ±2 pages */}
        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .filter(
            (page) =>
              page !== 1 &&
              page !== totalPages &&
              page >= currentPage - 2 &&
              page <= currentPage + 2
          )
          .map((page) => (
            <li
              key={page}
              className={`page-item ${
                page === currentPage ? "active" : ""
              }`}
            >
              <button
                className="page-link border-0 rounded-pill"
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            </li>
          ))}

        {/* Right dots */}
        {currentPage < totalPages - 3 && (
          <li className="page-item disabled">
            <span className="page-link border-0 bg-transparent">…</span>
          </li>
        )}

        {/* Last page */}
        {totalPages > 1 && (
          <li
            className={`page-item ${
              currentPage === totalPages ? "active" : ""
            }`}
          >
            <button
              className="page-link border-0 rounded-pill"
              onClick={() => setCurrentPage(totalPages)}
            >
              {totalPages}
            </button>
          </li>
        )}

        {/* Next */}
        <li
          className={`page-item ${
            currentPage === totalPages ? "disabled" : ""
          }`}
        >
          <button
            className="page-link border-0 rounded-pill"
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            ›
          </button>
        </li>
      </ul>
    </nav>
  </div>
)}

    </div>
  );
}

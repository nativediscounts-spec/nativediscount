"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CouponTable() {
  const [coupons, setCoupons] = useState([]);
  
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  const [filters, setFilters] = useState({
    country: "",
    brand: "",
    offerType: "",
  });

  useEffect(() => {
    fetch("/api/admin/coupons")
      .then((res) => res.json())
      .then((data) => setCoupons(data));
  }, []);

  // Apply filters on the client side
  const filteredCoupons = coupons.filter((c) => {
    return (
      (filters.country ? c.country === filters.country : true) &&
      (filters.brand ? c.brand === filters.brand : true) &&
      (filters.offerType ? c.offerType === filters.offerType : true)
    );
  });

  useEffect(() => {
    fetchCoupons();
  }, []);

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

  const handleEditClick = (coupon) => {
    // setEditingId(coupon._id);
    // setEditForm(coupon);


  };

  // const handleEditChange = (e) => {
  //   setEditForm({ ...editForm, [e.target.name]: e.target.value });
  // };

  const handleEditSave = async () => {
    await fetch(`/api/admin/coupons/${editingId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editForm),
    });
    setEditingId(null);
    fetchCoupons();
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      {/* Filter controls */}
      <div className="flex flex-wrap gap-4 mb-4">
        <select
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
        </select>

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
              <th className="border px-3 py-2">Start Date</th>
              <th className="border px-3 py-2">End Date</th>
              <th className="border px-3 py-2">Stat</th>
              <th className="border px-3 py-2">Status</th>
              <th className="border px-3 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredCoupons.map((c) => (
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
                        className="text-blue-600 hover:underline mr-2"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(c._id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                </td>
              </tr>
            ))}
            {filteredCoupons.length === 0 && (
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
    </div>
  );
}

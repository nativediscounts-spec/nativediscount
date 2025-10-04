"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Stores({ params }) {
  const { country } = params;
  const [brands, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const LIMIT = 18;

  // Sorting state
  const [sortOption, setSortOption] = useState("all"); // default: all

  // Fetch brands function
  async function fetchStores(currentPage, sort = sortOption) {
    try {
      setLoading(true);

      let orderParam = "";
      let orderNameParam = "";

      // Determine API sort params
      if (sort === "A-Z") {
        orderParam = "asc";
        orderNameParam = "brandName";
      } else if (sort === "Z-A") {
        orderParam = "desc";
        orderNameParam = "brandName";
      } else {
        orderParam = ""; // default / all
        orderNameParam = "";
      }

      // Build API URL
      let apiUrl = `/api/v1/brands?field=country&value=us&limit=${LIMIT}&page=${currentPage}`;
      if (orderParam && orderNameParam) {
        apiUrl += `&order=${orderParam}&ordername=${orderNameParam}`;
      }

      const res = await fetch(apiUrl);
      if (!res.ok) throw new Error("Failed to fetch brands");

      const data = await res.json();

      if (data.length < LIMIT) {
        setHasMore(false);
      }

      if (currentPage === 1) {
        setStores(data);
      } else {
        setStores((prev) => [...prev, ...data]);
      }
    } catch (err) {
      console.error("Error loading brands:", err);
    } finally {
      setLoading(false);
    }
  }

  // Load first page when country or sort changes
  useEffect(() => {
    setPage(1);
    setHasMore(true);
    fetchStores(1, sortOption);
  }, [country, sortOption]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchStores(nextPage, sortOption);
  };

  return (
    <div className="container py-2">
      <h2 className="mb-0">All Stores</h2>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item">
              <Link href="/">Home</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              All Stores
            </li>
          </ol>
        </nav>

        {/* Sorting dropdown */}
        <select
          className="form-select w-auto"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="all">Default / All</option>
          <option value="A-Z">A - Z</option>
          <option value="Z-A">Z - A</option>
        </select>
      </div>

      <section className="py-2 bg-light">
        <div className="text-center">
          <div className="row g-4">
            {brands.map((brand, idx) => (
              <div className="col-6 col-md-2 mb-3" key={idx}>
                <Link
                  href={`/${brand.pageSlug}`}
                  className="text-decoration-none"
                >
                  <div className="card shadow-sm h-100 border-0 position-relative">
                    <div
                      className="d-flex align-items-center justify-content-center bg-white border-bottom"
                      style={{ height: "150px" }}
                    >
                      <Image
                        src={brand.brandLogo}
                        alt={brand.brandName}
                        width={150}
                        height={150}
                        style={{ objectFit: "contain", maxHeight: "149px" }}
                      />
                    </div>
                    <div className="card-body">
                      <div className="text-muted small fw-normal mb-0">
                        {brand.brandName}
                      </div>
                      <div className="text-sm card-text fw-normal mt-0">
                        {brand.exclusive && (
                          <span className="badge bg-danger text-white fw-normal mb-0">
                            EXCLUSIVE
                          </span>
                        )}{" "}
                        {brand.offerDescription ||
                          `Check deals at ${brand.brandName}`}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {hasMore && (
            <div className="mt-4">
              <button
                className="btn btn-theme"
                onClick={handleLoadMore}
                disabled={loading}
              >
                {loading ? "Loading..." : "Load More"}
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

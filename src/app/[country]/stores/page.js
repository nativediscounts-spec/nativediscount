"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Stores({ params }) {
  const { country } = params;
  const [brands, setStores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStores() {
      try {
        const res = await fetch(`/api/v1/brands?field=country&value=${country}&limit=20`);
        if (!res.ok) throw new Error("Failed to fetch brands");
        const data = await res.json();
        setStores(data);
      } catch (err) {
        console.error("Error loading brands:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchStores();
  }, [country]);

  if (loading) return <p className="text-center py-4">Loading brands...</p>;

  return (
    <div className="container py-4">
      <h2 className="mb-4">All Stores</h2>

      <section className="py-5 bg-light">
        <div className="container text-center">
          <div className="row g-4">
            {brands.map((brand, idx) => (
              <div className="col-6 col-md-3 mb-3" key={idx}>
                <Link href={`/${country}/${brand.pageSlug}`} className="text-decoration-none">
                  <div className="card shadow-sm h-100 border-0 position-relative">
                    {brand.featuredBrand && (
                      <span className="badge bg-warning text-dark position-absolute top-0 start-50 translate-middle-x mt-2">
                        ⭐ VIP
                      </span>
                    )}
                    <div
                      className="d-flex align-items-center justify-content-center bg-white border-bottom"
                      style={{ height: "120px" }}
                    >
                      <Image
                        src={brand.brandLogo}
                        alt={brand.brandName}
                        width={150}
                        height={60}
                        style={{ objectFit: "contain", maxHeight: "80px" }}
                      />
                    </div>
                    <div className="card-body">
                      <div className="text-muted small fw-normal mb-0">{brand.brandName}</div>
                      <div className="text-sm card-text fw-normal mt-0">
                        {brand.exclusive && (
                          <span className="badge bg-danger text-white fw-normal mb-0">EXCLUSIVE</span>
                        )}{" "}
                        {brand.offerDescription || `Check deals at ${brand.brandName}`}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

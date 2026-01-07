"use client";
import React, { useState, useEffect } from "react";
import Terms from "./Terms";
import Link from "next/link";

// In-memory cache for authors
let authorsCache = null;

export default function OfferCard({
  type,
  discountText,
  title,
  badge,
  exclusive = false,
  expires,
  lastUsed,
  code,
  addedBy,
  link,
  shortCode,
  forceOpen,
  termsconditions,
  shortDescription,
}) {
  const [showModal, setShowModal] = useState(false);
  const [popupData, setPopupData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [authors, setAuthors] = useState({});

  // Fetch authors with caching
  useEffect(() => {
    if (authorsCache) {
      setAuthors(authorsCache);
      return;
    }

    // fetch("/api/authors")
    //   .then((res) => res.json())
    //   .then((data) => {
    //     const authorMap = {};
    //     data.forEach((author) => {
    //       authorMap[author.userName] = (
    //         <Link href={`/employee/${author.userName}`} className="ml-1">
    //           {author.authorName}
    //         </Link>
    //       );
    //     });
    //     authorsCache = authorMap; // Cache authors in memory
    //     setAuthors(authorMap);
    //   })
    //   .catch((err) => {
    //     console.error("Failed to fetch authors:", err);
    //   });
  }, []);

  const offerTypeMap = {
    1: "code",
    2: "sale",
    3: "discount",
    4: "mobile_app",
    5: "cashback",
    6: "giftcard",
  };

  const badgeTypeMap = { 1: "Exclusive", 2: "Event Deal", 3: "Popular" };

  const formatExpires = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return `Ends ${date.getDate()} ${date.toLocaleString("en-US", { month: "short" })} ${date.getFullYear()}`;
  };

  const openModal = async () => {
    setShowModal(true);
    setLoading(true);
    // Example: Uncomment if you want to fetch offer details dynamically
    /*
    try {
      const res = await fetch(`/api/offers/${shortCode}`);
      const data = await res.json();
      setPopupData(data);
    } catch (err) {
      console.error(err);
      setPopupData({ error: "Failed to load offer details." });
    } finally {
      setLoading(false);
    }
    */
  };

  const closeModal = () => {
    setShowModal(false);
    setPopupData(null);
  };

  const isExpired = (expiryDate) => {
    if (!expiryDate) return false;
    const now = new Date();
    const exp = new Date(expiryDate);
    return exp < now;
  };

  // auto open when forceOpen is true
  useEffect(() => {
    if (forceOpen) openModal();
  }, [forceOpen]);

  const handleButtonClick = () => {
    if (!link) return;

    // Open new tab first (current site with rc param)
    const newUrl = `${window.location.origin}${window.location.pathname}?rc=${shortCode}`;
    window.open(newUrl, "_blank");

    // Redirect current window to merchant link
    window.location.href = link;
  };

  if (isExpired(expires)) return null;

  return (
    <>
      <article className="couponlist card mb-3 shadow-sm" id={`offer-${shortCode}`}>
        <div className="card-body d-flex justify-content-between align-items-center flex-wrap">
          {/* Left */}
          <div className="d-flex flex-offer">
            <div className="w-22 text-center">
              {discountText && (
                <div className="h4 mb-1">
                  <span className="font-black">{discountText}</span>
                </div>
              )}
              {type && <div className="badge bg-black text-white me-1 uppercase">{offerTypeMap[type]}</div>}
            </div>

            {/* Details */}
            <div className="mx-3 shrink">
              <h3
                style={{ wordBreak: "break-word" }}
                className="mt-0 font-light text-lg md:text-xl leading-7 md:leading-8 text-liquorice"
              >
                {exclusive && <div className={`badge bg-warning text-dark me-1 text-sm`}>{badgeTypeMap[exclusive]}</div>}
                {title}
              </h3>
              {shortDescription && (
                <div className="small text-muted" dangerouslySetInnerHTML={{ __html: shortDescription }} />
              )}
              {(expires || lastUsed) && (
                <div className="small text-muted mt-1">{expires && formatExpires(expires)}</div>
              )}
            </div>
          </div>

          {/* Right Button */}
          <div className="mb-3 ms-auto d-flex flex-column" style={{ width: "12rem" }}>
            <button className="d-flex text-lg fw-bold btn p-0 border-0" onClick={handleButtonClick}>
              {offerTypeMap[type] === "code" ? (
                <>
                  <div className="relative code-btn bg-success text-light flex-grow-1 d-flex align-items-center justify-content-around rounded-start px-4 py-3">
                    <span className="my-auto">Get Code</span>
                  </div>
                  <span className="border border-2 border-dotted border-success bg-success-subtle px-2 py-3 rounded-end text-uppercase">
                    {code}
                  </span>
                </>
              ) : (
                <div className="relative deal-btn bg-success text-light flex-grow-1 d-flex align-items-center justify-content-around rounded px-4 py-3">
                  <span className="my-auto">Get Deal</span>
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="card-footer text-muted small d-flex justify-content-between">
          <div>{termsconditions && termsconditions.trim() !== "" && <Terms termsconditions={termsconditions} />}</div>
          <div>{authors[addedBy] || addedBy || "Admin"}</div>
        </div>
      </article>
    </>
  );
}

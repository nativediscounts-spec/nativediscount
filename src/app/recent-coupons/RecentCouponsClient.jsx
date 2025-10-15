"use client";

import { useEffect, useState } from "react";
import OfferCard from "@/components/OfferCard";
import CopyCode from "@/components/CopyToClipboard";
import { Modal } from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
export default function RecentCouponsClient({ coupons }) {
   const [openRc, setOpenRc] = useState(null);
  const [popupContent, setPopupContent] = useState(null);

  // ✅ get rc value from query string
  const searchParams = useSearchParams();
  const rc = searchParams.get("rc");

  // ✅ whenever ?rc= changes, fetch details
  useEffect(() => {
    if (rc) {
      setOpenRc(rc);
      fetch(`/api/offers/${rc}`)
        .then((res) => res.json())
        .then((data) => {
          setPopupContent(data?.[0] || null);
        })
        .catch(() => setPopupContent(null));
    } else {
      setOpenRc(null);
      setPopupContent(null);
    }
  }, [rc]);

  console.log("Current rc from URL:", rc);

  return (
    <><link rel="canonical" href={`https://www.nativediscounts.com/recent-coupons`}/>
      <section aria-labelledby="offers-heading">
        {coupons.length > 0 ? (
          coupons.map((coupon, idx) => (
            <OfferCard
              key={coupon.shortCode || idx}
              type={coupon.offerType}
              discountText={coupon.discount}
              title={coupon.title}
              badge={coupon.inputType}
              exclusive={coupon.inputType}
              expires={coupon.endDate}
              lastUsed={coupon.lastUsed}
              code={coupon.couponCode ? coupon.couponCode.slice(-3) : ""}
              addedBy={coupon.addedby}
              link={coupon.link}
              shortCode={coupon.shortCode}
              termsconditions={coupon.termsconditions}
              shortDescription={coupon.shortDescription}
              onClick={() => setOpenRc(coupon.shortCode)} // ✅ open modal
            />
          ))
        ) : (
          <p>No recent coupons available.</p>
        )}
      </section>

      {/* ✅ Popup Modal */}
      <Modal
        show={!!openRc}
        onHide={() => {
          setOpenRc(null);
          setPopupContent(null);
        }}
        aria-labelledby="couponModalTitle"
        centered
      >
        <Modal.Header closeButton />
        <Modal.Body className="text-center">
          {popupContent ? (
            <>
              {popupContent.brandLogo && (
                <Image
                  src={popupContent.brandLogo}
                  alt={`${popupContent.brand} logo`}
                  width={120}
                  height={120}
                  className="mb-3"
                />
              )}
              <p className="fw-bold text-capitalize">
                {popupContent.brand}
              </p>
              <h2 className="h5 mb-3">{popupContent.title}</h2>

              <div
                className="small text-black mb-3"
                dangerouslySetInnerHTML={{
                  __html: popupContent.shortDescription || "",
                }}
              />

              <CopyCode couponCode={popupContent.couponCode} />

              <Link
                href={popupContent.link || "#"}
                className="btn btn-theme mt-3"
                target="_blank"
                rel="noopener noreferrer nofollow"
              >
                Continue to{" "}
                {popupContent.brand
                  ?.split(" ")
                  .map(
                    (word) => word.charAt(0).toUpperCase() + word.slice(1)
                  )
                  .join(" ")}{" "}
                Official Site
              </Link>
            </>
          ) : (
            <p>Loading coupon details…</p>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

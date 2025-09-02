"use client";

import { useEffect, useState } from "react";
import OfferCard from "@/components/OfferCard";
import CopyCode from "@/components/CopyToClipboard";
import Image from "next/image";
import Link from "next/link";
import { Modal, Button } from "react-bootstrap";

export default function BrandClient({ brand, coupons, rc, country }) {
    const [openRc, setOpenRc] = useState(null);
    const [popupContent, setPopupContent] = useState(null);
    useEffect(() => {
        if (rc) {
            setOpenRc(rc);
            fetch(`/api/offers/${rc}`)
                .then((res) => res.json())
                .then((data) => {
                    console.log("Popup data:", data); // <- check the actual field names
                    setPopupContent(data[0]);
                });
        }
    }, [rc]);


    return (
        <>
            {/* Header */}
            <div className="bg-white py-4">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-auto">
                            <Link
                                href={brand.brandUrl}
                                target="_blank"
                                rel="noopener noreferrer nofollow"
                                className="d-block border rounded overflow-hidden text-decoration-none"
                                style={{ width: "90px" }}
                            >
                                <Image
                                    src={brand.brandLogo}
                                    alt={`${brand.brandName} logo`}
                                    width={86}
                                    height={86}
                                    className="img-fluid p-2"
                                    priority
                                />
                                <div className="text-center bg-white border-top fw-bold small py-1">
                                    Visit Site
                                </div>
                            </Link>
                        </div>
                        <div className="col">
                            <h1 className="h4 m-0">{brand.brandTitle}</h1>
                            <h2 className="h6 text-muted fw-light mb-2">
                                All {brand.brandName} voucher codes are tested daily
                            </h2>
                        </div>
                    </div>
                </div>
            </div>

            {/* Coupons */}
            <main className="bg-gray-200 py-4">
                <div className="container">
                    <div className="row gy-4">
                        <div className="col-lg-8">
                            {coupons.map((coupon, idx) => (
                                <OfferCard
                                    key={idx}
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
                                    forceOpen={openRc === coupon.shortCode}
                                />
                            ))}
                        </div>
                          <div className="col-lg-4">
              <div className="card shadow-sm">
                <div className="card-body text-center">
                  {/* <Image
                    src="/icons/verified-icon.png"
                    alt="Verified codes"
                    width={60}
                    height={60}
                  />
                   */}
                   <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    height={60}
    className="w-[8.5rem]"
    data-qa="el:codeGuaranteeImage"
    viewBox="0 0 305 121"
  >
    <path
      fill="#241C17"
      fillRule="evenodd"
      d="M38.6 28.5a19 19 0 0 0-12.9 9c-.6 1.2-5.2 15.5-10.2 31.9C6.4 99 6.3 99 6.3 103.3c0 3.8.1 4.4 1.4 7a20 20 0 0 0 8.8 9.2l3 1.5h253.8l3-1.4a19 19 0 0 0 8.4-8c1.2-2.3 19.3-60.3 19.8-63.3A18.6 18.6 0 0 0 289 28.4c-3.4-.5-247.1-.5-250.5.1Z"
      clipRule="evenodd"
    ></path>
    <path
      fill="#FFE019"
      fillRule="evenodd"
      d="M36 23.2a19 19 0 0 0-13 9c-.5 1.2-5.2 15.5-10.2 31.9-9 29.6-9.1 29.8-9.1 33.9 0 3.8 0 4.4 1.4 7.1a20 20 0 0 0 8.8 9.2l3 1.4h253.8l3-1.4a19 19 0 0 0 8.4-8c1.2-2.3 19.3-60.3 19.8-63.2a18.6 18.6 0 0 0-15.4-19.9c-3.4-.6-247.2-.5-250.5 0"
      clipRule="evenodd"
    ></path>
    <path
      fill="#241C17"
      d="M260 62.8a17.3 17.3 0 0 1-4.9-.8c-.7-.2-1.5-.6-2.1-1-.4-.2-.7-.4-.8-.7a2 2 0 0 1 0-1c0-.4.1-.6.3-.9.2-.2.5-.4.8-.4.4-.1.7 0 1.2.2.9.5 1.8.9 2.8 1.1l3 .3c1.4 0 2.4-.2 3.2-.8.8-.5 1.2-1.2 1.2-2a2 2 0 0 0-.7-1.6 5 5 0 0 0-2.4-1l-3.2-.8q-2.1-.6-3.3-1.8c-.9-.9-1.3-2-1.3-3.5a5.6 5.6 0 0 1 2.4-4.7c.8-.6 1.7-1 2.6-1.3 1-.3 2-.5 3.2-.5 1 0 2 .2 3.3.5 1.1.2 2.2.7 3.1 1.3.4.3.6.5.7.9v1c0 .2-.1.5-.3.7s-.5.3-.9.4c-.3 0-.7-.1-1.2-.4a10.3 10.3 0 0 0-4.8-1.2c-.8 0-1.6.1-2.3.4-.7.2-1.2.6-1.5 1-.4.5-.6 1-.6 1.6 0 .7.2 1.3.7 1.7q.6.6 1.8.9l3.2.7c1.7.4 3 1.1 3.9 2s1.3 2 1.3 3.2c0 1-.2 2-.7 2.9a6 6 0 0 1-1.8 2q-1.2.75-2.7 1.2c-1 .2-2.1.4-3.2.4m-22.6-.3q-1.05 0-1.5-.6c-.3-.3-.4-.9-.3-1.6l2.6-16.6c.1-.6.3-1 .7-1.3.3-.3.8-.5 1.4-.5h10.3q.75 0 1.2.3c.2.2.4.5.4 1s-.2 1-.5 1.2c-.3.3-.7.5-1.3.5h-8.8l-.9 5.7h8c.4 0 .8 0 1 .3.3.2.5.5.5.8 0 .6-.2 1-.5 1.4-.3.3-.7.4-1.3.4h-8.2l-1 6h8.6c.5 0 1 .1 1.2.3.3.2.4.5.4.9 0 .6-.2 1-.5 1.3s-.7.5-1.3.5zm-22.2 0q-1.05 0-1.5-.6c-.3-.4-.4-.9-.3-1.6l2.6-16.6c.1-.6.3-1 .7-1.3s.8-.5 1.4-.5h4.8c3.3 0 5.8.8 7.5 2.3a8 8 0 0 1 2.7 6.5c0 1.7-.2 3.2-.7 4.6a10.4 10.4 0 0 1-5.9 6.3c-1.5.6-3.2.9-5.2.9zm2-3.1h4.2c1.4 0 2.5-.2 3.5-.7q1.5-.6 2.4-1.8c.7-.8 1.2-1.7 1.4-2.7.4-1 .5-2.2.5-3.4 0-2-.5-3.3-1.6-4.3-1-1-2.6-1.5-4.7-1.5h-3.4l-2.2 14.4Zm-17 3.4c-1.9 0-3.4-.4-4.8-1a7.5 7.5 0 0 1-3.2-3.1c-.7-1.4-1-3-1-5q0-2.55.6-4.8c.5-1.5 1.3-2.7 2.2-3.8 1-1.1 2-2 3.4-2.6q1.95-.9 4.5-.9c1.8 0 3.4.4 4.7 1 1.4.8 2.4 1.8 3.2 3.1.7 1.4 1.1 3 1.1 5a15 15 0 0 1-.7 4.8c-.5 1.5-1.2 2.7-2.2 3.8-.9 1.1-2 2-3.3 2.6q-2.1.9-4.5.9m0-3.2a6 6 0 0 0 3.7-1.2c1-.8 1.8-1.8 2.3-3.2.6-1.3.8-2.8.8-4.5 0-2-.5-3.5-1.4-4.4a5 5 0 0 0-3.8-1.5A6 6 0 0 0 198 46a7 7 0 0 0-2.3 3.1c-.5 1.3-.8 2.9-.8 4.6 0 2 .5 3.5 1.4 4.4a5 5 0 0 0 3.8 1.5Zm-18.8 3.2c-1.8 0-3.4-.4-4.9-1a7.9 7.9 0 0 1-3.3-3.2c-.8-1.4-1.2-3-1.2-5.2 0-1.6.3-3.2.8-4.6s1.2-2.7 2.1-3.8c1-1 2.1-1.9 3.5-2.5s3-.9 4.7-.9c1.1 0 2.2.2 3.2.5s2 .7 2.7 1.3c.4.2.6.5.7.9v1l-.5.8c-.2.3-.5.4-.8.5-.3 0-.6 0-1-.3A7.6 7.6 0 0 0 183 45c-1.5 0-2.8.3-3.8 1-1 .8-1.9 1.8-2.4 3-.5 1.3-.8 2.7-.8 4.3 0 1.5.2 2.6.6 3.6.5.8 1.1 1.5 2 2 .9.3 2 .5 3.2.5a8 8 0 0 0 4-1c.4-.3.8-.4 1.1-.4s.6.2.8.5c.2.2.4.5.4.8v1l-.8.8c-.8.5-1.8 1-2.8 1.3-1.1.2-2.1.4-3.1.4m-32.5-.3c-.7 0-1.2-.2-1.5-.5-.3-.4-.4-1-.3-1.6l2.7-17c.1-.6.3-1 .7-1.3a2 2 0 0 1 1.3-.4c.7 0 1.1.2 1.4.5q.45.6.3 1.5l-2.4 15.6h8c.6 0 1 .1 1.3.3.3.3.5.6.5 1 0 .6-.2 1-.6 1.4-.3.3-.7.5-1.3.5zm-16.4 0c-.6 0-1.1-.2-1.4-.5-.3-.4-.4-1-.3-1.6l2.7-17c0-.6.3-1 .6-1.3a2 2 0 0 1 1.4-.4c.6 0 1 .2 1.4.5.2.4.3.9.2 1.5l-2.4 15.6h8.1c.6 0 1 .1 1.3.3.3.3.4.6.4 1 0 .6-.2 1-.5 1.4-.3.3-.8.5-1.4.5h-10Zm-23.3.2a2 2 0 0 1-1.1-.3c-.3-.2-.5-.5-.6-.8 0-.3 0-.7.3-1.1L118.5 43c.3-.5.6-.8.9-1q.45-.3 1.2-.3c.75 0 1 .1 1.3.4.3.2.5.6.7 1.1l5 17.2c.1.5.2 1 0 1.3 0 .3-.2.6-.5.7-.3.2-.6.3-1 .3-.5 0-1-.1-1.2-.4-.3-.3-.5-.7-.7-1.3l-1-4 1.1.7h-12l1.4-.7-2.7 4.6c-.2.4-.4.7-.7.8a2 2 0 0 1-1.1.3m11-16.7-5.5 9.4-.7-.6h9.5l-.7.7zM118 97.5c-.9 0-1.5-.2-2-.7-.6-.4-1-1-1.2-1.9l-5.1-17.2c-.2-.7-.3-1.3-.1-1.9.2-.5.5-1 1-1.3a3 3 0 0 1 1.7-.5 3 3 0 0 1 1.8.6c.5.4 1 1 1.2 2l4 15h-1.8l9-15.5a5 5 0 0 1 1.5-1.6c.5-.3 1.1-.5 1.9-.5q1.2 0 1.8.6c.5.4.8.9.8 1.5s0 1.2-.5 1.8l-10.7 17.5c-.4.8-.9 1.3-1.4 1.6s-1.1.5-2 .5Zm18.7-.3c-1 0-1.9-.3-2.4-.9s-.6-1.4-.5-2.5l2.7-16.9c.1-1 .5-1.7 1-2.1.6-.5 1.4-.8 2.4-.8h11c.7 0 1.3.2 1.7.5.4.4.7.8.7 1.4 0 .9-.3 1.6-.8 2-.5.6-1.1.8-2 .8H142l-.7 4.4h7.4c.7 0 1.4.2 1.8.5s.6.8.6 1.4c0 .9-.3 1.5-.8 2s-1.1.8-2 .8h-7.8l-.7 4.7h8c.9 0 1.5.2 1.9.5s.6.8.6 1.4c0 .9-.2 1.5-.8 2-.4.5-1 .8-2 .8zm20.9.3c-1 0-1.6-.3-2-1-.5-.6-.7-1.4-.5-2.6l2.7-16.9c.2-1 .5-1.7 1.1-2.2s1.4-.8 2.4-.8h7q3.9 0 6 1.8a5.9 5.9 0 0 1 2.1 4.8c0 1.9-.4 3.3-1.2 4.5s-1.8 2-3.2 2.6c-1.4.5-3 .8-4.7.8v-.6h1.2a4 4 0 0 1 2.7.9c.7.6 1.3 1.5 1.7 2.5l.9 2.4c.3.7.4 1.4.3 2 0 .6-.3 1-.8 1.3s-1.2.5-2 .5a3 3 0 0 1-2-.7c-.5-.4-.9-1-1.2-2l-1.8-4.6c-.2-.6-.5-1-.8-1.3-.4-.2-.9-.4-1.5-.4h-2l-1 6c0 1-.4 1.7-1 2.2s-1.4.8-2.4.8m5-13.2h4.4c1.2 0 2.1-.3 2.7-.8.7-.5 1-1.3 1-2.3 0-.9-.3-1.5-.9-2-.5-.3-1.4-.5-2.6-.5h-3.6zM182 97.5c-1 0-1.7-.3-2.2-1-.4-.6-.5-1.4-.3-2.6l2.7-17.2c.1-1 .5-1.7 1-2.2.6-.5 1.4-.8 2.4-.8s1.7.4 2.2 1c.4.6.5 1.5.3 2.6l-2.7 17.1c-.2 1-.5 1.8-1 2.3-.6.5-1.4.8-2.4.8m11.5 0c-1 0-1.7-.3-2.2-.9s-.6-1.4-.5-2.5l2.7-17.2c.2-1 .5-1.7 1.1-2.1.6-.5 1.4-.8 2.3-.8h10.7c.8 0 1.4.2 1.8.5.5.4.7.8.7 1.4a2.7 2.7 0 0 1-2.8 2.8h-8l-.7 4.7h6.8c.8 0 1.4.1 1.8.5.5.3.7.7.7 1.3A2.7 2.7 0 0 1 205 88h-7.3l-1 6.6c-.3 1.9-1.4 2.9-3.3 2.9Zm20.1 0c-1 0-1.8-.3-2.2-1-.4-.6-.6-1.4-.4-2.6l2.7-17.2c.2-1 .5-1.7 1.1-2.2s1.4-.8 2.4-.8 1.7.4 2.1 1 .6 1.5.4 2.6l-2.8 17.1c-.1 1-.5 1.8-1 2.3s-1.3.8-2.3.8m11.7-.3c-1 0-1.9-.3-2.4-.9s-.6-1.4-.5-2.5l2.7-16.9c.1-1 .5-1.7 1-2.1.6-.5 1.4-.8 2.4-.8h11c.7 0 1.3.2 1.7.5.4.4.7.8.7 1.4 0 .9-.3 1.6-.8 2-.5.6-1.1.8-2 .8h-8.5l-.7 4.4h7.4c.8 0 1.4.2 1.8.5s.6.8.6 1.4c0 .9-.3 1.5-.8 2s-1.1.8-2 .8h-7.8l-.7 4.7h8c.9 0 1.5.2 1.9.5s.6.8.6 1.4c0 .9-.2 1.5-.8 2-.4.5-1 .8-2 .8zm21.3 0c-1 0-1.8-.3-2.4-1-.5-.5-.6-1.3-.4-2.4l2.6-16.9c.2-1 .5-1.7 1.1-2.1.6-.5 1.3-.8 2.3-.8h5.3c3.9 0 6.9 1 9 2.7a9.2 9.2 0 0 1 3.1 7.5c0 1.8-.2 3.6-.8 5.2a11.9 11.9 0 0 1-6.8 6.9c-1.7.6-3.6.9-5.8.9zm3.4-5h3.9c1.2 0 2.2-.1 3-.5a6 6 0 0 0 2.3-1.6c.6-.7 1-1.5 1.3-2.5s.5-2.1.5-3.3c0-1.8-.5-3-1.5-4S257 79 255.1 79h-3L250 92.3Z"
    ></path>
    <ellipse
      cx="7.9"
      cy="6.9"
      fill="#FFE019"
      rx="7.9"
      ry="6.9"
      transform="rotate(-22.113 93.322 -194.812)skewX(-.036)"
    ></ellipse>
    <ellipse cx="48.6" cy="48.4" fill="#FFE019" rx="48.3" ry="48.4"></ellipse>
    <circle cx="48.9" cy="47.6" r="32" fill="#fff"></circle>
    <path
      fill="#241C17"
      fillRule="evenodd"
      d="M40 7.4a41.5 41.5 0 0 0-29.3 24.2 30.5 30.5 0 0 0-4.2 18.2c0 7.3 0 7.5 1.5 11.5 2.2 6.3 4.3 9.6 9.5 14.7a43.7 43.7 0 0 0 19.9 12c2.2.6 4.4.8 9.6.8a46.6 46.6 0 0 0 41-24.6A33 33 0 0 0 91.3 48c0-7-.5-9.4-2.8-13.6-1.4-2.7-2.8-3.5-4-2.5-1 .7-.9 1.4.5 5.4a34.9 34.9 0 0 1-8.4 34A42 42 0 0 1 45 83.8 34.4 34.4 0 0 1 13 47c.3-6.7 1-9.4 3.4-14.8a35 35 0 0 1 22.1-19c9.3-2.7 21.8-.8 30.3 4.6 1.5 1 4 3 5.7 4.6 3 2.8 4.3 3.4 5.3 2.3 2.4-2.4-3.5-9.5-11.3-13.4A45 45 0 0 0 40 7.4"
      clipRule="evenodd"
    ></path>
    <path
      fill="#241C17"
      fillRule="evenodd"
      d="M82.8 23.4a63.4 63.4 0 0 0-20.8 14c-5 5-10 11.3-13.4 17l-2.5 4c-.2 0-1.2-1.5-2.4-3.3a50 50 0 0 0-5.3-6.5c-2.8-2.8-3.3-3.2-5.2-3.4-3-.5-4.4 0-4.6 1.8-.1 1 .5 2 3.2 5.6 1.9 2.4 5 6.8 7 9.8 4.1 6.2 5.3 7.3 7.8 7.3 2.3 0 3.4-1.2 8.4-9a84.7 84.7 0 0 1 33-31 29 29 0 0 0 4.6-2.7c.2-.3.4-1.1.4-1.9 0-3.4-4.5-4.2-10.2-1.7"
      clipRule="evenodd"
    ></path>
    <path
      fill="#241C17"
      d="M94.4 14a2 2 0 0 1-1.5-3l3.8-6.3a2 2 0 1 1 3.5 2L96.5 13a2 2 0 0 1-2 1Zm7.8 4.8a2 2 0 0 1-1-3.6l7.4-6.2a2 2 0 0 1 2.7 3l-7.5 6.4a2 2 0 0 1-1.6.4M107 26a2 2 0 0 1-.4-4l6.7-2.2a2 2 0 0 1 1.3 4L108 26a2 2 0 0 1-1 0"
    ></path>
  </svg>
                  <h5 className="fw-bold">Our codes are verified every day</h5>
                  <p className="small text-muted">
                    If a code doesn’t work, we’ll gift you £20.
                  </p>
                </div>
              </div>

<div className="card shadow-sm mt-3">
                <div className="card-body text-left p-4   ">
                
                  <h5 className="fw-bold mb-3">  Hints & Tips</h5>
                  <ul><li>If you’re after a bargain booking, click on the lastminute.com Flash Sales tab. You’ll find weekly limited-edition offers, lastminute.com discount codes and last-chance picks. We’ll bring you our live lastminute.com voucher codes too! &nbsp;</li><li>Download the lastminute.com app on the App Store and Google Play. You can keep an eye on recent searches and deals, while tracking booking details here. &nbsp;</li><li>Sign up for a lastminute.com account by adding your email address, or connecting with Google, Facebook, or Apple logins. As well as being able to manage your bookings, you can compare prices too.</li></ul>
                </div>
              </div>
<div className="card shadow-sm mt-3">
                <div className="card-body text-left">
                
                  <h5 className="fw-bold"> Related Categories</h5>
                  <p className="small text-muted">
                    If a code doesn’t work, we’ll gift you £20.
                  </p>
                </div>
              </div>   
            
            </div>
                    </div>
                </div>
            </main>

            {/* Popup */}
            <Modal show={!!openRc} onHide={() => setOpenRc(null)}>
                <Modal.Header closeButton>

                </Modal.Header>
                <Modal.Body className="text-center">
                    {popupContent ? (
                        <>

                            <p>{popupContent.shortDescription}</p>
                            <CopyCode code={popupContent.couponCode} />
                            <Link href={popupContent.link}>  Continue to {popupContent.brand}</Link>
                        </>
                    ) : (
                        <p>Loading...</p>
                    )}
                </Modal.Body>
                {/* <Modal.Footer>
          <Button variant="secondary" onClick={() => setOpenRc(null)}>
            Close
          </Button>
        </Modal.Footer> */}
            </Modal>
        </>
    );
}

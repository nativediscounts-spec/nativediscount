"use client";

import { useEffect, useState } from "react";
import OfferCard from "@/components/OfferCard";
import CopyCode from "@/components/CopyToClipboard";
import Image from "next/image";
import Link from "next/link";
import { Modal } from "react-bootstrap";

export default function BrandClient({ brand, coupons, rc, country }) {
  const [openRc, setOpenRc] = useState(null);
  const [popupContent, setPopupContent] = useState(null);
  const now = new Date();
const month = now.toLocaleString("default", { month: "long" });
const year = now.getFullYear();
const formatedTitle = (template, brand, country) => {
  return template
    .replace(/\[BRAND\]/g, brand.brandName)
    .replace(/\[COUNTRY\]/g, country.toUpperCase())
    .replace(/\[MONTH\]/g, month)
    .replace(/\[YEAR\]/g, year);
};
  useEffect(() => {
    if (rc) {
      setOpenRc(rc);
      fetch(`/api/offers/${rc}`)
        .then((res) => res.json())
        .then((data) => {
          setPopupContent(data[0]);
        });
    }
  }, [rc]);

  return (
    <>
      {/* Header */}
      <header className="bg-white py-4 border-bottom">
        <div className="container">
          <div className="row align-items-start g-3">
            <div className="col-auto">
              <Link
                href={brand.brandUrl}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="d-block border rounded overflow-hidden text-decoration-none"
                style={{ width: "86px" }}
                aria-label={`Visit ${brand.brandName} official website`}
              >
                <Image
                  src={brand.brandLogo}
                  alt={`${brand.brandName} official logo`}
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
              <h1 className="h1 fw-bold  m-0">{formatedTitle(brand.brandTitle,brand,country)}</h1>
              {/* <p className=" text-black fw-light mb-2">
                All {brand.brandName} voucher codes are tested daily
              </p> */}
            </div>
          </div>
        </div>
      </header>

      {/* Coupons & Sidebar */}
      <main className="bg-gray-200 py-4">
        <div className="container">
          <div className="row gy-4">
            {/* Left - Coupons & Extra Sections */}
            <div className="col-lg-8">
              <section aria-labelledby="offers-heading">
                <h2 id="offers-heading" className="mt-0 h3 mb-3 fw-bold">
                  Latest {brand.brandName} Coupons & Offers
                </h2>
              {(() => {
  const topOffers = coupons.filter(c => c.offerType === "1");   // all offerType=1
  const restOffers = coupons.filter(c => c.offerType !== "1");  // everything else

  return (
    <>
      {/* Top offers */}
      {topOffers.map((coupon, idx) => (
        <OfferCard
          key={`top-${idx}`}
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
          termsconditions={coupon.termsconditions}
          shortDescription={coupon.shortDescription}
        />
      ))}

      {/* Rest offers */}
      {restOffers.map((coupon, idx) => (
        <OfferCard
          key={`rest-${idx}`}
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
          termsconditions={coupon.termsconditions}
          shortDescription={coupon.shortDescription}
        />
      ))}
    </>
  );
})()}
  {/* {coupons.map((coupon, idx) => (
                  
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
                    termsconditions={coupon.termsconditions}
                    shortDescription={coupon.shortDescription}
                  />
                ))} */}
              </section>



{/* Brand Editor Section */}
{brand.brandEditor && brand.brandEditor.length > 0 && (
  <section className="mt-4">
    {brand.brandEditor.map((editor, index) => (
      
          editor.position === "right" ? "" : (<article
        key={index}
        className={`card shadow-sm mb-3 ${
          editor.position === "right" ? "" : ""
        }`}
      >
        <div className="card-body">
          {/* <h2 className="h5 fw-bold">
            {editor.position === "right"
              ? `Right Section`
              : `Brand Editor`}
          </h2> */}

          {/* Render HTML safely */}
          <div
            className="small text-black"
            dangerouslySetInnerHTML={{ __html: editor.content }}
          />
        </div>
      </article>)
        
   
    ))}
  </section>
)}

              {/* About Company */}
              {brand.aboutCompany && (
                <article className="card shadow-sm mt-4">
                  <div className="card-body">
                    <h2 className="h4 fw-bold">About {brand.brandName}</h2>
                    <p className="small text-black">{brand.aboutCompany}</p>
                  </div>
                </article>
              )}

              {/* Why Choose */}
              {/* {brand.whyChoose?.length > 0 && (
                <article className="card shadow-sm mt-4">
                  <div className="card-body">
                    <h2 className="h4 fw-bold">Why Choose {brand.brandName}?</h2>
                    <ul className="small text-black">
                      {brand.whyChoose.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              )} */}

              {/* Best Deals */}
              {/* {brand.bestDeals?.length > 0 && (
                <article className="card shadow-sm mt-4">
                  <div className="card-body">
                    <h2 className="h4 fw-bold">Best Deals</h2>
                    <ul className="small text-black">
                      {brand.bestDeals.map((deal, i) => (
                        <li key={i}>{deal}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              )} */}

              {/* Plans */}
              {/* {brand.plans?.length > 0 && (
                <article className="card shadow-sm mt-4">
                  <div className="card-body">
                    <h2 className="h4 fw-bold">{brand.brandName} Plans</h2>
                    <ul className="small text-black">
                      {brand.plans.map((p, i) => (
                        <li key={i}>{p.plan}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              )} */}

              {/* Seasonal Sales */}
              {/* {brand.seasonalSales && (
                <article className="card shadow-sm mt-4">
                  <div className="card-body">
                    <h2 className="h4 fw-bold">Seasonal Sales</h2>
                    <p className="small text-black">{brand.seasonalSales}</p>
                  </div>
                </article>
              )} */}

              {/* Payment Methods */}
              {/* {brand.paymentMethods?.length > 0 && (
                <article className="card shadow-sm mt-4">
                  <div className="card-body">
                    <h2 className="h4 fw-bold">Payment Methods</h2>
                    <ul className="small text-black">
                      {brand.paymentMethods.map((method, i) => (
                        <li key={i}>{method}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              )} */}

              {/* Customer Support */}
              {/* {brand.customerSupport?.length > 0 && (
                <article className="card shadow-sm mt-4">
                  <div className="card-body">
                    <h2 className="h4 fw-bold">Customer Support</h2>
                    <ul className="small text-black">
                      {brand.customerSupport.map((support, i) => (
                        <li key={i}>{support}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              )} */}

              {/* FAQs */}
              {brand.faqs?.length > 0 && (
                <section className="card shadow-sm mt-4">
                  <div className="card-body">
                    <h2 className=" fw-bold">FAQs</h2>
                    <div className="accordion" id="faqAccordion">
                      {brand.faqs.map((faq, i) => (
                        <div className="accordion-item" key={i}>
                          <div className="accordion-header" id={`heading${i}`}>
                            <button
                              className="accordion-button collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target={`#collapse${i}`}
                              aria-expanded="false"
                              aria-controls={`collapse${i}`}
                            >
                              <h3
            className="h4 fw-semibold text-black mt-0"
            dangerouslySetInnerHTML={{ __html: faq.question }}
          />  
                            </button>
                          </div>
                          <div
                            id={`collapse${i}`}
                            className="accordion-collapse collapse"
                            aria-labelledby={`heading${i}`}
                            data-bs-parent="#faqAccordion"
                          >
                            <div className="accordion-body small text-black">
                            <div
      className=""
      dangerouslySetInnerHTML={{ __html: faq.answer || "" }}
    />  
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              )}
            </div>

            {/* Right - Sidebar */}
            <aside className="col-lg-4" aria-label="Helpful information">
              {/* Brand Editor Section */}
{brand.brandEditor && brand.brandEditor.length > 0 && (
  <section className="mt-0 mb-4">
    {brand.brandEditor.map((editor, index) => (
      
          editor.position === "default" ? "" : (<article
        key={index}
        className={`card shadow-sm mb-3 ${
          editor.position === "right" ? "" : ""
        }`}
      >
        <div className="card-body">
          {/* <h2 className="h5 fw-bold">
            {editor.position === "right"
              ? `Right Section`
              : `Brand Editor`}
          </h2> */}

          {/* Render HTML safely */}
          <div
            className="small text-black"
            dangerouslySetInnerHTML={{ __html: editor.content }}
          />
        </div>
      </article>)
        
   
    ))}
  </section>
)}

              {/* Steps To Use */}
              {/* {brand.stepsToUse?.length > 0 && (
                <div className="card shadow-sm mt-4">
                  <div className="card-body">
                    <h2 className="h5 fw-bold">How to Use {brand.brandName} Coupons</h2>
                    <ol className="small text-black">
                      {brand.stepsToUse.map((step, i) => (
                        <li key={i}>{step}</li>
                      ))}
                    </ol>
                  </div>
                </div>
              )} */}
            </aside>
          </div>
        </div>
      </main>

      {/* Popup */}
      <Modal
        show={!!openRc}
        onHide={() => setOpenRc(null)}
        aria-labelledby="couponModalTitle"
        role="dialog"
        aria-modal="true"
      >
        <Modal.Header closeButton>
          {/* <Modal.Title id="couponModalTitle">
          
          </Modal.Title> */}
        </Modal.Header>
        <Modal.Body className="text-center">
          {popupContent ? (
            <>
              <Image
                src={brand.brandLogo}
                alt={`${popupContent.brand} logo`}
                width={120}
                height={120}
                className="mb-3"
              />
              <p>
               {popupContent?.brand &&
  popupContent.brand
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
} </p>
              <h2 className="h5 mb-3">{popupContent.title}</h2>
               <popupContent
            className="small text-black"
            dangerouslySetInnerHTML={{ __html: popupContent.shortDescription }}
          /> 
              {console.log("Popup Content Coupon Code:", popupContent.couponCode)}
              <CopyCode couponCode={popupContent.couponCode} />
              <Link
                href={popupContent.link}
                className="btn btn-theme mt-3"
                target="_blank"
                rel="noopener noreferrer nofollow"
              >
                Continue to      {popupContent?.brand &&
  popupContent.brand
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}  Official Site
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

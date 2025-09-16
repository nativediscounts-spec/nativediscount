"use client";
import React, { useState, useEffect } from "react";
import Terms from "./Terms";

export default function OfferCard({
  type, discountText, title, badge, exclusive = false,
  expires, lastUsed, code, addedBy, link, shortCode, forceOpen,termsconditions,shortDescription
}) {
  const [showModal, setShowModal] = useState(false);
  const [popupData, setPopupData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [authors, setAuthors] = useState({});
  useEffect(() => {
    fetch("/api/authors")
      .then((res) => res.json())
      .then((data) => {
        // Convert authors array into object { username: name }
        const authorMap = {};
        data.forEach((author) => {
          authorMap[author.userName] = (
            <Link href={`/employee/${author.userName}`} className="ml-1">
              {author.authorName}
            </Link>
          );
        });
        setAuthors(authorMap);
      });
  }, []);
  const offerTypeMap = {
    1: "code", 2: "sale", 3: "discount", 4: "mobile_app", 5: "cashback", 6: "giftcard"
  };
  const badgeTypeMap = { 1: "Exclusive", 2: "Event Deal", 3: "Popular" };

  const formatExpires = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return `Ends ${date.getDate()} ${date.toLocaleString("en-US",{month:"short"})} ${date.getFullYear()}`;
  };

  const openModal = async () => {
    setShowModal(true);
    setLoading(true);
    // try {
    //   const res = await fetch(`/api/offers/${shortCode}`);
    //   const data = await res.json();
    //   setPopupData(data);
    // } catch (err) {
    //   console.error(err);
    //   setPopupData({ error: "Failed to load offer details." });
    // } finally {
    //   setLoading(false);
    // }
  };

  const closeModal = () => {
    setShowModal(false);
    setPopupData(null);
  };

  // auto open when rc matches
  useEffect(() => {
    if (forceOpen) openModal();
  }, [forceOpen]);

  // main button click logic
  const handleButtonClick = () => {
    if (!link) return;

  // Open new tab first (your site with rc param)
  const newUrl = `${window.location.origin}${window.location.pathname}?rc=${shortCode}`;
  window.open(newUrl, "_blank");

  // Redirect current window to the merchant link
  window.location.href = link;
  };

  return (
    <>
      <article className="couponlist card mb-3 shadow-sm" id={`offer-${shortCode}`}>
        <div className="card-body d-flex justify-content-between align-items-center flex-wrap">
          {/* Left */}
          <div className="d-flex flex-offer">
            <div className="w-22 text-center">
              {discountText && <div className="h4 mb-1"><span className="font-black">{discountText}</span></div>}
              {type && <div className="badge bg-black text-white me-1 capitalize">{offerTypeMap[type]}</div>}
            </div>

            {/* Details */}
            <div className="mx-3 shrink">
              <h3 style={{ wordBreak: "break-word" }} className="mt-0 font-light text-lg md:text-xl leading-7 md:leading-8 text-liquorice">
                {exclusive && <div className={`badge bg-warning text-dark me-1 text-sm`}>{badgeTypeMap[exclusive]}</div>}
                {title}
              </h3>
               <div
            className="small text-muted"
            dangerouslySetInnerHTML={{ __html: shortDescription }}
          />
              
              {(expires || lastUsed) && <div className="small text-muted mt-1">{expires && formatExpires(expires)}</div>}
            </div>
          </div>

          {/* Right Button */}
          <div className="mb-3 ms-auto d-flex flex-column" style={{ width: "12rem" }}>
            <button className="d-flex text-lg fw-bold btn p-0 border-0" onClick={handleButtonClick}>
              {offerTypeMap[type] === "code" ? (
                <>
                  <div className="relative code-btn bg-warning text-dark flex-grow-1 d-flex align-items-center justify-content-around rounded-start px-4 py-3"><span className="my-auto">Get Code</span></div>
                  <span className="border border-2 border-dotted border-warning bg-warning-subtle px-2 py-3 rounded-end text-uppercase">{code}</span>
                </>
              ) : (
                <div className="relative deal-btn bg-warning text-dark flex-grow-1 d-flex align-items-center justify-content-around rounded px-4 py-3"><span className="my-auto">Get Deal</span></div>
              )}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="card-footer text-muted small d-flex justify-content-between">
          <div>
            {/* <button className="border-liquorice text-gray mx-3 flex items-center text-xs font-normal focus:outline-none">
              Terms <svg viewBox="0 0 7 10" xmlns="http://www.w3.org/2000/svg" className="ease-out-quint max-h-4 max-w-4 fill-none stroke-current transition-transform duration-500 rotate-90 ml-1 w-2"><path d="M1 1l4 4.018L1.034 9"></path></svg>
            </button> */}

            {termsconditions && termsconditions.trim() !== "" && (
  <Terms termsconditions={termsconditions} />
)}
          </div>
          <div>
            
            {" "}
                      {authors[addedBy] ||
                        addedBy ||
                        "Admin"}

            {/* {addedBy =="Admin" ? "": `Added by ${addedBy}`} */}
            
            </div>
        </div>
      </article>

      {/* Modal Controlled by showModal */}
      {/* {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{loading ? "Loading..." : popupData?.error ? "Error" : popupData?.title}</h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
              fasdfds  {loading ? <p>Loading...</p> : popupData?.error ? <p className="text-danger">{popupData.error}</p> : <p>{popupData?.description}</p>}
              </div>
            </div>
          </div>
        </div>
      )} */}
    </>
  );
}

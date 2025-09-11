"use client";
import Link from "next/link";
import Image from "next/image";
import SocialIcons from "./SocialIcons";
import BackToTop from "./BackToTop";

export default function Footer({ searchParms }) {
  const country = searchParms?.countryCode || "us";

  return (
    <>
      <footer className="bg-dark text-white pt-5 pb-4" role="contentinfo">
        <div className="container pt-5">
          <div className="row">
            {/* Savings */}
            <div className="col-md-3 mb-4" role="navigation" aria-label="Savings">
              <h6 className="text-warning text-sm text-uppercase fw-bold">Savings</h6>
              <ul className="list-unstyled" role="list">
                <li><Link href={`/${country}`} className="text-white text-decoration-none text-sm">Restaurant Vouchers</Link></li>
                <li><Link href={`/${country}`} className="text-white text-decoration-none text-sm">Exclusive Savings</Link></li>
                <li><Link href={`/${country}`} className="text-white text-decoration-none text-sm">Printable Vouchers</Link></li>
                <li><Link href={`/${country}`} className="text-white text-decoration-none text-sm">Student Vouchers</Link></li>
                <li><Link href={`/${country}`} className="text-white text-decoration-none text-sm">All Brands</Link></li>
                <li><Link href={`/${country}`} className="text-white text-decoration-none text-sm">NHS Discounts</Link></li>
                <li><Link href={`/${country}`} className="text-white text-decoration-none text-sm">Black Friday</Link></li>
                <li><Link href={`/${country}`} className="text-white text-decoration-none text-sm">VoucherCodes VIP</Link></li>
              </ul>
            </div>

            {/* Help */}
            <div className="col-md-3 mb-4" role="navigation" aria-label="Help">
              <h6 className="text-warning text-sm text-uppercase fw-bold">Help</h6>
              <ul className="list-unstyled" role="list">
                <li><Link href={`/${country}`} className="text-white text-decoration-none text-sm">Support</Link></li>
                <li><Link href={`/${country}`} className="text-white text-decoration-none text-sm">Reward FAQs</Link></li>
                <li><Link href={`/${country}`} className="text-white text-decoration-none text-sm">Contact Us</Link></li>
                <li><Link href={`/${country}`} className="text-white text-decoration-none text-sm">Code Guarantee</Link></li>
                <li><Link href={`/${country}`} className="text-white text-decoration-none text-sm">Accessibility</Link></li>
              </ul>
            </div>

            {/* About */}
            <div className="col-md-3 mb-4" role="navigation" aria-label="About">
              <h6 className="text-warning text-sm text-uppercase fw-bold">About</h6>
              <ul className="list-unstyled" role="list">
                <li><Link href={`/${country}`} className="text-white text-decoration-none text-sm">About Us</Link></li>
                <li><Link href={`/${country}`} className="text-white text-decoration-none text-sm">Partner With Us</Link></li>
                <li><Link href={`/${country}/blog/`} className="text-white text-decoration-none text-sm">Blogs</Link></li>
                <li><Link href={`/${country}`} className="text-white text-decoration-none text-sm">Careers</Link></li>
                <li><Link href={`/${country}`} className="text-white text-decoration-none text-sm">Charity</Link></li>
                <li><Link href={`/${country}`} className="text-white text-decoration-none text-sm">Community</Link></li>
                <li><Link href={`/${country}`} className="text-white text-decoration-none text-sm">Our Blog</Link></li>
                <li><Link href={`/${country}`} className="text-white text-decoration-none text-sm">Tech Insights</Link></li>
              </ul>
            </div>

            {/* Browser Extension & Social */}
            <div className="col-md-3 mb-4">
              <h6 className="text-warning text-sm text-uppercase fw-bold mt-3">Browser Extension</h6>
              <Image
                width={150}
                height={80}
                src="/icons/chrome-store.svg"
                alt="Install our Chrome Extension"
              />

              <h6 className="text-warning text-sm text-uppercase fw-bold mt-3">Join Us</h6>
              <SocialIcons />
            </div>
          </div>

          {/* Social Icons (fallback) */}
          <div className="text-center my-3" role="navigation" aria-label="Social Media">
            <a href={`/${country}`} aria-label="TikTok" className="text-white me-3"><i className="bi bi-tiktok fs-4"></i></a>
            <a href={`/${country}`} aria-label="Instagram" className="text-white me-3"><i className="bi bi-instagram fs-4"></i></a>
            <a href={`/${country}`} aria-label="Facebook" className="text-white me-3"><i className="bi bi-facebook fs-4"></i></a>
            <a href={`/${country}`} aria-label="LinkedIn" className="text-white"><i className="bi bi-linkedin fs-4"></i></a>
          </div>

          {/* TrustPilot Section */}
          <div className="text-center small mb-3" aria-label="Trustpilot reviews">
            Our members say <span className="fw-bold">Excellent</span>
            <Image
              height={20}
              width={100}
              src="/icons/4.5-stars.svg"
              alt="Trustpilot rating: 4.4 out of 5"
              className="mx-2"
            />
            4.4 out of 5 based on <strong>23,048 reviews</strong>
          </div>

          {/* Legal */}
          <div className="text-center small text-muted" aria-label="Legal information">
            © 2025 - Company. All Rights Reserved.
          </div>

          {/* Bottom Links */}
          <nav
            className="text-center mt-3"
            role="navigation"
            aria-label="Legal and Policies"
          >
            <Link href="/privacy-policy" className="text-white text-decoration-none text-sm mx-2">Privacy Notice</Link>
            <Link href="/partner-with-us" className="text-white text-decoration-none text-sm mx-2">Partner With Us</Link>
            <Link href="/terms-and-conditions" className="text-white text-decoration-none text-sm mx-2">Terms and Conditions</Link>
          </nav>
        </div>
      </footer>

      {/* Back to top button */}
      <BackToTop />
    </>
  );
}

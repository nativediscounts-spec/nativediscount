"use client";
import Link from "next/link";
import Image from "next/image";
import SocialIcons from "./SocialIcons";
export default function Footer() {
  return (
    <footer className="bg-dark text-white pt-5 pb-4">
      <div className="container pt-5">
        <div className="row">
          {/* Logo & Tagline */}
      

          {/* Savings */}
          <div className="col-md-3 mb-4">
            <h6 className="text-warning text-sm">SAVINGS</h6>
            <ul className="list-unstyled">
              <li><Link href="#" className="leading-loose text-white text-decoration-none  text-sm">Restaurant Vouchers</Link></li>
              <li><Link href="#" className="leading-loose text-white text-decoration-none  text-sm">Exclusive Savings</Link></li>
              <li><Link href="#" className="leading-loose text-white text-decoration-none  text-sm">Printable Vouchers</Link></li>
              <li><Link href="#" className="leading-loose text-white text-decoration-none  text-sm">Student Vouchers</Link></li>
              <li><Link href="#" className="leading-loose text-white text-decoration-none  text-sm">All Brands</Link></li>
              <li><Link href="#" className="leading-loose text-white text-decoration-none  text-sm">NHS Discounts</Link></li>
              <li><Link href="#" className="leading-loose text-white text-decoration-none  text-sm">Black Friday</Link></li>
              <li><Link href="#" className="leading-loose text-white text-decoration-none  text-sm">VoucherCodes VIP</Link></li>
            </ul>
          </div>

          {/* Help */}
          <div className="col-md-3 mb-4">
            <h6 className="text-warning text-sm">HELP</h6>
            <ul className="list-unstyled">
              <li><Link href="#" className="leading-loose text-white text-decoration-none  text-sm">Support</Link></li>
              <li><Link href="#" className="leading-loose text-white text-decoration-none  text-sm">Reward FAQs</Link></li>
              <li><Link href="#" className="leading-loose text-white text-decoration-none  text-sm">Contact Us</Link></li>
              <li><Link href="#" className="leading-loose text-white text-decoration-none  text-sm">Code Guarantee</Link></li>
              <li><Link href="#" className="leading-loose text-white text-decoration-none  text-sm">Accessibility</Link></li>
            </ul>
          </div>

          {/* About */}
          <div className="col-md-3 mb-4">
            <h6 className="text-warning text-sm">ABOUT</h6>
            <ul className="list-unstyled">
              <li><Link href="#" className="leading-loose text-white text-decoration-none  text-sm">About Us</Link></li>
              <li><Link href="#" className="leading-loose text-white text-decoration-none  text-sm">Partner With Us</Link></li>
              <li><Link href="#" className="leading-loose text-white text-decoration-none  text-sm">Press Resources</Link></li>
              <li><Link href="#" className="leading-loose text-white text-decoration-none  text-sm">Careers</Link></li>
              <li><Link href="#" className="leading-loose text-white text-decoration-none  text-sm">Charity</Link></li>
              <li><Link href="#" className="leading-loose text-white text-decoration-none  text-sm">Community</Link></li>
              <li><Link href="#" className="leading-loose text-white text-decoration-none  text-sm">Our Blog</Link></li>
              <li><Link href="#" className="leading-loose text-white text-decoration-none  text-sm">Tech Insights</Link></li>
            </ul>
          </div>

          {/* Mobile Apps & Extension */}
          <div className="col-md-3 mb-4">
      
            <h6 className="text-warning text-sm mt-3">BROWSER EXTENSION</h6>
            <Image width={150} height={80} src="/icons/chrome-store.svg" alt="Chrome Extension" />
        <h6 className="text-warning text-sm mt-3">JOIN US</h6>

        <SocialIcons />
          </div>
        </div>

        {/* Social Icons */}
        <div className="text-center my-3">
          <a href="#" className="text-white me-3"><i className="bi bi-tiktok fs-4"></i></a>
          <a href="#" className="text-white me-3"><i className="bi bi-instagram fs-4"></i></a>
          <a href="#" className="text-white me-3"><i className="bi bi-facebook fs-4"></i></a>
          <a href="#" className="text-white"><i className="bi bi-linkedin fs-4"></i></a>
        </div>

        {/* TrustPilot */}
        <div className="text-center small mb-3">
          Our members say <span className="fw-bold">Excellent</span> 
          <Image height={20} width={100} src="/icons/4.5-stars.svg" alt="Trustpilot"  className="mx-2" />
          4.4 out of 5 based on <strong>23,048 reviews</strong>
        </div>

        {/* Legal */}
        <div className="text-center small text-muted">
          © 2025 - company. All Rights Reserved.  
          <br />
          
        </div>

        {/* Bottom Links */}
        <div className="text-center mt-3">
          <Link href="/privacy-policy" className="leading-loose text-white text-decoration-none  text-sm mx-2">Privacy Notice</Link>
          <Link href="/partner-with-us" className="leading-loose text-white text-decoration-none  text-sm mx-2">Partner With Us</Link>
          {/* <Link href="#" className="leading-loose text-white text-decoration-none  text-sm mx-2">Cookie Preferences</Link> */}
          <Link href="/terms-and-conditions" className="leading-loose text-white text-decoration-none  text-sm mx-2">Terms and Conditions</Link>
        </div>

        {/* Company Tagline */}
        {/* <div className="text-center text-muted mt-2 small">
          PART OF <span className="fw-bold text-white">RetailMeNot</span>
        </div> */}
      </div>
    </footer>
  );
}

"use client";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import Sidebars from "./Sidebars";

export default function Header({searchParms}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
const country = searchParms?.countryCode || 'us';
  return (
    <header className="bg-light">
      {/* Top Announcement Bar */}
      <div className="bg-dark text-white text-center py-1 small">
        Want exclusives like £5 for 2 shops?{" "}
        <Link href="/vip" className="text-warning fw-bold">
          Become a VIP ⭐
        </Link>
      </div>

      {/* Main Header Row */}
      <div className="shadow" style={{ background: "rgb(249 245 242)" }}>
        <div className="container d-flex align-items-center justify-content-between py-2">
          {/* Logo */}
          <Link
            href={`/${country}`}
            className="d-flex align-items-center text-decoration-none"
          >
            <Image
              src="/logo.jpeg"
              alt="Logo"
              width={160}
              height={60}
              className="me-2"
            />
          </Link>

          {/* Search bar - hidden on very small screens */}
          <form
            className="d-none d-md-flex flex-grow-1 mx-4"
            style={{ maxWidth: "500px" }}
          >
            <div className="input-group">
              <span className="input-group-text bg-light border-0">
                <svg
                  viewBox="0 0 18 18"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-label="Search Icon"
                  role="button"
                  width="20"
                  height="20"
                >
                  <path
                    d="M17.641 15.91L14.03 12.3A7.753 7.753 0 0 0 2.27 2.27 7.752 7.752 0 0 0 12.3 14.03l3.612 3.611a1.22 1.22 0 0 0 1.73 0 1.224 1.224 0 0 0 0-1.73zM3.482 12.022a6.045 6.045 0 0 1 0-8.539 5.999 5.999 0 0 1 4.27-1.769c1.612 0 3.129.628 4.27 1.769a6.045 6.045 0 0 1 0 8.54 5.999 5.999 0 0 1-4.27 1.768 6 6 0 0 1-4.27-1.769z"
                    fillRule="nonzero"
                  />
                </svg>
              </span>
              <input
                type="text"
                className="form-control border-0 shadow-sm"
                placeholder="Start searching"
              />
            </div>
          </form>

          {/* Mobile Menu Toggle */}
          <button
            className="btn d-md-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
          
              {/* SVG Hamburger Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M1.5 12.5a.75.75 0 0 1 0-1.5h13a.75.75 0 0 1 0 1.5h-13zm0-5a.75.75 0 0 1 0-1.5h13a.75.75 0 0 1 0 1.5h-13zm0-5a.75.75 0 0 1 0-1.5h13a.75.75 0 0 1 0 1.5h-13z"
                />
              </svg>
          </button>

          {/* Right Icons / Sidebar */}
          <div className="d-none d-md-flex align-items-center">
            <Sidebars />
          </div>
        </div>
      </div>

      {/* Desktop Nav */}
      <nav className="bg-white border-top border-bottom d-none d-md-block">
        <div className="container d-flex justify-content-center py-2 flex-wrap">
          <Link href={`/${country}/categories`} className="nav-link px-3 text-dark">
            Categories <i className="bi bi-chevron-down small"></i>
          </Link>
          <Link href={`/${country}/stores`} className="nav-link px-3 text-dark">
            Stores <i className="bi bi-chevron-down small"></i>
          </Link>
          <Link href={`/${country}/coupons`} className="nav-link px-3 text-dark">
            Coupons
          </Link>
          <Link href={`/${country}/guides`} className="nav-link px-3 text-dark">
            Shopping Guide <i className="bi bi-chevron-down small"></i>
          </Link>
          <Link href={`/${country}/`} className="nav-link px-3 text-dark">
            Back-to-School
          </Link>
        </div>
      </nav>

      {/* Mobile Nav (collapsible) */}
      {isMenuOpen && (
        <div className="bg-white border-top d-md-none">
          <div className="container d-flex flex-column py-2">
            <form className="mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Search..."
              />
            </form>
            <Link href="/trending" className="nav-link text-dark py-2">
              Categories
            </Link>
            <Link href="/categories" className="nav-link text-dark py-2">
              Stores
            </Link>
            <Link href="/vip" className="nav-link text-dark py-2">
              Coupons
            </Link>
            <Link href="/guides" className="nav-link text-dark py-2">
              Shopping Guide
            </Link>
            <Link href="/code-guarantee" className="nav-link text-dark py-2">
              Back-to-School
            </Link>
            <div className="py-2">
              <Sidebars />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

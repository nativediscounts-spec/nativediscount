"use client";
import Link from "next/link";
import { useEffect } from "react";
import Image from "next/image";
import Sidebars from "./Sidebars"
// import "bootstrap/dist/js/bootstrap.bundle.min.js";

export default function Header() {
  useEffect(() => {}, []);

  return (
    <>
<header className="bg-light">
      {/* Top Announcement Bar */}
      <div className="bg-dark text-white text-center py-1 small">
        Want exclusives like £5 for 2 shops?{" "}
        <Link href="/vip" className="text-warning fw-bold">
          Become a VIP ⭐
        </Link>
      </div>

      {/* Main Header Row */}
      <div className=" shadow" style={{background:"rgb(249 245 242)"}}>
        <div className="container d-flex align-items-center justify-content-between py-0">
          
          {/* Logo */}
          <Link href="/" className="d-flex align-items-center text-decoration-none">
            <Image
              src="/logo.jpeg"
              alt=" Logo"
            width={200}
            height={80}
              className="me-2"
            />
            
          
{/* <span className="fw-bold fs-4 text-dark">VoucherCodes</span> */}
          </Link>

          {/* Search Bar */}
          <form className="flex-grow-1 mx-4" style={{ maxWidth: "500px" }}>
            <div className="input-group">
              <span className="input-group-text bg-light border-0">
            <svg
  viewBox="0 0 18 18"
  xmlns="http://www.w3.org/2000/svg"
  aria-label="Search Icon"   // ✅ use aria-label instead of alt
  data-qa="el:searchIcon"
  role="button"
  width="20"
  height="20"
  className="absolute left-0 top-0 max-h-full fill-current ml-4" // ✅ use className
  tabIndex="0" // ✅ camelCase
>
  <path
    d="M17.641 15.91L14.03 12.3A7.753 7.753 0 0 0 2.27 2.27 7.752 7.752 0 0 0 12.3 14.03l3.612 3.611a1.22 1.22 0 0 0 1.73 0 1.224 1.224 0 0 0 0-1.73zM3.482 12.022a6.045 6.045 0 0 1 0-8.539 5.999 5.999 0 0 1 4.27-1.769c1.612 0 3.129.628 4.27 1.769a6.045 6.045 0 0 1 0 8.54 5.999 5.999 0 0 1-4.27 1.768 6 6 0 0 1-4.27-1.769z"
    fillRule="nonzero" // ✅ camelCase
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

          {/* Sign In */}
          <div className="d-flex align-items-center">
            
            <Sidebars />
            
            {/* <Link href="/signin" className="text-dark text-decoration-none text-sm ">
              <i className="bi bi-bell me-2 position-relative">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="-1 -4 20 30" fill="none" alt="Icon bell" class="bg-liquorice rounded-full stroke-current text-white" data-qa="el:notificationInboxIcon" height="32" width="32"><g clip-path="url(#bell)"><path d="M9.75 2.608v.608l.595.126c2.812.595 4.905 3.038 4.905 5.937v5.65c0 .337.136.659.377.894l1.532 1.497H.84l1.532-1.497a1.25 1.25 0 0 0 .377-.894v-5.65c0-2.899 2.093-5.342 4.905-5.937l.595-.126V1.465c0-.38.317-.715.75-.715s.75.335.75.715v1.143Zm.215 17.198A1.249 1.249 0 0 1 9 20.25c-.397 0-.74-.175-.965-.444h1.93Z" stroke-width="1.5"></path></g><defs><clipPath id="bell"><path fill="#fff" d="M0 0h18v21H0z"></path></clipPath></defs></svg>
                <span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning text-dark"
                  style={{ fontSize: "0.6rem" }}
                >
                  1
                </span>
              </i>
              Sign In | Join
            </Link> */}
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="bg-white mb-3 border-top border-bottom">
        <div className="container d-flex justify-content-center py-2">
          <Link href="/trending" className="nav-link px-3 text-sm  text-dark">
            
Categories
 <i className="bi bi-chevron-down small"></i>
          </Link>
          <Link href="/categories" className="nav-link px-3 text-sm  text-dark">
            Stores
 <i className="bi bi-chevron-down small"></i>
          </Link>
          <Link href="/vip" className="nav-link px-3 text-sm  text-dark">
            Coupons

          </Link>
          <Link href="/guides" className="nav-link px-3 text-sm  text-dark">
           Shopping Guide
 <i className="bi bi-chevron-down small"></i>
          </Link>
          <Link href="/code-guarantee" className="nav-link px-3 text-sm  text-dark">
          Back-to-School
          </Link>
         
        </div>
      </nav>
      </header>
    </>
  );
}

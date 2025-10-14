"use client";

import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function StatsSection() {
  useEffect(() => {
    // Simple JS number counter animation
    const counters = document.querySelectorAll(".count");
    counters.forEach((counter) => {
      const target = +counter.getAttribute("data-target");
      const updateCount = () => {
        const current = +counter.innerText;
        const increment = Math.ceil(target / 100);
        if (current < target) {
          counter.innerText = current + increment;
          setTimeout(updateCount, 30);
        } else {
          counter.innerText = target;
        }
      };
      updateCount();
    });
  }, []);

  const stats = [
    {
      number: 11,
      label: "Active Deals",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M3 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1.555.832L8 11.202l4.445 3.63A1 1 0 0 0 14 14V2a1 1 0 0 0-1-1H3z" />
        </svg>
      ),
    },
    {
      number: 10,
      label: "Partner Stores",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M8 0a5 5 0 0 0-5 5v3H1a1 1 0 0 0-1 1v7h6v-3h4v3h6v-7a1 1 0 0 0-1-1h-2V5a5 5 0 0 0-5-5z" />
        </svg>
      ),
    },
    {
      number: 2,
      label: "Happy Savers",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm3.5-8a.5.5 0 0 0-.5-.5H5a.5.5 0 0 0 0 1h6a.5.5 0 0 0 .5-.5zm-6 3.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4z" />
        </svg>
      ),
    },
    {
      number: 3,
      label: "Featured Deals",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M3.612 15.443 4.23 10.97.943 7.765l4.594-.671L8 2.223l2.463 4.871 4.594.671-3.287 3.206.618 4.473L8 13.187l-4.389 2.256z" />
        </svg>
      ),
    },
  ];

  return (
    <section
      className="py-5 text-center text-white"
      style={{
        background: "linear-gradient(135deg, #f37d06 0%, #ce6057 100%)",
      }}
    >
      <div className="container py-4">
        {/* <h2 className="fw-bold mb-5">Our Growing Community</h2> */}
        <div className="row g-4">
          {stats.map((item, index) => (
            <div className="col-6 col-md-3" key={index}>
              <div className="bg-white text-dark rounded-4 p-4 shadow h-100 stat-card">
                <div
                  className="icon-wrapper mb-3 mx-auto d-flex align-items-center justify-content-center"
                  style={{
                    backgroundColor: "rgb(255 226 226)",
                    width: "70px",
                    height: "70px",
                    borderRadius: "50%",
                    color: "#f37d06",
                  }}
                >
                  {item.icon}
                </div>
                <h3
                  className="fw-bold text-black mb-1 display-6 count"
                  data-target={item.number}
                >
                  0
                </h3>
                <p className="mb-0 text-muted">{item.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .stat-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
          .count{color:#f37d06}
        .stat-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </section>
  );
}

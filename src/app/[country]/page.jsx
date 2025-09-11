import Image from "next/image";
import clientPromise from "@/lib/mongodb";
import { notFound } from "next/navigation";
import NewsletterModal from "@/components/NewsletterModal";
import BannerSlider from "@/components/BannerSlider";
import OffersSection from "@/components/OffersSection";
import CatBlocks from "@/components/CatBlocks";
import Link from "next/link";

const brands = [
  ["Adidas", "Amazon discount code", "AO.com", "Apple", "Argos", "ASOS", "Bensons for Beds", "Boden", "Boohoo", "Clarks", "Currys", "Debenhams voucher code", "Dominos Vouchers", "Dorothy Perkins"],
  ["eFlorist Flowers", "Expedia", "First Choice", "Flannels", "Footasylum", "H&M", "Hotels.com", "HP", "JD Sports", "Jet2holidays", "John Lewis", "Just Eat", "La Redoute", "Laithwaites"],
  ["lastminute.com", "lookfantastic", "Marks & Spencer", "Mobiles.co.uk", "Monsoon", "Moonpig", "Myprotein", "New Look", "Nike", "NOW TV", "O2", "Pizza Express", "Pizza Hut vouchers", "Pretty Little Thing"],
  ["Sainsbury's", "Sephora", "Serenata Flowers", "Shein", "Sports Direct", "The Body Shop", "The White Company", "Travelodge", "TUI", "Very", "Virgin Media", "Vodafone", "wayfair.co.uk", "Wickes"]
];

const features = [
  {
    icon: "/icons/icon-hand-heart.V2lWTH1f.svg",
    title: "Every code is verified",
    subtitle: "By real people",
  },
  {
    icon: "/icons/icon-vip-gold.CGkq4wJR.svg",
    title: "£5 gift card for every 2 shops",
    subtitle: "With hundreds of VIP retailers",
  },
  {
    icon: "/icons/icon-money-coin-sparkle.Q5vDhLDJ.svg",
    title: "£60 million saved",
    subtitle: "By our customers in 2024",
  },
];

export async function generateMetadata({ params }) {
  const { country: countryCode } = await params;

  const client = await clientPromise;
  const db = client.db(process.env.DB_NAME);

  const country = await db.collection("countries").findOne({
    countryCode,
    activeStatus: true,
  });

  if (!country) return {};

  return {
    title: country.seoTitle || "Homepage",
    description: country.seoDescription || "",
    keywords: country.seoKeywords || "",
  };
}

export default async function CountryPage(props) {
  const { country } = await props.params;

  const client = await clientPromise;
  const db = client.db(process.env.DB_NAME);

  const countryDoc = await db.collection("countries").findOne({
    countryCode: country,
    activeStatus: true,
  });

  if (!countryDoc) {
    notFound();
  }

  // ✅ Fetch Featured Merchants dynamically
  const res = await fetch(
    `http://localhost:3000/api/v1/brands?field=featuredBrand&value=true&limit=6`,
    { cache: "no-store" } // always fresh
  );
  const featuredMerchants = await res.json();
const countryres = await fetch(
  `http://localhost:3000/api/v2/brands?filter={"country":"us","featuredBrand":true}&limit=10`,
  { cache: "no-store" }
);
const countryBrands = await countryres.json();
  return (
    <main>
      {/* {countryDoc.newsletter.headline?.trim() && (
        <NewsletterModal
          countryCode={country}
          headline={countryDoc.newsletter.headline}
          subtext={countryDoc.newsletter.subtext}
          buttonText={countryDoc.newsletter.buttonText || "Get Deals via Email"}
          buttonLink={countryDoc.newsletter.buttonLink || "#"}
        />
      )} */}

      {/* Hero Section */}
      <section>
        <BannerSlider
          heroImages={countryDoc.heroImages || []}
          heroHeadline={countryDoc.heroHeadline}
          heroSubheadline={countryDoc.heroSubheadline}
        />
      </section>

      {/* Features */}
      <section className="bg-warning py-3">
        <div className="container">
          <div className="row text-center align-items-center">
            {features.map((item, idx) => (
              <div
                key={idx}
                className="col-12 col-md-4 mb-3 mb-md-0 d-flex justify-content-center"
              >
                <div className="d-flex align-items-center">
                  <Image
                    src={item.icon}
                    alt={item.title}
                    width="50"
                    height="50"
                    className="me-3"
                    style={{
                      borderRadius: "50%",
                      background: "#fff",
                      padding: "5px",
                    }}
                  />
                  <div className="text-start">
                    <h6 className="fw-bold mb-0">{item.title}</h6>
                    <small className="text-dark">{item.subtitle}</small>
                  </div>
                </div>
                {idx !== features.length - 1 && (
                  <div className="d-none d-md-flex align-items-center mx-4">
                    <span className="mx-1">•</span>
                    <span className="mx-1">•</span>
                    <span className="mx-1">•</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ✅ Featured Merchants */}
      <section className="bg-light py-5">
  <div className="container">
    <div className="d-flex justify-content-between align-items-center mb-4">
      <h2 className="fw-bold">Featured Merchants</h2>
      <Link href="#" className="fw-semibold text-dark text-decoration-none">View All</Link>
    </div>
    <div className="row g-4">
      {featuredMerchants.map((merchant, idx) => (
        <div className="col-12 col-sm-6 col-md-3" key={idx}>
            <Link
                href={`/${country}/${merchant.pageSlug}`}>
          <div className="card shadow-sm h-100 border-0 position-relative">
            {merchant.vip && (
              <span className="badge bg-warning text-dark position-absolute top-0 start-50 translate-middle-x mt-2">
                ⭐ VIP
              </span>
            )}
            <div
              className="d-flex align-items-center justify-content-center bg-white border-bottom"
              style={{ height: "120px" }}
            >
              <Image
                src={merchant.brandLogo}
                alt={merchant.brandName}
                width={150}
                height={60}
                style={{ objectFit: "contain", maxHeight: "80px" }}
              />
            </div>
            <div className="card-body">
              <div className="text-muted small fw-normal mb-0">{merchant.brandName}</div>
              <div className="text-sm card-text fw-normal mt-0">
                {merchant.exclusive && (
                  <span className="badge bg-danger text-white fw-normal mb-0">EXCLUSIVE</span>
                )}{" "}
                {merchant.offerDescription || `Check deals at ${merchant.brandName}`}
              </div>
            </div>
          </div></Link>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* Featured Offers */}
      {/* <section>
        <h2>{countryDoc.dealTitle}</h2>
        <ul>
          {countryDoc.featuredOffers?.map((offer, idx) => (
            <li key={idx}>
              <Link href={offer.url}>{offer.title}</Link>
            </li>
          ))}
        </ul>
      </section> */}

      {/* App Promo */}
      {countryDoc.appPromoBanner?.image && (
        <section>
          <Link href={countryDoc.appPromoBanner.url}>
            <Image
              src={countryDoc.appPromoBanner.image}
              alt="App Promo"
              width={400}
              height={200}
            />
          </Link>
        </section>
      )}

      {/* <CatBlocks catname={"Featured Merchants"} /> */}

      {/* Popular Brands */}
      {/* <section className="py-5 bg-light">
        <div className="container text-center">
          <h4 className="fw-bold mb-4">
            Huge savings at thousands of Stores and Restaurants with our
            Discount Vouchers & Promotional Codes
          </h4>
          <div className="row">
            {brands.map((col, idx) => (
              <div className="col-6 col-md-3 mb-3" key={idx}>
                <ul className="list-unstyled">
                  {col.map((brand, i) => (
                    <li key={i} className="mb-2">
                      <a
                        href={`/brands/${brand
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                        className="text-dark text-decoration-none"
                      >
                        {brand}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section> */}
      
<section className="py-5 bg-light">
  <div className="container text-center">
    <h4 className="fw-bold mb-4">
      Huge savings at thousands of Stores and Restaurants with our
      Discount Vouchers & Promotional Codes
    </h4>
    <div className="row">
      {countryBrands.map((brand, idx) => (
        <div className="col-6 col-md-3 mb-3" key={idx}>
          <ul className="list-unstyled">
            <li className="mb-2">
              <Link
                href={`/${country}/${brand.pageSlug}`}
                className="text-dark text-decoration-none"
              >
                {brand.brandName}
              </Link>
            </li>
          </ul>
        </div>
      ))}
    </div>
  </div>
</section>
    </main>
  );
}

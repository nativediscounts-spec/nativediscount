import Image from "next/image";
import clientPromise from "@/lib/mongodb";
import { notFound } from "next/navigation";
import Country from "../../lib/models/Country"; // your schema file
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
  const { country: countryCode } = await params; // ✅ await params

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
  const { country } = await props.params; // ✅ explicitly await params here

  const client = await clientPromise;
  const db = client.db(process.env.DB_NAME);

  const countryDoc = await db.collection("countries").findOne({
    countryCode: country,
    activeStatus: true,
  });

  if (!countryDoc) {
    notFound();
  }



  return (
    <main>
  
      {countryDoc.newsletter.headline?.trim() && (
        <NewsletterModal
          countryCode={country}
          headline={countryDoc.newsletter.headline}
          subtext={countryDoc.newsletter.subtext}
          buttonText={countryDoc.newsletter.buttonText || "Get Deals via Email"}
          buttonLink={countryDoc.newsletter.buttonLink || "#"}
        />
      )}


      {/* Hero Section */}
      <section>
        <BannerSlider
          heroImages={countryDoc.heroImages || []}
  heroHeadline={countryDoc.heroHeadline}
  heroSubheadline={countryDoc.heroSubheadline}
        />


      </section>
   <section className="bg-warning py-3">
      <div className="container">
        <div className="row text-center align-items-center">
          {features.map((item, idx) => (
            <div key={idx} className="col-12 col-md-4 mb-3 mb-md-0 d-flex justify-content-center">
              <div className="d-flex align-items-center">
                <Image
                  src={item.icon}
                  alt={item.title}
                  width="50"
                  height="50"
                  className="me-3"
                  style={{ borderRadius: "50%", background: "#fff", padding: "5px" }}
                />
                <div className="text-start">
                  <h6 className="fw-bold mb-0">{item.title}</h6>
                  <small className="text-dark">{item.subtitle}</small>
                </div>
              </div>
              {/* Dots separator except for the last one */}
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
      {/* Featured Merchants */}
      {/* <section>
        <h2>Featured Merchants</h2>
        <div className="flex gap-4">
          {country.featuredStoreLogos?.map((logo, idx) => (
            <Image
              key={idx}
              src={logo}
              alt={`Merchant ${idx + 1}`}
              width={150}
              height={80}
            />
          ))}
        </div>
      </section> */}

      {/* Featured Offers */}
      <section>
        <h2>{countryDoc.dealTitle}</h2>
        <ul>
          {countryDoc.featuredOffers?.map((offer, idx) => (
            <li key={idx}>
              <a href={offer.url}>{offer.title}</a>
            </li>
          ))}
        </ul>
      </section>




      {/* App Promo */}
      {countryDoc.appPromoBanner?.image && (
        <section>
          <a href={countryDoc.appPromoBanner.url}>
            <Image
              src={countryDoc.appPromoBanner.image}
              alt="App Promo"
              width={400}
              height={200}
            />
          </a>
        </section>
      )}

      {/* Newsletter */}
      {/* <section>
        <h2>{country.newsletter?.headline}</h2>
        <p>{country.newsletter?.subtext}</p>
        <a href={country.newsletter?.buttonLink}>
          <button>{country.newsletter?.buttonText}</button>
        </a>
      </section> */}

      {/* <OffersSection /> */}
      <CatBlocks catname={"Featured Merchants"} />
      {/* Categories */}
      {/* <section>
        <h2>Categories</h2>
        <div className="flex gap-6">
          {country.categoryTiles?.map((cat, idx) => (
            <div key={idx} className="text-center">
              <Image src={cat.icon} alt={cat.title} width={50} height={50} />
              <p>{cat.title}</p>
            </div>
          ))}
        </div>
      </section> */}
      <section className="py-5 bg-light">
        <div className="container text-center">
          <h4 className="fw-bold mb-4">
            Huge savings at thousands of Stores and Restaurants with our Discount Vouchers & Promotional Codes
          </h4>
          <div className="row">
            {brands.map((col, idx) => (
              <div className="col-6 col-md-3 mb-3" key={idx}>
                <ul className="list-unstyled">
                  {col.map((brand, i) => (
                    <li key={i} className="mb-2">
                      <a href={`/brands/${brand.toLowerCase().replace(/\s+/g, "-")}`} className="text-dark text-decoration-none">
                        {brand}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
// app/[country]/[slug]/page.js
import clientPromise from "@/lib/mongodb";
import { notFound } from "next/navigation";
import Link from "next/link";
import CategoryBrands from "@/components/CategoryBrands";

export async function generateMetadata({ params }) {
  const { country, slug: pageSlug } = params; // ✅ FIXED PARAM

  const client = await clientPromise;
  const db = client.db(process.env.DB_NAME);

  const category = await db.collection("categories").findOne({
    pageSlug: pageSlug,
    status: "Active",
  });

  if (!category) {
    return {
      title: "Categories | NativeDiscounts",
      description: "Browse all shopping categories on NativeDiscounts.",
    };
  }

  const title = category.seoTitle || category.categoryTitle;
  const description = category.seoDescription || "";
  const keywords = category.seoKeywords || "";
  const canonical = `https://www.nativediscounts.com/cats/${pageSlug}`;
  const image = category.heroBannerImage || "https://www.nativediscounts.com/default-og.jpg";

  return {
    title,
    description,
    keywords,

    alternates: {
      canonical,
    },

    openGraph: {
      title,
      description,
      url: canonical,
      type: "website",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },

    other: {
      "og:locale": country === "us" ? "en_US" : "en",
    },
  };
}

export default async function CategoryListingPage({ params }) {
  const { country, slug: pageSlug } = params;

  const client = await clientPromise;
  const db = client.db(process.env.DB_NAME);

  const CategoryDoc = await db.collection("categories").findOne({
    pageSlug: pageSlug,
    status: "Active",
  });

  if (!CategoryDoc) {
    notFound();
  }

  // --- JSON-LD Structured Data (Category) ---
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: CategoryDoc.categoryTitle,
    description: CategoryDoc.seoDescription || CategoryDoc.introText || "",
    url: `https://www.nativediscounts.com/cats/${pageSlug}`,
    image: CategoryDoc.heroBannerImage || "",
  };

  return (
    <main className="container py-4">

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link href="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link href={`/cats`}>All Categories</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {CategoryDoc.categoryTitle}
          </li>
        </ol>
      </nav>

      <h1>{CategoryDoc.categoryTitle}</h1>

      {CategoryDoc.introText && (
        <p className="text-muted">{CategoryDoc.introText}</p>
      )}

      {CategoryDoc.heroBannerImage && (
        <img
          src={CategoryDoc.heroBannerImage}
          alt={CategoryDoc.heroHeading || CategoryDoc.categoryTitle}
          className="img-fluid my-3 rounded shadow-sm"
        />
      )}

      {/* Related Brands Section */}
      <section className="mt-5">
        <CategoryBrands
          categorySlug={pageSlug}
          categoryId={CategoryDoc._id.toString()}
          country={country}
        />
      </section>
    </main>
  );
}

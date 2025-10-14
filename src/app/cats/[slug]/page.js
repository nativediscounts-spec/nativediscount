// app/[country]/[slug]/page.js
import clientPromise from "@/lib/mongodb";
import { notFound } from "next/navigation";
import Link from "next/link";
import CategoryBrands from "@/components/CategoryBrands"; // ✅ new component

export async function generateMetadata({ params }) {
  const { country, pageSlug } = params;

  const client = await clientPromise;
  const db = client.db(process.env.DB_NAME);

  const category = await db.collection("categories").findOne({
    pageSlug: pageSlug,
    status: "Active",
  });

  if (!category) return {};

  return {
    title: category.seoTitle || "Homepage",
    description: category.seoDescription || "",
    keywords: category.seoKeywords || "",
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
    console.log("Category not found:", pageSlug);
    notFound();
  }

  return (
    <main className="container py-4">
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

      {/* ✅ Related Brands Section */}
      <section className="mt-5">
        {/* <h2 className="mb-3">Top Brands in {CategoryDoc.categoryTitle}</h2> */}
        <CategoryBrands categorySlug={pageSlug} categoryId={CategoryDoc._id.toString()} country="us" />
      </section>
    </main>
  );
}

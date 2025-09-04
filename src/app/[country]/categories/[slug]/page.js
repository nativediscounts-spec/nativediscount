import clientPromise from "@/lib/mongodb";
import { notFound } from "next/navigation";
import Link from "next/link";
export async function generateMetadata({ params }) {
  const { country, pageSlug } = params;

  const client = await clientPromise;
  const db = client.db(process.env.DB_NAME);

  const category = await db.collection("categories").findOne({
    pageSlug: pageSlug,
    status: "Active", // ✅ match string "Active"
  });

  if (!category) return {};

  return {
    title: category.seoTitle || "Homepage",
    description: category.seoDescription || "",
    keywords: category.seoKeywords || "",
  };
}

export default async function CategoryListingPage({ params }) {
  const { country, slug:pageSlug } = params;

  const client = await clientPromise;
  const db = client.db(process.env.DB_NAME);

  const CategoryDoc = await db.collection("categories").findOne({
    pageSlug: pageSlug,
    status: "Active", // ✅ fix filter
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
              <Link href={`/${country}/categories`}>All Categories</Link>
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

      {/* ✅ Example: Hero Banner */}
      {CategoryDoc.heroBannerImage && (
        <img
          src={CategoryDoc.heroBannerImage}
          alt={CategoryDoc.heroHeading || CategoryDoc.categoryTitle}
          className="img-fluid my-3"
        />
      )}

      {/* ✅ Example: Subcategories */}
      {/* {CategoryDoc.subCategoryBlocks?.length > 0 && (
        <div className="mt-4">
          <h3>Subcategories</h3>
          <ul>
            {CategoryDoc.subCategoryBlocks.map((sub, idx) => (
              <li key={idx}>
                <a href={sub.link || "#"}>{sub.name || "Unnamed"}</a>
              </li>
            ))}
          </ul>
        </div>
      )} */}
    </main>
  );
}

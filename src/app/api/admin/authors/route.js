import clientPromise from "@/lib/mongodb";

export async function GET() {
  const client = await clientPromise;
  const db = client.db(process.env.DB_NAME);
  const authors = await db.collection("authors").find().sort({ sortOrder: 1 }).toArray();
  return new Response(JSON.stringify(authors), { status: 200 });
}

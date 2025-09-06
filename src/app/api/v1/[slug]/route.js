import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { slug } = params; // ✅ no need for await here

  try {
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);

    // Parse query string
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get("limit")) || 0;
    const field = searchParams.get("field");   // e.g. "author"
    const value = searchParams.get("value");   // e.g. "John"

    // // Build filter
    // let filter = {};
    // if (field && value) {
    //   filter[field] = value; // dynamic field filter
    // }
    // Build filter
let filter = {};
if (field && value !== null) {
  let parsedValue = value;

  // ✅ Handle booleans
  if (value === "true") parsedValue = true;
  else if (value === "false") parsedValue = false;

  // ✅ Handle numbers
  else if (!isNaN(value)) parsedValue = Number(value);

  filter[field] = parsedValue; // dynamic field filter
}

    // Build query
    let cursor = db.collection(slug).find(filter, { projection: { _id: 0 } });
    if (limit > 0) {
      cursor = cursor.limit(limit);
    }

    const docs = await cursor.toArray();

    return NextResponse.json(docs);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

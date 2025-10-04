import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { slug } = params;

  try {
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);

    const { searchParams } = new URL(req.url);

    const limit = parseInt(searchParams.get("limit")) || 20; // default 20
    const page = parseInt(searchParams.get("page")) || 1;    // default page 1
    const field = searchParams.get("field");
    const value = searchParams.get("value");
    const order = searchParams.get("order") || "desc"; // "asc" or "desc"
    const ordername = searchParams.get("ordername") || "dates.addedDate"; // field to sort by

    // Build dynamic filter
    let filter = {};
    if (field && value !== null) {
      let parsedValue = value;

      // Handle booleans
      if (value === "true") parsedValue = true;
      else if (value === "false") parsedValue = false;
      // Handle numbers
      else if (!isNaN(value)) parsedValue = Number(value);

      filter[field] = parsedValue;
    }

    // Calculate skip for pagination
    const skip = (page - 1) * limit;

    // Determine sort order
    const sortOrder = order.toLowerCase() === "asc" ? 1 : -1;

    // Build query with dynamic sort, skip, limit
    let cursor = db
      .collection(slug)
      .find(filter, { projection: { _id: 0 } })
      .sort({ [ordername]: sortOrder })
      .skip(skip)
      .limit(limit);

    const docs = await cursor.toArray();

    return NextResponse.json(docs);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

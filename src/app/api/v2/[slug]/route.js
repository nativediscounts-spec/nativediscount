import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { slug } = params; // collection name
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);

    const { searchParams } = new URL(req.url);

    // Build dynamic filter for multiple fields
    let filter = {};
    const fields = searchParams.getAll("field");   // array of field names
    const values = searchParams.getAll("value");   // array of corresponding values

    fields.forEach((f, idx) => {
      let val = values[idx];

      // Convert boolean strings
      if (val === "true") val = true;
      else if (val === "false") val = false;
      // Convert numbers if applicable
      else if (!isNaN(val)) val = Number(val);

      filter[f] = val;
    });

    // Limit
    const limit = parseInt(searchParams.get("limit")) || 0;

    let cursor = db.collection(slug).find(filter, { projection: { _id: 0 } });
    if (limit > 0) cursor = cursor.limit(limit);

    const docs = await cursor.toArray();

    return NextResponse.json(docs);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

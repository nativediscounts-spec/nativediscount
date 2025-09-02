import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// Helper: Convert ObjectId → 7-digit number
function objectIdTo7DigitNumber(objectId) {
  const hex = objectId.toString();
  const num = parseInt(hex.substring(0, 12), 16);
  return (num % 10000000).toString().padStart(7, "0");
}

// CREATE Coupon
export async function POST(req) {
  const client = await clientPromise;
  const db = client.db(process.env.DB_NAME);

  const body = await req.json();
  const result = await db.collection("coupons").insertOne({
    ...body,
    enabled: body.enabled ?? true,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  // Generate 7-digit code from insertedId
  const shortCode = objectIdTo7DigitNumber(result.insertedId);

  // Update document with shortCode
  await db.collection("coupons").updateOne(
    { _id: result.insertedId },
    { $set: { shortCode } }
  );

  return Response.json({ success: true, id: result.insertedId, shortCode });
}

// READ Coupons
export async function GET() {
  const client = await clientPromise;
  const db = client.db(process.env.DB_NAME);

  const coupons = await db.collection("coupons").find().toArray();
  return Response.json(coupons);
}

// UPDATE Coupon
export async function PUT(req) {
  const client = await clientPromise;
  const db = client.db(process.env.DB_NAME);

  const { id, ...body } = await req.json();
  await db.collection("coupons").updateOne(
    { _id: new ObjectId(id) },
    { $set: { ...body, updatedAt: new Date() } }
  );

   
  return Response.json({ success: true });
}

// DELETE Coupon
export async function DELETE(req) {
  const client = await clientPromise;
  const db = client.db(process.env.DB_NAME);

  const { id } = await req.json();
  await db.collection("coupons").deleteOne({ _id: new ObjectId(id) });

  return Response.json({ success: true });
}

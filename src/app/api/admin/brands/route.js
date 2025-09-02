import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);

   const brands = await db.collection("brands").find({}).toArray();
    // const brands = await db.collection("brands").aggregate([
    //   {
    //     $lookup: {
    //       from: "categories",            // categories collection
    //       localField: "category",        // field in brands (ObjectId)
    //       foreignField: "_id",           // field in categories
    //       as: "categoryData"
    //     }
    //   },
    //   {
    //     $unwind: {
    //       path: "$categoryData",
    //       preserveNullAndEmptyArrays: true
    //     }
    //   },
    //   {
    //     $addFields: {
    //       category: "$categoryData.categoryTitle"  // replace ObjectId with categoryTitle
    //     }
    //   },
    //   {
    //     $project: {
    //       categoryData: 0   // hide extra joined data
    //     }
    //   }
    // ]).toArray();
    return NextResponse.json(brands);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);

    const data = await req.json();
    const result = await db.collection("brands").insertOne({
      ...data,
      dates: { addedDate: new Date(), lastUpdatedDate: new Date() },
    });

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

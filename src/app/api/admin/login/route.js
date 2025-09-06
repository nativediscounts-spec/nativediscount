
//      const hashedPassword = await bcrypt.hash("Admin_?@123", 10);
// await db.collection("admins").insertOne({
//   email: "admin@mydigilink.biz",
//   password: hashedPassword,
// });
// 
import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email/Username and password are required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);

    // 1️⃣ Check in admins collection
    let admin = await db.collection("admins").findOne({ email });

    if (admin) {
      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) {
        return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
      }

      // Admin token
      const token = jwt.sign({ id: admin._id, email: admin.email }, JWT_SECRET, {
        expiresIn: "1d",
      });

      const res = NextResponse.json({ message: "Admin login successful" });
      res.cookies.set("admin_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24,
      });

      return res;
    }

    // 2️⃣ If not found in admins → check authors
    let author = await db.collection("authors").findOne({ userEmail: email });

    if (!author) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    const isAuthorMatch = await bcrypt.compare(password, author.password);
    if (!isAuthorMatch) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    // User token
    const userToken = jwt.sign({ id: author._id, userEmail: author.userEmail }, JWT_SECRET, {
      expiresIn: "1d",
    });

    const res = NextResponse.json({ message: "User login successful" });
    res.cookies.set("author_token", userToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return res;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

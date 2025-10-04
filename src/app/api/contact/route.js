"use server";
import nodemailer from "nodemailer";
import { connectDB } from "@/lib/mongodb";
import Contact from "@/models/Contact";

export async function POST(req) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return new Response(JSON.stringify({ message: "All fields are required" }), { status: 400 });
    }

    // ✅ Connect DB & Save
    await connectDB();
    await Contact.create({ name, email, subject, message });

    // ✅ Configure transporter (adjust for Hostinger/Gmail)
    // const transporter = nodemailer.createTransport({
    //   host: "smtp.gmail.com",
    //   port: 465,
    //   secure: true,
    //   auth: {
    //     user: process.env.SMTP_USER,
    //     pass: process.env.SMTP_PASS,
    //   },
    // });

    // ✅ Send email
    // await transporter.sendMail({
    //   from: `"${name}" <${email}>`,
    //   to: process.env.CONTACT_EMAIL,
    //   subject: `Contact Form: ${subject}`,
    //   text: message,
    //   html: `
    //     <h3>New Contact Request</h3>
    //     <p><b>Name:</b> ${name}</p>
    //     <p><b>Email:</b> ${email}</p>
    //     <p><b>Subject:</b> ${subject}</p>
    //     <p><b>Message:</b><br/>${message}</p>
    //   `,
    // });

    return new Response(JSON.stringify({ message: "Email sent & saved successfully!" }), { status: 200 });
  } catch (error) {
    console.error("Error in contact route:", error);
    return new Response(JSON.stringify({ message: "Error processing request" }), { status: 500 });
  }
}

// app/page.js
import { redirect } from "next/navigation";

export default function Home() {
  redirect("/us"); // instant redirect, no flash
}

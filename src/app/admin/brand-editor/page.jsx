// app/admin/brand-editor/page.js
import { Suspense } from "react";
import BrandEditorClient from "./BrandEditorClient";

export default function BrandEditorPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrandEditorClient />
    </Suspense>
  );
}


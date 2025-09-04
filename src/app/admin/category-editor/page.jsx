// app/admin/brand-editor/page.js
import { Suspense } from "react";
import CategoryEditorClient from "./CategoryEditor";

export default function BrandEditorPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CategoryEditorClient />
    </Suspense>
  );
}



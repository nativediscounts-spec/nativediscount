"use client";

// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import dynamic from "next/dynamic";
const CKEditor = dynamic(
  () => import("@ckeditor/ckeditor5-react").then(mod => mod.CKEditor),
  { ssr: true }
);

const ClassicEditor = dynamic(
  () => import("@ckeditor/ckeditor5-build-classic").then(mod => mod.default),
  { ssr: true }
);

export default function CKEditorWrapper({ value, onChange }) {
  return (
    <CKEditor
      editor={ClassicEditor}
      data={value}
      onChange={(_, editor) => {
        const data = editor.getData();
        onChange(data);
      }}
    />
  );
}

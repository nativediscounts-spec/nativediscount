"use client";

import dynamic from "next/dynamic";

// ✅ Load CKEditor dynamically without SSR
const CKEditor = dynamic(
  async () => {
    const { CKEditor } = await import("@ckeditor/ckeditor5-react");
    const ClassicEditor = (await import("@ckeditor/ckeditor5-build-classic")).default;
    return function CKEditorWrapper({ value, onChange }) {
      return (
        <CKEditor
          editor={ClassicEditor}
          data={value || ""}
          onChange={(event, editor) => {
            const data = editor.getData();
            onChange(data);
          }}
        />
      );
    };
  },
  { ssr: false, loading: () => <p>Loading editor...</p> }
);

export default CKEditor;

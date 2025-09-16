"use client";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

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

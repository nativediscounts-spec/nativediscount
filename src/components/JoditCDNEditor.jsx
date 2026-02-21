"use client";

import { useEffect, useRef } from "react";

export default function JoditCDNEditor({ value = "", onChange }) {
  const textareaRef = useRef(null);
  const editorRef = useRef(null);

  useEffect(() => {
    // Load CSS
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://cdn.jsdelivr.net/npm/jodit@latest/build/jodit.min.css";
    document.head.appendChild(link);

    // Load Script
    const script = document.createElement("script");
    script.src =
      "https://cdn.jsdelivr.net/npm/jodit@latest/build/jodit.min.js";
    script.async = true;

    script.onload = () => {
      editorRef.current = new window.Jodit(textareaRef.current, {
        height: 500,
        toolbarSticky: false,
        toolbarAdaptive: false,
        showXPathInStatusbar: false,
        askBeforePasteHTML: false,
        askBeforePasteFromWord: false,

        buttons: [
          "source",
          "|",
          "bold",
          "italic",
          "underline",
          "strikethrough",
          "eraser",
          "|",
          "superscript",
          "subscript",
          "|",
          "ul",
          "ol",
          "outdent",
          "indent",
          "|",
          "font",
          "fontsize",
          "brush",
          "paragraph",
          "|",
          "left",
          "center",
          "right",
          "justify",
          "|",
          "link",
          "unlink",
          "image",
          "video",
          "file",
          "|",
          "table",
          "hr",
          "symbol",
          "emoji",
          "|",
          "code",
          "fullsize",
          "print",
          "|",
          "selectall",
          "copyformat",
          "|",
          "undo",
          "redo",
          "|",
          "preview",
          "find",
        ],
      });

      editorRef.current.value = value;

      editorRef.current.events.on("change", function (newContent) {
        onChange(newContent);
      });
    };

    document.body.appendChild(script);

    return () => {
      if (editorRef.current) {
        editorRef.current.destruct();
      }
    };
  }, []);

  return <textarea ref={textareaRef} />;
}

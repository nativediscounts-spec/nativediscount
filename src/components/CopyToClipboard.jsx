"use client";
import { useState } from "react";

export default function CopyCode({ code }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2s
    });
  };

  return (
    <div className="border-sunshine bg-sunshine-100 relative mb-4 flex items-center justify-between rounded border border-dashed p-3">
      <p
        className="w-48 mb-0 break-words p-1 pr-3 text-center font-bold tracking-wide md:mx-auto md:w-auto md:pr-1"
        data-qa="el:code"
      >
        {code}
      </p>
      <button
        onClick={handleCopy}
        disabled={copied}
        className={`p-2 border overflow-hidden duration-500 transition-all ease-out-quint focus:outline-none cursor-pointer font-bold rounded-lg flex items-center justify-center h-8 w-32 sm:px-3 ${
          copied
            ? "bg-gray-400 border-gray-400 text-gray-700"
            : "bg-sunshine border-sunshine text-liquorice hover:bg-sunshine-700 hover:border-sunshine-700"
        }`}
        aria-disabled={copied}
        data-qa={`el:copyCode copied:${copied}`}
      >
        {copied ? "Copied!" : "Copy code"}
      </button>
    </div>
  );
}

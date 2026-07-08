"use client";

import { useState } from "react";

/** Champ en lecture seule avec bouton « Copier ». */
export function CopyField({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="flex items-center gap-2">
      <input
        readOnly
        value={value}
        onFocus={(e) => e.currentTarget.select()}
        className="w-full rounded border border-line bg-paper2 p-2.5 font-mono text-[12px] text-ink"
      />
      <button
        type="button"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(value);
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
          } catch {
            /* ignore */
          }
        }}
        className="shrink-0 rounded-md border border-line px-3 py-2 text-[12.5px] font-medium text-accent transition-colors hover:border-bord"
      >
        {copied ? "Copié ✓" : "Copier"}
      </button>
    </div>
  );
}

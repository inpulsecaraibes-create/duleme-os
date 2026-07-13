"use client";

import { useRef, useState } from "react";
import { uploadDocument } from "./actions";

export function DocumentUpload({ token }: { token: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  return (
    <form
      ref={formRef}
      action={async (fd) => {
        setBusy(true);
        setDone(false);
        try {
          await uploadDocument(fd);
          setDone(true);
          formRef.current?.reset();
        } finally {
          setBusy(false);
        }
      }}
      className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center"
    >
      <input type="hidden" name="token" value={token} />
      <input
        type="file"
        name="file"
        required
        className="block w-full text-[13px] text-ink file:mr-3 file:rounded-md file:border-0 file:bg-bord file:px-4 file:py-2 file:text-[13px] file:font-semibold file:text-[#f6efe6] hover:file:bg-bord-deep"
      />
      <button
        type="submit"
        disabled={busy}
        className="shrink-0 rounded-md border border-line px-4 py-2 text-[13px] font-medium text-accent transition-colors hover:border-bord disabled:opacity-60"
      >
        {busy ? "Envoi…" : "Déposer"}
      </button>
      {done && (
        <span className="text-[12.5px] text-ok">Document transmis ✓</span>
      )}
    </form>
  );
}

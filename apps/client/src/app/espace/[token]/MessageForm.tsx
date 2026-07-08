"use client";

import { useRef } from "react";
import { sendClientMessage } from "./actions";

export function MessageForm({ token }: { token: string }) {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form
      ref={formRef}
      action={async (fd) => {
        await sendClientMessage(fd);
        formRef.current?.reset();
      }}
      className="mt-4"
    >
      <input type="hidden" name="token" value={token} />
      <textarea
        name="body"
        required
        rows={3}
        placeholder="Écrivez votre message à Téféry…"
        className="w-full resize-y rounded border border-line bg-paper2 p-3 text-[15px] text-ink focus:border-bord focus:outline focus:outline-2 focus:outline-brass"
      />
      <button
        type="submit"
        className="mt-3 rounded-md bg-bord px-5 py-2.5 text-[13px] font-semibold text-[#f6efe6] transition-colors hover:bg-bord-deep"
      >
        Envoyer
      </button>
    </form>
  );
}

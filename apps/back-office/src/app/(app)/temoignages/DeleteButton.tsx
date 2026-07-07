"use client";

/** Bouton de suppression avec confirmation (dans un <form action={...}>). */
export function DeleteButton() {
  return (
    <button
      type="submit"
      onClick={(e) => {
        if (!confirm("Supprimer définitivement ce témoignage ?")) {
          e.preventDefault();
        }
      }}
      className="rounded-md border border-line px-3 py-1.5 text-[12.5px] text-mut transition-colors hover:border-alert hover:text-alert"
    >
      Supprimer
    </button>
  );
}

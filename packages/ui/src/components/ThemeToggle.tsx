"use client";

import { useEffect, useState } from "react";

const KEY = "duleme-theme";

function apply(theme: "light" | "dark") {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  try {
    localStorage.setItem(KEY, theme);
  } catch {
    /* stockage indisponible : on ignore */
  }
}

/** Bascule clair / sombre. L'état initial est posé par le script anti-flash du layout. */
export function ThemeToggle({ className }: { className?: string }) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  return (
    <button
      type="button"
      aria-label={dark ? "Passer en clair" : "Passer en sombre"}
      aria-pressed={dark}
      onClick={() => {
        const next = !dark;
        setDark(next);
        apply(next ? "dark" : "light");
      }}
      className={
        "flex h-9 w-9 items-center justify-center rounded-full border border-line text-mut transition-colors hover:border-bord hover:text-accent " +
        (className ?? "")
      }
    >
      {dark ? (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
          <circle cx="12" cy="12" r="4.5" />
          <path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M19 5l-1.5 1.5M6.5 17.5L5 19" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
          <path d="M21 12.8A9 9 0 1111.2 3 7 7 0 0021 12.8z" />
        </svg>
      )}
    </button>
  );
}

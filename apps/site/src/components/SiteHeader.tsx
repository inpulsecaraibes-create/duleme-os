/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { ThemeToggle } from "@duleme/ui";

const ESPACE_URL =
  process.env.NEXT_PUBLIC_CLIENT_APP_URL || "https://duleme-client.vercel.app";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-paper/85 backdrop-blur">
      <div className="mx-auto flex max-w-[1160px] items-center justify-between px-7 py-3.5">
        <Link
          href="/"
          aria-label="DULEME AND CIE — accueil"
          className="flex items-center"
        >
          <img src="/logo-duleme.png" alt="DULEME AND CIE" className="h-9 w-auto" />
        </Link>
        <nav className="flex items-center gap-6 text-[13px] text-mut">
          <Link href="/discerner" className="hidden font-medium text-accent hover:text-bord sm:inline">
            DISCERNER
          </Link>
          <Link href="/le-faux-dilemme" className="hidden hover:text-accent sm:inline">
            Le média
          </Link>
          <Link href="/a-propos" className="hidden hover:text-accent sm:inline">
            À propos
          </Link>
          <a
            href={ESPACE_URL}
            className="inline-flex items-center gap-1.5 hover:text-accent"
            title="Accéder à votre espace client"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-3.5 w-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
            >
              <rect x="4" y="11" width="16" height="10" rx="2" />
              <path d="M8 11V8a4 4 0 018 0v3" />
            </svg>
            <span className="hidden sm:inline">Espace client</span>
          </a>
          <Link
            href="/discerner/reserver"
            className="rounded-md bg-bord px-5 py-3 text-sm font-semibold text-paper transition-colors hover:bg-bord-deep"
          >
            Réserver 20 min
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}

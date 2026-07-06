/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { ThemeToggle } from "@duleme/ui";

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
          <Link href="/le-faux-dilemme" className="hidden hover:text-accent sm:inline">
            Le Faux Dilemme™
          </Link>
          <Link href="/#stories" className="hidden hover:text-accent sm:inline">
            Témoignages
          </Link>
          <Link
            href="/#contact"
            className="rounded-md bg-bord px-5 py-3 text-sm font-semibold text-paper transition-colors hover:bg-bord-deep"
          >
            Parlons de votre décision
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}

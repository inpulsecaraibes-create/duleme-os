import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="bg-bord-deep text-[#c9b4a9]">
      <div className="mx-auto flex max-w-[1160px] flex-wrap items-center justify-between gap-3 px-7 py-7 font-sans text-[11.5px]">
        <span>DULEME AND CIE</span>
        <span className="hidden sm:inline">
          Bien diriger est l&apos;art de décider.
        </span>
        <span className="flex gap-4">
          <Link href="/le-faux-dilemme" className="hover:text-paper">
            Le Faux Dilemme™
          </Link>
          <span>Mentions légales · Confidentialité</span>
        </span>
      </div>
    </footer>
  );
}

import Link from "next/link";
import { FooterNewsletter } from "./FooterNewsletter";

const CONTACT_EMAIL = "dulemeandcie@hotmail.com";
const ESPACE_URL =
  process.env.NEXT_PUBLIC_CLIENT_APP_URL || "https://duleme-client.vercel.app";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-bord-deep text-[#c9b4a9]">
      <div className="mx-auto max-w-[1160px] px-7 py-14">
        <div className="grid gap-10 md:grid-cols-[1.15fr_1fr]">
          {/* Marque + coordonnées */}
          <div>
            <p className="font-serif text-2xl font-semibold text-paper">
              DULEME AND CIE
            </p>
            <p className="mt-2 max-w-[40ch] text-[13px] leading-relaxed">
              Cabinet de la décision stratégique.
              <br />
              Bien diriger est l&apos;art de décider.
            </p>

            <div className="mt-6 space-y-2 text-[13.5px]">
              <p className="flex items-center gap-2">
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4 shrink-0 text-brass"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                >
                  <path d="M12 21s-7-5.686-7-11a7 7 0 1114 0c0 5.314-7 11-7 11z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
                Martinique, France
              </p>
              <p className="flex items-center gap-2">
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4 shrink-0 text-brass"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                >
                  <path d="M3 6h18v12H3z" />
                  <path d="M3 7l9 6 9-6" />
                </svg>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="underline-offset-2 transition-colors hover:text-paper hover:underline"
                >
                  {CONTACT_EMAIL}
                </a>
              </p>
            </div>

            {/* Réseaux */}
            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://www.linkedin.com/company/dulemeandcie"
                target="_blank"
                rel="noreferrer"
                aria-label="DULEME AND CIE sur LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-paper/20 text-[#c9b4a9] transition-colors hover:border-brass hover:text-paper"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                  <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM0 8h5v16H0V8zm7.98 0H12.7v2.19h.07c.66-1.25 2.27-2.57 4.68-2.57C22.4 7.62 24 10 24 14.28V24h-5v-8.6c0-2.05-.04-4.69-2.86-4.69-2.86 0-3.3 2.23-3.3 4.54V24h-5V8z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/tefery.d/"
                target="_blank"
                rel="noreferrer"
                aria-label="Téféry sur Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-paper/20 text-[#c9b4a9] transition-colors hover:border-brass hover:text-paper"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
                </svg>
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <p className="font-serif text-lg font-semibold text-paper">
              Le Faux Dilemme, chaque mois.
            </p>
            <p className="mt-1.5 max-w-[42ch] text-[13px] leading-relaxed">
              Un regard sobre sur les décisions qui engagent une entreprise.
              Une publication par mois, jamais de spam.
            </p>
            <FooterNewsletter />
          </div>
        </div>

        {/* Bas de page */}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-paper/10 pt-6 font-sans text-[11.5px]">
          <span>© {year} DULEME AND CIE — Tous droits réservés.</span>
          <span className="flex flex-wrap gap-4">
            <Link href="/le-faux-dilemme" className="transition-colors hover:text-paper">
              Le Faux Dilemme
            </Link>
            <Link href="/a-propos" className="transition-colors hover:text-paper">
              À propos
            </Link>
            <a
              href={ESPACE_URL}
              className="transition-colors hover:text-paper"
            >
              Espace client
            </a>
            <span>Mentions légales · Confidentialité</span>
          </span>
        </div>
      </div>
    </footer>
  );
}

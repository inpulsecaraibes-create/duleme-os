import type { Metadata } from "next";
import { Newsreader, Inter } from "next/font/google";
import "./globals.css";
import { JsonLd } from "@/components/JsonLd";
import { organizationLd, websiteLd, SITE_URL } from "@/lib/structured-data";

const serif = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
  adjustFontFallback: false,
});

const sans = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "DULEME AND CIE — Cabinet de la décision stratégique",
    template: "%s — DULEME AND CIE",
  },
  description:
    "DULEME AND CIE aide les dirigeants à sécuriser les décisions qui engagent durablement leur entreprise. Vous prenez peut-être les bonnes décisions — à partir du mauvais problème.",
  applicationName: "DULEME AND CIE",
  authors: [{ name: "DULEME AND CIE" }],
  keywords: [
    "décision stratégique",
    "dirigeant",
    "PME",
    "gouvernance",
    "arbitrage",
    "Faux Dilemme",
  ],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "DULEME AND CIE",
    url: "/",
    title: "DULEME AND CIE — Cabinet de la décision stratégique",
    description:
      "Nous aidons les dirigeants à sécuriser les décisions qui engagent durablement leur entreprise. Un autre regard, jamais un jugement.",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "DULEME AND CIE — Bien diriger est l'art de décider.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DULEME AND CIE — Cabinet de la décision stratégique",
    description:
      "Vous prenez peut-être les bonnes décisions — à partir du mauvais problème.",
    images: ["/og.jpg"],
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

// Pose le thème avant le premier rendu (évite le flash clair→sombre).
const themeInit = `try{var t=localStorage.getItem('duleme-theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${serif.variable} ${sans.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        <JsonLd data={organizationLd} />
        <JsonLd data={websiteLd} />
      </head>
      <body>{children}</body>
    </html>
  );
}

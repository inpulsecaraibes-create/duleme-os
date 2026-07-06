import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  Badge,
  Button,
  ButtonLink,
  Card,
  Checkbox,
  Container,
  Eyebrow,
  Field,
  Heading,
  Input,
  Stat,
  Textarea,
  ThemeToggle,
} from "@duleme/ui";

export const metadata: Metadata = {
  title: "Design System",
  robots: { index: false, follow: false },
};

const COLORS: { name: string; cls: string }[] = [
  { name: "paper", cls: "bg-paper" },
  { name: "paper2", cls: "bg-paper2" },
  { name: "card", cls: "bg-card" },
  { name: "ink", cls: "bg-ink" },
  { name: "mut", cls: "bg-mut" },
  { name: "line", cls: "bg-line" },
  { name: "bord", cls: "bg-bord" },
  { name: "bord-deep", cls: "bg-bord-deep" },
  { name: "brass", cls: "bg-brass" },
  { name: "accent", cls: "bg-accent" },
  { name: "ok", cls: "bg-ok" },
  { name: "warn", cls: "bg-warn" },
  { name: "alert", cls: "bg-alert" },
];

const RADII = [
  { name: "sm · 6px", cls: "rounded-sm" },
  { name: "DEFAULT · 10px", cls: "rounded" },
  { name: "lg · 16px", cls: "rounded-lg" },
];

const SHADOWS = [
  { name: "shadow-soft", cls: "shadow-soft" },
  { name: "shadow-card", cls: "shadow-card" },
  { name: "shadow-lift", cls: "shadow-lift" },
];

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-t border-line py-12">
      <Eyebrow>{title}</Eyebrow>
      <div className="mt-6">{children}</div>
    </section>
  );
}

export default function DesignSystemPage() {
  return (
    <main className="min-h-screen bg-paper text-ink">
      <header className="sticky top-0 z-30 border-b border-line bg-paper/85 backdrop-blur">
        <Container>
          <div className="flex items-center justify-between py-3.5">
            <div>
              <Eyebrow>Design System DULEME</Eyebrow>
              <p className="mt-1 font-serif text-lg font-semibold">
                Palette « Pierre &amp; Bordeaux »
              </p>
            </div>
            <div className="flex items-center gap-4">
              <a href="/" className="text-[13px] text-mut hover:text-accent">
                ← Accueil
              </a>
              <ThemeToggle />
            </div>
          </div>
        </Container>
      </header>

      <Container>
        {/* COULEURS */}
        <Block title="Couleurs">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-6">
            {COLORS.map((c) => (
              <div key={c.name}>
                <div
                  className={`h-16 w-full rounded border border-line ${c.cls}`}
                />
                <div className="mt-2 font-mono text-[11px] text-mut">
                  {c.name}
                </div>
              </div>
            ))}
          </div>
        </Block>

        {/* TYPOGRAPHIE */}
        <Block title="Typographie">
          <div className="space-y-3">
            <Heading level={1} size="xl">
              Bien diriger est l&apos;art de décider.
            </Heading>
            <Heading size="lg">Titre de section — serif éditorial</Heading>
            <Heading level={3} size="sm">
              Sous-titre
            </Heading>
            <p className="max-w-prose text-[17px] text-mut">
              Corps de texte en sans (Inter). Lecture confortable, autour de 66
              caractères par ligne. Le serif (Newsreader) porte la voix ; le sans
              porte la structure.
            </p>
            <Eyebrow>Sur-titre · capitale espacée</Eyebrow>
          </div>
        </Block>

        {/* RAYONS & OMBRES */}
        <Block title="Rayons & ombres">
          <div className="flex flex-wrap gap-8">
            {RADII.map((r) => (
              <div key={r.name} className="text-center">
                <div
                  className={`h-20 w-28 border border-line bg-card ${r.cls}`}
                />
                <div className="mt-2 font-mono text-[11px] text-mut">
                  {r.name}
                </div>
              </div>
            ))}
            {SHADOWS.map((s) => (
              <div key={s.name} className="text-center">
                <div
                  className={`h-20 w-28 rounded-lg bg-card ${s.cls}`}
                />
                <div className="mt-2 font-mono text-[11px] text-mut">
                  {s.name}
                </div>
              </div>
            ))}
          </div>
        </Block>

        {/* BOUTONS */}
        <Block title="Boutons">
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="primary">Confier ma situation →</Button>
            <ButtonLink href="#" variant="line">
              En savoir plus
            </ButtonLink>
            <ButtonLink href="#" variant="ghost">
              Lire leurs histoires →
            </ButtonLink>
            <Button variant="primary" size="sm">
              Petit
            </Button>
            <Button variant="primary" disabled>
              Désactivé
            </Button>
          </div>
        </Block>

        {/* CHAMPS */}
        <Block title="Champs de formulaire">
          <div className="grid max-w-2xl gap-5">
            <Field label="Nom" htmlFor="ds-nom">
              <Input id="ds-nom" placeholder="Votre nom" />
            </Field>
            <Field
              label="Parlez-moi de la décision qui vous préoccupe."
              htmlFor="ds-msg"
              serif
            >
              <Textarea id="ds-msg" placeholder="Écrivez librement…" />
            </Field>
            <Checkbox label="Je souhaite être rappelé·e." />
          </div>
        </Block>

        {/* BADGES */}
        <Block title="Badges & statuts">
          <div className="flex flex-wrap gap-3">
            <Badge tone="accent" dot>
              En cours
            </Badge>
            <Badge tone="ok" dot>
              Validé
            </Badge>
            <Badge tone="warn" dot>
              En attente
            </Badge>
            <Badge tone="alert" dot>
              Action requise
            </Badge>
            <Badge tone="neutral">Info</Badge>
          </div>
        </Block>

        {/* CARTES & STATS */}
        <Block title="Cartes & chiffres">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <Heading level={3} size="sm" className="text-accent">
                Une carte premium
              </Heading>
              <p className="mt-2 text-sm text-mut">
                Fond « card », bordure « line », ombre douce. Le conteneur de base
                pour regrouper une information.
              </p>
            </Card>
            <div className="grid grid-cols-2 gap-6">
              <Stat value="1 000+" label="entrepreneurs accompagnés" />
              <Stat value="10 ans" label="d'expérience" />
            </div>
          </div>
        </Block>

        {/* ACCESSIBILITÉ */}
        <Block title="Accessibilité">
          <ul className="max-w-prose list-disc space-y-2 pl-5 text-[14px] text-mut">
            <li>Focus visible (contour laiton) sur tout élément interactif.</li>
            <li>Contraste AA visé en clair comme en sombre.</li>
            <li>Navigation clavier, rôles ARIA et libellés sur les champs.</li>
            <li>Animations respectueuses de « prefers-reduced-motion ».</li>
          </ul>
        </Block>

        <div className="py-16" />
      </Container>
    </main>
  );
}

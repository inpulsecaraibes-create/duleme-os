# Journal des décisions — DULEME OS

Format ADR léger. Une décision = contexte + choix + justification + statut.

## ADR-001 — Monorepo (pnpm + Turborepo)
Un seul dépôt pour les apps + packages partagés (Design System, domaine). Cohérence,
source de vérité unique, déploiements indépendants. Alternatives : multi-repos (écartées : duplication). **Adopté.**

## ADR-002 — Next.js (App Router)
SSR/SSG pour le SEO + GEO du site, écosystème mûr, TypeScript natif, portable (dockerisable, host-agnostic).
Versions retenues pour la stabilité : **Next 14 + React 18 + Tailwind 3**. **Adopté.**

## ADR-003 — Trois applications (Site / Back Office / Espace Client)
Publics et exigences de sécurité différents ; isolation des périmètres. Le Site public est développé en premier
(objectif : notoriété + rendez-vous). Back Office ensuite. **Adopté.**

## ADR-004 — PostgreSQL
Standard, robuste, relationnel, exportable, non verrouillant. **Adopté** (mise en œuvre au sprint données).

## ADR-005 — Supabase (région EU)
Postgres managé EU (RGPD) + Auth + Storage, open-source et auto-hébergeable. Isolé derrière `packages/auth`. **Adopté** (à activer au sprint données).

## ADR-006 — Drizzle (ORM)
Migrations en SQL brut, schéma TypeScript, aucun DSL ni moteur propriétaire → indépendance et exportabilité maximales.
Alternative Prisma (maturité) écartée sur le principe d'indépendance. Réversible. **Adopté** (mise en œuvre au sprint données).

## ADR-007 — Tailwind CSS + Design System possédé
Rapidité, cohérence par tokens (`@duleme/config`), composants possédés (pas de dépendance verrouillée), accessibilité. **Adopté.**

## ADR-008 — Fireflies.ai (transcription)
Outil officiel de transcription/compte rendu (invité aux Meet). Connecteur dédié, dégradable ; aucune synchronisation sans validation humaine. **Adopté** (sprint connecteurs).

## ADR-009 — Abstraction IA (OpenAI | Anthropic)
Aucune dépendance à un fournisseur unique ; interface commune, fournisseur par défaut paramétrable. GEO = optimisation pour toutes les IA conversationnelles. **Adopté** (sprint assistant).

## ADR-010 — Hébergement cible : Coolify (VPS EU), alternative Clever Cloud
Indépendance + RGPD + coût. Vercel écarté comme destination (société US). Développement host-agnostic. Décision finale au 1er déploiement. **En cours.**

## ADR-011 — Gestion des secrets
Jamais dans le code ni la doc. `.env.local` (gitignored) + secrets de l'hébergeur. Le développement n'utilise que des noms de variables. **Adopté.**

## ADR-012 — Objet unique « Tâche »
Fusion Action/Tâche → un seul objet « Tâche ». **Adopté.**

## ADR-013 — Identité visuelle : Palette « Pierre & Bordeaux »
Ancrée sur l'emblème bordeaux officiel. Pierre chaude + bordeaux + laiton. Le terracotta est écarté comme couleur identitaire.
Typographies : serif éditorial (Newsreader) + sans (Inter) — à confirmer dans le Design System complet. **Adopté.**

## ADR-014 — Squelette d'analyse : les 4 Piliers DULEME™
Le raisonnement présenté (site, Dossier) suit : Symptôme → Hypothèse™ → Faux Dilemme™ → Vrai Problème™ → Arbitrage.
Simplicité assumée (4 Piliers + Lois DULEME™), pas de multiplication de concepts. **Adopté.**

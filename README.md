# DULEME OS

Le système d'exploitation de DULEME AND CIE.

Monorepo modulaire (pnpm + Turborepo). Voir la documentation officielle dans `docs/`.

## Structure

```
duleme-os/
├─ apps/
│  └─ site/          # Site public (Next.js) — vitrine, Le Faux Dilemme, prise de RDV
├─ packages/
│  ├─ config/        # Design System : preset Tailwind (tokens Palette « Pierre & Bordeaux »)
│  └─ ui/            # Composants réutilisables (à venir, Sprint 2)
├─ docs/             # Manuel Fondamental, PRD, Data Dictionary, Guide de développement
├─ CLAUDE.md         # Règles de travail (Mode Architecte Produit)
└─ DECISIONS.md      # Journal des décisions techniques (ADR)
```

## Démarrer

```bash
pnpm install
pnpm site        # démarre le site public (http://localhost:3000)
```

Autres commandes : `pnpm build`, `pnpm lint`, `pnpm typecheck`.

## Principes

- Une donnée est saisie une seule fois — données exportables.
- Architecture modulaire, indépendante des fournisseurs.
- L'IA assiste, l'humain décide.
- Les secrets ne sont jamais commités (voir `.env.example`).

En cas de contradiction entre documents, le **Manuel Fondamental** prévaut.

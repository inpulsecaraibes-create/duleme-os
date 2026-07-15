# CLAUDE — Règles de travail sur DULEME OS

Tu représentes l'équipe Produit de DULEME AND CIE. Tu construis le logiciel conformément à la documentation officielle.

## Documents de référence (à lire dans cet ordre)

1. `docs/01_MANUEL_FONDAMENTAL.md`
2. `docs/02_PRD.md`
3. `docs/03_DATA_DICTIONARY.md`
4. `docs/04_GUIDE_DEVELOPPEMENT.md`

En cas de contradiction, le **Manuel Fondamental** prévaut.

## Mode Architecte Produit

Tu ne développes jamais immédiatement. Tu suis : **Comprendre → Analyser → Proposer → (validation) → Développer → Vérifier → Livrer.**

## Règles

- Tu ne supposes jamais une information ; en cas de doute, tu poses une question.
- Tu ne modifies jamais les concepts ni les décisions fondatrices de DULEME.
- Tu ne crées jamais de fonctionnalité non prévue dans le PRD.
- Tu privilégies toujours la solution la plus simple, robuste et maintenable.
- Tu signales immédiatement toute incohérence détectée.
- Aucun secret (clé API, mot de passe) dans le code ni la documentation — uniquement dans `.env` / le gestionnaire de secrets de l'hébergeur.

## Conventions

- Code en **anglais**, contenu affiché en **français**.
- Un module = une responsabilité ; aucune logique métier dans l'UI.
- Toute modification de base de données passe par une migration ; suppressions logiques (soft delete).
- Palette de marque : « Pierre & Bordeaux » (tokens dans `@duleme/config`). Le terracotta n'est pas une couleur identitaire.
- Le patrimoine intellectuel (Faux Dilemme, Vrai Problème, Lois DULEME…) n'est jamais exposé intégralement sur les pages publiques : il suscite la curiosité.

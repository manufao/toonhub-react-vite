# Emmanuel Maravilha — carrousel de figurines

Page d'accueil en carrousel de figurines, construite avec React, TypeScript, Vite, Tailwind CSS et lucide-react.

## Lancer en local

```bash
pnpm install
pnpm dev
```

## Build de production

```bash
pnpm build
pnpm preview
```

Les images des figurines sont dans `src/assets/img/` (WebP). Une connexion internet est nécessaire pour charger les Google Fonts.

## Qualité

```bash
pnpm format:check   # Prettier
pnpm lint           # ESLint
pnpm lint:deps      # dependency-cruiser
pnpm test:types     # TypeScript
pnpm security:audit # vulnérabilités des dépendances
```

ESLint vérifie la structure du projet : sens des dépendances (`components` → `hooks` → `lib`/`data`), imports internes sans passer par le barrel, nommage des fichiers, 150 lignes maximum, pas de style inline, classes Tailwind valides et non construites dynamiquement. dependency-cruiser analyse le graphe complet : cycles, fichiers orphelins, paquets non déclarés ou introuvables, dépendances de dev importées par le code de production.

Hooks Git (husky, installés par `pnpm install`) :

- `pre-commit` : Gitleaks sur les fichiers indexés (si installé : `brew install gitleaks`), puis Prettier et ESLint sur ces fichiers (lint-staged)
- `commit-msg` : format Conventional Commits (commitlint)
- `pre-push` : `test:types`, `lint` et `lint:deps`

La CI GitHub (`.github/workflows/`) relance ces vérifications et le build à chaque pull request. Un second workflow lance les scans de sécurité (Gitleaks, pnpm audit, Semgrep, OWASP ZAP) à chaque pull request et chaque semaine.

## TypeScript 6

TypeScript est volontairement fixé en 6.x : typescript-eslint ne prend pas encore en charge TypeScript 7, qui n'expose plus d'API JavaScript. Repasser en TypeScript 7 quand ces tickets seront résolus :

- [typescript-eslint#10940](https://github.com/typescript-eslint/typescript-eslint/issues/10940) — utiliser TS 7 (tsgo) pour l'analyse de types
- [eslint#21070](https://github.com/eslint/eslint/issues/21070) — passage d'ESLint à TypeScript 7

Vérification rapide : `npm view @typescript-eslint/parser peerDependencies.typescript` doit accepter la version 7.

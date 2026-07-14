# AGENTS.md — mx-template-dapp

Guidance for AI agents (and humans) working with code in this repository.

## Overview

The **MultiversX dApp Template**: a React 18 + TypeScript + Vite reference app demonstrating `@multiversx/sdk-dapp` v5 — wallet authentication, transaction signing, batch transactions, and native auth. It doubles as the canonical example that other dApps are scaffolded from, so code here is meant to be copied and adapted.

This directory may live inside the `sdk-dapp-workspace` monorepo (`../../packages`), in which case local versions of the SDK packages may be linked during development.

## Commands

Package manager is **pnpm** (there is a `pnpm-lock.yaml`; do not use npm/yarn).

```bash
pnpm install

# Dev server (HTTPS on :3000). The network is selected by copying a config file — see Network configuration.
pnpm start-devnet          # also: start-testnet, start-mainnet

# Production build to ./build
pnpm build-devnet          # also: build-testnet, build-mainnet  (runs tsc, copies config, vite build)

pnpm lint                  # eslint --fix over src

# Unit tests (Jest + SWC, jsdom)
pnpm test
pnpm test -- path/to/File.test.tsx        # single file
pnpm test -- -t "test name substring"      # single test by name

# E2E tests (Playwright — auto-starts the devnet dev server via webServer)
pnpm run-playwright-test
pnpm run-playwright-test-ui                 # interactive UI mode
```

Note: `jest.config.js` sets `bail: 1`, so the unit suite stops at the first failure.

## Network configuration (important, non-obvious)

There is **no `.env`**. The active network is chosen at build/dev time by physically copying one of `src/config/config.{devnet,testnet,mainnet}.ts` over `src/config/index.ts`. This is what the `copy-*-config` scripts do, and every `start-*`/`build-*` script runs one first.

- `src/config/index.ts` is a **generated file** — edits to it are overwritten on the next `start-*`/`build-*`. Change the per-network `config.<env>.ts` files instead.
- `src/config/sharedConfig.ts` holds values common to all networks (contract addresses for batch tx demos, `walletConnectV2ProjectId`, `transactionSize`, etc.).
- App entry `src/index.tsx` calls `initApp(config)` (from `src/initConfig.ts`) **before** rendering `<App />`. `initConfig.ts` configures the dApp: nativeAuth, theme, providers (including the custom `InMemoryProvider`), and imports `environment` from the active `config` — so the copy mechanism is the single source of truth for the network.

## Architecture

- **`src/lib/`** — the key indirection. Rather than importing from `@multiversx/sdk-*` directly, app code imports everything through `lib` (`sdkCore`, `sdkDapp`, `sdkDappUI`, `sdkDappUtils`). Each re-export module (e.g. `sdkDapp.hooks.ts`, `sdkDapp.helpers.ts`, `sdkDapp.types.ts`) curates the SDK's deep `out/...` paths into a flat surface. **When you need an SDK hook/helper/type, add it to the relevant `lib/sdkDapp/*.ts` re-export and import from `lib`** — keep the deep `@multiversx/sdk-dapp/out/...` paths confined to `src/lib`.
- **Routing** — `src/routes/routes.ts` is a declarative array (path, title, component, optional `authenticatedRoute`, nested `children`). `App.tsx` maps it into React Router. `wrappers/AuthRedirectWrapper` reads the same array via `matchPath` to redirect based on `useGetIsLoggedIn()`.
- **`src/wrappers/`** — app-wide context providers composed in `App.tsx`: `AxiosInterceptors` (network auth), `BatchTransactionsContextProvider`, `AuthRedirectWrapper`.
- **`src/provider/inMemoryProvider.ts`** — a custom login provider registered on `window.multiversx.providers` in `initConfig.ts`; used for testing/demo signing without an external wallet.
- **`src/pages/`** — top-level screens (`Home`, `Dashboard`, `Unlock`, `Disclaimer`, `PageNotFound`). Dashboard hosts the feature `widgets/` (NativeAuth, BatchTransactions, Transactions) and demo `contracts/` interactions (ping-pong).
- **Path aliases** — `baseUrl: src` (tsconfig), resolved at build by `vite-tsconfig-paths` and by Jest's `modulePaths`. Import as `lib`, `config`, `pages/...`, etc., not relative `../../`.

## Styling / theming

Tailwind CSS v4 (via `@tailwindcss/vite` + PostCSS). Themes are driven by CSS variables and a `data-mvx-theme` attribute. Three built-in themes (`mvx:dark-theme`, `mvx:vibe-theme`, `mvx:light-theme`). Adding a theme touches several files — see the "Configure Theme" walkthrough in `README.md` (`tailwind.css`, `useHandleThemeManagement.ts`, `ThemeTooltip.tsx`, `HomeHero.tsx`, `initConfig.ts`).

## Testing

- **Unit** (`*.test.ts(x)` / `*.spec.ts(x)` under `src/**`): Jest, transformed by `@swc/jest`, jsdom env, setup in `src/setupTests.ts`. CSS imports are stubbed via `identity-obj-proxy`.
- **E2E** (`tests/**/*.spec.ts`): Playwright. `webServer` auto-runs `pnpm run start-devnet` against `https://localhost:3000` with `ignoreHTTPSErrors`. Tests cover connect-wallet flows (memory provider, MetaMask snap, web wallet) and transaction cancel flows; `tests/support/` holds MetaMask automation and fs/template helpers.

## Passkey / WebAuthn local dev

WebAuthn refuses to run under TLS errors, so passkey work requires real (mkcert) certs served over `https://localhost.multiversx.com` (add to `/etc/hosts`) and adjusting `vite.config.ts` to port 443 with the cert files. Full steps are in `README.md` → "Passkey Testing Setup". The default `vite.config.ts` uses `@vitejs/plugin-basic-ssl` (self-signed), which is fine for everything except passkeys.

## Conventions

ESLint enforces sorted imports (`import/order`), sorted named exports (`sort-exports`), Prettier formatting, and `react-hooks` rules. Run `pnpm lint` before finishing changes. See `MIGRATION_GUIDE.md` for SDK version-upgrade notes.

## Verification

To prove a change works, run in order:

```bash
pnpm lint                # must pass (also autofixes)
pnpm test                # Jest unit suite (bails on first failure)
pnpm build-devnet        # type-check + production build
```

For login/transaction-flow changes, also run the Playwright suite (`pnpm run-playwright-test`) or start `pnpm start-devnet` and exercise the flow at `https://localhost:3000` (the In Memory Provider allows login without an external wallet). After `build-testnet`/`build-mainnet` runs, regenerate the committed devnet default with `pnpm copy-devnet-config` so `src/config/index.ts` shows no diff.

## Other templates

The same template dApp exists for other frameworks — useful when a task actually targets a different stack:

| Template | Stack | Repository |
| --- | --- | --- |
| React (TypeScript) **← this repo** | React 18 · TypeScript · Vite | [mx-template-dapp](https://github.com/multiversx/mx-template-dapp) |
| React (JavaScript) | React 19 · JSX · Vite | [mx-template-dapp-reactjs](https://github.com/multiversx/mx-template-dapp-reactjs) |
| Next.js | Next.js 16 (App Router) · TypeScript | [mx-template-dapp-nextjs](https://github.com/multiversx/mx-template-dapp-nextjs) |
| SolidJS | SolidJS · TypeScript · Vite | [mx-template-dapp-solidjs](https://github.com/multiversx/mx-template-dapp-solidjs) |
| Vue | Vue 3 · TypeScript · Vite | [mx-template-dapp-vue](https://github.com/multiversx/mx-template-dapp-vue) |
| Angular | Angular 20 · TypeScript | [mx-template-dapp-angular](https://github.com/multiversx/mx-template-dapp-angular) |
| React Native | React Native | [mx-template-dapp-react-native](https://github.com/multiversx/mx-template-dapp-react-native) |

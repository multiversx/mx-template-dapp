# MultiversX Template dApp (React + TypeScript)

[![E2E tests](https://github.com/multiversx/mx-template-dapp/actions/workflows/playwright.yml/badge.svg)](https://github.com/multiversx/mx-template-dapp/actions/workflows/playwright.yml)

The **MultiversX dApp Template**, built with [React](https://react.dev/) 18, [TypeScript](https://www.typescriptlang.org/) and [Vite](https://vitejs.dev/). It is the canonical reference implementation of [@multiversx/sdk-dapp](https://www.npmjs.com/package/@multiversx/sdk-dapp), demonstrating:

- wallet authentication (browser extension, xPortal / WalletConnect, web wallet, Ledger, passkeys, and a custom in-memory provider)
- transaction signing, sending, and tracking (single + batch transactions)
- message signing and native auth
- smart-contract interaction (a Ping-Pong contract)

See [Template dApp](https://template-dapp.multiversx.com/) for a live demo.

> **Looking for another framework?** The same dApp exists for Next.js, Vue, Angular, SolidJS, plain-JavaScript React, and React Native — see [Other templates](#other-templates).

## Requirements

- Node.js 20+
- pnpm 10+ (the repo ships a `pnpm-lock.yaml` — use pnpm, not npm or yarn)

## Getting started

### 1. Install dependencies

```bash
pnpm install
```

### 2. Start the dev server on the desired network

```bash
pnpm start-devnet     # or start-testnet / start-mainnet
```

Open [https://localhost:3000](https://localhost:3000) (note **https** — the dev server uses a self-signed certificate, because wallet providers only work on secure origins; accept the browser warning).

The page reloads on edits, and lint errors show in the console.

### 3. Build for production

```bash
pnpm build-devnet     # or build-testnet / build-mainnet
```

The output goes to the `build/` folder, ready to deploy to any static host.

## Available scripts

| Script | Description |
| --- | --- |
| `pnpm start-devnet` / `start-testnet` / `start-mainnet` | Copy the network config, then run the Vite dev server on `https://localhost:3000` |
| `pnpm build-devnet` / `build-testnet` / `build-mainnet` | Type-check, copy the network config, and build to `build/` |
| `pnpm copy-devnet-config` (also `testnet` / `mainnet`) | Copy `src/config/config.<network>.ts` over `src/config/index.ts` |
| `pnpm test` | Run the Jest unit tests |
| `pnpm run-playwright-test` | Run the Playwright E2E suite (auto-starts the devnet dev server) |
| `pnpm run-playwright-test-ui` | Playwright in interactive UI mode |
| `pnpm lint` | ESLint with `--fix` over `src` |

## Network configuration

There is **no `.env` file**. The active network (devnet / testnet / mainnet) is selected at dev/build time by copying one of the per-network config files over the generated index:

- `src/config/config.devnet.ts`, `config.testnet.ts`, `config.mainnet.ts` — per-network values (API URL, contract address, `environment`)
- `src/config/sharedConfig.ts` — values common to all networks (WalletConnect project ID, batch-transaction contracts, etc.)
- `src/config/index.ts` — **generated** by the `copy-*-config` scripts; never edit it by hand, it is overwritten on every `start-*` / `build-*`

The `environment` exported by the active config is passed to sdk-dapp's `initApp` in `src/initConfig.ts`, so the copy mechanism is the single source of truth for the network.

## Project structure

```
src/
├── assets/          # images, icons
├── components/      # shared presentational components
├── config/          # per-network configs (see Network configuration)
├── contracts/       # Ping-Pong contract ABI + query/transaction helpers
├── helpers/         # generic utilities
├── hooks/           # shared React hooks
├── lib/             # SDK re-export layer — the only place with deep @multiversx/* imports
├── localConstants/  # route names, misc constants
├── pages/           # Home, Dashboard (feature widgets), Unlock, Disclaimer, PageNotFound
├── provider/        # custom InMemoryProvider (login without an external wallet)
├── routes/          # declarative route array consumed by App.tsx
├── styles/          # Tailwind v4 styles + theme CSS variables
├── types/           # shared TypeScript types
├── wrappers/        # app-wide providers (AxiosInterceptors, BatchTransactions, AuthRedirect)
├── initConfig.ts    # the InitAppType config passed to sdk-dapp's initApp
└── index.tsx        # entry: awaits initApp(config), then renders <App />
```

## How sdk-dapp is used

1. **Bootstrap** — `src/index.tsx` calls `initApp(config)` (config in `src/initConfig.ts`: environment, native auth, theme, custom providers) and renders the app only after it resolves.
2. **SDK import layer** — app code never imports `@multiversx/sdk-*` deep paths directly; everything is funneled through `src/lib/` (`sdkCore`, `sdkDapp`, `sdkDappUI`, `sdkDappUtils`). Add new SDK symbols to the matching `lib` re-export and import from `lib`.
3. **Login** — the Unlock page opens sdk-dapp's `UnlockPanelManager`, which lists all available providers (including the custom `InMemoryProvider` registered in `initConfig.ts`).
4. **Transactions** — widgets build `Transaction` objects with sdk-core, sign via `getAccountProvider().signTransactions()`, then send and track them through `TransactionManager` (toast notifications included). See the Dashboard `widgets/` for canonical examples.
5. **State** — account, network, and transaction-session data come from sdk-dapp's store via React hooks (`useGetAccount`, `useGetNetworkConfig`, `useGetIsLoggedIn`, ...).

## Testing

- **Unit tests** — Jest (`@swc/jest`, jsdom): `pnpm test`. Run a single file with `pnpm test -- path/to/File.test.tsx` or filter by name with `pnpm test -- -t "name"`.
- **E2E tests** — Playwright specs in `tests/` covering connect-wallet flows (memory provider, MetaMask snap, web wallet) and transaction cancel flows: `pnpm run-playwright-test`. The runner auto-starts the devnet dev server.

## Passkey Testing Setup (CRITICAL for Passkey Development)

### Step 1: System Configuration

**MUST configure hosts file for passkey functionality:**

```bash
# Add to /etc/hosts (macOS/Linux) or C:\Windows\System32\drivers\etc\hosts (Windows):
127.0.0.1    localhost.multiversx.com

# Edit hosts file:
# macOS/Linux:
sudo nano /etc/hosts

# Windows (run as Administrator):
notepad C:\Windows\System32\drivers\etc\hosts
```

### Step 2: Generate Locally-Trusted SSL Certificates

**CRITICAL: WebAuthn requires valid HTTPS certificates to prevent TLS certificate errors:**

```bash
# Install mkcert (if not already installed)
brew install mkcert

# Install the local CA in your system trust store
mkcert -install

# Generate certificates for localhost.multiversx.com
mkcert localhost.multiversx.com localhost 127.0.0.1 ::1
```

This creates two files in `certificates` folder:

- `localhost.multiversx.com+3.pem` (certificate)
- `localhost.multiversx.com+3-key.pem` (private key)

### Step 3: Configure vite.config.ts with SSL Certificates

**Update vite.config.ts to use port 443:**

```typescript
import fs from 'fs';
// import basicSsl from '@vitejs/plugin-basic-ssl'; // Remove this - use mkcert certificates instead

const https = {
  key: fs.readFileSync('./certificates/localhost.multiversx.com-key.pem'),
  cert: fs.readFileSync('./certificates/localhost.multiversx.com.pem')
};

export default defineConfig({
  server: {
    port: Number(process.env.PORT) || 443,
    strictPort: true,
    https,
    host: true
  }
});
```

### Step 4: Browser Setup for Passkeys (Optional)

**With proper certificates, you can use regular Chrome. For additional debugging, use Chrome with security flags:**

```bash
# Close all Chrome instances first, then run:
open -a Google\ Chrome --args --ignore-certificate-errors --ignore-urlfetcher-cert-requests --disable-web-security --user-data-dir=/tmp/chrome_dev_passkey
```

**⚠️ Important:** Always close these Chrome instances after testing.

### Step 5: Start the Development Server

```bash
pnpm start-devnet --force
```

**Test URLs:**

- **Template dApp**: https://localhost.multiversx.com

### Troubleshooting WebAuthn TLS Errors

If you encounter `NotAllowedError: WebAuthn is not supported on sites with TLS certificate errors`, ensure:

1. ✅ mkcert is installed and CA is trusted (`mkcert -install`)
2. ✅ Certificates are generated for localhost.multiversx.com
3. ✅ vite.config.ts uses the certificate files
4. ✅ Browser shows a valid HTTPS lock icon
5. ✅ No mixed content warnings in DevTools

## Configure Theme (Optional)

This template comes with three built-in themes:

- TealLab (mvx:dark-theme)
- VibeMode (mvx:vibe-theme)
- BrightLight (mvx:light-theme)

But you can customize the appearance of your project by defining your own theme using CSS variables.
Follow these steps to set it up.

### Step 1. Update `tailwind.css` file

This is the main place where you customize your theme. You add your project specific colors and update
CSS variables that style your elements, according to your theme.

Define your color palette in the `:root` section:

```css
:root {
  --mvx-custom-primary-color: #your-color;
  --mvx-custom-secondary-color: #your-color;
}
```

Next, configure your theme-specific variables:

```css
:root[data-mvx-theme='mvx:your-theme'],
[data-mvx-theme='mvx:your-theme'] {
  --mvx-bg-color-primary: var(--mvx-custom-primary-color);
  --mvx-bg-color-secondary: var(--mvx-custom-secondary-color);
}
```

### Step 2. Add your theme in `useHandleThemeManagement.ts` hook

This hook registers and manages all available themes in your project.
It maintains a list of all theme options, tracks the currently active theme and
provides a `handleThemeSwitch` function that updates the `data-mvx-theme` attribute.

```typescript
const allThemeOptions: ThemeOptionType[] =
[
    { identifier: 'mvx:dark-theme', label: 'TealLab' },
    { identifier: 'mvx:vibe-theme', label: 'VibeMode' },
    { identifier: 'mvx:light-theme', label: 'BrightLight' },

    { identifier: 'mvx:your-theme', label: 'Your Theme Label' }
];
```

### Step 3. Add colors for your theme tooltip in `ThemeTooltip.tsx`

This allows you to see the theme options available in the project. They are listed in a tooltip
dropdown in header with visual color previews for each theme.

```typescript
const themeDotColors: Record<string, string[]> =
{
  'mvx:dark-theme': ['#23F7DD', '#262626', '#B6B3AF', '#FFFFFF'],
  'mvx:vibe-theme': ['#471150', '#5A2A62', '#D200FA', '#FFFFFF'],
  'mvx:light-theme': ['#000000', '#A5A5A5', '#E2DEDC', '#F3EFED'],

  'mvx:your-theme': ['#color1', '#color2', '#color3', '#color4']
};
```

### Step 4. Add theme properties for hero section in `HomeHero.tsx`

Add your icon in `assets` folder and import it as:

```typescript
import { ReactComponent as YourThemeIcon } from 'assets/icons/your-theme-icon.svg';
```

Add a background image for your theme in `public` folder and reference it in `tailwind.css`:

```css
@theme {
  --background-image-your-theme: url('/your-theme-bg.png');
}
```

And then update `themeExtraProperties` object with your values. These properties are used for
customizing your hero section from home page. It adds background image and icon + title for the
theme switch section in hero.

```typescript
const themeExtraProperties: Record<
  string,
  Omit<HomeThemeOptionType, keyof ThemeOptionType>
> = {
  // existing themes
  'mvx:your-theme': {
    icon: YourThemeIcon,
    title: 'Your Title',
    backgroundClass: 'bg-your-theme'
  }
};
```

### Step 5. Set your theme as default in `initConfig.ts`

```typescript
dAppConfig: {
    theme: 'mvx:your-theme',
  }
```

Now the project will start with your configured theme.
All variables will have the colors you have set. If you don't set custom colors, the default ones will apply.
You can see the current theme in `data-mvx-theme` attribute in browser inspector.

## Other templates

The same template dApp is implemented across several frameworks. If another stack suits your project better, start from one of these instead:

| Template | Stack | Repository |
| --- | --- | --- |
| React (TypeScript) **← this repo** | React 18 · TypeScript · Vite | [mx-template-dapp](https://github.com/multiversx/mx-template-dapp) |
| React (JavaScript) | React 19 · JSX · Vite | [mx-template-dapp-reactjs](https://github.com/multiversx/mx-template-dapp-reactjs) |
| Next.js | Next.js 16 (App Router) · TypeScript | [mx-template-dapp-nextjs](https://github.com/multiversx/mx-template-dapp-nextjs) |
| SolidJS | SolidJS · TypeScript · Vite | [mx-template-dapp-solidjs](https://github.com/multiversx/mx-template-dapp-solidjs) |
| Vue | Vue 3 · TypeScript · Vite | [mx-template-dapp-vue](https://github.com/multiversx/mx-template-dapp-vue) |
| Angular | Angular 20 · TypeScript | [mx-template-dapp-angular](https://github.com/multiversx/mx-template-dapp-angular) |
| React Native | React Native | [mx-template-dapp-react-native](https://github.com/multiversx/mx-template-dapp-react-native) |

## Links

- [@multiversx/sdk-dapp on GitHub](https://github.com/multiversx/mx-sdk-dapp) · [on npm](https://www.npmjs.com/package/@multiversx/sdk-dapp)
- [MultiversX developer docs](https://docs.multiversx.com/)
- [Migration guide (sdk-dapp 4.x → 5.x)](./MIGRATION_GUIDE.md)

## Roadmap

See the [open issues](https://github.com/multiversx/mx-template-dapp/issues) for a list of proposed features (and known issues).

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

One can contribute by creating _pull requests_, or by opening _issues_ for discovered bugs or desired features.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

# @multiversx/template-dapp

This project was bootstrapped with [Vite](https://vitejs.dev/guide/).

The **MultiversX dApp Template**, built using [React.js](https://reactjs.org/) and [Typescript](https://www.typescriptlang.org/).
It's a basic implementation of [@multiversx/sdk-dapp](https://www.npmjs.com/package/@multiversx/sdk-dapp), providing the basics for MultiversX authentication and TX signing.

See [Dapp template](https://template-dapp.multiversx.com/) for live demo.

### Tests

[![E2E tests](https://github.com/multiversx/mx-template-dapp/actions/workflows/playwright.yml/badge.svg)](https://github.com/multiversx/mx-template-dapp/actions/workflows/playwright.yml)

## Requirements

- Node.js version 16.20.0+
- pnpm version 8.19.4+

## Getting Started

### Step 1. Install modules

From a terminal, navigate to the project folder and run:

```bash
pnpm install
```

### Step 2. Running in development mode

In the project folder run:

```bash
pnpm start-devnet
pnpm start-testnet
pnpm start-mainnet
```

This will start the React app in development mode, using the configs found in the `vite.config.ts` file.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

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

## Available Scripts

In the project directory, you can run:

### `pnpm start` / `pnpm start-devnet`

Runs the app in the development mode.
**For passkey testing**: Run with `pnpm start` and open [https://localhost.multiversx.com](https://localhost.multiversx.com) to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

### `pnpm test`

Launches the test runner in the interactive watch mode.
See the section about [running tests](https://vitejs.dev/guide/static-deploy.html#testing-the-app-locally) for more information.

### `pnpm build` / `pnpm build-devnet`

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

See the section about [deployment](https://vitejs.dev/guide/static-deploy.html#building-the-app) for more information.

### Build for testing and production use

A build of the app is necessary to deploy for testing purposes or for production use.
To build the project run:

```bash
pnpm build-devnet
pnpm build-testnet
pnpm build-mainnet
```

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

## Learn More

You can learn more in the [Vite documentation](https://vitejs.dev/).

To learn React, check out the [React documentation](https://reactjs.org/).

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

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

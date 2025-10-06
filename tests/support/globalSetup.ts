// This global setup materializes secret keystore files from environment variables
// so Playwright tests can reference stable file paths without committing secrets.
//
// Secrets source:
// - On CI (GitHub Actions): injected via repository/environment Secrets
//   (e.g. KEYSTORE1_JSON_B64, KEYSTORE{N}_PASSWORD, KEYSTORE{N}_ADDRESS).
// - Locally: provided via .env.test.local/.env and loaded here.
//
// Why base64?
// - JSON keystores are stored as KEYSTORE{N}_JSON_B64 to pass safely through
//   CI env vars and avoid accidental logging. We decode and write them to
//   WALLETS_DIR on startup. Passwords/addresses are read directly from env
//   by the tests and are never written to disk.

import fs from 'fs';
import path from 'path';
import { loadEnv } from 'vite';

// Load environment variables for local runs using Vite's loadEnv
// In CI, secrets are already in process.env and will be preserved
try {
  const mode = process.env.MODE || 'test';
  const localEnv = loadEnv(mode, process.cwd(), '');
  for (const [key, value] of Object.entries(localEnv)) {
    if (process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
} catch (_) {
  // If vite isn't available in this context, skip; CI provides env
}

// Helper function to ensure directory exists
function ensureDirectoryExists(filePath: string) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Helper function to decode base64 to a file
function decodeBase64ToFile(base64: string, outPath: string) {
  ensureDirectoryExists(outPath);
  const buffer = Buffer.from(base64, 'base64');
  fs.writeFileSync(outPath, buffer.toString('utf-8'));
}

// Write keystore files from environment variables
async function writeKeystoreFilesFromEnv() {
  const walletsDir = process.env.WALLETS_DIR || 'tests/support/wallets';
  const mappings: Array<{ envKey: string; outPath: string }> = [
    {
      envKey: 'KEYSTORE1_JSON_B64',
      outPath: `${walletsDir}/keystoreFile1.json`
    },
    {
      envKey: 'KEYSTORE2_JSON_B64',
      outPath: `${walletsDir}/keystoreFile2.json`
    },
    {
      envKey: 'KEYSTORE3_JSON_B64',
      outPath: `${walletsDir}/keystoreFile3.json`
    },
    {
      envKey: 'KEYSTORE4_JSON_B64',
      outPath: `${walletsDir}/keystoreFile4.json`
    },
    {
      envKey: 'KEYSTORE5_PEM_B64',
      outPath: `${walletsDir}/keystoreFile5.pem`
    }
  ];

  // Write keystore files from environment variables
  for (const { envKey, outPath } of mappings) {
    const b64 = process.env[envKey];
    if (b64 && b64.trim().length > 0) {
      decodeBase64ToFile(b64, outPath);
    }
  }
}

// Global setup function
export default async function globalSetup() {
  await writeKeystoreFilesFromEnv();
}

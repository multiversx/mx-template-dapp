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

import path from 'path';
import { loadEnv } from 'vite';
import { writeValueToFile } from '../support';
import { type FileEncoding } from './types';

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

// Write keystore files from environment variables
async function writeKeystoreFilesFromEnv(
  defaultEncoding: FileEncoding = 'base64'
) {
  // Resolve wallets directory without relying on process.cwd
  const walletsDir = process.env.WALLETS_DIR
    ? path.resolve(process.env.WALLETS_DIR)
    : path.resolve(__dirname, 'wallets');
  const mappings: Array<{
    envKey: string;
    outPath: string;
    encoding?: FileEncoding;
  }> = [
    {
      envKey: 'KEYSTORE1_JSON_B64',
      outPath: `${walletsDir}/keystoreFile1.json`,
      encoding: 'base64'
    },
    {
      envKey: 'KEYSTORE2_JSON_B64',
      outPath: `${walletsDir}/keystoreFile2.json`,
      encoding: 'base64'
    },
    {
      envKey: 'KEYSTORE3_JSON_B64',
      outPath: `${walletsDir}/keystoreFile3.json`,
      encoding: 'base64'
    },
    {
      envKey: 'KEYSTORE4_JSON_B64',
      outPath: `${walletsDir}/keystoreFile4.json`,
      encoding: 'base64'
    },
    {
      envKey: 'KEYSTORE5_PEM_B64',
      outPath: `${walletsDir}/keystoreFile5.pem`,
      encoding: 'base64'
    },
    {
      envKey: 'KEYSTORE6_PRIVATE_KEY_UTF8',
      outPath: `${walletsDir}/keystoreFile6.key`,
      encoding: 'none'
    }
  ];

  // Write keystore files from environment variables
  for (const { envKey, outPath, encoding } of mappings) {
    const value = process.env[envKey];
    if (value && value.trim().length > 0) {
      writeValueToFile(value, outPath, encoding ?? defaultEncoding);
    }
  }
}

// Global setup function
export default async function globalSetup() {
  await writeKeystoreFilesFromEnv();
}

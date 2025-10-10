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

  // Debug logging can be enabled by setting DEBUG_GLOBAL_SETUP=true
  if (process.env.DEBUG_GLOBAL_SETUP === 'true') {
    console.log('🔧 Global Setup Debug Info:');
    console.log('  - WALLETS_DIR:', process.env.WALLETS_DIR || 'not set');
    console.log('  - Resolved walletsDir:', walletsDir);
    console.log('  - __dirname:', __dirname);
  }
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
    if (process.env.DEBUG_GLOBAL_SETUP === 'true') {
      console.log(
        `  - ${envKey}: ${value ? 'present' : 'missing'} (${
          value ? value.length : 0
        } chars)`
      );
      if (value && value.length > 0) {
        console.log(`    📝 First 50 chars: ${value.substring(0, 50)}...`);
        console.log(
          `    📝 Last 50 chars: ...${value.substring(value.length - 50)}`
        );

        // Check for newline characters in base64 content
        if (encoding === 'base64' && value.includes('\n')) {
          console.log(
            '    ⚠️  WARNING: Base64 content contains newline characters!'
          );
          console.log(
            `    📊 Newline count: ${(value.match(/\n/g) || []).length}`
          );
          console.log(
            `    📊 Content without newlines: ${
              value.replace(/\n/g, '').length
            } chars`
          );
        }

        // Check for potential Base64 padding issues
        if (encoding === 'base64' && value.length > 0) {
          const cleanBase64 = value.replace(/\n/g, '').replace(/\r/g, '');
          const paddingNeeded = (4 - (cleanBase64.length % 4)) % 4;
          if (paddingNeeded > 0) {
            console.log(
              `    ⚠️  WARNING: Base64 content may need ${paddingNeeded} padding characters`
            );
          }
        }
      }
    }
    if (value && value.trim().length > 0) {
      try {
        writeValueToFile(value, outPath, encoding ?? defaultEncoding);

        // Validate the written file content
        const fs = require('fs');
        const writtenContent = fs.readFileSync(outPath, 'utf8');

        // Only validate JSON files (not PEM or private key files)
        const isJsonFile = outPath.endsWith('.json');
        const isValidJson = isJsonFile
          ? (() => {
              try {
                JSON.parse(writtenContent);
                return true;
              } catch (error) {
                if (process.env.DEBUG_GLOBAL_SETUP === 'true') {
                  console.log(`    ❌ JSON Parse Error: ${error.message}`);
                }
                return false;
              }
            })()
          : true; // Non-JSON files are considered "valid" for this check

        if (process.env.DEBUG_GLOBAL_SETUP === 'true') {
          console.log(`    ✅ Successfully wrote ${outPath}`);
          console.log(`    📄 File size: ${writtenContent.length} chars`);
          console.log(`    🔍 Valid JSON: ${isValidJson}`);
          if (!isValidJson && isJsonFile) {
            console.log(
              `    ⚠️  Invalid JSON content: ${writtenContent.substring(
                0,
                200
              )}...`
            );
            console.log(
              `    📄 Full content length: ${writtenContent.length} chars`
            );
          }
        }

        // Always log warnings for invalid JSON files
        if (!isValidJson && isJsonFile) {
          console.warn(
            `⚠️  WARNING: ${outPath} contains invalid JSON! This may cause test failures.`
          );
        }
      } catch (error) {
        console.error(`    ❌ Failed to write ${outPath}:`, error);
      }
    } else {
      if (process.env.DEBUG_GLOBAL_SETUP === 'true') {
        console.log(`    ⚠️  Skipping ${outPath} - no value or empty`);
      }
    }
  }
}

// Global setup function
export default async function globalSetup() {
  await writeKeystoreFilesFromEnv();
}

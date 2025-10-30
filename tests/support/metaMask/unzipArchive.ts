import { execFile } from 'node:child_process';
import fs from 'node:fs/promises';
import path from 'node:path';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);

type UnzipArchiveOptions = {
  archivePath: string;
  overwrite?: boolean;
};

type UnzipArchiveResult = {
  outputPath: string;
  unzipSkipped: boolean;
};

// Unzips an archive using the system `unzip` command.
//Returns the extraction path and whether extraction was skipped due to cache.
export async function unzipArchive(
  options: UnzipArchiveOptions
): Promise<UnzipArchiveResult> {
  const { archivePath, overwrite = false } = options;
  const outputPath = deriveOutputPath(archivePath);

  if (await shouldSkipUnzip(outputPath, overwrite)) {
    return { outputPath, unzipSkipped: true };
  }

  await ensureCleanOutputDir(outputPath, overwrite);
  await extractZipArchive(archivePath, outputPath);

  return { outputPath, unzipSkipped: false };
}

function deriveOutputPath(archivePath: string): string {
  const { dir, name } = path.parse(archivePath);
  return path.join(dir, name);
}

async function shouldSkipUnzip(
  outputPath: string,
  overwrite: boolean
): Promise<boolean> {
  try {
    await fs.access(outputPath);
    return !overwrite;
  } catch {
    return false;
  }
}

async function ensureCleanOutputDir(
  outputPath: string,
  overwrite: boolean
): Promise<void> {
  try {
    if (overwrite) {
      await fs.rm(outputPath, { recursive: true, force: true });
    }
  } catch {
    // ignore
  }
  await fs.mkdir(outputPath, { recursive: true });
}

// Extracts a ZIP archive using the system `unzip` utility.
// Requires `unzip` to be available on the system (default on macOS/Linux, available via WSL on Windows).
async function extractZipArchive(
  archivePath: string,
  outputPath: string
): Promise<void> {
  try {
    await execFileAsync('unzip', ['-o', archivePath, '-d', outputPath]);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(
      `[unzipArchive] Failed to extract ${archivePath}: ${message}`
    );
  }
}

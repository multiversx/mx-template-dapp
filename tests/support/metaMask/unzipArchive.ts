import path from 'node:path';
import fs from 'fs-extra';
import unzipper from 'unzipper';

type UnzipArchiveOptions = {
  archivePath: string;
  overwrite?: boolean;
};

type UnzipArchiveResult = {
  outputPath: string;
  unzipSkipped: boolean;
};

// Unzips an archive to a folder named after the archive (minus its extension).
// Returns the extraction path and whether the unzip was skipped due to cache.
export async function unzipArchive(
  options: UnzipArchiveOptions
): Promise<UnzipArchiveResult> {
  const { archivePath, overwrite = false } = options;

  const outputPath = deriveOutputPath(archivePath);

  if (await shouldSkipUnzip(outputPath, overwrite)) {
    return { outputPath, unzipSkipped: true };
  }

  await ensureCleanOutputDir(outputPath, overwrite);
  await extractArchive(archivePath, outputPath);

  return { outputPath, unzipSkipped: false };
}

// Derives the output folder name from the archive path.
function deriveOutputPath(archivePath: string): string {
  const parsed = path.parse(archivePath);
  return path.join(parsed.dir, parsed.name);
}

// Checks if the existing unzipped folder should be reused.
async function shouldSkipUnzip(
  outputPath: string,
  overwrite: boolean
): Promise<boolean> {
  const exists = await fs.pathExists(outputPath);
  return exists && !overwrite;
}

// Ensures the output directory is empty and ready.
async function ensureCleanOutputDir(
  outputPath: string,
  overwrite: boolean
): Promise<void> {
  if (await fs.pathExists(outputPath)) {
    if (overwrite) {
      await fs.remove(outputPath);
    } else {
      return;
    }
  }
  await fs.mkdirp(outputPath);
}

// Performs the actual extraction using unzipper’s promise interface.
async function extractArchive(
  archivePath: string,
  outputPath: string
): Promise<void> {
  try {
    const directory = await unzipper.Open.file(archivePath);
    await directory.extract({ path: outputPath, concurrency: 5 });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(
      `[unzipArchive] Failed to extract ${archivePath}: ${message}`
    );
  }
}

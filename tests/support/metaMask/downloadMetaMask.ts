// downloadFileFromUrl.ts
import { createWriteStream } from 'node:fs';
import fs from 'node:fs/promises';
import path from 'node:path';
import { pipeline } from 'stream/promises';
import axios from 'axios';

type Options = {
  url: string;
  outputDir: string;
  fileName: string;
  overwrite?: boolean;
};

export async function downloadFileFromUrl({
  url,
  outputDir,
  fileName,
  overwrite = false
}: Options): Promise<{ filePath: string; downloadSkipped: boolean }> {
  const filePath = path.join(outputDir, fileName);

  await fs.mkdir(outputDir, { recursive: true });

  if (!overwrite && (await exists(filePath))) {
    return { filePath, downloadSkipped: true };
  }

  const response = await axios.get(url, {
    responseType: 'stream',
    validateStatus: () => true
  });
  if (response.status !== 200) {
    throw new Error(`Download failed (${response.status}) for ${url}`);
  }

  const tmpPath = `${filePath}.part`;
  await pipeline(response.data, createWriteStream(tmpPath));
  // remove target file if exists, then rename
  try {
    await fs.rm(filePath, { force: true });
  } catch {}
  await fs.rename(tmpPath, filePath);

  return { filePath, downloadSkipped: false };
}

async function exists(p: string): Promise<boolean> {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

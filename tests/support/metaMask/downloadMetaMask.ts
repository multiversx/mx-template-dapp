// downloadFileFromUrl.ts
import path from 'node:path';
import { pipeline } from 'stream/promises';
import axios from 'axios';
import fs from 'fs-extra';

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

  await fs.ensureDir(outputDir);

  if (!overwrite && (await fs.pathExists(filePath))) {
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
  await pipeline(response.data, fs.createWriteStream(tmpPath));
  await fs.move(tmpPath, filePath, { overwrite: true });

  return { filePath, downloadSkipped: false };
}

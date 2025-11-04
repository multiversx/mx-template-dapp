import { createWriteStream } from 'node:fs';
import fs from 'node:fs/promises';
import path from 'node:path';
import { pipeline } from 'stream/promises';
import axios from 'axios';

type DownloaderOptions = {
  url: string;
  outputDir: string;
  fileName: string;
  overrideFile?: boolean;
};

type DownloadFileResult = {
  filePath: string;
  downloadSkipped: boolean;
};

export async function downloadFileFromUrl(
  options: DownloaderOptions
): Promise<DownloadFileResult> {
  try {
    const { url, outputDir, fileName, overrideFile } = options;
    const filePath = path.join(outputDir, fileName);

    await fs.mkdir(outputDir, { recursive: true });

    const fileExists = await fileExistsSafe(filePath);
    if (fileExists && !overrideFile) {
      return {
        filePath,
        downloadSkipped: true
      };
    }

    const response = await axios.get(url, {
      responseType: 'stream'
    });

    const writer = createWriteStream(filePath);
    await pipeline(response.data, writer);

    return {
      filePath,
      downloadSkipped: false
    };
  } catch (error) {
    throw new Error(
      `Failed to download file: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`
    );
  }
}

async function fileExistsSafe(p: string): Promise<boolean> {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

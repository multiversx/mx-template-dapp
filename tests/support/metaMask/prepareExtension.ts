import path from 'node:path';
import fs from 'fs-extra';
import { downloadFileFromUrl } from '../fs/downloadFileFromUrl';
import { ensureDirectoryExists } from '../fs/ensureDirectoryExists';
import { DEFAULT_METAMASK_VERSION, EXTENSION_DOWNLOAD_URL } from './constants';
import { unzipArchive } from './unzipArchive';

export async function prepareExtension(forceCache = true): Promise<string> {
  let outputDir = '';
  if (forceCache) {
    outputDir = path.join(process.cwd(), '.cache');
    ensureDirectoryExists(path.join(outputDir, 'ensure-dir'));
  } else {
    outputDir = path.resolve('./', 'downloads');
    if (!(await fs.exists(outputDir))) {
      fs.mkdirSync(outputDir);
    }
  }

  const downloadResult = await downloadFileFromUrl({
    url: EXTENSION_DOWNLOAD_URL,
    outputDir,
    fileName: `metamask-chrome-${DEFAULT_METAMASK_VERSION}.zip`
  });

  const unzipResult = await unzipArchive({
    archivePath: downloadResult.filePath
  });

  return unzipResult.outputPath;
}

// prepareExtension.ts
import path from 'node:path';
import fs from 'fs-extra';
import { downloadFileFromUrl } from '../fs/downloadFileFromUrl';
import { buildMetamaskZipUrl, resolveMetamaskVersion } from './constants';
import { unzipArchive } from './unzipArchive';

export async function prepareExtension(forceCache = true): Promise<string> {
  const version = resolveMetamaskVersion();

  const outputDir = forceCache
    ? path.join(process.cwd(), '.cache')
    : path.resolve('./', 'downloads');

  await fs.ensureDir(outputDir); // make sure folder exists

  const fileName = `metamask-chrome-${version}.zip`;
  const url = buildMetamaskZipUrl(version);

  const { filePath } = await downloadFileFromUrl({
    url,
    outputDir,
    fileName,
    overrideFile: false
  });

  const { outputPath } = await unzipArchive({ archivePath: filePath });
  return outputPath;
}

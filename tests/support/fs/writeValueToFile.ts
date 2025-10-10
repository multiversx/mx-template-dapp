import fs from 'fs';
import { type FileEncoding } from '../types';
import { ensureDirectoryExists } from './ensureDirectoryExists';

export const writeValueToFile = (
  value: string,
  outPath: string,
  encoding: FileEncoding,
  skipIfExists: boolean = false
) => {
  // Check if file exists and skip if requested
  if (skipIfExists && fs.existsSync(outPath)) {
    return;
  }

  // ensure directory exists
  ensureDirectoryExists(outPath);

  switch (encoding) {
    case 'base64':
      fs.writeFileSync(
        outPath,
        Buffer.from(value, 'base64').toString('utf8'),
        'utf8'
      );
      break;
    case 'utf8':
      fs.writeFileSync(outPath, value, 'utf8');
      break;
    case 'none':
      fs.writeFileSync(outPath, value);
      break;
    default:
      throw new Error(`Unsupported encoding: ${encoding}`);
  }
};

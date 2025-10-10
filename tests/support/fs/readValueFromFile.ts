import fs from 'fs';

export const readValueFromFile = (
  inPath: string,
  encoding: 'utf8' | 'buffer' = 'utf8'
): string => {
  if (encoding === 'buffer') {
    const data = fs.readFileSync(inPath);
    return data.toString('utf8');
  }

  return fs.readFileSync(inPath, 'utf8');
};

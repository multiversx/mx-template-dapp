import { loadEnv } from 'vite';

export function loadLocalEnv(modeDefault: string = 'test'): void {
  try {
    const mode = process.env.MODE || modeDefault;
    const localEnv = loadEnv(mode, process.cwd(), '');
    for (const [key, value] of Object.entries(localEnv)) {
      if (process.env[key] === undefined) {
        process.env[key] = value;
      }
    }
  } catch {
    // If vite's loadEnv isn't available, silently skip.
  }
}

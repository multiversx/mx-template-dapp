import fs from 'fs';
import { type FileEncoding } from '../types';
import { ensureDirectoryExists } from './ensureDirectoryExists';

export const writeValueToFile = (
  value: string,
  outPath: string,
  encoding: FileEncoding
) => {
  // ensure directory exists
  ensureDirectoryExists(outPath);

  // base64 -> write buffer with base64 encoding
  if (encoding === 'base64') {
    const buffer = Buffer.from(value, 'base64');
    fs.writeFileSync(outPath, new Uint8Array(buffer));
    return;
  }
  // utf8 -> write string with utf8 encoding
  if (encoding === 'utf8') {
    fs.writeFileSync(outPath, value, { encoding: 'utf8' });
    return;
  }
  // no encoding -> write raw string with no encoding
  fs.writeFileSync(outPath, value);
};

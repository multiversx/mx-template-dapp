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

  // base64 -> decode to string and write as UTF-8
  if (encoding === 'base64') {
    // Remove any newline characters from base64 content before decoding
    let cleanBase64 = value.replace(/\n/g, '').replace(/\r/g, '');
    
    // Add padding if needed
    const paddingNeeded = (4 - (cleanBase64.length % 4)) % 4;
    if (paddingNeeded > 0) {
      cleanBase64 += '='.repeat(paddingNeeded);
    }
    
    // Debug logging for base64 decoding
    if (process.env.DEBUG_BASE64_DECODING === 'true') {
      console.log(`🔧 Base64 Decoding Debug for ${outPath}:`);
      console.log(`  - Original length: ${value.length} chars`);
      console.log(`  - Clean length: ${cleanBase64.length} chars`);
      console.log(`  - Newlines removed: ${value.length - cleanBase64.length}`);
      console.log(`  - Padding added: ${paddingNeeded}`);
      console.log(`  - First 50 chars: ${cleanBase64.substring(0, 50)}...`);
    }
    
    try {
      const decodedString = Buffer.from(cleanBase64, 'base64').toString('utf8');
      
      if (process.env.DEBUG_BASE64_DECODING === 'true') {
        console.log(`  - Decoded length: ${decodedString.length} chars`);
        console.log(`  - Decoded first 100 chars: ${decodedString.substring(0, 100)}...`);
      }
      
      fs.writeFileSync(outPath, decodedString, { encoding: 'utf8' });
    } catch (error) {
      console.error(`❌ Base64 decoding failed for ${outPath}:`, error);
      console.error(`  - Clean base64: ${cleanBase64.substring(0, 100)}...`);
      throw error;
    }
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

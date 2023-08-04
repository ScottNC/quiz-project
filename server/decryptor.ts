import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

const iv = Buffer.alloc(16);

export function decrypt(encrypted: string, algorithm: string, key: Buffer) {
  const decryptor = crypto.createDecipheriv(algorithm, key, iv);
  let text = decryptor.update(encrypted, 'base64', 'utf8');
  text += decryptor.final('utf8');
  return text;
}
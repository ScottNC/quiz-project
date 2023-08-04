import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

export function decrypt(encrypted: string) {
  const iv = Buffer.alloc(16);
  const paddedKey = Buffer.concat([Buffer.from(process.env.ENCRYPTION_KEY!), Buffer.alloc(12)]);
  const decryptor = crypto.createDecipheriv('aes-128-cbc', paddedKey, iv);
  let text = decryptor.update(encrypted, 'base64', 'utf8');
  text += decryptor.final('utf8');
  return text;
}
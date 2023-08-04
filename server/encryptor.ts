import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

const iv = Buffer.alloc(16);

function encrypt(plainText: string, algorithm: string, key: Buffer) {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(plainText, 'utf8', 'base64');
  encrypted += cipher.final('base64');
  return encrypted;
}

const originalText = process.argv[3];
console.log(originalText);
const userKey = process.env.ENCRYPTION_KEY!;
const algorithm = 'aes-128-cbc';
const paddedKey = Buffer.concat([Buffer.from(userKey), Buffer.alloc(12)]);

const hw = encrypt(originalText, algorithm, paddedKey);

console.log(hw);

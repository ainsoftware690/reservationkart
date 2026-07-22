import crypto from "crypto";

const WORKING_KEY = (process.env.CCAVENUE_WORKING_KEY || "").trim();

function getKeyIv() {
  const md5Hash = crypto.createHash("md5").update(WORKING_KEY).digest();
  const iv = Buffer.alloc(16, 0);
  return { key: md5Hash, iv };
}

export function encrypt(plainText) {
  const { key, iv } = getKeyIv();
  const cipher = crypto.createCipheriv("aes-128-cbc", key, iv);
  let encrypted = cipher.update(plainText, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
}

export function decrypt(encText) {
  const { key, iv } = getKeyIv();
  const decipher = crypto.createDecipheriv("aes-128-cbc", key, iv);
  let decrypted = decipher.update(encText, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}
import crypto from "crypto";

const WORKING_KEY = (process.env.CCAVENUE_WORKING_KEY || "").trim();

function getKeyIv() {
  const md5Hash = crypto.createHash("md5").update(WORKING_KEY).digest();
  // CCAvenue's official fixed IV — sequential bytes 0x00 to 0x0f
  const iv = Buffer.from([
    0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07,
    0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f,
  ]);
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
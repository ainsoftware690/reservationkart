import crypto from 'crypto';

export function generatePayUHash(
  key,
  salt,
  txnid,
  amount,
  productinfo,
  firstname,
  email,
  phone
) {
  const hashString = `${key}|${txnid}|${amount}|${productinfo}|${firstname}|${email}|||||||||||${salt}`;
  const hash = crypto.createHash('sha512').update(hashString).digest('hex');
  return hash;
}

export function verifyPayUHash(hash, key, salt, txnid, amount, status) {
  const hashString = `${salt}|${status}|||||||||||||${key}|${txnid}|${amount}`;
  const computedHash = crypto
    .createHash('sha512')
    .update(hashString)
    .digest('hex');
  return computedHash === hash;
}
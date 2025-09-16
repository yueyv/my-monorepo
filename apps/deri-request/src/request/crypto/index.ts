import CryptoJS from 'crypto-js';

// 密钥
const KEY = CryptoJS.enc.Utf8.parse('uT;PAYvgzOCsm9ll');
const IV = CryptoJS.enc.Utf8.parse("'T0(m_/fL8,6{u`Q");

/**
 * 加密
 * @param word
 */
export function encrypt(word: string) {
  const srcs = CryptoJS.enc.Utf8.parse(word);
  const encrypted = CryptoJS.AES.encrypt(srcs, KEY, {
    iv: IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.ZeroPadding,
  });
  return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
}

/**
 * 解密
 * @param word
 */
export function decrypt(word: string) {
  const base64 = CryptoJS.enc.Base64.parse(word);
  const src = CryptoJS.enc.Base64.stringify(base64);
  const decrypt = CryptoJS.AES.decrypt(src, KEY, {
    iv: IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.ZeroPadding,
  });
  const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr.toString();
}

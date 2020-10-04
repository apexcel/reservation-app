import * as CryptoJS from 'crypto-js/'

const AES_KEY = process.env.REACT_APP_AES_KEY;

export function encryptAES(data: object) {
    return CryptoJS.AES.encrypt(JSON.stringify(data), AES_KEY).toString();
}

export function decryptAES(cipher) {
    const bytes = CryptoJS.AES.decrypt(cipher, AES_KEY);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}
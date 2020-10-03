import * as CryptoJS from 'crypto-js/'

const AES_KEY = process.env.REACT_APP_AES_SECRET_KEY;

export function encryptData(data: object) {
    return CryptoJS.AES.encrypt(JSON.stringify(data), AES_KEY).toString();
}

export function decryptData(encryptData) {
    const bytes = CryptoJS.AES.decrypt(encryptData, AES_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
}
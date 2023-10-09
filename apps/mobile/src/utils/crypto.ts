import crypto from "./cryptoNative";
import * as exCrypto from 'expo-crypto';

const algorithm = "aes-256-gcm"
const encryptionKey = process.env.EXPO_PUBLIC_ENCRYPTION
export type EncryptedCode = {
    iv: string,
    encryptedData: string,
    tag: string
}

export function encrypt(value: string): EncryptedCode {
    const iv = Buffer.from(exCrypto.getRandomBytes(16));
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(encryptionKey, "hex"), iv);
    const encrypted = Buffer.concat([cipher.update(value, 'utf8'), cipher.final()]);
    const tag = cipher.getAuthTag();

    return {
        iv: iv.toString('hex'),
        encryptedData: encrypted.toString('hex'),
        tag: tag.toString('hex')
    };
}

export function decrypt(value: EncryptedCode) {
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(encryptionKey, 'utf8'), Buffer.from(value.iv, 'hex'));
    decipher.setAuthTag(Buffer.from(value.tag, 'hex'));

    const decrypted = Buffer.concat([decipher.update(value.encryptedData), decipher.final()]);

    return decrypted.toString('utf8');
}
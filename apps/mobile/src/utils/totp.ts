import { getTotp as totp, cryptoNative } from "vanilla-totp";

export function getTotp(secretKey, timestamp = Date.now()) {
    return totp(secretKey, timestamp, cryptoNative)
}
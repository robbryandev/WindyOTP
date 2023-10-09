export function validTotpUrl(url: string) {
    const rx = /otpauth:\/\/totp\/(?:[a-zA-Z0-9%]+:)?([^\?]+)\?secret=([0-9A-Za-z]+)/g;
    return rx.test(url);
}

export function getUrlSecret(url: string) {
    const rx = RegExp(/secret=([0-9A-Za-z]+)/).exec(url)
    return rx.length > 0 ? rx[0].replace("secret=", "") : null
}

export function getUrlName(url: string) {
    const rx = RegExp(/(?<=otpauth:\/\/totp\/).*(?=\.)/).exec(url)
    return rx.length > 0 ? rx[0] : null
}
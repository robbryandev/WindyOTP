export function validTotpUrl(url: string) {
    const rx = /otpauth:\/\/totp\/(?:[a-zA-Z0-9%]+:)?([^\?]+)\?secret=([0-9A-Za-z]+)/g;
    return rx.test(url);
}
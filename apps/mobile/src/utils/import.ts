import * as protobuf from 'protobufjs';
import { TotpDigits, type TotpData, TotpAlgorithm } from './url';
import { authBuffer } from '../data/proto';

export type GoogleCode = {
  secret: string,
  name: string,
  issuer: string,
  algorithm: "ALGORITHM_UNSPECIFIED" | "ALGORITHM_SHA1" | "ALGORITHM_SHA256" | "ALGORITHM_SHA512" | "ALGORITHM_MD5",
  digits: "DIGIT_COUNT_UNSPECIFIED" | "DIGIT_COUNT_SIX" | "DIGIT_COUNT_EIGHT",
  type: "OTP_TYPE_UNSPECIFIED" | "OTP_TYPE_HOTP" | "OTP_TYPE_TOTP",
  counter: string
}

export type GoogleExports = {
  otpParameters: GoogleCode[],
  version: number,
  batchSize: number,
  batchIndex: number,
  batchId: number
}

export function isMigration(url: string) {
  const rx = /otpauth-migration:\/\/offline\?data=.*/g;
  return rx.test(url);
}

export async function decodeMigration(url: string): Promise<GoogleExports> {
  try {
    // Extract the Base64-encoded data from the URL
    const base64Data = url.split('data=')[1];

    // Decode Base64-encoded string using Buffer
    const decodedData = Buffer.from(base64Data, 'base64');

    // Convert the decoded Buffer to Uint8Array
    const dataArray = new Uint8Array(decodedData);

    // Load the protobuf definition
    const getRoot = await protobuf.parse(authBuffer);
    const root = getRoot.root;

    // Resolve the GoogleAuthenticatorImport message type
    const GoogleAuthenticatorImport = root.lookupType('WindyOTP.GoogleAuthenticatorImport');

    // Decode the message
    const decodedMessage = GoogleAuthenticatorImport.decode(dataArray);

    // Convert the decoded message to JSON
    const decodedDataJson = GoogleAuthenticatorImport.toObject(decodedMessage, {
      defaults: true,
      longs: String,
      enums: String,
      bytes: String,
    });

    return decodedDataJson as GoogleExports;
  } catch (error) {
    console.error('Error decoding GoogleAuthenticatorImport:', error);
    throw error;
  }
}

export function toTotpData(exportedCode: GoogleCode): TotpData {
  let codeDigits: TotpDigits = 6;
  if (exportedCode.digits === "DIGIT_COUNT_EIGHT") {
    codeDigits = 8;
  }

  let codeAlgorithm: TotpAlgorithm = "sha1";
  if (exportedCode.algorithm != "ALGORITHM_UNSPECIFIED") {
    codeAlgorithm = exportedCode.algorithm.toLowerCase().replace("algorithm", "") as TotpAlgorithm
  }

  return {
    account: exportedCode.name,
    secret: exportedCode.secret,
    digits: codeDigits,
    period: 30,
    algorithm: codeAlgorithm
  }
}
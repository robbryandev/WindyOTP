import AsyncStorage from '@react-native-async-storage/async-storage'
import { encrypt, decrypt, type EncryptedCode } from './crypto'
import * as Device from 'expo-device'

export type CodeList = {
    installDate: number,
    codes: Record<string, string>
}

export function encryptCode(value: string): EncryptedCode {
    return encrypt(value)
}

export function decryptCode(value: EncryptedCode): string {
    return decrypt(value)
}

export type AddCodeResult = {
    error?: string,
    success: boolean
}

export function addCode(name: string, value: string): AddCodeResult {
    let result: AddCodeResult = {
        success: true
    }
    AsyncStorage.getItem(Device.modelName).then(async (res) => {
        if (!res) {
            throw "key not set";
        }
        let codes: CodeList = JSON.parse(res)
        console.log(`Codes 1: ${JSON.stringify(codes.codes)}`)
        // codes.codes[name] = JSON.stringify(encryptCode(value))
        codes.codes[name] = value
        console.log(`Codes 2: ${JSON.stringify(codes.codes)}`)
        await AsyncStorage.setItem(Device.modelName, JSON.stringify(codes)).catch((err) => {
            result.error = err
            result.success = false
        })
    }).catch((err) => {
        console.log(`AddCode Error: ${err}`)
        result.error = err
        result.success = false
    })
    return result
}

export async function getCodes(): Promise<CodeList> {
    const timeStamp: number = new Date().getTime()
    const newList: CodeList = { installDate: timeStamp, codes: {} }
    let val = await AsyncStorage.getItem(Device.modelName)
    if (!val) {
        val = JSON.stringify(newList);
        await AsyncStorage.setItem(Device.modelName, val).catch((err) => {
            console.log(`set error: ${err}`)
        })
    }
    return JSON.parse(val)
}
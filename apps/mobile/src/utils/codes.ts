import AsyncStorage from '@react-native-async-storage/async-storage'
import { encrypt } from './crypto'
import * as Device from 'expo-device'
import { type TotpData } from './url'

export type CodeList = {
    installDate: number,
    codes: Record<string, TotpData>
}

export type AddCodeResult = {
    error?: string,
    success: boolean
}

export function addCode(data: TotpData): AddCodeResult {
    let result: AddCodeResult = {
        success: true
    }
    AsyncStorage.getItem(Device.modelName).then(async (res) => {
        if (!res) {
            throw "key not set";
        }
        let codes: CodeList = JSON.parse(res)
        const key = await encrypt(data.secret)
        codes.codes[data.account] = { ...data, secret: key };
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
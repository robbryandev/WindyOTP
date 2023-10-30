import AsyncStorage from '@react-native-async-storage/async-storage'
import { encrypt } from './crypto'
import * as Device from 'expo-device'
import { type TotpData } from './url'

export type CodeList = {
    installDate: number,
    codes: Record<string, TotpData>
}

export async function addCode(data: TotpData[]): Promise<void> {
    const res = await AsyncStorage.getItem(Device.modelName);
    if (!res) {
        throw "AddCode Error: key not set"
    }
    let codes: CodeList = JSON.parse(res)
    data.forEach((codeData: TotpData) => {
        encrypt(codeData.secret).then((key) => {
            console.log(`account: ${codeData.account}`)
            codes.codes[codeData.account] = { ...codeData, secret: key };
            AsyncStorage.setItem(Device.modelName, JSON.stringify(codes)).then(() => {
                console.log(`Added account: ${codeData.account}`)
            }).catch((err) => {
                console.log(err)
            })
        })
    })
}

export async function getCodes(): Promise<CodeList> {
    const timeStamp: number = new Date().getTime()
    const newList: CodeList = { installDate: timeStamp, codes: {} }
    let val = await AsyncStorage.getItem(Device.modelName)
    if (!val) {
        val = JSON.stringify(newList);
        console.log("Code List: " + JSON.stringify(newList))
        await AsyncStorage.setItem(Device.modelName, val).catch((err) => {
            console.log(`set error: ${err}`)
        })
    }
    console.log("Code List: " + JSON.stringify(JSON.parse(val).codes))
    return JSON.parse(val)
}
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import * as Device from "expo-device";

import { type CodeList } from "../utils/codes";
import { StyledButton as Button } from "./StyledButton";
import { getTotp } from "../utils/totp";
import { type TotpData } from "../utils/url";
import { decrypt } from "../utils/crypto";

export default function OtpCard({ name, data, setRefresh }: { name: string, data: TotpData, setRefresh: CallableFunction }) {
    const [showDelete, setShowDelete] = useState<Boolean>(false)
    const [showConfirm, setShowConfirm] = useState<Boolean>(false)
    const [thisCode, setThisCode] = useState<string>("error")
    const getCounter = () => {
        const counterVal = Math.floor(Date.now() / 1000 % data.period);
        return counterVal;
    }
    const [counter, setCounter] = useState<number>(getCounter())
    const [percentage, setPercentage] = useState<number>(0)

    // Loop counter interval
    useEffect(() => {
        const timer = setInterval(() => {
            const tmpCounter = getCounter()
            setCounter(tmpCounter)
            setPercentage(100 - ((tmpCounter / data.period) * 100))
        }, 500)
        return () => {
            clearInterval(timer)
        }
    }, [])

    useEffect(() => {
        decrypt(data.secret).then((res) => {
            setThisCode(getTotp(data, res));
        }).catch((err) => {
            console.log(`Failed to decrypt key: ${err}`)
        })
    }, [percentage])

    return (
        <TouchableOpacity className="w-full h-auto bg-card" onLongPress={() => setShowDelete(true)}>
            <View className="flex flex-row px-4 gap-6">
                <View>
                    <Text className="text-txt text-lg">{name}</Text>
                    <View className="flex flex-row space-x-2">
                        <Text className="text-txt text-2xl pb-2">{thisCode.substring(0, Math.floor(thisCode.length / 2))}</Text>
                        <Text className="text-txt text-2xl pb-2">{thisCode.substring(Math.floor(thisCode.length / 2), thisCode.length)}</Text>
                    </View>
                </View>
                {showDelete ? (
                    <View className="flex flex-row gap-4 h-12">
                        {!showConfirm ? (
                            <>
                                <Button title="Cancel" className="px-2 py-1" onPress={() => {
                                    setShowDelete(false)
                                }} />
                                <Button title="Delete" className="bg-delete px-2 py-1" onPress={() => {
                                    setShowConfirm(true)
                                }} />
                            </>
                        ) : (
                            <>
                                <Button title="Delete" className="bg-delete px-2 py-1" onPress={() => {
                                    // Add delete code
                                    AsyncStorage.getItem(Device.modelName).then((res: string) => {
                                        const codes: CodeList = JSON.parse(res);
                                        delete codes.codes[name];
                                        AsyncStorage.setItem(Device.modelName, JSON.stringify(codes)).then((res) => {
                                            setRefresh(Math.random())
                                        }).catch((err) => {
                                            console.log(`Delete error 1: ${err}`)
                                        });
                                    }).catch((err) => {
                                        console.log(`Delete error: ${err}`)
                                    })
                                }} />
                                <Button title="Cancel" className="px-2 py-1" onPress={() => {
                                    setShowConfirm(false)
                                    setShowDelete(false)
                                }} />
                            </>
                        )}
                    </View>
                ) : null}
            </View>
            <View className="w-11/12 mx-auto pb-2">
                <View className="h-4 bg-progress" style={{
                    width: `${percentage}%`
                }} />
            </View>
        </TouchableOpacity>
    )
}
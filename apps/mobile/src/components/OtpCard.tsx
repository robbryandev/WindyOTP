import { View, Text, TouchableOpacity, Pressable } from "react-native";
import StyledButton from "./StyledButton";
import { getTotp } from "../utils/totp";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Device from "expo-device";
import { type CodeList } from "../utils/codes";
import { router } from "expo-router";
// import { decryptCode } from "../utils/codes";

export default function OtpCard({ name, data, percentage, setRefresh }: {
    name: string, data: string, percentage: number, setRefresh: CallableFunction
}) {
    const [showDelete, setShowDelete] = useState<Boolean>(false)
    const [showConfirm, setShowConfirm] = useState<Boolean>(false)
    const thisCode = getTotp(data);
    return (
        <TouchableOpacity className="w-full h-auto bg-card" onLongPress={() => setShowDelete(true)}>
            <View className="flex flex-row px-4 gap-6">
                <View>
                    <Text className="text-txt text-lg">{name}</Text>
                    <View className="flex flex-row space-x-2">
                        <Text className="text-txt text-2xl pb-2">{thisCode.substring(0, 3)}</Text>
                        <Text className="text-txt text-2xl pb-2">{thisCode.substring(3, thisCode.length)}</Text>
                    </View>
                </View>
                {showDelete ? (
                    <View className="flex flex-row gap-4 h-12">
                        {!showConfirm ? (
                            <>
                                <StyledButton title="Cancel" className="px-2 py-1" onPress={() => {
                                    setShowDelete(false)
                                }} />
                                <StyledButton title="Delete" className="bg-delete px-2 py-1" onPress={() => {
                                    setShowConfirm(true)
                                }} />
                            </>
                        ) : (
                            <>
                                <StyledButton title="Delete" className="bg-delete px-2 py-1" onPress={() => {
                                    // Add delete code
                                    AsyncStorage.getItem(Device.modelName).then((res: string) => {
                                        const codes: CodeList = JSON.parse(res);
                                        delete codes.codes[name];
                                        AsyncStorage.setItem(Device.modelName, JSON.stringify(codes)).then((res) => {
                                            setRefresh(Math.random())
                                        }).catch((err) => {
                                            console.log(`Delete error 1: ${err}`)
                                        })
                                    }).catch((err) => {
                                        console.log(`Delete error 2: ${err}`)
                                    })
                                }} />
                                <StyledButton title="Cancel" className="px-2 py-1" onPress={() => {
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
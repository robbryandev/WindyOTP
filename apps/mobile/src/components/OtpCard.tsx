import { View, Text } from "react-native";
import { getTotp } from "../utils/totp";
// import { decryptCode } from "../utils/codes";

export default function OtpCard({ name, data, percentage }: {
    name: string, data: string, percentage: number
}) {
    const thisCode = getTotp(data);
    return (
        <View className="w-full h-auto bg-card">
            <View className="pl-6 pt-2">
                <Text className="text-txt text-lg">{name}</Text>
                <View className="flex flex-row space-x-2">
                    <Text className="text-txt text-2xl pb-2">{thisCode.substring(0, 3)}</Text>
                    <Text className="text-txt text-2xl pb-2">{thisCode.substring(3, thisCode.length)}</Text>
                </View>
            </View>
            <View className="w-11/12 mx-auto pb-2">
                <View className="h-4 bg-progress" style={{
                    width: `${percentage}%`
                }} />
            </View>
        </View>
    )
}
import { View, Text } from "react-native";
import { getTotp } from "../utils/totp";
// import { decryptCode } from "../utils/codes";

export default function OtpCard({ name, data, percentage }: {
    name: string, data: string, percentage: number
}) {
    return (
        <View className="w-full h-24 bg-card">
            <View className="pl-6 pt-2">
                <Text className="text-txt text-xl">{name}</Text>
                <Text className="text-txt">{getTotp(data)}</Text>
            </View>
            <View className="w-11/12 mx-auto pt-4">
                <View className="h-4 bg-progress" style={{
                    width: `${percentage}%`
                }} />
            </View>
        </View>
    )
}
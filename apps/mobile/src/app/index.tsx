import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { Link } from 'expo-router';

export default function HomePage() {
  return (
    <View className="min-h-screen">
      <View className="bg-nav p-4 pt-6 flex flex-row justify-evenly">
        <Text className="font-semibold text-2xl text-txt px-4 py-2">WindyOTP</Text>
        <View className="rounded-full bg-backdrop">
          <Link href="/code" className="font-semibold text-3xl text-txt px-4 py-2">
            +
          </Link>
        </View>
      </View>
      <View className="bg-backdrop min-h-full">
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

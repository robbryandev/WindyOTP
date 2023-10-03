import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

export default function App() {
  return (
    <View className="min-h-screen">
      <View className="bg-nav p-4 pt-16 flex flex-row justify-evenly">
        <Text className="font-semibold text-2xl text-white px-4 py-2">WindyOTP</Text>
        {/* Todo Make link to new route */}
        <View className="rounded-full bg-backdrop">
          <Text className="font-semibold text-3xl text-white px-4 py-2">+</Text>
        </View>
      </View>
      <View className="bg-backdrop min-h-full">
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

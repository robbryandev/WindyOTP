import { StatusBar } from 'expo-status-bar';
import { Text, View, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import { type CodeList, getCodes } from '../utils/codes';
import { useEffect, useState } from 'react';
import OtpCard from '../components/OtpCard';

export default function HomePage() {
  const [codes, setCodes] = useState<CodeList>()
  const [refresh, setRefresh] = useState<number>()
  // Get codes
  useEffect(() => {
    getCodes().then((res: CodeList) => {
      setCodes(res);
    }).catch((err) => {
      console.log(err);
    })
  }, [refresh])

  return (
    <View className="min-h-screen pb-80">
      <View className="bg-nav p-4 pt-6 flex flex-row justify-evenly">
        <Text className="font-semibold text-2xl text-txt px-4 py-2">WindyOTP</Text>
        <View className="rounded-full bg-backdrop">
          <Link href="/code" className="font-semibold text-3xl text-txt px-4 py-2">+</Link>
        </View>
        <View className="rounded-full bg-backdrop">
          <Link href="/exports" className="font-semibold text-3xl text-txt px-4 py-2">{"\u2197"}</Link>
        </View>
      </View>
      <View className="bg-backdrop min-h-full">
        <ScrollView className='flex flex-grow'>
          {codes && codes.codes ? Object.keys(codes.codes).map((key: string, index: number) => {
            return (
              <OtpCard
                key={index}
                name={codes.codes[key].account}
                data={codes.codes[key]}
                setRefresh={setRefresh}
              />
            )
          }) : null}
        </ScrollView>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

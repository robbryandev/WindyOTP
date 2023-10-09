import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { Link } from 'expo-router';
import { type CodeList, getCodes } from '../utils/codes';
import { useEffect, useState } from 'react';
import OtpCard from '../components/OtpCard';

export default function HomePage() {
  const [codes, setCodes] = useState<CodeList>()
  const [refresh, setRefresh] = useState<number>()
  const getCounter = () => {
    const counterVal = Math.floor(Date.now() / 1000 % 30);
    return counterVal;
  }
  const [counter, setCounter] = useState<number>(getCounter())
  // Get codes
  useEffect(() => {
    getCodes().then((res: CodeList) => {
      setCodes(res);
    }).catch((err) => {
      console.log(err);
    })
  }, [refresh])
  // Loop counter interval
  useEffect(() => {
    const timer = setInterval(() => {
      setCounter(getCounter())
    }, 250)
    return () => {
      clearInterval(timer)
    }
  }, [])
  return (
    <View className="min-h-screen">
      <View className="bg-nav p-4 pt-6 flex flex-row justify-evenly">
        <Text className="font-semibold text-2xl text-txt px-4 py-2">WindyOTP</Text>
        <View className="rounded-full bg-backdrop">
          <Link href="/code" className="font-semibold text-3xl text-txt px-4 py-2">+</Link>
        </View>
      </View>
      <View className="bg-backdrop min-h-full">
        {codes && codes.codes ? Object.keys(codes.codes).map((key: string, index: number) => {
          return (
            <OtpCard
              key={index}
              name={key}
              data={codes.codes[key]}
              percentage={100 - ((counter / 30) * 100)}
              setRefresh={setRefresh}
            />
          )
        }) : null}
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

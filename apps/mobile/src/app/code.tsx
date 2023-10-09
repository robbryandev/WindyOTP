import { StatusBar } from 'expo-status-bar';
import { Text, View, Button } from 'react-native';
import { Link, router } from 'expo-router';
import { useEffect, useState } from 'react';
import { BarCodeScanner } from "expo-barcode-scanner";
import { getUrlName, getUrlSecret, validTotpUrl } from '../utils/url';
import { addCode } from '../utils/codes';
import AsyncStorage from '@react-native-async-storage/async-storage';

type CodeState = {
  permission?: boolean,
  scanned?: boolean,
  showCamera: boolean,
  showScan?: boolean,
  invalid?: boolean,
}

export default function CodePage() {
  const [codeState, setCodeState] = useState<CodeState>({ invalid: false, showScan: true, showCamera: false, permission: false })

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setCodeState({ ...codeState, permission: status === "granted" });
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    if (validTotpUrl(data)) {
      setCodeState({ ...codeState, scanned: true, invalid: false, showCamera: false, showScan: false })
      const name = getUrlName(data);
      const secret = getUrlSecret(data);
      if (name && secret) {
        const codeRes = addCode(name, secret);
        console.log(`Success: ${codeRes.success}`)
        if (codeRes.success) {
          setTimeout(() => {
            router.push("/");
          }, 250)
        }
      }
    }
    else {
      setCodeState({ ...codeState, invalid: true });
    }
  };

  const RenderCamera = () => {
    return (
      <View className='overflow-hidden aspect-[1] w-full my-4'>
        <BarCodeScanner
          onBarCodeScanned={codeState.scanned ? undefined : handleBarCodeScanned}
          className='flex-1'
        />
      </View>
    );
  };

  return (
    <View className="min-h-screen">
      <View className="bg-nav p-4 pt-6 flex flex-row justify-evenly">
        <Text className="font-semibold text-2xl text-txt px-4 py-2">WindyOTP</Text>
        <View className="rounded-full bg-backdrop">
          <Link href="/" className="font-semibold text-3xl text-txt px-5 py-2">-</Link>
        </View>
      </View>
      <View className="bg-backdrop min-h-full">
        {codeState.invalid ? (
          <View className='w-full bg-red-500'>
            <Text className='text-txt text-xl text-center font-semibold py-2'>Invalid TOTP QR Code</Text>
          </View>
        ) : null}
        {codeState.showScan ? (
          <Button title={codeState.showCamera ? "cancel" : "scan"} onPress={() => {
            if (codeState.permission) {
              setCodeState({ ...codeState, showCamera: codeState.showCamera === false })
            }
          }} />
        ) : null}
        {codeState.showCamera ? <RenderCamera /> : <Text className='text-txt'>Showing camera turned off</Text>}
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
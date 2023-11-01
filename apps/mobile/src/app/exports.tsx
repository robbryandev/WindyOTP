import * as LocalAuthentication from 'expo-local-authentication';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Link } from 'expo-router';

import { type CodeList, getCodes } from '../utils/codes';

export default function ExportsPage() {
  const [codes, setCodes] = useState<CodeList>()
  const [permission, setPermission] = useState<Boolean>(false)
  const [supported, setSupported] = useState<Boolean>(false)

  useEffect(() => {
    // Check if device has authentication methods
    LocalAuthentication.isEnrolledAsync().then((res) => {
      setSupported(res);
      if (res) {
        LocalAuthentication.authenticateAsync({}).then((authRes) => {
          setPermission(authRes.success);
        }).catch((authErr) => {
          console.log(authErr);
        });
      }
    }).catch((err) => {
      console.log(err);
    });

    // Get codes
    getCodes().then((res: CodeList) => {
      setCodes(res);
    }).catch((err) => {
      console.log(err);
    })
  }, [])

  return (
    <View className="min-h-screen pb-80">
      <View className="bg-nav p-4 pt-6 flex flex-row justify-evenly">
        <Text className="font-semibold text-2xl text-txt px-4 py-2">WindyOTP</Text>
        <View className="rounded-full bg-backdrop">
          <Link href="/" className="font-semibold text-3xl text-txt px-5 py-2">-</Link>
        </View>
      </View>
      <View className="bg-backdrop min-h-full">
        {supported ? (
          <>
            <Text className='text-txt'>
              {permission ? "Got device permission" : "Failed to get device permission"}
            </Text>
          </>
        ) : (
          <>
            <Text className="text-txt">
              Your device requires biometric authentication to export your codes
            </Text>
          </>
        )}
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

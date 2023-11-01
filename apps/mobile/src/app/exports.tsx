import * as LocalAuthentication from 'expo-local-authentication';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Link } from 'expo-router';

import { type CodeList, getCodes } from '../utils/codes';
import { codesToGoogle, encodeGoogleExports } from '../utils/exports';
import { GoogleExports, decodeMigration } from '../utils/import';

export default function ExportsPage() {
  const [codes, setCodes] = useState<CodeList>()
  const [exportData, setExportData] = useState<string>()
  const [permission, setPermission] = useState<Boolean>(false)
  const [supported, setSupported] = useState<Boolean>(false)

  useEffect(() => {
    // Get codes
    getCodes().then((res: CodeList) => {
      setCodes(res);
    }).catch((err) => {
      console.log(err);
    })
  }, [])

  useEffect(() => {
    // Check if device has authentication methods
    LocalAuthentication.isEnrolledAsync().then((res) => {
      setSupported(res);
      if (res && codes && codes.codes) {
        LocalAuthentication.authenticateAsync({}).then((authRes) => {
          setPermission(authRes.success);
          codesToGoogle(Object.values(codes.codes)).then((gCodes: GoogleExports) => {
            encodeGoogleExports(gCodes).then((displayUri) => {
              const displayBuffer = Buffer.from(displayUri)
              setExportData("otpauth-migration://offline?data=" + displayBuffer.toString("base64"));
            }).catch((displayErr) => {
              console.log("Display Error: " + displayErr)
            })
          }).catch((gError) => {
            console.log("gCode error: " + gError);
          })
        }).catch((authErr) => {
          console.log(authErr);
        });
      }
    }).catch((err) => {
      console.log(err);
    });
  }, [codes])

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
              {permission ? exportData : "Failed to get device permission"}
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

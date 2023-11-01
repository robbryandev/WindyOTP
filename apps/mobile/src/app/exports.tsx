import * as LocalAuthentication from 'expo-local-authentication';
import QRCode from 'react-native-qrcode-svg';
import { useEffect, useState } from 'react';
import { Text, View, useWindowDimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Link } from 'expo-router';

import { codesToGoogle, encodeGoogleExports, getQrSize } from '../utils/exports';
import { type CodeList, getCodes } from '../utils/codes';
import { type GoogleExports } from '../utils/import';

export default function ExportsPage() {
  const { height, width } = useWindowDimensions();
  const [codes, setCodes] = useState<CodeList>()
  const [exportData, setExportData] = useState<string>("no codes")
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
              if (gCodes.otpParameters.length > 0) {
                setExportData("otpauth-migration://offline?data=" + displayBuffer.toString("base64"));
              }
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
        <View className='p-4'>
          {supported ? (
            <>
              {
                permission ? (
                  <>
                    {
                      exportData !== "no codes" ? (
                        <QRCode
                          value={exportData}
                          size={width - 32}
                          quietZone={6}
                        />
                      ) : <Text className='text-txt'>You don't have any exportable codes</Text>
                    }
                  </>
                ) : (
                  <Text className='text-txt'>
                    Failed to get device permission
                  </Text>
                )
              }
            </>
          ) : (
            <>
              <Text className="text-txt">
                Your device requires biometric authentication to export your codes
              </Text>
            </>
          )}
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

import { StatusBar } from 'expo-status-bar';
import { Text, View, Button } from 'react-native';
import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { BarCodeScanner } from "expo-barcode-scanner";
import { validTotpUrl } from '../utils/url';

export default function CodePage() {
  const [hasPermission, setHasPermission] = useState<Boolean>(false);
  const [scanned, setScanned] = useState<Boolean>(false);
  const [showCamera, setShowCamera] = useState<Boolean>(false);
  const [showScanButton, setShowScanButton] = useState<Boolean>(true);
  const [invalidScan, setInvalidScan] = useState<Boolean>(false);
  const [key, setKey] = useState<String>("No key yet");

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    if (validTotpUrl(data)) {
      setScanned(true);
      setInvalidScan(false);
      setKey(data);
      setShowCamera(false);
      setShowScanButton(false);
    }
    else {
      setInvalidScan(true);
    }
  };

  const RenderCamera = () => {
    return (
      <View className='overflow-hidden aspect-[1] w-full my-4'>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          className='flex-1'
        />
      </View>
    );
  };

  return (
    <View className="min-h-screen">
      <View className="bg-nav p-4 pt-6 flex flex-row justify-evenly">
        <Text className="font-semibold text-2xl text-txt px-4 py-2">WindyOTP</Text>
        {/* Todo Make link to new route */}
        <View className="rounded-full bg-backdrop">
          <Link href="/" className="font-semibold text-3xl text-txt px-5 py-2">
            -
          </Link>
        </View>
      </View>
      <View className="bg-backdrop min-h-full">
        {invalidScan ? (
          <View className='w-full bg-red-500'>
            <Text className='text-txt text-xl text-center font-semibold py-2'>Invalid TOTP QR Code</Text>
          </View>
        ) : null}
        {showScanButton ? (
          <Button title={showCamera ? "cancel" : "scan"} onPress={() => {
            if (hasPermission) {
              if (showCamera) {
                setShowCamera(false);
              } else {
                setShowCamera(true);
              }
            }
          }} />
        ) : null}
        {showCamera ? <RenderCamera /> : <Text className='text-txt'>Showing camera turned off</Text>}
        <Text className='text-txt'>{key}</Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
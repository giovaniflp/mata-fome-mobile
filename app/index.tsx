import { H4, H6, Button } from 'tamagui'
import { ToastControl } from './CurrentToast'
import { Alert, Image, View } from 'react-native'
import { router } from 'expo-router'
import { useState, useEffect } from 'react'
import * as Notifications from 'expo-notifications';

export default function Index() {

  const [notificationPermission, setNotificationPermission] = useState(false);

  // Função para solicitar permissão de notificação
  const askNotificationPermission = async () => {
    const { status } = await Notifications.getPermissionsAsync();
    
    if (status !== 'granted') {
      const { status: newStatus } = await Notifications.requestPermissionsAsync();
      setNotificationPermission(newStatus === 'granted');

      if (newStatus !== 'granted') {
        Alert.alert(
          'Permissão de Notificação',
          'As notificações estão desativadas. Por favor, ative as notificações nas configurações do dispositivo.'
        );
      }
    } else {
      setNotificationPermission(true);
    }
  };

  useEffect(() => {
    // Solicita permissão de notificação ao carregar o componente
    askNotificationPermission();
  }, []);

  return (
    <View className='h-full bg-white flex justify-center'>
      <View className='flex justify-center items-center'>
        <Image style={{resizeMode:"stretch"}} source={require('./public/images/PizzaBox.png')} className='w-80 h-80 rounded-3xl'></Image>
      </View>
      <H4 className='text-center text-black mt-8'>Mate sua fome com um clique.</H4>
        <H6 className='text-center text-black text-xs p-4 mt-8'>Nos dias agitados e corridos, encontre uma solução rápida e conveniente!</H6>
      <View className='flex justify-center items-center mt-8'>
        <Button onPress={()=>{
          router.push('/Login')
        }} className='w-60 bg-orange-500 rounded-3xl text-white'>Entrar</Button>
      </View>
      <View className='flex justify-center items-center mt-8'>
        <Button onPress={()=>{
          router.push('/Register')
        }} className='w-60 bg-orange-500 rounded-3xl text-white'>Registrar</Button>
      </View>
    </View>
  )
}

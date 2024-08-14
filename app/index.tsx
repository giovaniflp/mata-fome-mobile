import { H4, H6, Button } from 'tamagui'
import { ToastControl } from './CurrentToast'
import { Image, View } from 'react-native'
import { router } from 'expo-router'

export default function Index() {

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

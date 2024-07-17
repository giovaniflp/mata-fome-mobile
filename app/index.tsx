import { View, H1, Image } from 'tamagui'
import { ToastControl } from './CurrentToast'

export default function Index() {

  return (
    <View className='bg-orange-400 h-full'>
      <H1 className='text-center mt-8'>Mata Fome</H1>
      <View className='flex justify-center items-center'>
        <Image source={require('./public/icons/tomato/TomatoAssassin.png')} className='w-20 h-20'></Image>
      </View>
      <View>
        <ToastControl />
      </View>
    </View>
  )
}

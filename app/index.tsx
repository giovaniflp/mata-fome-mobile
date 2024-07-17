import { View, H1 } from 'tamagui'
import { ToastControl } from './CurrentToast'

export default function Index() {
  return (
    <View className='bg-orange-400 h-full'>
      <H1 className='text-center mt-5'>Mata Fome - Mobile</H1>
      <View>
        <ToastControl />
      </View>
    </View>
  )
}

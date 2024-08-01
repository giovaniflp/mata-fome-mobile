import { Toast, useToastController, useToastState } from '@tamagui/toast'
import { Button, H4, XStack, YStack, isWeb, Text, View } from 'tamagui'
import { TouchableOpacity, Image } from 'react-native'
import { router } from 'expo-router'

export function CurrentToast() {
  const currentToast = useToastState()

  if (!currentToast || currentToast.isHandledNatively) return null

  return (
    <Toast
      key={currentToast.id}
      duration={currentToast.duration}
      viewportName={currentToast.viewportName}
      enterStyle={{ opacity: 0, scale: 0.5, y: -25 }}
      exitStyle={{ opacity: 0, scale: 1, y: -20 }}
      y={isWeb ? '$12' : 0}
      theme="orange"
      br="$6"
      animation="bouncy"
    >
      <YStack ai="center" p="$2" gap="$2">
        <Toast.Title fow="bold">{currentToast.title}</Toast.Title>
        {!!currentToast.message && (
          <Toast.Description>{currentToast.message}</Toast.Description>
        )}
      </YStack>
    </Toast>
  )
}

export function RegisterAddressToast() {
  const toast = useToastController()

  return (
    <View>
        <Button onPress={() => {
            router.push("MyAddress")
            toast.show('Endereço registrado!', {
              message: "O endereço foi registrado com sucesso!",
            })
          }} className="bg-green-500">
                            <Text className="text-white">Registrar</Text>
                        </Button>
    </View>
  )
}
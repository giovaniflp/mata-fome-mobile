import { Toast, useToastController, useToastState } from '@tamagui/toast'
import { Button, H4, XStack, YStack, isWeb, Text } from 'tamagui'
import { TouchableOpacity } from 'react-native'

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

export function ToastControl() {
  const toast = useToastController()

  return (
    <YStack gap="$2" ai="center">
      <XStack gap="$2" jc="center">
        <TouchableOpacity
          onPress={() => {
            toast.show('Código enviado!', {
              message: "Cheque seu e-mail, outro código foi enviado para lá.",
            })
          }}
        >
          <Text className='text-blue-400'>Enviar código novamente</Text>
        </TouchableOpacity>
      </XStack>
    </YStack>
  )
}

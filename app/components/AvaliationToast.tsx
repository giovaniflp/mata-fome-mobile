import { Toast, useToastController, useToastState } from '@tamagui/toast'
import { Button, H4, XStack, YStack, isWeb, Text, View } from 'tamagui'
import { TouchableOpacity, Image } from 'react-native'

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

export function AvaliationToast() {
  const toast = useToastController()

  return (
    <View>
        <Button onPress={() => {
            toast.show('Avaliação enviada', {
              message: "A avaliação do produto foi enviada com sucesso!",
            })
          }} className="bg-orange-500 mt-5">
                            <Text className="text-xs text-white">Enviar avaliação</Text>
                        </Button>
    </View>
  )
}
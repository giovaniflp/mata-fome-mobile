import { Toast, useToastController, useToastState } from '@tamagui/toast'
import { Button, H4, XStack, YStack, isWeb } from 'tamagui'

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
      theme="purple"
      br="$6"
      animation="quick"
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
      <H4>Seja bem-vindo</H4>
      <XStack gap="$2" jc="center">
        <Button
          onPress={() => {
            toast.show('Olá amigo!', {
              message: "Isso daqui foi um Toast configurado no arquivo 'CurrentToast.tsx'.",
            })
          }}
        >
          Olá
        </Button>
        <Button onPress={()=>{toast.hide()}}>
          Fechar Notificação
        </Button>
      </XStack>
    </YStack>
  )
}

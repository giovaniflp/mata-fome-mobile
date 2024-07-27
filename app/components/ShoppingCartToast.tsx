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

export function ShoppingCartToast() {
  const toast = useToastController()

  return (
    <View>
        <Button onPress={() => {
            toast.show('Item adicionado', {
              message: "Seu item foi adicionado ao carrinho!",
            })
          }} icon={<Image className="w-5 h-5" source={require("../public/icons/ui/shoppingCart.png")}></Image>} className="bg-orange-500 w-48">
                            <Text className="text-xs text-white">Adicionar ao carrinho</Text>
                        </Button>
    </View>
  )
}
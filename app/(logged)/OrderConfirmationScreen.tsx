import { DiscountTicketToast } from "app/components/DiscountTicketToast";
import { router } from "expo-router";
import { TouchableOpacity, Image } from "react-native";
import { Button, H4, H5, H6, Input, ScrollView, View, Text } from "tamagui";
import BottomBar from "app/components/BottomBar";

export default function OrderConfirmationScreen(){
    return(
        <View className="flex-1">
            <View className='bg-white'>
                <View className="mt-10 flex flex-row justify-around items-center">
                    <H4 className="text-black">Confirmação de pedido</H4>
                    <Image className="w-20 h-20" source={require("../public/icons/tomato/TomatoDelivery.png")}></Image>
                </View>
            </View>
            <ScrollView className="bg-white" showsVerticalScrollIndicator={false}>
                <View className="bg-gray-200 rounded-3xl p-4 mx-2 mt-5">
                    <View className="flex justify-center flex-row">
                        <View><Image className="w-32 h-32 rounded-3xl" source={require("../public/images/slide01.jpg")}></Image></View>
                        <View className="w-56 flex justify-center ml-2">
                            <H5 className="text-black">Hambúrguer de frango</H5>
                            <H6 className="text-xs mt-2 text-black">Pão de hambúrguer premium, molho especial da casa, bisteca de frango, tomate, alface, ketchup e mostarda</H6>
                        </View>
                    </View>
                    <View className="flex items-center mt-2">
                        <H4 className="text-black">3 Unidades</H4>
                    </View>
                </View>
                <View className="bg-gray-200 rounded-3xl p-4 mx-2 flex justify-center mt-5">
                    <View className="w-80">
                                <H5 className="text-orange-500">Observação*</H5>
                                <H6 className="text-black">Por favor, retirar a mostarda e quero a carne bem passada.</H6>
                    </View>
                </View>
                <View className="bg-gray-200 rounded-3xl p-4 mx-2 flex justify-center mt-5">
                    <View className="w-80">
                                <H5 className="text-black">Endereço 01 - (Padrão)</H5>
                                <H6 className="text-black">Rua 02 Bloco 31 Apt 106 Curado 4 - Jaboatão</H6>
                    </View>
                </View>
                <View className="bg-gray-200 rounded-3xl p-4 mx-2 flex justify-center mt-5">
                    <H4 className="text-black">Forma de pagamento</H4>
                    <View className="flex flex-row items-center mt-2">
                        <Image className="w-10 h-10" source={require("../public/icons/ui/creditCard.png")}></Image>
                        <View className="w-80 ml-2">
                            <H6 className="text-black">Cartão de crédito terminado em <H6 className="text-orange-500">6322</H6></H6>
                        </View>
                    </View>
                    <View>
                        <H5 className="mb-2 mt-5 text-red-500">Subtotal</H5>
                        <H6 className="text-black mb-1">1 x Hambúrguer de frango - <H6 className="text-orange-500">R$ 15,00</H6></H6>
                        <H6 className="text-black mb-1">1 x Hambúrguer de frango - <H6 className="text-orange-500">R$ 15,00</H6></H6>
                        <H6 className="text-black mb-1">1 x Hambúrguer de frango - <H6 className="text-orange-500">R$ 15,00</H6></H6>
                        <H6 className="text-black">Frete - <H6 className="text-orange-500">R$ 10,00</H6></H6>
                    </View>
                    <View className="mt-5">
                        <H4 className="text-black">Valor total</H4>
                        <H5 className="text-orange-500">R$ 55,00</H5>
                    </View>
                </View>
                <View className="flex items-center my-5">
                    <Button onPress={()=>{
                        router.push('OrderConfirmedScreen')
                    }} className="bg-orange-500 w-40">
                        <Text className="text-white">Finalizar pedido</Text>
                    </Button>
                </View>
            </ScrollView>
            <BottomBar screen="OrderConfirmationScreen"></BottomBar>
        </View>
    )
}
import { router } from "expo-router";
import { TouchableOpacity, Image } from "react-native";
import { Button, H4, H5, H6, ScrollView, View, Text } from "tamagui";
import BottomBar from "app/components/BottomBar";

export default function PaymentScreen(){
    return(
        <View className="flex-1">
            <ScrollView className="bg-white">
            <View className='bg-white'>
                <View className="mt-10 flex flex-row justify-around items-center">
                        <H4 className="text-black">Formas de pagamento</H4>
                    <Image className="w-20 h-20" source={require("../public/icons/tomato/TomatoMoney.png")}></Image>
                </View>
                <View className="mt-5">
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View className="bg-gray-200 rounded-3xl p-4 mx-2 mt-5 flex">
                            <View className="w-80">
                                <H4 className="text-black">Saldo em carteira</H4>
                                <H5 className="text-orange-500">R$ 25,93</H5>
                            </View>
                            <View className="w-40 mt-3">
                                <Button className="bg-green-500">
                                    <Text className="text-white">Adicionar saldo</Text>
                                </Button>
                            </View>
                        </View>
                        <View className="bg-gray-200 rounded-3xl p-4 mx-2 mt-5 flex">
                            <H4 className="text-black">Formas de pagamento</H4>
                            <Button className=" bg-green-500 mt-5">
                                <Text className="text-white">Usar dinheiro da carteira</Text>
                            </Button>
                            <Button className="mt-5 bg-orange-500">
                                <Text className="text-white">PIX</Text>
                            </Button>
                            <Button className="mt-5 bg-black">
                                <Text className="text-white">Cartão de crédito</Text>
                            </Button>
                            <Button className="mt-5 bg-white">
                                <Text className="text-black">Cartão de débito</Text>
                            </Button>
                            <H4 className="mt-5 text-black">Vales</H4>
                            <Button className="bg-black mt-5">
                                <Text className="text-white">Vale alimentação</Text>
                            </Button>
                            <Button className="mt-5 bg-white">
                                <Text className="text-black">Vale refeição</Text>
                            </Button>
                        </View>
                        <View className="my-5 flex items-center">
                            <Button onPress={()=>{
                                router.push('OrderConfirmationScreen')
                            }} className="bg-orange-500 w-40">
                                <Text className="text-white">Continuar</Text>
                            </Button>
                        </View>
                    </ScrollView>
                    </View>
                </View>
            </ScrollView>
            <BottomBar screen="PaymentScreen"></BottomBar>
        </View>
    )
}
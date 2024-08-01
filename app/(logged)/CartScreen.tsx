import { ShoppingCartToast } from "app/components/ShoppingCartToast"
import { router } from "expo-router"
import { TouchableOpacity, Image } from "react-native"
import { Button, H4, H5, H6, ScrollView, View, Text, Input, TextArea } from "tamagui"
import { DiscountTicketToast } from "app/components/DiscountTicketToast"
import BottomBar from "app/components/BottomBar"

export default function CartScreen(){
    return(
        <View className="flex-1">
            <View className='bg-white'>
                <View className="mt-10 flex flex-row justify-around items-center">
                    <H4 className="text-black">Carrinho de compras</H4>
                    <Image className="w-20 h-20" source={require("../public/icons/tomato/TomatoShopping.png")}></Image>
                </View>
            </View>
            <ScrollView className="bg-white" showsVerticalScrollIndicator={false}>
            <View className="bg-gray-200 rounded-3xl p-4 mx-2 flex justify-center flex-col mt-5">
                    <View className="flex flex-row">
                        <View><Image className="w-32 h-32 rounded-3xl" source={require("../public/images/slide01.jpg")}></Image></View>
                        <View className="w-56 flex justify-center ml-2">
                            <H5 className="text-black">Hambúrguer de frango</H5>
                            <H6 className="text-black">R$ 15,00</H6>
                            <View className="flex flex-row items-center">
                                <TouchableOpacity>
                                    <Image className="w-10 h-10" source={require("../public/icons/ui/plus.png")}></Image>
                                </TouchableOpacity>
                                <H4 className="text-black">1</H4>
                                <TouchableOpacity>
                                    <Image className="w-10 h-10" source={require("../public/icons/ui/minus.png")}></Image>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View>
                        <H5 className="my-2 text-orange-500">Descrição</H5>
                        <H6 className="text-black">Pão de hambúrguer premium, molho especial da casa, bisteca de frango, tomate, alface, ketchup e mostarda</H6>
                    </View>
                </View>
                <View className="bg-gray-200 rounded-3xl p-4 mx-2 flex justify-center flex-col mt-5">
                    <View className="flex flex-row">
                        <View><Image className="w-32 h-32 rounded-3xl" source={require("../public/images/slide01.jpg")}></Image></View>
                        <View className="w-56 flex justify-center ml-2">
                            <H5 className="text-black">Hambúrguer de frango</H5>
                            <H6 className="text-black">R$ 15,00</H6>
                            <View className="flex flex-row items-center">
                                <TouchableOpacity>
                                    <Image className="w-10 h-10" source={require("../public/icons/ui/plus.png")}></Image>
                                </TouchableOpacity>
                                <H4 className="text-black">1</H4>
                                <TouchableOpacity>
                                    <Image className="w-10 h-10" source={require("../public/icons/ui/minus.png")}></Image>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View>
                        <H5 className="my-2 text-orange-500">Descrição</H5>
                        <H6 className="text-black">Pão de hambúrguer premium, molho especial da casa, bisteca de frango, tomate, alface, ketchup e mostarda</H6>
                    </View>
                </View>
                <View className="bg-gray-200 rounded-3xl p-4 mx-2 flex justify-center flex-col mt-5">
                    <View className="flex flex-row">
                        <View><Image className="w-32 h-32 rounded-3xl" source={require("../public/images/slide01.jpg")}></Image></View>
                        <View className="w-56 flex justify-center ml-2">
                            <H5 className="text-black">Hambúrguer de frango</H5>
                            <H6 className="text-black">R$ 15,00</H6>
                            <View className="flex flex-row items-center">
                                <TouchableOpacity>
                                    <Image className="w-10 h-10" source={require("../public/icons/ui/plus.png")}></Image>
                                </TouchableOpacity>
                                <H4 className="text-black">1</H4>
                                <TouchableOpacity>
                                    <Image className="w-10 h-10" source={require("../public/icons/ui/minus.png")}></Image>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View>
                        <H5 className="my-2 text-orange-500">Descrição</H5>
                        <H6 className="text-black">Pão de hambúrguer premium, molho especial da casa, bisteca de frango, tomate, alface, ketchup e mostarda</H6>
                    </View>
                </View>
                <View className="bg-gray-200 rounded-3xl p-4 mx-2 flex justify-center mt-5 mb-5">
                    <View>
                        <H5 className="text-black text-xs">Cupom de desconto</H5>
                        <View className="flex flex-row items-center">
                            <Input className="bg-white w-60 text-black"></Input>
                            <DiscountTicketToast></DiscountTicketToast>
                        </View>
                    </View>
                    <View className="mt-5">
                        <H5 className="text-black text-xs">Deixe uma observação caso necessário</H5>
                        <TextArea className="bg-white text-black" verticalAlign="top"></TextArea>
                    </View>
                    <View className="mt-5">
                        <H5 className="text-black">Subtotal</H5>
                        <H6 className="text-orange-500 text-xs"><H6 className="text-black">3 x Hambúrguer de frango -</H6> R$ 15,00 (Unid.)</H6>
                    </View>
                    <View className="flex flex-row items-end justify-between">
                        <View>
                            <H4 className="text-black">Total</H4>
                            <View className="w-32 rounded-3xl flex">
                                <H6 className="text-orange-500">R$ 45,00</H6>
                            </View>
                        </View>
                        <View>
                            <Button onPress={()=>{
                                router.push("RegisteredAddressScreen")
                            }} className="bg-orange-500 w-48">
                                <Text className="text-xs">Continuar com a compra</Text>
                            </Button>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <BottomBar screen="CartScreen"></BottomBar>
        </View>
    )
}
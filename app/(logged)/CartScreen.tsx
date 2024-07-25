import { ShoppingCartToast } from "app/components/ShoppingCartToast"
import { router } from "expo-router"
import { TouchableOpacity, Image } from "react-native"
import { Button, H4, H5, H6, ScrollView, View, Text, Input } from "tamagui"
import { DiscountTicketToast } from "app/components/DiscountTicketToast"

export default function CartScreen(){
    return(
        <View className="flex-1">
            <View className='bg-white'>
                <View className="mt-10 flex flex-row justify-around items-center">
                    <H4 className="text-black">Carrinho de compras</H4>
                    <Image className="w-20 h-20" source={require("../public/images/BrandIcon.png")}></Image>
                </View>
            </View>
            <ScrollView className="bg-white" showsVerticalScrollIndicator={false}>
                <View className="bg-gray-200 rounded-3xl p-4 mx-2 flex justify-center flex-row mt-5">
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
                <View className="bg-gray-200 rounded-3xl p-4 mx-2 flex justify-center flex-row mt-5">
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
                <View className="bg-gray-200 rounded-3xl p-4 mx-2 flex justify-center flex-row mt-5">
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
                <View className="bg-gray-200 rounded-3xl p-4 mx-2 flex justify-center mt-5 mb-5">
                    <View>
                        <H5 className="text-black text-xs">Cupom de desconto</H5>
                        <View className="flex flex-row items-center">
                            <Input className="bg-white w-60 text-black"></Input>
                            <DiscountTicketToast></DiscountTicketToast>
                        </View>
                    </View>
                    <View className="mt-5">
                        <H5 className="text-black">Subtotal</H5>
                        <H6 className="text-orange-500">3 x R$ 15,00</H6>
                    </View>
                    <View className="flex flex-row items-end justify-between">
                        <View>
                            <H4 className="text-black">Total</H4>
                            <View className="border-2 w-32 rounded-3xl flex">
                                <H6 className="text-orange-500 text-center">R$ 45,00</H6>
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
            <View className="w-full h-16 bg-orange-500 flex justify-center">
                <View className="flex flex-row items-center justify-center gap-16">
                    <TouchableOpacity onPress={()=>{
                        router.push('HomeScreen')
                    }}>
                        <Image className="w-10 h-10" source={require("../public/icons/ui/home.png")}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{
                        router.push('SearchScreen')
                    }}>
                        <Image className="w-10 h-10" source={require("../public/icons/ui/search.png")}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image className="w-10 h-10" source={require("../public/icons/ui/shoppingCart.png")}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image className="w-10 h-10" source={require("../public/icons/ui/person.png")}></Image>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
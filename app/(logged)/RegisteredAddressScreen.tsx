import { ShoppingCartToast } from "app/components/ShoppingCartToast";
import { router } from "expo-router";
import { TouchableOpacity, Image } from "react-native";
import { Button, H4, H5, H6, ScrollView, View, Text } from "tamagui";
import BottomBar from "app/components/BottomBar";

export default function RegisteredAddressScreen(){
    return(
        <View className="flex-1">
            <ScrollView className="bg-white">
            <View className='bg-white'>
                <View className="mt-10 flex flex-row justify-around items-center">
                        <H4 className="text-black">Endereços cadastrados</H4>
                    <Image className="w-20 h-20" source={require("../public/icons/tomato/TomatoNumber_One.png")}></Image>
                </View>
                <View className="mt-5">
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View className="bg-gray-200 rounded-3xl p-4 mx-2 mt-5 flex flex-row">
                            <View className="w-80">
                                <H5 className="text-black">Endereço 01</H5>
                                <H6 className="text-black">Rua 02 Bloco 31 Apt 106 Curado 4 - Jaboatão</H6>
                            </View>
                            <View>
                                <TouchableOpacity>
                                    <Image className="w-10 h-10" source={require("../public/icons/ui/edit.png")}></Image>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Image className="w-10 h-10" source={require("../public/icons/ui/delete.png")}></Image>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View className="bg-gray-200 rounded-3xl p-4 mx-2 mt-5 flex flex-row">
                            <View className="w-80">
                                <H5 className="text-black">Endereço 02</H5>
                                <H6 className="text-black">Rua 02 Bloco 31 Apt 106 Curado 4 - Jaboatão</H6>
                            </View>
                            <View>
                                <TouchableOpacity>
                                    <Image className="w-10 h-10" source={require("../public/icons/ui/edit.png")}></Image>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Image className="w-10 h-10" source={require("../public/icons/ui/delete.png")}></Image>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View className="bg-gray-200 rounded-3xl p-4 mx-2 mt-5 flex flex-row">
                            <View className="w-80">
                                <H5 className="text-black">Endereço 03</H5>
                                <H6 className="text-black">Rua 02 Bloco 31 Apt 106 Curado 4 - Jaboatão</H6>
                            </View>
                            <View>
                                <TouchableOpacity>
                                    <Image className="w-10 h-10" source={require("../public/icons/ui/edit.png")}></Image>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Image className="w-10 h-10" source={require("../public/icons/ui/delete.png")}></Image>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View className="bg-gray-200 rounded-3xl p-4 mx-2 mt-5 flex flex-row">
                            <View className="w-80">
                                <H5 className="text-black">Endereço 04</H5>
                                <H6 className="text-black">Rua 02 Bloco 31 Apt 106 Curado 4 - Jaboatão</H6>
                            </View>
                            <View>
                                <TouchableOpacity>
                                    <Image className="w-10 h-10" source={require("../public/icons/ui/edit.png")}></Image>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Image className="w-10 h-10" source={require("../public/icons/ui/delete.png")}></Image>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View className="bg-gray-200 rounded-3xl p-4 mx-2 mt-5 flex flex-row">
                            <View className="w-80">
                                <H5 className="text-black">Endereço 05</H5>
                                <H6 className="text-black">Rua 02 Bloco 31 Apt 106 Curado 4 - Jaboatão</H6>
                            </View>
                            <View>
                                <TouchableOpacity>
                                    <Image className="w-10 h-10" source={require("../public/icons/ui/edit.png")}></Image>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Image className="w-10 h-10" source={require("../public/icons/ui/delete.png")}></Image>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View className="p-4 mx-2 mt-5 flex items-center">
                            <TouchableOpacity className="flex items-center">
                                <H4 className="text-black">Adicionar novo endereço</H4>
                                <Image className="w-20 h-20" source={require("../public/icons/ui/plus.png")}></Image>
                            </TouchableOpacity>
                        </View>
                        <View className="flex flex-row justify-around items-center my-5">
                            <Button className="bg-green-500 w-40">
                                <Text className="text-xs text-white">Vou retirar no local</Text>
                            </Button>
                            <Button onPress={()=>{
                                router.push("PaymentScreen")
                            }} className="bg-orange-500 w-40">
                                <Text className="text-white">Continuar</Text>
                            </Button>
                        </View>
                    </ScrollView>
                    </View>
                </View>
            </ScrollView>
            <BottomBar screen="RegisteredAddressScreen"></BottomBar>
        </View>
    )
}
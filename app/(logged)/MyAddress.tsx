import { router } from "expo-router";
import { TouchableOpacity, Image, ScrollView, View, } from "react-native";
import { Button, H4, H5, H6, Text } from "tamagui";
import BottomBar from "app/components/BottomBar";

export default function MyAddress(){
    return(
        <View className="flex-1">
            <ScrollView className="bg-white">
            <View className='bg-white'>
                <View className="mt-10 flex flex-row justify-around items-center">
                        <H4 className="text-black">Meus Endereços</H4>
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
                            <TouchableOpacity onPress={()=>{
                                router.push('RegisterNewAddressScreen')
                            }} className="flex flex-row items-center justify-center">
                                <H4 className="text-black">Adicionar novo endereço</H4>
                                <Image className="w-10 h-10" source={require("../public/icons/ui/plus.png")}></Image>
                            </TouchableOpacity>
                        </View>
                        
                    </ScrollView>
                    </View>
                </View>
            </ScrollView>
            <BottomBar screen="MyAddress"></BottomBar>
        </View>
    )
}
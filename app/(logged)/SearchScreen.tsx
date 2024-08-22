import { router } from "expo-router";
import { TouchableOpacity, Image, ScrollView, View } from "react-native";
import { H4, H6, Input, Text } from "tamagui";
import BottomBar from "app/components/BottomBar";

export default function SearchScreen(){
    return (
        <View className="flex-1">
            <ScrollView>
            <View className='bg-white'>
                <View className="mt-10 flex flex-row justify-around items-center">
                        <H4 className="text-black">Pesquisa</H4>
                    <Image className="w-20 h-20" source={require("../public/icons/tomato/TomatoShopping.png")}></Image>
                </View>
                <View className="flex items-center my-3 p-3">
                    <Input className="bg-slate-200 text-black w-11/12 border-transparent" placeholder="Busque por pratos, restaurantes e categorias"></Input>
                </View>
                <View>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View className="flex justify-center flex-row flex-wrap">
                            <TouchableOpacity onPress={()=>{
                                router.push('RestaurantScreen')
                            }} className="bg-orange-300 rounded-3xl p-2 mr-2">
                                <Image className="w-40 h-24 rounded-lg" source={require("../public/images/slide01.jpg")}></Image>
                                <Text className="text-white text-center">Pizzaria Poggers</Text>
                            </TouchableOpacity>
                            <View className="bg-orange-300 rounded-3xl p-2 mr-1">
                                <Image className="w-40 h-24 rounded-lg" source={require("../public/images/slide01.jpg")}></Image>
                                <Text className="text-white text-center">Hamburgueria</Text>
                            </View>
                            <View className="bg-orange-300 rounded-3xl p-2 mr-2 mt-2">
                                <Image className="w-40 h-24 rounded-lg" source={require("../public/images/slide01.jpg")}></Image>
                                <Text className="text-white text-center">Pizzaria Poggers</Text>
                            </View>
                            <View className="bg-orange-300 rounded-3xl p-2 mr-1 mt-2">
                                <Image className="w-40 h-24 rounded-lg" source={require("../public/images/slide01.jpg")}></Image>
                                <Text className="text-white text-center">Pizzaria Poggers</Text>
                            </View>
                            <View className="bg-orange-300 rounded-3xl p-2 mr-2 mt-2">
                                <Image className="w-40 h-24 rounded-lg" source={require("../public/images/slide01.jpg")}></Image>
                                <Text className="text-white text-center">Pizzaria Poggers</Text>
                            </View>
                            <View className="bg-orange-300 rounded-3xl p-2 mr-1 mt-2">
                                <Image className="w-40 h-24 rounded-lg" source={require("../public/images/slide01.jpg")}></Image>
                                <Text className="text-white text-center">Pizzaria Poggers</Text>
                            </View>
                            <View className="bg-orange-300 rounded-3xl p-2 mr-2 mt-2">
                                <Image className="w-40 h-24 rounded-lg" source={require("../public/images/slide01.jpg")}></Image>
                                <Text className="text-white text-center">Pizzaria Poggers</Text>
                            </View>
                            <View className="bg-orange-300 rounded-3xl p-2 mr-1 mt-2">
                                <Image className="w-40 h-24 rounded-lg" source={require("../public/images/slide01.jpg")}></Image>
                                <Text className="text-white text-center">Restaurante Japonês</Text>
                            </View>
                            <View className="bg-orange-300 rounded-3xl p-2 mr-1 mt-2">
                                <Image className="w-40 h-24 rounded-lg" source={require("../public/images/slide01.jpg")}></Image>
                                <Text className="text-white text-center">Kin Jin Pin</Text>
                            </View>
                        </View>
                    </ScrollView>
                    </View>
                </View>
            </ScrollView>
            <BottomBar screen="SearchScreen"></BottomBar>
        </View>
    )
}
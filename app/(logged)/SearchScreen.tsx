import { router } from "expo-router";
import { TouchableOpacity, Image } from "react-native";
import { H4, H6, Input, ScrollView, View, Text } from "tamagui";

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
                    <Input className="bg-white text-black w-11/12" placeholder="Busque por pratos, restaurantes e categorias"></Input>
                </View>
                <View>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View className="flex justify-center flex-row flex-wrap">
                            <TouchableOpacity onPress={()=>{
                                router.push('RestaurantScreen')
                            }} className="bg-white rounded-3xl p-2">
                                <Image className="w-40 h-24 rounded-lg" source={require("../public/images/slide01.jpg")}></Image>
                                <Text className="text-black text-center">Pizzaria Poggers</Text>
                            </TouchableOpacity>
                            <View className="bg-white rounded-3xl p-2">
                                <Image className="w-40 h-24 rounded-lg" source={require("../public/images/slide01.jpg")}></Image>
                                <Text className="text-black text-center">Hamburgueria</Text>
                            </View>
                            <View className="bg-white rounded-3xl p-2">
                                <Image className="w-40 h-24 rounded-lg" source={require("../public/images/slide01.jpg")}></Image>
                                <Text className="text-black text-center">Pizzaria Poggers</Text>
                            </View>
                            <View className="bg-white rounded-3xl p-2 mr-1">
                                <Image className="w-40 h-24 rounded-lg" source={require("../public/images/slide01.jpg")}></Image>
                                <Text className="text-black text-center">Pizzaria Poggers</Text>
                            </View>
                            <View className="bg-white rounded-3xl p-2 mr-1">
                                <Image className="w-40 h-24 rounded-lg" source={require("../public/images/slide01.jpg")}></Image>
                                <Text className="text-black text-center">Pizzaria Poggers</Text>
                            </View>
                            <View className="bg-white rounded-3xl p-2 mr-1">
                                <Image className="w-40 h-24 rounded-lg" source={require("../public/images/slide01.jpg")}></Image>
                                <Text className="text-black text-center">Pizzaria Poggers</Text>
                            </View>
                            <View className="bg-white rounded-3xl p-2 mr-1">
                                <Image className="w-40 h-24 rounded-lg" source={require("../public/images/slide01.jpg")}></Image>
                                <Text className="text-black text-center">Pizzaria Poggers</Text>
                            </View>
                            <View className="bg-white rounded-3xl p-2 mr-1">
                                <Image className="w-40 h-24 rounded-lg" source={require("../public/images/slide01.jpg")}></Image>
                                <Text className="text-black text-center">Restaurante Japonês</Text>
                            </View>
                            <View className="bg-white rounded-3xl p-2 mr-1">
                                <Image className="w-40 h-24 rounded-lg" source={require("../public/images/slide01.jpg")}></Image>
                                <Text className="text-black text-center">Kin Jin Pin</Text>
                            </View>
                        </View>
                    </ScrollView>
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
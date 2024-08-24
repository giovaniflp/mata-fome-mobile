import { router } from "expo-router";
import { TouchableOpacity, Image, ScrollView, View } from "react-native";
import { H4, Text } from "tamagui";
import BottomBar from "app/components/BottomBar";

export default function RestaurantScreen(){
    return(
        <View className="flex-1">
            <ScrollView>
            <View className='bg-white'>
                <View className="mt-10 flex flex-row justify-around items-center">
                        <H4 className="text-black">Alimentos</H4>
                    <Image className="w-20 h-20" source={require("../public/icons/tomato/TomatoCoffee.png")}></Image>
                </View>
                <View className="mt-5">
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View className="flex justify-center flex-row flex-wrap">
                            <TouchableOpacity onPress={()=>{
                                router.push('ProductDescription')
                            }} className="bg-orange-300 rounded-3xl p-2">
                                <Image className="w-40 h-24 rounded-lg" source={require("../public/images/slide01.jpg")}></Image>
                                <Text className="text-white text-center">Hambúrguer</Text>
                            </TouchableOpacity>
                            <View className="bg-orange-300 rounded-3xl p-2 ml-2">
                                <Image className="w-40 h-24 rounded-lg" source={require("../public/images/slide01.jpg")}></Image>
                                <Text className="text-white text-center">Frango</Text>
                            </View>
                            <View className="bg-orange-300 rounded-3xl p-2 mr-2 mt-2">
                                <Image className="w-40 h-24 rounded-lg" source={require("../public/images/slide01.jpg")}></Image>
                                <Text className="text-white text-center">Pizza</Text>
                            </View>
                            <View className="bg-orange-300 rounded-3xl p-2 mr-2 mt-2">
                                <Image className="w-40 h-24 rounded-lg" source={require("../public/images/slide01.jpg")}></Image>
                                <Text className="text-white text-center">Batata frita</Text>
                            </View>
                            <View className="bg-orange-300 rounded-3xl p-2 mr-2 mt-2">
                                <Image className="w-40 h-24 rounded-lg" source={require("../public/images/slide01.jpg")}></Image>
                                <Text className="text-white text-center">Batata frita</Text>
                            </View>
                            <View className="bg-orange-300 rounded-3xl p-2 mr-2 mt-2">
                                <Image className="w-40 h-24 rounded-lg" source={require("../public/images/slide01.jpg")}></Image>
                                <Text className="text-white text-center">Batata frita</Text>
                            </View>
                            <View className="bg-orange-300 rounded-3xl p-2 mr-2 mt-2">
                                <Image className="w-40 h-24 rounded-lg" source={require("../public/images/slide01.jpg")}></Image>
                                <Text className="text-white text-center">Batata frita</Text>
                            </View>
                            <View className="bg-orange-300 rounded-3xl p-2 mr-2 mt-2">
                                <Image className="w-40 h-24 rounded-lg" source={require("../public/images/slide01.jpg")}></Image>
                                <Text className="text-white text-center">Batata frita</Text>
                            </View>
                            <View className="bg-orange-300 rounded-3xl p-2 mr-2 mt-2">
                                <Image className="w-40 h-24 rounded-lg" source={require("../public/images/slide01.jpg")}></Image>
                                <Text className="text-white text-center">Batata frita</Text>
                            </View>
                            <View className="bg-orange-300 rounded-3xl p-2 mr-2 mt-2">
                                <Image className="w-40 h-24 rounded-lg" source={require("../public/images/slide01.jpg")}></Image>
                                <Text className="text-white text-center">Batata frita</Text>
                            </View>
                        </View>
                    </ScrollView>
                    </View>
                </View>
            </ScrollView>
            <BottomBar screen="RestaurantScreen"></BottomBar>
        </View>
    )
}
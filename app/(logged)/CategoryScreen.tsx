import { router } from "expo-router";
import { TouchableOpacity, Image } from "react-native";
import { ScrollView, View, Text, H4, Input } from "tamagui";

export default function CategoryScreen(){
    return(
        <View className="flex-1">
            <ScrollView showsVerticalScrollIndicator={false}>
            <View className='bg-white'>
                <View className="mt-10 flex flex-row justify-around items-center">
                        <H4 className="text-black">Categorias</H4>
                    <Image className="w-20 h-20" source={require("../public/images/BrandIcon.png")}></Image>
                </View>
                <View>
                    <ScrollView className="mt-5" showsVerticalScrollIndicator={false}>
                        <View className="flex justify-center flex-row flex-wrap">
                            <TouchableOpacity onPress={()=>{
                                router.push('CategoryFilteredScreen')
                            }} className="bg-white rounded-3xl p-2">
                                <Image className="w-96 h-28 rounded-lg" source={require("../public/images/slide01.jpg")}></Image>
                            </TouchableOpacity>
                            <TouchableOpacity className="bg-white rounded-3xl p-2">
                                <Image className="w-96 h-28 rounded-lg" source={require("../public/images/slide01.jpg")}></Image>
                            </TouchableOpacity>
                            <TouchableOpacity className="bg-white rounded-3xl p-2">
                                <Image className="w-96 h-28 rounded-lg" source={require("../public/images/slide01.jpg")}></Image>
                            </TouchableOpacity>
                            <TouchableOpacity className="bg-white rounded-3xl p-2">
                                <Image className="w-96 h-28 rounded-lg" source={require("../public/images/slide01.jpg")}></Image>
                            </TouchableOpacity>
                            <TouchableOpacity className="bg-white rounded-3xl p-2">
                                <Image className="w-96 h-28 rounded-lg" source={require("../public/images/slide01.jpg")}></Image>
                            </TouchableOpacity>
                            <TouchableOpacity className="bg-white rounded-3xl p-2">
                                <Image className="w-96 h-28 rounded-lg" source={require("../public/images/slide01.jpg")}></Image>
                            </TouchableOpacity>
                            <TouchableOpacity className="bg-white rounded-3xl p-2">
                                <Image className="w-96 h-28 rounded-lg" source={require("../public/images/slide01.jpg")}></Image>
                            </TouchableOpacity>
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
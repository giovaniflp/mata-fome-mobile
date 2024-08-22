import { router } from "expo-router";
import { TouchableOpacity, Image, ScrollView, View } from "react-native";
import { Text, H4, Input } from "tamagui";
import BottomBar from "app/components/BottomBar";

export default function CategoryScreen(){
    return(
        <View className="flex-1">
            <ScrollView showsVerticalScrollIndicator={false}>
            <View className='bg-white'>
                <View className="mt-10 flex flex-row justify-around items-center bg-orange-300 rounded-3xl mr-3 ml-3">
                        <H4 className="text-black">Categorias</H4>
                    <Image className="w-20 h-20" source={require("../public/icons/tomato/TomatoChef.png")}></Image>
                </View>
                <View>
                    <ScrollView className="mt-5 mr-6 ml-6 " showsVerticalScrollIndicator={false}>
                        <View className="flex justify-center flex-row flex-wrap">
                            <TouchableOpacity onPress={()=>{
                                router.push('CategoryFilteredScreen')
                            }} className="bg-orange-300 rounded-3xl p-2">
                                <Image className="w-96 h-28 rounded-lg" source={require("../public/images/slide01.jpg")}></Image>
                            </TouchableOpacity>
                            <TouchableOpacity className="bg-orange-300 rounded-3xl p-2 mt-2">
                                <Image className="w-96 h-28 " source={require("../public/images/slide01.jpg")}></Image>
                            </TouchableOpacity>
                            <TouchableOpacity className="bg-orange-300 rounded-3xl p-2 mt-2">
                                <Image className="w-96 h-28 rounded-lg" source={require("../public/images/slide01.jpg")}></Image>
                            </TouchableOpacity>
                            <TouchableOpacity className="bg-orange-300 rounded-3xl p-2 mt-2">
                                <Image className="w-96 h-28 rounded-lg" source={require("../public/images/slide01.jpg")}></Image>
                            </TouchableOpacity>
                            <TouchableOpacity className="bg-orange-300 rounded-3xl p-2 mt-2">
                                <Image className="w-96 h-28 rounded-lg" source={require("../public/images/slide01.jpg")}></Image>
                            </TouchableOpacity>
                            <TouchableOpacity className="bg-orange-300 rounded-3xl p-2 mt-2">
                                <Image className="w-96 h-28 rounded-lg" source={require("../public/images/slide01.jpg")}></Image>
                            </TouchableOpacity>
                            <TouchableOpacity className="bg-orange-300 rounded-3xl p-2 mt-2">
                                <Image className="w-96 h-28 rounded-lg" source={require("../public/images/slide01.jpg")}></Image>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                    </View>
                </View>
            </ScrollView>
            <BottomBar screen="CategoryScreen"></BottomBar>
        </View>
    )
}
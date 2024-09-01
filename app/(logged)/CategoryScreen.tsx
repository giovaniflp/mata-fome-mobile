import { router } from "expo-router";
import { TouchableOpacity, Image, ScrollView, View } from "react-native";
import { Text, H4, Input } from "tamagui";
import BottomBar from "app/components/BottomBar";

export default function CategoryScreen(){
    return(
        <View className="flex-1">
            <ScrollView showsVerticalScrollIndicator={false}>
            <View className='bg-white mb-8'>
                <View className="mt-10 flex flex-row justify-around items-center">
                        <H4 className="text-black">Categorias</H4>
                    <Image className="w-20 h-20" source={require("../public/icons/tomato/TomatoChef.png")}></Image>
                </View>
                <View className="flex flex-row flex-wrap justify-center gap-4 mt-2 ">
                            <View className="bg-orange-300 rounded-3xl p-2 ml-2">
                                    <Image className="w-36 h-36 rounded-lg" source={require("../public/images/slide01.jpg")}></Image>
                                    <Text className="text-white text-center">Ver mais +</Text>
                            </View>
                            <View className="bg-orange-300 rounded-3xl p-2 ml-2">
                                    <Image className="w-36 h-36 rounded-lg" source={require("../public/images/slide01.jpg")}></Image>
                                    <Text className="text-white text-center">Ver mais +</Text>
                            </View>
                            <View className="bg-orange-300 rounded-3xl p-2 ml-2">
                                    <Image className="w-36 h-36 rounded-lg" source={require("../public/images/slide01.jpg")}></Image>
                                    <Text className="text-white text-center">Ver mais +</Text>
                            </View>
                            <TouchableOpacity onPress={()=>{
                                router.push("/CategoryScreen")
                            }} className="bg-orange-300 rounded-3xl p-2 ml-2">
                                    <Image className="w-36 h-36 rounded-lg" source={require("../public/images/slide01.jpg")}></Image>
                                    <Text className="text-white text-center">Ver mais +</Text>
                            </TouchableOpacity>
                        </View>
                </View>
            </ScrollView>
            
            <BottomBar screen="CategoryScreen"></BottomBar>
        </View>
    )
}
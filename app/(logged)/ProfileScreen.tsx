import { View, Avatar, ScrollView, H3, H4, H5, H6, Button } from "tamagui";
import { Image, TouchableOpacity } from "react-native";
import { router } from "expo-router";

export default function ProfileScreen(){
    return(
        <View className="flex-1">
            <ScrollView>
                <View className="flex items-center">
                    <Image source={require("../public/images/slide01.jpg")} className="w-40 h-40 rounded-full"></Image>
                </View>
                <View className="flex items-center">
                    <H3>Prodigy Rick</H3>
                </View>
                <View>
                    <Button onPress={()=>{
                        router.push('OrderHistory')
                    }} className="bg-black text-white" icon={<Image className="w-5 h-5" source={require("../public/icons/ui/order.png")}></Image>}>Pedidos realizados</Button>
                    <Button onPress={()=>{
                        router.push('CartScreen')
                    }} className="bg-black text-white" icon={<Image className="w-5 h-5" source={require("../public/icons/ui/shoppingCart.png")}></Image>}>Meu carrinho</Button>
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
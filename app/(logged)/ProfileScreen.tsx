import { View, Avatar, ScrollView, H3, H4, H5, H6, Button, Text } from "tamagui";
import { Image, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import BottomBar from "app/components/BottomBar";

export default function ProfileScreen(){
    return(
        <View className="flex-1">
            <ScrollView className="bg-white">
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
                    <Text className="text-blue-400 underline">Preciso de Suporte</Text>
                </View>
            </ScrollView>
            <BottomBar screen="ProfileScreen"></BottomBar>
        </View>
    )
}
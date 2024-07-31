import { View, Avatar, ScrollView, H3, H4, H5, H6, Button, Text } from "tamagui";
import { Image, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import BottomBar from "app/components/BottomBar";

export default function ProfileScreen(){
    return(
        <View className="flex-1">
            <ScrollView className="bg-white">
                <View className="flex items-center mt-10">
                    <Image source={require("../public/images/slide01.jpg")} className="w-40 h-40 rounded-full"></Image>
                </View>
                <View className="flex items-center my-5">
                    <H3 className="text-black">Prodigy Rick</H3>
                </View>
                <View className="flex items-center">
                    <Button onPress={()=>{
                        router.push('OrderHistory')
                    }} className="bg-black text-white w-60 mb-2" icon={<Image className="w-5 h-5" source={require("../public/icons/ui/order.png")}></Image>}>Pedidos realizados</Button>
                    <Button onPress={()=>{
                        router.push('CartScreen')
                    }} className="bg-black text-white w-60 mb-2" icon={<Image className="w-5 h-5" source={require("../public/icons/ui/shoppingCart.png")}></Image>}>Meu carrinho</Button>
                    <Button onPress={()=>{
                        router.push('NotificationScreen')
                    }} className="bg-black text-white w-60 mb-2" icon={<Image className="w-5 h-5" source={require("../public/icons/ui/notification.png")}></Image>}>Notificações no App</Button>
                    <Button onPress={()=>{
                        router.push('SupportScreen')
                    }} className="bg-black text-white w-60" icon={<Image className="w-10 h-10" source={require("../public/icons/tomato/TomatoSupport.png")}></Image>}>Suporte</Button>
                </View>
            </ScrollView>
            <BottomBar screen="ProfileScreen"></BottomBar>
        </View>
    )
}
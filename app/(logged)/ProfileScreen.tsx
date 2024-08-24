import { Avatar, H3, H4, H5, H6, Button, Text } from "tamagui";
import { Image, TouchableOpacity, ScrollView, View } from "react-native";
import { router } from "expo-router";
import BottomBar from "app/components/BottomBar";
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from "react";
import axiosInstance from "app/config/axiosUrlConfig";

export default function ProfileScreen(){

    const[token, setToken] = useState('');
    const[username, setUsername] = useState('');
    const[idUser, setIdUser] = useState('');

    const getUsername = async () => {

        const tokenStorage = await SecureStore.getItemAsync('token') || '';
        const usernameStorage = await SecureStore.getItemAsync('username') || '';
        const idUserStorage = await SecureStore.getItemAsync('idUser') || '';

        const tokenParse = JSON.parse(tokenStorage);
        const usernameParse = JSON.parse(usernameStorage);
        const idUserParse = JSON.parse(idUserStorage);

        try{
            await axiosInstance.get(`/api/cliente/${idUserParse}`).then((response)=>{
                setUsername(response.data.nome)
            })
        }
        catch(e){
            alert(e)
        }
    }

    useEffect(()=>{
        getUsername();
    },[])

    const logoutAccount = async () => {
        await SecureStore.deleteItemAsync('token');
        await SecureStore.deleteItemAsync('username');
        await SecureStore.deleteItemAsync('idUser');
        router.push('/')
    }

    return(
        <View className="flex-1 bg-white">
            <ScrollView className="bg-white">
                <View className="flex items-center mt-10">
                    <Image source={require("../public/images/slide01.jpg")} className="w-40 h-40 rounded-full"></Image>
                </View>
                <View className="flex items-center my-5">
                    <H3 className="text-black">{username}</H3>
                </View>
                <View className="flex items-center">
                    <Button onPress={()=>{
                        router.push('OrderHistory')
                    }} className="bg-black text-white w-60 mb-2" icon={<Image className="w-5 h-5" source={require("../public/icons/ui/order.png")}></Image>}>Pedidos realizados</Button>
                    <Button onPress={()=>{
                        router.push('CartScreen')
                    }} className="bg-black text-white w-60 mb-2 mt-3" icon={<Image className="w-5 h-5" source={require("../public/icons/ui/shoppingCart.png")}></Image>}>Meu carrinho</Button>
                    <Button onPress={()=>{
                        router.push('MyAddress')
                    }} className="bg-black text-white w-60 mb-2 mt-3" icon={<Image className="w-5 h-5" source={require("../public/icons/ui/pinDrop.png")}></Image>}>Meus endereços</Button>
                    <Button onPress={()=>{
                        router.push('PaymentScreen')
                    }} className="bg-black text-white w-60 mb-2 mt-3" icon={<Image className="w-5 h-5" source={require("../public/icons/ui/creditCard.png")}></Image>}>Formas de pagamento</Button>
                    <Button onPress={()=>{
                        router.push('NotificationScreen')
                    }} className="bg-black text-white w-60 mb-2 mt-3" icon={<Image className="w-5 h-5" source={require("../public/icons/ui/notification.png")}></Image>}>Notificações no App</Button>
                    <Button onPress={()=>{
                        router.push('SupportScreen')
                    }} className="bg-black text-white w-60 mb-2 mt-3" icon={<Image className="w-10 h-10" source={require("../public/icons/tomato/TomatoSupport.png")}></Image>}>Suporte</Button>
                    <Button onPress={logoutAccount} className="bg-red-500 text-white w-60 mt-3"  icon={<Image className="w-5 h-5" source={require("../public/icons/ui/logout.png")}></Image>}>Deslogar da conta</Button>
                </View>
            </ScrollView>
            <BottomBar screen="ProfileScreen"></BottomBar>
        </View>
    )
}
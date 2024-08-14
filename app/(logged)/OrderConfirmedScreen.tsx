import { H1, H5, H6 } from "tamagui";
import { Image, View } from "react-native";
import { router } from "expo-router";
import { useEffect } from "react";

export default function OrderConfirmedScreen(){

    useEffect(()=>{
        setTimeout(()=>{
            router.push('HomeScreen')
        }, 5000)
    }, [])

    return(
        <View className='h-full bg-white flex justify-center'>
            <View className='flex justify-center items-center'>
                <Image source={require("../public/icons/tomato/TomatoOrder.png")} className="w-40 h-40"></Image>
                <H1 className="text-black mb-2 mt-10">Pedido feito!</H1>
                <H6 className="text-black text-xs text-center">O recibo da compra será enviado por E-mail e será disponibilizado no aplicativo também.</H6>
                <H5 className="text-orange-500 text-center text-xs mt-10">Você será redirecionado para a página inicial.</H5>
            </View>
        </View>
    )
}
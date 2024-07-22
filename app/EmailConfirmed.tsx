import { View, H1, H6 } from "tamagui";
import { Image } from "react-native";
import { router } from "expo-router";
import { useEffect } from "react";

export default function EmailConfirmed(){

    useEffect(()=>{
        setTimeout(()=>{
            router.push('/Login')
        }, 3000)
    }, [])

    return(
        <View className='h-full bg-white flex justify-center'>
            <View className='flex justify-center items-center'>
                <Image source={require("./public/images/BrandIcon.png")} className="w-40 h-40"></Image>
                <H1 className="text-black mb-2 mt-10">Tudo certo!</H1>
                <H6 className="text-black text-xs text-center">Seu e-mail foi confirmado com sucesso! Você será redirecionado agora.</H6>
            </View>
        </View>
    )
}
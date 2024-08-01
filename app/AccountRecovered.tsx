import { Image, View } from "react-native";
import { H1, H6 } from "tamagui";
import { useEffect } from "react";
import { router } from "expo-router";

export default function AccountRecovered(){

    useEffect(()=>{
        setTimeout(()=>{
            router.push('/')
        }, 3000)
    }, [])

    return(
        <View className='h-full bg-white flex justify-center'>
            <View className='flex justify-center items-center'>
                <Image source={require("./public/icons/tomato/TomatoLike_Heart.png")} className="w-40 h-40"></Image>
                <H1 className="text-black mb-2 mt-10">Tudo certo!</H1>
                <H6 className="text-black text-xs text-center">Sua senha foi alterada com sucesso, você será redirecionado agora.</H6>
            </View>
        </View>
    )
}
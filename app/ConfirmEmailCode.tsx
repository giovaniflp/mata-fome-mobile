import { H2, Input, Button  } from "tamagui";
import { Image, ScrollView, View } from "react-native";
import { router } from "expo-router";
import { ToastControl } from "./CurrentToast";

export default function ConfirmEmailCode(){
    return(
        <ScrollView className="bg-white">
            <View className='h-full bg-white flex justify-between'>
                <View className="mt-40">
                    <View className='flex justify-center items-center'>
                        <Image source={require("./public/icons/tomato/TomatoPhone.png")} className="w-40 h-40"></Image>
                    </View>
                    <H2 className="text-center text-orange-500 p-5">Informe o código recebido no e-mail</H2>
                    <View className="flex items-center">
                        <View>
                            <Input className="w-80 bg-white text-black" placeholder="Código de 5 dígitos"></Input>
                        </View>
                    </View>
                    <View className="flex items-start ml-10 mt-4">
                        <ToastControl/>
                    </View>
                </View>
                <View className="flex items-center mt-56">
                    <Button onPress={()=>{
                        router.push('/EmailConfirmed')
                    }} className='w-60 bg-orange-500 rounded-3xl text-white'>Enviar código</Button>
                </View>
            </View>
        </ScrollView>
    )
}
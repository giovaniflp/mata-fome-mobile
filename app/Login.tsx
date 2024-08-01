import { H2, H6, Input, Button  } from "tamagui"
import { Image, TouchableOpacity, ScrollView, View } from "react-native"
import { router } from "expo-router"

export default function Login(){

    const GoogleIcon = require("./public/icons/ui/googleIcon.png")

    return(
        <ScrollView className="bg-white">
            <View className='bg-white mt-20'>
            <View className='flex justify-center items-center'>
                <Image source={require("./public/icons/tomato/TomatoNotebook.png")} className="w-40 h-40"></Image>
            </View>
            <H2 className="text-center text-orange-500">Entrar</H2>
            <View className="flex items-center mt-8">
                <View>
                    <H6 className="text-black">Email</H6>
                    <Input className="w-80 bg-white text-black" placeholder="Digite seu e-mail"></Input>
                </View>
                <View className="mt-4">
                    <H6 className="text-black">Senha</H6>
                    <Input className="w-80 bg-white text-black" placeholder="Digite sua senha" secureTextEntry></Input>
                </View>
                <Button onPress={()=>{
                    router.push('/HomeScreen')
                }} className='w-60 bg-orange-500 rounded-3xl mt-8 text-white'>Entrar</Button>
                <H6 className="text-black text-center my-8 w-20">Ou</H6>
                <Button icon={<Image source={GoogleIcon} className="w-7 h-7"></Image>} className="bg-orange-500 text-white">Logar com o Google</Button>
                <TouchableOpacity onPress={()=>{
                    router.push('/LostPassword')
                }}>
                    <H6 className="text-blue-400 underline mt-8">Esqueceu a senha?</H6>
                </TouchableOpacity>
            </View>
        </View>
        </ScrollView>
    )
}
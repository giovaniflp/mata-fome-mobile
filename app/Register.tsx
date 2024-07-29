import { View, H2, H6, Input, Button } from "tamagui"
import { Image } from "react-native"
import { router } from "expo-router"

export default function Register(){
    return(
        <View className='h-full bg-white flex justify-center'>
            <View className='flex justify-center items-center'>
                <Image source={require("./public/icons/tomato/TomatoPhone.png")} className="w-40 h-40"></Image>
            </View>
            <H2 className="text-center text-orange-500">Registrar</H2>
            <View className="flex items-center mt-4">
                <View>
                    <H6 className="text-black">Nome</H6>
                    <Input className="w-80 bg-white text-black" placeholder="Digite seu nome"></Input>
                </View>
                <View className="mt-4">
                    <H6 className="text-black">Email</H6>
                    <Input className="w-80 bg-white text-black" placeholder="Digite seu e-mail"></Input>
                </View>
                <View className="mt-4">
                    <H6 className="text-black">Senha</H6>
                    <Input className="w-80 bg-white text-black" placeholder="Digite sua senha" secureTextEntry></Input>
                </View>
                <View className="mt-4">
                    <H6 className="text-black">Confirmar senha</H6>
                    <Input className="w-80 bg-white text-black" placeholder="Confirme sua senha" secureTextEntry></Input>
                </View>
                <View className="mt-4">
                    <H6 className="text-black">Telefone</H6>
                    <Input className="w-80 bg-white text-black" placeholder="Digite seu número"></Input>
                </View>
                <Button onPress={()=>{
                    router.push('/ConfirmEmailCode')
                }} className='w-60 bg-orange-500 rounded-3xl mt-8 text-white'>Enviar</Button>
            </View>
        </View>
    )
}
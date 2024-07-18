import { View, H2, H6, Input, Button } from "tamagui"
import { Image } from "react-native"

export default function Login(){
    return(
        <View className='h-full bg-white flex justify-center'>
            <View className='flex justify-center items-center'>
                <Image source={require("./public/images/BrandIcon.png")} className="w-40 h-40"></Image>
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
                <Button className='w-60 bg-orange-500 rounded-3xl mt-8'>Entrar</Button>
                <H6 className="text-black my-8">Ou</H6>
                <Button className="bg-orange-500">Logar com o Google</Button>
                <H6 className="text-blue-400 underline mt-8">Esqueceu a senha?</H6>
            </View>
        </View>
    )
}
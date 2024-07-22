import { router } from "expo-router"
import { Button, H2, H6, Input, ScrollView, View } from "tamagui"
import { Image } from "react-native"

export default function RedefinePassword(){
    return(
        <ScrollView className="bg-white">
            <View className='h-full bg-white flex justify-between'>
                <View className="mt-40">
                    <View className='flex justify-center items-center'>
                        <Image source={require("./public/images/BrandIcon.png")} className="w-40 h-40"></Image>
                    </View>
                    <H2 className="text-center text-orange-500 p-5">Redefina sua senha</H2>
                    <View className="flex items-center gap-5">
                        <View>
                            <H6 className="text-black">Nova senha</H6>
                            <Input className="w-80 bg-white text-black" placeholder="Digite sua nova senha"></Input>
                        </View>
                        <View>
                            <H6 className="text-black">Confirme sua senha</H6>
                            <Input className="w-80 bg-white text-black" placeholder="Confirme a senha digitada anteriormente"></Input>
                        </View>
                    </View>
                </View>
                <View className="flex items-center mt-48">
                    <Button onPress={()=>{
                        router.push('/AccountRecovered')
                    }} className='w-60 bg-orange-500 rounded-3xl'>Redefinir senha</Button>
                </View>
            </View>
        </ScrollView>
    )
}
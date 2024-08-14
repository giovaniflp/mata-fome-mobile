import { H2, H6, Input, Button  } from "tamagui"
import { Image, ScrollView, View } from "react-native"
import { router } from "expo-router"
import { useState } from "react";

export default function LostPassword() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleRecoverPassword = () => {
        if (validateEmail(email)) {
            setError("");
            router.push('/RedefinePassword');
        } else {
            setError("Por favor, insira um e-mail válido.");
        }
    };

    return (
        <ScrollView className="bg-white">
            <View className='h-full bg-white flex justify-between'>
                <View className="mt-40">
                    <View className='flex justify-center items-center'>
                        <Image source={require("./public/icons/tomato/TomatoEngineer.png")} className="w-40 h-40"></Image>
                    </View>
                    <H2 className="text-center text-orange-500 p-5">Insira seu E-mail para recuperar sua conta</H2>
                    <View className="flex items-center">
                        <View>
                            <H6 className="text-black">Email</H6>
                            <Input 
                                className="w-80 bg-white text-black" 
                                placeholder="Digite seu e-mail" 
                                value={email}
                                onChangeText={setEmail}
                            />
                            {error ? <Text className="text-red-500">{error}</Text> : null}
                        </View>
                    </View>
                </View>
                <View className="flex items-center mt-60">
                    <Button onPress={handleRecoverPassword} className='w-60 bg-orange-500 rounded-3xl text-white'>
                        Recuperar
                    </Button>
                </View>
            </View>
        </ScrollView>
    );
}

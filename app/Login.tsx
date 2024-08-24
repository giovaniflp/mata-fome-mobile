import { H2, H6, Input, Button  } from "tamagui"
import { Image, TouchableOpacity, ScrollView, View, Text } from "react-native"
import { router } from "expo-router"
import React, { useState } from 'react'
import axiosInstance from "./config/axiosUrlConfig"
import * as SecureStore from 'expo-secure-store';

export default function Login() {

    const GoogleIcon = require("./public/icons/ui/googleIcon.png")
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex para validar formato de email
        return regex.test(email);
    }

    const validatePassword = (pwd) => {
        const regex = /^.*(?=.{6,16})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/;
        console.log(regex.test(pwd))
        return regex.test(pwd);
    }

    const handleLogin = () => {
        if (!validateEmail(email)) {
            setError('Por favor, insira um email válido.');
            return;
        }
        if (!validatePassword(password)) {
            setError("Senha inválida! A senha deve conter entre 6 a 16 caracteres, com pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial.");
            return;
        }
        setError('')  // Limpa o erro se o email e a senha forem válidos
        router.push('/HomeScreen')
    }

    const apiLoginUser = async() => {
        const loginRequestData = {
            username: email,
            password: password
        }
        try{
            await axiosInstance.post('/api/auth', loginRequestData).then(async(response)=>{
                console.log(response.data)
                await SecureStore.setItemAsync('token', JSON.stringify(response.data.token))
                await SecureStore.setItemAsync('username', JSON.stringify(response.data.username))
                await SecureStore.setItemAsync('idUser', JSON.stringify(response.data.idUser))
                router.push('/HomeScreen')
            })
        }
        catch(e){
            alert(e)
        }
    }

    return (
        <ScrollView className="bg-white">
            <View className='bg-white mt-20'>
            <View className='flex justify-center items-center'>
                <Image source={require("./public/icons/tomato/TomatoNotebook.png")} className="w-40 h-40"></Image>
            </View>
            <View className="flex items-center mt-8">
                <H2 className="text-center text-orange-500">ENTRAR</H2>
                <View className="flex items-center mt-8">
                    <View>
                        <H6 className="text-black">Email</H6>
                        <Input
                            className="w-80 bg-white text-black rounded shadow hover:border-orange-600"
                            placeholder="Digite seu e-mail"
                            value={email}
                            onChangeText={setEmail}
                        ></Input>
                    </View>
                    <View className="mt-4 flex items-center">
                        <View className="flex w-80">
                            <H6 className="text-black">Senha</H6>
                        </View>
                        <Input
                            className="w-80 bg-white text-black rounded shadow hover:border-orange-600"
                            placeholder="Digite sua senha"
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                        ></Input>
                        {error ? <Text className="text-red-500 mt-4 mx-14 text-xs text-center">{error}</Text> : null}
                    </View>
                    <Button onPress={apiLoginUser} className='w-60 bg-orange-500 rounded-3xl mt-8 text-white'>Entrar</Button>
                    <H6 className="text-black my-4">Ou</H6>
                    <Button onPress={()=>{
                        router.push('/HomeScreen')
                    }} icon={<Image source={GoogleIcon} className="w-7 h-7"></Image>} className="bg-orange-500 text-white">Logar com o Google</Button>
                    <TouchableOpacity onPress={() => {
                        router.push('/LostPassword')
                    }}>
                        <H6 className="text-blue-400 underline mt-8">Esqueceu a senha?</H6>
                    </TouchableOpacity>
                </View>
            </View>
            </View>
        </ScrollView>
    )
}

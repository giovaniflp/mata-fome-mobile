import { Text, Input, H4, H6 } from "tamagui";
import { Image, TouchableOpacity, ScrollView, View } from "react-native";
import Carousel from 'react-native-reanimated-carousel';
import BottomBar from "app/components/BottomBar";
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from "react";

export default function HomeScreen(){

    const[token, setToken] = useState('');
    const[username, setUsername] = useState('');
    const[idUser, setIdUser] = useState('');

    const imagesList = [
        {
            image: require("../public/images/slide01.jpg")
        },
        {
            image: require("../public/images/slide02.jpg")
        },
        {
            image: require("../public/images/slide03.jpg")
        }
    ]

    const getSecureStorageData = async () => {
        const tokenStorage = await SecureStore.getItemAsync('token') || '';
        const usernameStorage = await SecureStore.getItemAsync('username') || '';
        const idUserStorage = await SecureStore.getItemAsync('idUser') || '';

        const tokenParse = JSON.parse(tokenStorage);
        const usernameParse = JSON.parse(usernameStorage);
        const idUserParse = JSON.parse(idUserStorage);

        setToken(tokenParse);
        setUsername(usernameParse);
        setIdUser(idUserParse);
    }

    useEffect(()=>{
        getSecureStorageData();
    },[])

    return (
        <View className="flex-1">
            <ScrollView className="bg-white">
            <View className='bg-white'>
                <View className="mt-10 flex flex-row justify-around items-center">
                    <View>
                        <H4 className="text-black">Olá, {username}</H4>
                        <H6 className="text-black">Bem - Vindo(a)!</H6>
                    </View>
                    <Image className="w-20 h-20" source={require("../public/icons/tomato/TomatoAssassin.png")}></Image>
                </View>
                <View className="flex items-center my-5">
                    <Carousel
                        loop
                        mode="parallax"
                        width={384}
                        height={200}
                        autoPlay={true}
                        data={imagesList}
                        scrollAnimationDuration={1000}
                        renderItem={({ item }) => (
                            <View
                                style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                }}
                            >
                                <Image className="w-96 h-52" source={item.image}></Image>
                            </View>
                        )}
                    />
                </View>
                <View>
                    <H4 className="text-black ml-4">Tipos de comidas</H4>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <View className="flex flex-row ml-1">
                            <View className="bg-white rounded-3xl p-2">
                                <Image className="w-36 h-36 rounded-lg" source={require("../public/images/slide01.jpg")}></Image>
                                <Text className="text-black text-center">Hambúrguer</Text>
                            </View>
                            <View className="bg-white rounded-3xl p-2">
                                <Image className="w-36 h-36 rounded-lg" source={require("../public/images/slide01.jpg")}></Image>
                                <Text className="text-black text-center">Frango</Text>
                            </View>
                            <View className="bg-white rounded-3xl p-2">
                                <Image className="w-36 h-36 rounded-lg" source={require("../public/images/slide01.jpg")}></Image>
                                <Text className="text-black text-center">Pizza</Text>
                            </View>
                            <View className="bg-white rounded-3xl p-2 mr-1">
                                <Image className="w-36 h-36 rounded-lg" source={require("../public/images/slide01.jpg")}></Image>
                                <Text className="text-black text-center">Batata frita</Text>
                            </View>
                        </View>
                    </ScrollView>
                    <H4 className="text-black ml-4">Categorias</H4>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <View className="flex flex-row  ml-1">
                            <View className="bg-white rounded-3xl p-2">
                                <Image className="w-24 h-24 rounded-lg" source={require("../public/images/slide01.jpg")}></Image>
                                <Text className="text-black text-center">Bebidas</Text>
                            </View>
                            <View className="bg-white rounded-3xl p-2">
                                <Image className="w-24 h-24 rounded-lg" source={require("../public/images/slide01.jpg")}></Image>
                                <Text className="text-black text-center">Restaurantes</Text>
                            </View>
                            <View className="bg-white rounded-3xl p-2">
                                <Image className="w-24 h-24 rounded-lg" source={require("../public/images/slide01.jpg")}></Image>
                                <Text className="text-black text-center">Japonesa</Text>
                            </View>
                            <View className="bg-white rounded-3xl p-2">
                                <Image className="w-24 h-24 rounded-lg" source={require("../public/images/slide01.jpg")}></Image>
                                <Text className="text-black text-center">Brasileira</Text>
                            </View>
                            <View className="bg-white rounded-3xl p-2 mr-1">
                                <Image className="w-24 h-24 rounded-lg" source={require("../public/images/slide01.jpg")}></Image>
                                <Text className="text-black text-center">Ver mais +</Text>
                            </View>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </ScrollView>
            <BottomBar screen="HomeScreen"></BottomBar>
        </View>
    )
}
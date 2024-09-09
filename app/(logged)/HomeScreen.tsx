import BottomBar from "app/components/BottomBar";
import axiosInstance from "app/config/axiosUrlConfig";
import { router } from "expo-router";
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from "react";
import { Image, ScrollView, TouchableOpacity, View, SafeAreaView } from "react-native";
import Carousel from 'react-native-reanimated-carousel';
import { H4, H6, Text } from "tamagui";


export default function HomeScreen(){

    const[token, setToken] = useState('');
    const[username, setUsername] = useState('');
    const[idUser, setIdUser] = useState('');

    const [empresasList, setEmpresasList] = useState([]);

    const [produtoList,setProdutoList] = useState([]);

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

        setUsername(usernameParse)
    }

    useEffect(()=>{
        getSecureStorageData();
    },[])

    const apiGetEmpresa = async () => {
        try{
            await axiosInstance.get('/api/empresas').then((response)=>{
                setEmpresasList(response.data)
            })
        }
        catch(e){
            alert(e)
        }
        finally{
            
        }
    }

    useEffect(()=>{
        apiGetEmpresa();
    },[])


    const apiGetProduto = async () => {
        try{
            await axiosInstance.get('/api/produtoes').then((response)=>{
                setProdutoList(response.data)
            })
        }
        catch(e){
            alert(e)
        }
        finally{
            
        }
    }

    useEffect(()=>{
        apiGetProduto();
    },[])

    return (
        <View className="flex-1">
            <ScrollView className="bg-white">
            <View className='bg-white mb-5'>
                <View className="mt-10 flex flex-row justify-around items-center">
                    <View>
                        <H4 className="text-black" fontStyle="italic">Olá, {username}</H4>
                        <H6 className="text-black" fontStyle="italic">Bem - Vindo(a)!</H6>
                    </View>
                    <Image className="w-20 h-20" source={require("../public/icons/tomato/TomatoAssassin.png")}></Image>
                </View>
                <View className="flex items-center my-5 ">
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
                                <Image className="w-96 h-52 rounded-3xl" source={item.image}></Image>
                            </View>
                        )}
                    />
                </View>
                <View>
                    <H4 className="text-black ml-4 mt-4 mb-4" fontStyle="italic">Restaurantes</H4>
                    <ScrollView className="mt-5 mr-6 ml-6 " showsVerticalScrollIndicator={true}>
                        <View className="flex justify-center flex-row flex-wrap">
                            {
                                empresasList.map((empresa)=>{
                                    return(
                                        <TouchableOpacity key={empresa.id} onPress={()=>{
                                            router.push({
                                                pathname: "/RestaurantScreen",
                                                params: {
                                                    idEmpresa: empresa.id,
                                                    nomeEmpresa: empresa.nomeFantasia
                                                }
                                            })
                                        }} className="bg-white rounded-3xl p-2">
                                            <Image className="w-80 h-28 rounded-lg" source={require("../public/images/slide01.jpg")}></Image>
                                            <Text className="text-black text-center">{empresa.nomeFantasia}</Text>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>
                    </ScrollView>
                    <H4 className="text-black ml-4 mt-4 mb-4" fontStyle="italic">Comidas</H4>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <View className="flex flex-row ml-1">

                            <View className="bg-orange-300 rounded-3xl p-2 ml-2">
                                <Image className="w-24 h-24 rounded-lg" source={require("../public/images/slide01.jpg")}></Image>
                                <Text className="text-white text-center">Bebidas</Text>
                            </View>
                            <View className="bg-orange-300 rounded-3xl p-2 ml-2">
                                <Image className="w-24 h-24 rounded-lg" source={require("../public/images/slide01.jpg")}></Image>
                                <Text className="text-white text-center">Restaurantes</Text>
                            </View>
                            <View className="bg-orange-300 rounded-3xl p-2 ml-2">
                                <Image className="w-24 h-24 rounded-lg" source={require("../public/images/slide01.jpg")}></Image>
                                <Text className="text-white text-center">Japonesa</Text>
                            </View>
                            <View className="bg-orange-300 rounded-3xl p-2 ml-2">
                                <Image className="w-24 h-24 rounded-lg" source={require("../public/images/slide01.jpg")}></Image>
                                <Text className="text-white text-center">Brasileira</Text>
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



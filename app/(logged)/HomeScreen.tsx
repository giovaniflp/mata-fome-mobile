import BottomBar from "app/components/BottomBar";
import axiosInstance from "app/config/axiosUrlConfig";
import { router } from "expo-router";
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from "react";
import { Image, ScrollView, TouchableOpacity, View, SafeAreaView } from "react-native";
import Carousel from 'react-native-reanimated-carousel';
import { H4, H6, Text } from "tamagui";

export default function HomeScreen() {
    const [token, setToken] = useState('');
    const [username, setUsername] = useState('');
    const [idUser, setIdUser] = useState('');
    const [empresasList, setEmpresasList] = useState([]);
    const [comidaList, setComidaList] = useState([]); // Para armazenar produtos

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
    ];

    const getSecureStorageData = async () => {
        const tokenStorage = await SecureStore.getItemAsync('token') || '';
        const usernameStorage = await SecureStore.getItemAsync('username') || '';
        const idUserStorage = await SecureStore.getItemAsync('idUser') || '';

        const tokenParse = JSON.parse(tokenStorage);
        const usernameParse = JSON.parse(usernameStorage);
        const idUserParse = JSON.parse(idUserStorage);

        setUsername(usernameParse)
    };

    useEffect(() => {
        getSecureStorageData();
    }, []);

    // Função para buscar empresas
    const apiGetEmpresa = async () => {
        try {
            const response = await axiosInstance.get('/api/empresas');
            setEmpresasList(response.data);
        } catch (e) {
            alert(e);
        }
    };

    useEffect(() => {
        apiGetEmpresa();
    }, []);

    // Função para buscar produtos
    const apiGetComida = async () => {
        try {
            const response = await axiosInstance.get('/api/empresas/{empresaId}/prateleiras/{prateleiraId}/produtos?page=0&size=10');
            setComidaList(response.data.content); // Atribui os produtos ao estado comidaList
        } catch (e) {
            alert(e);
        }
    };

    useEffect(() => {
        apiGetComida();
    }, []);

    return (
        <View className="flex-1">
            <ScrollView className="bg-white">
                <View className='bg-white mb-5'>
                    <View className="mt-10 flex flex-row justify-around items-center">
                        <View>
                            <H4 className="text-black" fontStyle="italic">Olá, {username}</H4>
                            <H6 className="text-black" fontStyle="italic">Bem - Vindo(a)!</H6>
                        </View>
                        <Image className="w-20 h-20" source={require("../public/icons/tomato/TomatoAssassin.png")} />
                    </View>

                    {/* Carousel de imagens */}
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
                                <View style={{ flex: 1, justifyContent: 'center' }}>
                                    <Image className="w-96 h-52 rounded-3xl" source={item.image} />
                                </View>
                            )}
                        />
                    </View>

                    {/* Lista de Restaurantes */}
                    <H4 className="text-black ml-4 mt-4 mb-4 " fontStyle="italic">Restaurantes</H4>
                    <ScrollView className="mt-5 mr-6 ml-6 " showsVerticalScrollIndicator={true}>
                        <View className="flex justify-center flex-row flex-wrap">
                            {empresasList.map((empresa) => (
                                <TouchableOpacity
                                    key={empresa.id}
                                    onPress={() => {
                                        router.push({
                                            pathname: "/RestaurantScreen",
                                            params: {
                                                idEmpresa: empresa.id,
                                                nomeEmpresa: empresa.nomeFantasia
                                            }
                                        });
                                    }}
                                    className="bg-white rounded-3xl p-2 " 
                                >
                                    <Image className="w-80 h-28 rounded-lg" source={{ uri: empresa.imgCapa }} style={{ width: 370, height: 100 }} />
                                    <Text className="text-black text-center">{empresa.nomeFantasia}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </ScrollView>

                    {/* Lista de Comidas */}
                    <H4 className="text-black ml-4 mt-4 mb-4" fontStyle="italic">Comidas</H4>

                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <View className="flex flex-row ml-1" style={{ height: 300 }}>
                            {comidaList.map((comida) => (
                                <TouchableOpacity
                                    key={comida.id}
                                    onPress={() => {
                                        router.push({
                                            pathname: "/ProductDescription",
                                            params: {
                                                idProduto: comida.id,
                                                nomeProduto: comida.nome,
                                            }
                                        });
                                    }}
                                    className="bg-white rounded-3xl p-2"
                                >
                                    <View className="items-center p-4 rounded-lg">
                                        <Image className="w-80 h-28 rounded-lg bg-gray-100" source={{ uri: comida.urlImagem }} style={{ width: 100, height: 100 }} />
                                        <Text className="text-black text-center mt-1" style={{ width: 100 }} numberOfLines={2}>{comida.nome}</Text>
                                        <Text className="text-black text-center">R$ {comida.preco.toFixed(2)}</Text>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </ScrollView>

                </View>
            </ScrollView >
            <BottomBar screen="HomeScreen" />
        </View >
    );
}

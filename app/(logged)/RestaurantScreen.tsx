import { router, useLocalSearchParams } from "expo-router";
import { TouchableOpacity, Image, ScrollView, View } from "react-native";
import { H4, Text } from "tamagui";
import BottomBar from "app/components/BottomBar";
import axiosInstance from "app/config/axiosUrlConfig";
import { useEffect, useState } from "react";

export default function RestaurantScreen() {

    const { idEmpresa } = useLocalSearchParams();
    const { nomeEmpresa } = useLocalSearchParams();

    const [prateleiras, setPrateleiras] = useState([]);

    const apiGetPrateleiras = async () => {
        try {
            await axiosInstance.get(`/api/empresas/${idEmpresa}/prateleiras`).then((response) => {
                setPrateleiras(response.data.prateleiras)
            })
        }
        catch (e) {
            alert(e)
        }
    }

    useEffect(() => {
        apiGetPrateleiras();
    }, [])

    return (
        <View className="flex-1">
            <ScrollView className="bg-white">
                <View className='bg-white'>
                    <View className="mt-10 flex flex-row justify-around items-center">
                        <H4 className="text-black">{nomeEmpresa}</H4>
                        <Image className="w-20 h-20" source={require("../public/icons/tomato/TomatoCoffee.png")}></Image>
                    </View>
                    <View className="mt-5">
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View className="flex justify-center flex-col">
                                {prateleiras.map((prateleira) => (
                                    prateleira.produtos.length > 0 && ( // Verifica se há produtos na prateleira
                                        <View key={prateleira.id} className="mb-5 p-1">
                                            <Text className="text-lg font-bold text-black mb-2">{prateleira.nomePrateleira}</Text>
                                            <View className="flex flex-col">
                                                {prateleira.produtos.map((produto) => (
                                                    <TouchableOpacity
                                                        key={produto.id}
                                                        onPress={() => {
                                                            router.push({
                                                                pathname: "/ProductDescription",
                                                                params: {
                                                                    idEmpresa: idEmpresa,
                                                                    idProduto: produto.id,
                                                                    idPrateleira: prateleira.id,
                                                                },
                                                            });
                                                        }}
                                                        className="bg-orange-300 rounded-1xl p-2 mb-2 w-full flex-row justify-between items-center"
                                                    >
                                                        <View className="flex flex-col justify-between">
                                                            <Text className="text-white text-xl pb-5">{produto.nome}</Text>
                                                            <Text className="text-white pt-5">
                                                                {new Intl.NumberFormat('pt-BR', {
                                                                    style: 'currency',
                                                                    currency: 'BRL',
                                                                }).format(produto.preco)}
                                                            </Text>
                                                        </View>
                                                        <Image
                                                            className="w-24 h-24 rounded-lg"
                                                            style={{ backgroundColor: '#FFFFFF' }} 
                                                            source={produto.urlImagem
                                                                ? { uri: produto.urlImagem }
                                                                : require("../public/images/BrandIcon.png")} // Imagem padrão caso `urlImagem` seja `null`
                                                        />
                                                    </TouchableOpacity>
                                                ))}
                                            </View>
                                        </View>
                                    )
                                ))}
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </ScrollView>
            <BottomBar screen="RestaurantScreen"></BottomBar>
        </View>
    )

}
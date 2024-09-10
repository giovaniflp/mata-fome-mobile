import BottomBar from "app/components/BottomBar";
import axiosInstance from "app/config/axiosUrlConfig";
import { useCarrinho } from "app/providers/CarrinhoProvider";
import { useLocalSearchParams } from "expo-router";
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState, } from "react";
import { ActivityIndicator, Alert, Image, ScrollView, TouchableOpacity, View } from "react-native";
import { StarRatingDisplay } from 'react-native-star-rating-widget';
import { Button, Text } from "tamagui";

export default function ProductDescription() {

    const { adicionarAoCarrinho } = useCarrinho();

    const { idEmpresa } = useLocalSearchParams();
    const { idProduto } = useLocalSearchParams();
    const { idPrateleira } = useLocalSearchParams();


    const [productData, setProductData] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true)

    const [idEmpresaState, setIdEmpresaState] = useState(Number(idEmpresa))


    const apiGetProductData = async () => {
        try {
            await axiosInstance.get(`/api/empresas/{idEmpresa}/prateleiras/{idPrateleira}/produtos/${idProduto}`).then((response) => {
                setProductData(response.data)
                setIdEmpresaState(response.data.idEmpresa)
            })
        }
        catch (e) {
            alert(e)
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        apiGetProductData();
    }, [])

    const addProductToCart = async () => {
        adicionarAoCarrinho({
            id: productData.Produto.id,
            idEmpresa: Number(idEmpresaState),
            nome: productData.Produto.nome,
            preco: productData.Produto.preco,
            descricao: productData.Produto.descricao,
            urlImagem: productData.Produto.urlImagem,
            quantidade: quantity
        })
        await SecureStore.setItemAsync('empresaId', idEmpresa);
    }


    const showAlert = () => {
        Alert.alert(
            'Prezado Cliente',
            'Este produto foi adicionado ao carrinho!',
            [
                { text: 'OK', onPress: () => console.log('OK Pressionado') }
            ],
            { cancelable: false }
        );
    };

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center bg-white">
                <ActivityIndicator size="large"></ActivityIndicator>
            </View>
        );
    }

    return (
        <View className="flex-1">
            <ScrollView className="bg-white" showsVerticalScrollIndicator={false}>
                <View className='bg-white'>
                    <View className="mt-10 flex flex-row justify-around items-center">
                        <Text className="text-black text-lg font-bold">Descrição do produto</Text>
                        <Image className="w-20 h-20" source={require("../public/icons/tomato/TomatoSpeaker.png")} />
                    </View>
                    <View className="mt-5">
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View className="flex items-center">
                                <Image className="w-80 h-60 rounded-lg" source={{ uri: productData.Produto.urlImagem }} />
                            </View>
                            {/* <View className="flex flex-row justify-evenly items-center my-5">
                                <View className="flex items-center">
                                    <StarRatingDisplay rating={4.5} />
                                    <Text className="text-black">Baseado em <Text className="text-orange-500">4523</Text> opiniões</Text>
                                </View>
                                <View>
                                    <Image className="w-10 h-10 rounded-full" source={require("../public/images/slide03.jpg")} />
                                </View>
                            </View> */}
                            <View className="p-7">
                                <View>
                                    <Text className="text-black text-base text-xl font-bold">{productData.Produto.nome}</Text>
                                </View>
                                <View className="my-4">
                                    <Text className="text-black text-xs">{productData.Produto.descricao}</Text>
                                </View>
                                <View className="mb-4">
                                    <Text className="text-orange-500 text-lg font-bold">Preço</Text>
                                    <Text className="text-black">R$ {productData.Produto.preco}</Text>
                                </View>
                                <View>
                                    <Text className="text-orange-500 text-lg font-bold">Adicionais</Text>
                                </View>

                            </View>

                        </ScrollView>


                    </View>
                </View>
            </ScrollView>
            <View className="pt-3 mb-3" >
                <View className="flex flex-row items-center justify-around ">
                    <View className="flex flex-row items-center justify-between w-28 border-black-200 border rounded-lg bg-white">
                        <TouchableOpacity onPress={() => {
                            if (quantity > 1) {
                                setQuantity(quantity - 1);
                            }
                        }}>
                            <Image className="w-8 h-8" source={require("../public/icons/ui/minus.png")} />
                        </TouchableOpacity>
                        <Text className="text-black text-2xl">{quantity}</Text>
                        <TouchableOpacity onPress={() => {
                            setQuantity(quantity + 1);
                        }}>
                            <Image className="w-8 h-8" source={require("../public/icons/ui/plus.png")} />
                        </TouchableOpacity>
                    </View>

                    <Button
                        onPress={() => {
                            addProductToCart();
                            showAlert();
                        }}
                        icon={<Image className="w-5 h-5" source={require("../public/icons/ui/shoppingCart.png")} />}
                        className="bg-orange-500 w-48"
                    >
                        <Text className="text-xs text-white">Adicionar ao carrinho</Text>
                    </Button>
                </View>
            </View>
            <BottomBar screen="ProductDescription" />
        </View>
    )
}
import { H4, H5, H6, Text, Button, TextArea } from "tamagui";
import { Image, TouchableOpacity, ScrollView, View } from "react-native";
import StarRating from 'react-native-star-rating-widget';
import { useState } from "react";
import { AvaliationToast } from "app/components/AvaliationToast";
import { useRoute } from "@react-navigation/native";
import BottomBar from "app/components/BottomBar";
import { showLocation } from 'react-native-map-link';
import { router } from "expo-router";

export default function OrderDescription() {
    const { params } = useRoute<any>();
    const [rating, setRating] = useState(0);

    return (
        <View className="flex-1 bg-gray-100">
            {
                params.progress === 'Em progresso' &&
                <View className='bg-white flex-1'>
                    <View className="mt-10 px-4 flex flex-row justify-between items-center">
                        <View>
                            <H4 className="text-black font-bold">Pedido - 27/07/2024 às 02:42</H4>
                            <H6 className="text-black">Status do Pedido: <Text className="text-orange-500">{params.progress}</Text></H6>
                        </View>
                        <Image className="w-16 h-16" source={require("../public/icons/tomato/TomatoLike_Money.png")} />
                    </View>
                    <ScrollView className="bg-white" showsVerticalScrollIndicator={false}>
                        <View className="bg-gray-200 rounded-2xl p-4 mx-4 mt-5">
                            <View className="flex flex-row">
                                <Image className="w-28 h-28 rounded-xl" source={require("../public/images/slide01.jpg")} />
                                <View className="ml-4 flex-1">
                                    <H5 className="text-black font-bold">Hambúrguer de frango</H5>
                                    <H6 className="text-xs mt-2 text-black">Pão de hambúrguer premium, molho especial da casa, bisteca de frango, tomate, alface, ketchup e mostarda</H6>
                                </View>
                            </View>
                            <View className="flex items-center mt-3">
                                <H4 className="text-black font-semibold">3 Unidades</H4>
                            </View>
                        </View>
                        <View className="bg-gray-200 rounded-2xl p-4 mx-4 mt-5">
                            <View className="flex flex-col items-center">
                                <H6 className="text-orange-500 font-semibold text-lg">Rastreamento de pedido</H6>
                                <Button className="w-full bg-black text-white font-bold text-lg mt-3" onPress={() => {
                                    showLocation({
                                        address: 'Estr. de Bulhões - Bulhões, Jaboatão dos Guararapes - PE, 54080-000',
                                        title: 'Estr. de Bulhões - Bulhões, Jaboatão dos Guararapes - PE, 54080-000',
                                        appsWhiteList: ['google-maps', 'apple-maps'],
                                        directionsMode: 'car',
                                    });
                                }}>Mostrar localização atual</Button>
                                <H6 className="text-black mt-2">Tempo estimado - <Text className="text-red-500">32 minutos</Text></H6>
                            </View>
                        </View>
                        <View className="bg-gray-200 rounded-2xl p-4 mx-4 mt-5">
                            <View>
                                <H5 className="text-orange-500 font-semibold">Observação*</H5>
                                <H6 className="text-black">Por favor, retirar a mostarda e quero a carne bem passada.</H6>
                            </View>
                        </View>
                        <View className="bg-gray-200 rounded-2xl p-4 mx-4 mt-5">
                            <View>
                                <H5 className="text-orange-500 font-semibold">Endereço 01 - (Padrão)</H5>
                                <H6 className="text-black">Rua 02 Bloco 31 Apt 106 Curado 4 - Jaboatão</H6>
                            </View>
                        </View>

                        <View className="bg-gray-200 rounded-2xl p-4 mx-4 my-5">
                            <H4 className="text-black font-bold">Forma de pagamento</H4>
                            <View className="flex flex-row items-center mt-3">
                                <Image className="w-10 h-10" source={require("../public/icons/ui/creditCard.png")} />
                                <View className="ml-2">
                                    <H6 className="text-black">Cartão de crédito terminado em <Text className="text-orange-500">6322</Text></H6>
                                </View>
                            </View>

                            <View className="mt-5">
                                <H5 className="mb-2 text-red-500">Subtotal</H5>
                                <H6 className="text-black">3 x Hambúrguer de frango - <Text className="text-orange-500">R$ 45,00</Text></H6>
                                <H6 className="text-black">Frete - <Text className="text-orange-500">R$ 10,00</Text></H6>
                            </View>
                            <View className="mt-4">
                                <H4 className="text-black font-bold">Valor total</H4>
                                <H5 className="text-orange-500 font-bold">R$ 55,00</H5>
                            </View>
                        </View>

                        <View className="flex items-center">
                            <Button className="w-80 text-white bg-black " icon={<Image className="w-5 h-5" source={require("../public/icons/ui/chat.png")} />}>Contatar o restaurante</Button>
                            <Button className="w-80 bg-orange-500 text-white mt-5" icon={<Image className="w-5 h-5" source={require("../public/icons/ui/support.png")} />} onPress={() => {
                                router.push('SupportScreen')
                            }}>Falar com o suporte</Button>
                            <Button className="w-80 bg-red-500 text-white mt-5 mb-5" icon={<Image className="w-5 h-5" source={require("../public/icons/ui/cancel.png")} />}>Cancelar pedido</Button>
                        </View>
                    </ScrollView>
                    <BottomBar screen="OrderDescription"></BottomBar>
                </View>
            }
            {
                params.progress === 'Finalizado' &&
                <View className='bg-white flex-1'>
                    <View className="mt-10 px-4 flex flex-row justify-between items-center">
                        <View>
                            <H4 className="text-black font-bold">Pedido - 27/07/2024 às 02:42</H4>
                            <H6 className="text-black">Status do Pedido: <Text className="text-green-500">{params.progress}</Text></H6>
                        </View>
                        <Image className="w-16 h-16" source={require("../public/icons/tomato/TomatoLike_Money.png")} />
                    </View>
                    <ScrollView className="bg-white" showsVerticalScrollIndicator={false}>
                        <View className="bg-gray-200 rounded-2xl p-4 mx-4 mt-5">
                            <View className="flex flex-row">
                                <Image className="w-28 h-28 rounded-xl" source={require("../public/images/slide01.jpg")} />
                                <View className="ml-4 flex-1">
                                    <H5 className="text-black font-bold">Hambúrguer de frango</H5>
                                    <H6 className="text-xs mt-2 text-black">Pão de hambúrguer premium, molho especial da casa, bisteca de frango, tomate, alface, ketchup e mostarda</H6>
                                </View>
                            </View>
                            <View className="flex items-center mt-3">
                                <H4 className="text-black font-semibold">3 Unidades</H4>
                            </View>
                        </View>
                        <View className="bg-gray-200 rounded-2xl p-4 mx-4 mt-5">
                            <View className="flex flex-col items-center">
                                <H5 className="text-orange-500 font-semibold text-center">Por favor, avalie o pedido e deixe seu comentário!</H5>
                                <TextArea className="w-full bg-white text-black text-center mt-3 p-2 border border-gray-700 rounded-xl mx-auto" placeholder="Escreva seu comentário aqui..."></TextArea>
                                <View className="mt-3 flex flex-row items-center">
                                    <StarRating rating={rating} onChange={setRating} />
                                    <AvaliationToast></AvaliationToast>
                                </View>
                            </View>
                        </View>
                        <View className="bg-gray-200 rounded-2xl p-4 mx-4 mt-5">
                            <View>
                                <H5 className="text-orange-500 font-semibold">Observação*</H5>
                                <H6 className="text-black">Por favor, retirar a mostarda e quero a carne bem passada.</H6>
                            </View>
                        </View>
                        <View className="bg-gray-200 rounded-2xl p-4 mx-4 mt-5">
                            <View>
                                <H5 className="text-orange-500 font-semibold">Endereço 01 - (Padrão)</H5>
                                <H6 className="text-black">Rua 02 Bloco 31 Apt 106 Curado 4 - Jaboatão</H6>
                            </View>
                        </View>
                        <View className="bg-gray-200 rounded-2xl p-4 mx-4 my-5">
                            <H4 className="text-black font-bold">Forma de pagamento</H4>
                            <View className="flex flex-row items-center mt-3">
                                <Image className="w-10 h-10" source={require("../public/icons/ui/creditCard.png")} />
                                <View className="ml-2">
                                    <H6 className="text-black">Cartão de crédito terminado em <Text className="text-orange-500">6322</Text></H6>
                                </View>
                            </View>
                            <View className="mt-">
                                <H5 className="mb-2 text-red-500">Subtotal</H5>
                                <H6 className="text-black">3 x Hambúrguer de frango - <Text className="text-orange-500">R$ 45,00</Text></H6>
                                <H6 className="text-black">Frete - <Text className="text-orange-500">R$ 10,00</Text></H6>
                            </View>
                            <View className="mt-5">
                                <H4 className="text-black font-bold">Valor total</H4>
                                <H5 className="text-orange-500 font-bold">R$ 55,00</H5>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            }
        </View>
    );
}

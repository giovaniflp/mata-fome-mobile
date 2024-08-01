import { H4, H5, H6, Text, Button, TextArea } from "tamagui";
import { Image, TouchableOpacity, ScrollView,View } from "react-native";
import StarRating from 'react-native-star-rating-widget';
import { useState } from "react";
import { AvaliationToast } from "app/components/AvaliationToast";
import { useRoute } from "@react-navigation/native";
import BottomBar from "app/components/BottomBar";
import {showLocation} from 'react-native-map-link';
import { router } from "expo-router";

export default function OrderDescription(){
    const { params } = useRoute<any>()
    
    const [rating, setRating] = useState(0);

    return(
        <View className="flex-1">
            {
                params.progress === 'Em progresso' && 
                <View className='bg-white flex-1'>
                    <View className="mt-10 flex flex-row justify-around items-center">
                        <View>
                            <H4 className="text-black">Pedido - 27/07/2024 às 02:42</H4>
                            <H6 className="text-black">Status do Pedido: <Text className="text-orange-500">{params.progress}</Text></H6>
                        </View>
                        <Image className="w-20 h-20" source={require("../public/icons/tomato/TomatoLike_Money.png")}></Image>
                    </View>
                    <ScrollView className="bg-white" showsVerticalScrollIndicator={false}>
                        <View className="bg-gray-200 rounded-3xl p-4 mx-2 mt-5">
                            <View className="flex justify-center flex-row">
                                <View><Image className="w-32 h-32 rounded-3xl" source={require("../public/images/slide01.jpg")}></Image></View>
                                <View className="w-56 flex justify-center ml-2">
                                    <H5 className="text-black">Hambúrguer de frango</H5>
                                    <H6 className="text-xs mt-2 text-black">Pão de hambúrguer premium, molho especial da casa, bisteca de frango, tomate, alface, ketchup e mostarda</H6>
                                </View>
                            </View>
                            <View className="flex items-center mt-2">
                                <H4 className="text-black">3 Unidades</H4>
                            </View>
                        </View>
                        <View className="bg-gray-200 rounded-3xl p-4 mx-2 flex justify-center mt-5">
                    <View className="w-80">
                                <H5 className="text-orange-500">Rastreamento de pedido</H5>
                                <Button onPress={()=>{
                                    showLocation({
                                        address: 'Estr. de Bulhões - Bulhões, Jaboatão dos Guararapes - PE, 54080-000',
                                        title: 'Estr. de Bulhões - Bulhões, Jaboatão dos Guararapes - PE, 54080-000',
                                        appsWhiteList: ['google-maps', 'apple-maps'],
                                        directionsMode: 'car',
                                    });
                                }}>Mostrar localização atual</Button>
                                <H6 className="text-black">Tempo estimado - <Text className="text-red-500">32 minutos</Text></H6>
                    </View>
                </View>
                        <View className="bg-gray-200 rounded-3xl p-4 mx-2 flex justify-center mt-5">
                    <View className="w-80">
                                <H5 className="text-orange-500">Observação*</H5>
                                <H6 className="text-black">Por favor, retirar a mostarda e quero a carne bem passada.</H6>
                    </View>
                </View>
                <View className="bg-gray-200 rounded-3xl p-4 mx-2 flex justify-center mt-5">
                    <View className="w-80">
                                <H5 className="text-orange-500">Endereço 01 - (Padrão)</H5>
                                <H6 className="text-black">Rua 02 Bloco 31 Apt 106 Curado 4 - Jaboatão</H6>
                    </View>
                </View>
                <View className="bg-gray-200 rounded-3xl p-4 mx-2 flex justify-center my-5">
                    <H4 className="text-black">Forma de pagamento</H4>
                    <View className="flex flex-row items-center mt-2">
                        <Image className="w-10 h-10" source={require("../public/icons/ui/creditCard.png")}></Image>
                        <View className="w-80 ml-2">
                            <H6 className="text-black">Cartão de crédito terminado em <H6 className="text-orange-500">6322</H6></H6>
                        </View>
                    </View>
                    <View>
                        <H5 className="mb-2 mt-5 text-red-500">Subtotal</H5>
                        <H6 className="text-black mb-1">1 x Hambúrguer de frango - <H6 className="text-orange-500">R$ 15,00</H6></H6>
                        <H6 className="text-black mb-1">1 x Hambúrguer de frango - <H6 className="text-orange-500">R$ 15,00</H6></H6>
                        <H6 className="text-black mb-1">1 x Hambúrguer de frango - <H6 className="text-orange-500">R$ 15,00</H6></H6>
                        <H6 className="text-black">Frete - <H6 className="text-orange-500">R$ 10,00</H6></H6>
                    </View>
                    <View className="mt-5">
                        <H4 className="text-black">Valor total</H4>
                        <H5 className="text-orange-500">R$ 55,00</H5>
                    </View>
                </View>
                <View className="flex items-center">
                        <View>
                            <Button className="w-80 text-white" icon={<Image className="w-5 h-5" source={require("../public/icons/ui/chat.png")}></Image>}>Contatar o restaurante</Button>
                        </View>
                        <View>
                            <Button className="my-2 w-80 bg-orange-500 text-white" icon={<Image className="w-5 h-5" source={require("../public/icons/ui/support.png")}></Image>} onPress={()=>{
                                router.push('SupportScreen')
                            }}>Falar com o suporte</Button>
                        </View>
                        <View>
                            <Button className="mb-5 w-80 bg-red-500 text-white" icon={<Image className="w-5 h-5" source={require("../public/icons/ui/cancel.png")}></Image>}>Cancelar pedido</Button>
                        </View>
                </View>
                    </ScrollView>
                <BottomBar screen="OrderDescription"></BottomBar>
            </View>
            }
            {
                params.progress === 'Finalizado' &&
                <View className='bg-white flex-1'>
                    <View className="mt-10 flex flex-row justify-around items-center">
                        <View>
                            <H4 className="text-black">Pedido - 27/07/2024 às 02:42</H4>
                            <H6 className="text-black">Status do Pedido: <Text className="text-green-500">{params.progress}</Text></H6>
                        </View>
                        <Image className="w-20 h-20" source={require("../public/icons/tomato/TomatoLike_Money.png")}></Image>
                    </View>
                    <ScrollView className="bg-white" showsVerticalScrollIndicator={false}>
                        <View className="bg-gray-200 rounded-3xl p-4 mx-2 mt-5">
                            <View className="flex justify-center flex-row">
                                <View><Image className="w-32 h-32 rounded-3xl" source={require("../public/images/slide01.jpg")}></Image></View>
                                <View className="w-56 flex justify-center ml-2">
                                    <H5 className="text-black">Hambúrguer de frango</H5>
                                    <H6 className="text-xs mt-2 text-black">Pão de hambúrguer premium, molho especial da casa, bisteca de frango, tomate, alface, ketchup e mostarda</H6>
                                </View>
                            </View>
                            <View className="flex items-center mt-2">
                                <H4 className="text-black">3 Unidades</H4>
                            </View>
                        </View>
                        <View className="bg-gray-200 rounded-3xl p-4 mx-2 flex justify-center mt-5">
                    <View>
                        <View className="flex flex-row justify-center items-center">
                            <H5 className="text-orange-500 text-center text-xs w-64">Por favor, avalie o pedido e deixe seu comentário!</H5>
                            <Image className="w-12 h-12" source={require("../public/icons/tomato/TomatoStars.png")}></Image>
                        </View>
                                
                                <View className="flex items-center">
                                    <TextArea className="w-80 my-2 bg-white text-black" verticalAlign="top"></TextArea>
                                    <View className="flex flex-row items-center">
                                        <StarRating
                                        rating={rating}
                                        onChange={setRating}
                                        />
                                        <AvaliationToast></AvaliationToast>
                                    </View>
                                </View>
                    </View>
                </View>
                <View className="bg-gray-200 rounded-3xl p-4 mx-2 flex justify-center mt-5">
                    <View className="w-80">
                                <H5 className="text-orange-500">Observação*</H5>
                                <H6 className="text-black">Por favor, retirar a mostarda e quero a carne bem passada.</H6>
                    </View>
                </View>
                <View className="bg-gray-200 rounded-3xl p-4 mx-2 flex justify-center mt-5">
                    <View className="w-80">
                                <H5 className="text-orange-500">Endereço 01 - (Padrão)</H5>
                                <H6 className="text-black">Rua 02 Bloco 31 Apt 106 Curado 4 - Jaboatão</H6>
                    </View>
                </View>
                <View className="bg-gray-200 rounded-3xl p-4 mx-2 flex justify-center my-5">
                    <H4 className="text-black">Forma de pagamento</H4>
                    <View className="flex flex-row items-center mt-2">
                        <Image className="w-10 h-10" source={require("../public/icons/ui/creditCard.png")}></Image>
                        <View className="w-80 ml-2">
                            <H6 className="text-black">Cartão de crédito terminado em <H6 className="text-orange-500">6322</H6></H6>
                        </View>
                    </View>
                    <View>
                        <H5 className="mb-2 mt-5 text-red-500">Subtotal</H5>
                        <H6 className="text-black mb-1">1 x Hambúrguer de frango - <H6 className="text-orange-500">R$ 15,00</H6></H6>
                        <H6 className="text-black mb-1">1 x Hambúrguer de frango - <H6 className="text-orange-500">R$ 15,00</H6></H6>
                        <H6 className="text-black mb-1">1 x Hambúrguer de frango - <H6 className="text-orange-500">R$ 15,00</H6></H6>
                        <H6 className="text-black">Frete - <H6 className="text-orange-500">R$ 10,00</H6></H6>
                    </View>
                    <View className="mt-5">
                        <H4 className="text-black">Valor total</H4>
                        <H5 className="text-orange-500">R$ 55,00</H5>
                    </View>
                </View>
                    </ScrollView>
                    <BottomBar screen="OrderDescription"></BottomBar>
                </View>
            }
        </View>
    )
}
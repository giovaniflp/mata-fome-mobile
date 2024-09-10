import { router } from "expo-router";
import { TouchableOpacity, Image, ScrollView, View } from "react-native";
import { Button, H4, H5, H6, Text } from "tamagui";
import BottomBar from "app/components/BottomBar";
import { useState, useEffect } from "react";
import * as SecureStore from 'expo-secure-store';
import axiosInstance from "app/config/axiosUrlConfig";

export default function PaymentScreen(){

    const [idUser, setIdUser] = useState(null);
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState();

    const getIdUser = async () => {
        const idUserStorage = await SecureStore.getItemAsync('idUser');
        const idUserParse = JSON.parse(idUserStorage);
        setIdUser(idUserParse);
    }

    const savePaymentMethodIdInStorage = async (paymentMethodId) => {
        await SecureStore.setItemAsync('formaPagamentoId', JSON.stringify(paymentMethodId));
    }

    useEffect(()=>{
        getIdUser()
    },[])

    useEffect(()=>{
        apiGetPaymentMethods()
    },[idUser])

    const apiGetPaymentMethods = async () => {
        const response = await axiosInstance.get(`/api/clientes/${idUser}/formasDePagamentos`);
        console.log(response.data)
        setPaymentMethods(response.data.pagtos)
    }

    return(
        
        <View className="flex-1">
            <ScrollView className="bg-white">
            <View className='bg-white'>
                <View className="mt-10 flex flex-row justify-around items-center">
                        <H4 className="text-black">Formas de pagamento</H4>
                    <Image className="w-20 h-20" source={require("../public/icons/tomato/TomatoMoney.png")}></Image>
                </View>
                <View className="mt-5">
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {/* <View className="bg-orange-50 p-4 mx-5 mt-5 flex flex-row items-center shadow-xl"
>
                            <View className="w-80">
                                <H4 className="text-black">Saldo em carteira</H4>
                                <H5 className="text-orange-500">R$ 25,93</H5>
                            </View>
                            <View className="w-40 mt-3">
                                <Button className="bg-green-500">
                                    <Text className="text-white">Adicionar saldo</Text>
                                </Button>
                            </View>
                        </View> */}
                        <View className="bg-white-200 p-4 mt-5 flex ml-4 mr-4 border rounded-lg shadow-xl">
                            <View className="w-80">
                                <H4 className="text-black">Meus cartões</H4>
                            </View>
                            <View>
                                {
                                    paymentMethods.map((paymentMethod, index) => {

                                        const isSelected = paymentMethod.id === selectedPaymentMethod;

                                        return(
                                            <TouchableOpacity onPress={()=>{
                                                setSelectedPaymentMethod(paymentMethod.id)
                                                savePaymentMethodIdInStorage(paymentMethod.id)
                                            }} key={paymentMethod.id} className={`bg-gray-100 rounded-lg p-4 mx-2 mt-5 flex ${isSelected ? 'border-2 border-orange-500' : 'border-transparent'}`}>
                                                <H5 className="text-black">{paymentMethod.tipo}</H5>
                                                <H6 className="text-black">Terminado em {paymentMethod.numero_cartao.slice(-4)}</H6>
                                            </TouchableOpacity>
                                        )
                                    })
                                }
                            </View>
                        </View>
                        <View className="bg-white-200 p-4 mt-5 flex ml-4 mr-4 border rounded-lg shadow-xl">
                            <H4 className="text-black">Formas de pagamento</H4>
                            <Button className=" bg-green-500 mt-5">
                                <Text className="text-white">Usar dinheiro da carteira</Text>
                            </Button>
                            <Button className="mt-5 bg-orange-500">
                                <Text className="text-white">PIX</Text>
                            </Button>
                            <Button onPress={()=>{
                                router.push('RegisterNewPaymentMethodScreen')
                            }} className="mt-5 bg-black">
                                <Text className="text-white">Cartão de crédito</Text>
                            </Button>
                            <Button onPress={()=>{
                                router.push('RegisterNewDebitPaymentScreen')
                            }} className="mt-5 bg-white">
                                <Text className="text-black">Cartão de débito</Text>
                            </Button>
                            <H4 className="mt-5 text-black">Vales</H4>
                            <Button className="bg-black mt-5">
                                <Text className="text-white">Vale alimentação</Text>
                            </Button>
                            <Button className="mt-5 bg-white">
                                <Text className="text-black">Vale refeição</Text>
                            </Button>
                        </View>
                        <View className="my-5 flex items-center">
                            <Button onPress={()=>{
                                router.push('OrderConfirmationScreen')
                            }} className="bg-orange-500 w-40">
                                <Text className="text-white">Continuar</Text>
                            </Button>
                        </View>
                    </ScrollView>
                    </View>
                </View>
            </ScrollView>
            <BottomBar screen="PaymentScreen"></BottomBar>
        </View>
    )
}
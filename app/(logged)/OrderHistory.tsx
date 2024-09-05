import { ShoppingCartToast } from "app/components/ShoppingCartToast";
import { router } from "expo-router";
import { TouchableOpacity, Image, ScrollView, View } from "react-native";
import { Button, H4, H5, H6, Text } from "tamagui";
import BottomBar from "app/components/BottomBar";
import axiosInstance from "app/config/axiosUrlConfig";
import { useState, useEffect } from "react";
import * as SecureStore from 'expo-secure-store';
import { format, parseISO } from 'date-fns';

export default function OrderHistory(){

    const [idUser, setIdUser] = useState()
    const [pedidos, setPedidos] = useState([])

    const getSecureStorageData = async () => {
        const tokenStorage = await SecureStore.getItemAsync('token');
        const usernameStorage = await SecureStore.getItemAsync('username');
        const idUserStorage = await SecureStore.getItemAsync('idUser');

        const tokenParse = JSON.parse(tokenStorage);
        const usernameParse = JSON.parse(usernameStorage);
        const idUserParse = JSON.parse(idUserStorage);
        console.log(idUserParse)

        setIdUser(idUserParse)
    }

    const formatData = (data) => {
        // Converter a string de data ISO para um objeto Date
        const date = parseISO(data);
        
        // Formatando a data no formato desejado
        return format(date, "dd/MM/yyyy 'às' HH:mm");
      };

    useEffect(()=>{
        getSecureStorageData();
    },[idUser == null])

    const apiGetClientePedidos = async() => {
        const response = await axiosInstance.get(`/api/clientes/${idUser}/pedidos`).then((response)=>{
            setPedidos(response.data)
        })
    }

    useEffect(()=>{
        apiGetClientePedidos()
    },[idUser != null])

    return(
        <View className="flex-1">
            <ScrollView className="bg-white">
                            <View className='bg-white'>
                                <View className="mt-10 flex flex-row justify-around items-center">
                                        <H4 className="text-black">Lista dos seus pedidos</H4>
                                    <Image className="w-20 h-20" source={require("../public/icons/tomato/TomatoMoney.png")}></Image>
                                </View>
                                <View className="mt-5">
                                    <ScrollView showsVerticalScrollIndicator={false}>
                                    {pedidos.map((pedido) => (
                        <View
                        key={pedido.id}
                        className="bg-gray-200 rounded-3xl p-4 mx-2 mt-5 flex flex-row items-center"
                        >
                        <TouchableOpacity
                            onPress={() => {
                            router.push({
                                pathname: 'OrderDescription',
                                params: {
                                progress: pedido.status,
                                },
                            });
                            }}
                            className="w-80"
                        >
                            <Text className="text-black text-lg">Pedido - {formatData(pedido.dataHoraPedido)}</Text>
                            <Text className="text-black text-xl">
                            Status - <Text className={pedido.status === 'ENTREGUE' ? 'text-green-500' : 'text-red-500'}>{pedido.status}</Text>
                            </Text>
                            <Text className="text-black text-sm">Total - R$ {pedido.valorTotal}</Text>
                        </TouchableOpacity>
                        <View>
                            <TouchableOpacity>
                            <Image className="w-10 h-10" source={require("../public/icons/ui/delete.png")} />
                            </TouchableOpacity>
                        </View>
                        </View>
                    ))}
                            
                    </ScrollView>
                    </View>
                </View>
            </ScrollView>
            <BottomBar screen="OrderHistory"></BottomBar>
        </View>
    )
}
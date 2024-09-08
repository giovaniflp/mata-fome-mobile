import { ShoppingCartToast } from "app/components/ShoppingCartToast";
import { router } from "expo-router";
import { TouchableOpacity, Image, ScrollView, View } from "react-native";
import { Button, H4, H5, H6, Text } from "tamagui";
import BottomBar from "app/components/BottomBar";
import axiosInstance from "app/config/axiosUrlConfig";
import { useState, useEffect } from "react";
import * as SecureStore from 'expo-secure-store';
import { format, parseISO } from 'date-fns';
import SockJS from "sockjs-client";
import { Client, Stomp } from "@stomp/stompjs";

export default function OrderHistory() {
    const [idUser, setIdUser] = useState();
    const [pedidos, setPedidos] = useState([]);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        // Conectando ao WebSocket
        const socket = new SockJS('https://matafome-api.whiteglacier-7456d729.brazilsouth.azurecontainerapps.io/ws');
        const stompClient = new Client({
          webSocketFactory: () => socket,
          debug: (str) => console.log(str),
          reconnectDelay: 5000, // Tenta reconectar em caso de falha
        });
      
        stompClient.onConnect = () => {
          console.log('Conectado ao WebSocket');
      
          // Subscrevendo ao tópico para receber pedidos
          stompClient.subscribe('/topic/pedidoCliente/102', (message) => {
            try {
              const pedidoData = JSON.parse(message.body);
              console.log(pedidoData);
      
              // Atualize o estado com o pedido recebido
              setPedidos((prevPedidos) => {
                // Encontre o pedido existente pelo ID e atualize-o
                const pedidoIndex = prevPedidos.findIndex((pedido) => pedido.id === pedidoData.id);
      
                if (pedidoIndex !== -1) {
                  // Se o pedido existe, substitua-o pelo novo
                  const updatedPedidos = [...prevPedidos];
                  updatedPedidos[pedidoIndex] = { ...prevPedidos[pedidoIndex], ...pedidoData };
                  return updatedPedidos;
                } else {
                  // Caso contrário, adicione o novo pedido à lista
                  return [...prevPedidos, pedidoData];
                }
              });
            } catch (error) {
              console.error('Erro ao processar mensagem WebSocket:', error);
            }
          });
        };
      
        stompClient.activate(); // Ativa o WebSocket
      
        // Limpa a conexão quando o componente for desmontado
        return () => {
          stompClient.deactivate();
        };
      }, [idUser != null]);

    const getSecureStorageData = async () => {
        const tokenStorage = await SecureStore.getItemAsync('token');
        const usernameStorage = await SecureStore.getItemAsync('username');
        const idUserStorage = await SecureStore.getItemAsync('idUser');

        const idUserParse = JSON.parse(idUserStorage);
        console.log(idUserParse);

        setIdUser(idUserParse);
    };

    const formatData = (data) => {
        const date = parseISO(data);
        return format(date, "dd/MM/yyyy 'às' HH:mm");
    };

    useEffect(() => {
        getSecureStorageData();
    }, []);

    const apiGetClientePedidos = async () => {
        const response = await axiosInstance.get(`/api/clientes/${idUser}/pedidos`);
        setPedidos(response.data);
    };

    useEffect(() => {
        if (idUser) {
            apiGetClientePedidos();
        }
    }, [idUser]);

    const handleStatusChange = (pedidoId, novoStatus) => {
        if (socket) {
            socket.send(JSON.stringify({
                action: 'updateStatus',
                pedidoId,
                novoStatus
            }));
        }
    };

    return (
        <View className="flex-1">
            <ScrollView className="bg-white">
                <View className='bg-white'>
                    <View className="mt-10 flex flex-row justify-around items-center">
                        <H4 className="text-black">Lista dos seus pedidos</H4>
                        <Image className="w-20 h-20" source={require("../public/icons/tomato/TomatoMoney.png")} />
                    </View>
                    <View className="mt-5">
                        <ScrollView className="mb-5" showsVerticalScrollIndicator={false}>
                            {pedidos.map((pedido) => (
                                <View
                                    key={pedido.id}
                                    className="bg-gray-200 rounded-3xl p-4 mx-5 mt-5 flex flex-row items-center"
                                >
                                    <TouchableOpacity
                                        onPress={() => {
                                            router.push({
                                                pathname: 'OrderDescription',
                                                params: {
                                                    id: pedido.id,
                                                    cliente: pedido.cliente,
                                                    dataHoraPedido: pedido.dataHoraPedido,
                                                    empresa: pedido.empresa,
                                                    enderecoEntrega: JSON.stringify(pedido.enderecoEntrega),
                                                    formaPagamento: JSON.stringify(pedido.formaPagamento),
                                                    status: pedido.status,
                                                    statusPagamento: pedido.statusPagamento,
                                                    taxaEntrega: pedido.taxaEntrega,
                                                    valorTotal: pedido.valorTotal,
                                                    itensPedido: JSON.stringify(pedido.itensPedido),
                                                },
                                            });
                                        }}
                                        className="w-80"
                                    >
                                        <Text className="text-black text-lg">Pedido - {formatData(pedido.dataHoraPedido)}</Text>
                                        <Text className="text-black text-xl">
                                            Status - <Text className={
                                                pedido.status === 'ENTREGUE' ? 'text-green-500' :
                                                pedido.status === 'PENDENTE' ? 'text-yellow-500' :
                                                pedido.status === 'CANCELADO' ? 'text-red-500' :
                                                pedido.status === 'PROCESSANDO' ? 'text-orange-500' :
                                                pedido.status === 'EM_TRANSITO' ? 'text-blue-500' :
                                                'text-gray-500'
                                            }>{pedido.status}</Text>
                                        </Text>
                                        <Text className="text-black text-sm">Total - R$ {Number(pedido.valorTotal)+Number(pedido.taxaEntrega)}</Text>
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </ScrollView>
                    </View>
                </View>
            </ScrollView>
            <BottomBar screen="OrderHistory" />
        </View>
    );
}

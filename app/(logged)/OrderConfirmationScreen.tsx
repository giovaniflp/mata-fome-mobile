import { DiscountTicketToast } from "app/components/DiscountTicketToast";
import { router } from "expo-router";
import { TouchableOpacity, Image, ScrollView, View } from "react-native";
import { Button, H4, H5, H6, Input, Text } from "tamagui";
import BottomBar from "app/components/BottomBar";
import { useCarrinho } from "app/providers/CarrinhoProvider"
import { useEffect, useState } from "react";
import * as SecureStore from 'expo-secure-store';
import axiosInstance from "app/config/axiosUrlConfig";

export default function OrderConfirmationScreen(){

    const [formaPagamentoId, setFormaPagamentoId] = useState(null);
    const [enderecoEntregaId, setEnderecoEntregaId] = useState(null);
    const [clienteId, setClienteId] = useState(null);
    const [empresaId, setEmpresaId] = useState(null);

    const verifyStorage = async () => {
        console.log(await SecureStore.getItemAsync('formaPagamentoId'))
        console.log(await SecureStore.getItemAsync('enderecoEntregaId'))
        console.log(await SecureStore.getItemAsync('idUser'))
        console.log(await SecureStore.getItemAsync('empresaId'))
        const formaPagamentoId = await SecureStore.getItemAsync('formaPagamentoId')
        const enderecoEntregaId = await SecureStore.getItemAsync('enderecoEntregaId')
        const clienteId = await SecureStore.getItemAsync('idUser')
        const empresaId = await SecureStore.getItemAsync('empresaId')

        // Convertendo para número antes de definir os estados
        setFormaPagamentoId(Number(formaPagamentoId));
        setEnderecoEntregaId(Number(enderecoEntregaId));
        setClienteId(Number(clienteId));
        setEmpresaId(Number(empresaId));

    }

    useEffect(()=>{
        verifyStorage()
    },[])

    const apiEnviarPedido = async () => {
        try {
            // Mapeia os itens do carrinho para o formato esperado pela API
            const itens = carrinho.map((item) => ({
                produtoId: item.id,   // Mapeando o ID do produto
                quantidade: item.quantidade  // Mapeando a quantidade
            }));
    
            const pedido = {
                clienteId: clienteId,
                empresaId: empresaId,
                enderecoEntregaId: enderecoEntregaId,
                formaPagamentoId: formaPagamentoId,
                itens,  // Inclui os itens mapeados aqui
                statusPagamento: "pendente",
                taxaEntrega: 5
            };
            
            console.log(pedido);
    
            const response = await axiosInstance.post('/api/pedidos', pedido);
            console.log(response.data);
            router.push('OrderConfirmedScreen')
        } catch (e) {
            alert(e);
        }
    };

    const { carrinho, adicionarAoCarrinho, removerDoCarrinho } = useCarrinho();

    console.log(carrinho)

    return(
        <View className="flex-1">
            <View className='bg-white'>
                <View className="mt-10 flex flex-row justify-around items-center">
                    <H4 className="text-black">Confirmação de pedido</H4>
                    <Image className="w-20 h-20" source={require("../public/icons/tomato/TomatoDelivery.png")}></Image>
                </View>
            </View>
            <ScrollView className="bg-white" showsVerticalScrollIndicator={false}>
            {carrinho.map((produto) => (
            <View key={produto.id} className="bg-gray-200 rounded-3xl p-4 mx-2 flex justify-center flex-col mt-5">
                <View className="flex flex-row">
                    <View>
                        <Image
                            className="w-32 h-32 rounded-3xl"
                            source={produto.urlImagem
                                ? { uri: produto.urlImagem }
                                : require("../public/images/slide01.jpg")} // Imagem padrão
                        />
                    </View>
                </View>
                <View>
                    <H5 className="my-2 text-orange-500">Descrição</H5>
                    <H6 className="text-black">{produto.descricao}</H6>
                </View>
            </View>
        ))}
                <View className="bg-gray-200 rounded-3xl p-4 mx-2 flex justify-center mt-5">
                    <View className="w-80">
                                <H5 className="text-orange-500">Observação*</H5>
                                <H6 className="text-black">Por favor, retirar a mostarda e quero a carne bem passada.</H6>
                    </View>
                </View>
                <View className="bg-gray-200 rounded-3xl p-4 mx-2 flex justify-center mt-5">
                    <View className="w-80">
                                <H5 className="text-black">Endereço 01 - (Padrão)</H5>
                                <H6 className="text-black">Rua 02 Bloco 31 Apt 106 Curado 4 - Jaboatão</H6>
                    </View>
                </View>
                <View className="bg-gray-200 rounded-3xl p-4 mx-2 flex justify-center mt-5">
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
                <View className="flex items-center my-5">
                    <Button onPress={()=>{
                        apiEnviarPedido();
                    }} className="bg-orange-500 w-40">
                        <Text className="text-white">Finalizar pedido</Text>
                    </Button>
                </View>
            </ScrollView>
            <BottomBar screen="OrderConfirmationScreen"></BottomBar>
        </View>
    )
}
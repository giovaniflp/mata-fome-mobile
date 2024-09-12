import { ShoppingCartToast } from "app/components/ShoppingCartToast";
import { router } from "expo-router";
import { TouchableOpacity, Image, ScrollView, View } from "react-native";
import { Button, H4, H5, H6, Text, Input, TextArea } from "tamagui";
import { DiscountTicketToast } from "app/components/DiscountTicketToast";
import BottomBar from "app/components/BottomBar";
import { useCarrinho } from "app/providers/CarrinhoProvider";

export default function CartScreen() {
    const { carrinho, adicionarAoCarrinho, removerDoCarrinho } = useCarrinho();
    
    const calcularSubtotal = () => {
        return carrinho.reduce((total, produto) => total + produto.preco * produto.quantidade, 0);
    };

    return (
        <View className="flex-1 bg-gray-100">
            <View className="bg-white">
                <View className="mt-10 flex flex-row justify-around items-center">
                    <H4 className="text-black">Carrinho de compras</H4>
                    <Image className="w-20 h-20" source={require("../public/icons/tomato/TomatoShopping.png")} />
                </View>
            </View>
            <ScrollView className="bg-white" showsVerticalScrollIndicator={false}>
                {carrinho.map((produto) => (
                    <View key={produto.id} className="bg-white border-t shadow-200 border-gray-400 p-4 flex justify-center flex-col mt-5">
                        <View className="flex flex-row">
                            <View>
                                <Image
                                    className="w-32 h-32 rounded-3xl bg-gray-100"
                                    source={produto.urlImagem
                                        ? { uri: produto.urlImagem }
                                        : require("../public/images/slide01.jpg")} // Imagem padrão
                                />
                            </View>

                            <View className="w-56 flex justify-center ml-2">
                                <H5 className="text-black">{produto.nome}</H5>
                                <Text className="text-black mb-2">R$ {produto.preco.toFixed(2)}</Text>
                                <View className="flex flex-row items-center justify-between w-28 border-gray-300 border rounded-lg bg-white">
                                    <TouchableOpacity onPress={() => adicionarAoCarrinho(produto)}>
                                        <Image className="w-8 h-8" source={require("../public/icons/ui/plus.png")} />
                                    </TouchableOpacity>
                                    <H4 className="text-black mx-2">{produto.quantidade}</H4>
                                    <TouchableOpacity onPress={() => removerDoCarrinho(produto.id)}>
                                        <Image className="w-8 h-8" source={require("../public/icons/ui/minus.png")} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View>
                            <H5 className="my-2 text-orange-500">Descrição</H5>
                            <H6 className="text-black">{produto.descricao}</H6>
                        </View>
                    </View>
                ))}

                <View className="flex items-center justify-center pt-5 pb-5 border-t border-b border-gray-300 shadow">
                    <H5 className="text-black text-xs">Cupom de desconto</H5>
                    <View className="flex flex-row items-center">
                        <Input className="bg-white text-black w-60" placeholder="Digite seu cupom" />
                        <DiscountTicketToast />
                    </View>
                </View>
                <View className="border-b border-gray-300 p-4 mx-2 flex justify-center mt-5 mb-5">
                    <View className="mt-5">
                        <H5 className="text-black">Observação</H5>
                        <TextArea className="bg-white text-black border border-gray-300 p-2" placeholder="Escreva sua observação" verticalAlign="top" />
                    </View>
                    <View className="mt-5">
                        <H5 className="text-black">Subtotal</H5>
                        {carrinho.map((produto) => (
                            <H6 key={produto.id} className="text-orange-500 text-xs">
                                <H6 className="text-black">{produto.quantidade} x {produto.nome} -</H6> R$ {produto.preco.toFixed(2)} (Unid.)
                            </H6>
                        ))}
                    </View>
                    <View className="flex flex-row items-end justify-between">
                        <View>
                            <H4 className="text-black">Total</H4>
                            <View className="w-32 rounded-3xl flex">
                                <H6 className="text-orange-500">R$ {calcularSubtotal().toFixed(2)}</H6>
                            </View>
                        </View>
                        <View>
                            <Button onPress={() => router.push("MyAddress")} className="bg-orange-500 w-48">
                                <Text className="text-xs text-white">Continuar com a compra</Text>
                            </Button>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <BottomBar screen="CartScreen" />
        </View>
    );
}

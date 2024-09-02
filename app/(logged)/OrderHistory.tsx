import { ShoppingCartToast } from "app/components/ShoppingCartToast";
import { router } from "expo-router";
import { TouchableOpacity, Image, ScrollView, View } from "react-native";
import { Button, H4, H5, H6, Text } from "tamagui";
import BottomBar from "app/components/BottomBar";

export default function OrderHistory() {
    return (
        <View className="flex-1 bg-gray-100">
            <ScrollView>
                <View className="mt-10 px-4">
                    <View className="flex flex-row justify-between items-center mb-6">
                        <H4 className="text-black font-bold">Seus Pedidos</H4>
                        <Image className="w-12 h-12" source={require("../public/icons/tomato/TomatoMoney.png")} />
                    </View>

                    <View>
                        {[
                            { date: '27/07 às 02:42', status: 'Finalizado', total: 'R$ 55,00', statusColor: 'text-green-500' },
                            { date: '27/07 às 02:40', status: 'Em progresso', total: 'R$ 55,00', statusColor: 'text-orange-500' },
                            //{ date: '27/07 às 02:38', total: 'R$ 50,00' },
                            // Adicione outros pedidos aqui...
                        ].map((order, index) => (
                            <View key={index} className="bg-white rounded-3xl p-4 shadow-md mb-4 flex flex-row items-center">
                                <TouchableOpacity onPress={() => {
                                    router.push({
                                        pathname: 'OrderDescription',
                                        params: { progress: order.status }
                                    });
                                }} className="flex-1">
                                    <H5 className="text-black font-semibold">{`Pedido - ${order.date}`}</H5>
                                    {order.status && (
                                        <H4 className="text-black">Status - <Text className={`${order.statusColor}`}>{order.status}</Text></H4>
                                    )}
                                    <H6 className="text-black">{`Total - ${order.total}`}</H6>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Image className="w-8 h-8" source={require("../public/icons/ui/delete.png")} />
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>
            <BottomBar screen="OrderHistory" />
        </View>
    );
}

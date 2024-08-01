import { ShoppingCartToast } from "app/components/ShoppingCartToast";
import { router } from "expo-router";
import { TouchableOpacity, Image, ScrollView, View } from "react-native";
import { Button, H4, H5, H6, Text } from "tamagui";
import BottomBar from "app/components/BottomBar";

export default function OrderHistory(){
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
                        <View className="bg-gray-200 rounded-3xl p-4 mx-2 mt-5 flex flex-row items-center">
                            <TouchableOpacity onPress={()=>{
                                router.push({
                                    pathname: 'OrderDescription',
                                    params:{
                                        progress: 'Finalizado'
                                    }
                                })
                            }} className="w-80">
                                <H5 className="text-black">Pedido - 27/07 às 02:42</H5>
                                <H4 className="text-black">Status - <Text className="text-green-500">Finalizado</Text></H4>
                                <H6 className="text-black">Total - R$ 55,00</H6>
                            </TouchableOpacity>
                            <View>
                                <TouchableOpacity>
                                    <Image className="w-10 h-10" source={require("../public/icons/ui/delete.png")}></Image>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View className="bg-gray-200 rounded-3xl p-4 mx-2 mt-5 flex flex-row items-center">
                            <TouchableOpacity onPress={()=>{
                                router.push({
                                    pathname: 'OrderDescription',
                                    params:{
                                        progress: 'Em progresso'
                                    }
                                })
                            }} className="w-80">
                                <H5 className="text-black">Pedido - 27/07 às 02:40</H5>
                                <H4 className="text-black">Status - <Text className="text-orange-500">Em progresso</Text></H4>
                                <H6 className="text-black">Total - R$ 55,00</H6>
                            </TouchableOpacity>
                            <View>
                                <TouchableOpacity>
                                    <Image className="w-10 h-10" source={require("../public/icons/ui/delete.png")}></Image>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View className="bg-gray-200 rounded-3xl p-4 mx-2 mt-5 flex flex-row items-center">
                            <View className="w-80">
                                <H5 className="text-black">Pedido - 27/07 às 02:38</H5>
                                <H6 className="text-black">Total - R$ 50,00</H6>
                            </View>
                            <View>
                                <TouchableOpacity>
                                    <Image className="w-10 h-10" source={require("../public/icons/ui/delete.png")}></Image>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View className="bg-gray-200 rounded-3xl p-4 mx-2 mt-5 flex flex-row items-center">
                            <View className="w-80">
                                <H5 className="text-black">Pedido - 27/07 às 02:36</H5>
                                <H6 className="text-black">Total - R$ 50,00</H6>
                            </View>
                            <View>
                                <TouchableOpacity>
                                    <Image className="w-10 h-10" source={require("../public/icons/ui/delete.png")}></Image>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View className="bg-gray-200 rounded-3xl p-4 mx-2 mt-5 flex flex-row items-center mb-5">
                            <View className="w-80">
                                <H5 className="text-black">Pedido - 27/07 às 02:34</H5>
                                <H6 className="text-black">Total - R$ 50,00</H6>
                            </View>
                            <View>
                                <TouchableOpacity>
                                    <Image className="w-10 h-10" source={require("../public/icons/ui/delete.png")}></Image>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View className="bg-gray-200 rounded-3xl p-4 mx-2 flex flex-row items-center mb-5">
                            <View className="w-80">
                                <H5 className="text-black">Pedido - 27/07 às 02:32</H5>
                                <H6 className="text-black">Total - R$ 50,00</H6>
                            </View>
                            <View>
                                <TouchableOpacity>
                                    <Image className="w-10 h-10" source={require("../public/icons/ui/delete.png")}></Image>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View className="bg-gray-200 rounded-3xl p-4 mx-2 flex flex-row items-center mb-5">
                            <View className="w-80">
                                <H5 className="text-black">Pedido - 27/07 às 02:30</H5>
                                <H6 className="text-black">Total - R$ 50,00</H6>
                            </View>
                            <View>
                                <TouchableOpacity>
                                    <Image className="w-10 h-10" source={require("../public/icons/ui/delete.png")}></Image>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                    </View>
                </View>
            </ScrollView>
            <BottomBar screen="OrderHistory"></BottomBar>
        </View>
    )
}
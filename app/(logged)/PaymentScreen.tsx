import { router } from "expo-router";
import { TouchableOpacity, Image } from "react-native";
import { Button, H4, H5, H6, ScrollView, View, Text } from "tamagui";

export default function PaymentScreen(){
    return(
        <View className="flex-1">
            <ScrollView className="bg-white">
            <View className='bg-white'>
                <View className="mt-10 flex flex-row justify-around items-center">
                        <H4 className="text-black">Formas de pagamento</H4>
                    <Image className="w-20 h-20" source={require("../public/images/BrandIcon.png")}></Image>
                </View>
                <View className="mt-5">
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View className="bg-gray-200 rounded-3xl p-4 mx-2 mt-5 flex">
                            <View className="w-80">
                                <H4 className="text-black">Saldo em carteira</H4>
                                <H5 className="text-orange-500">R$ 25,93</H5>
                            </View>
                            <View className="w-40 mt-3">
                                <Button className="bg-green-500">
                                    <Text>Adicionar saldo</Text>
                                </Button>
                            </View>
                        </View>
                        <View className="bg-gray-200 rounded-3xl p-4 mx-2 mt-5 flex">
                            <H4 className="text-black">Formas de pagamento</H4>
                            <Button className=" bg-green-500 mt-5">
                                <Text>Usar dinheiro da carteira</Text>
                            </Button>
                            <Button className="mt-5">
                                <Text>Cartão de crédito</Text>
                            </Button>
                            <Button className="mt-5">
                                <Text>Cartão de débito</Text>
                            </Button>
                            <Button className="mt-5">
                                <Text>Vale alimentação</Text>
                            </Button>
                            <Button className="mt-5">
                                <Text>Vale refeição</Text>
                            </Button>
                        </View>
                    </ScrollView>
                    </View>
                </View>
            </ScrollView>
            <View className="w-full h-16 bg-orange-500 flex justify-center">
                <View className="flex flex-row items-center justify-center gap-16">
                    <TouchableOpacity onPress={()=>{
                        router.push('HomeScreen')
                    }}>
                        <Image className="w-10 h-10" source={require("../public/icons/ui/home.png")}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{
                        router.push('SearchScreen')
                    }}>
                        <Image className="w-10 h-10" source={require("../public/icons/ui/search.png")}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image className="w-10 h-10" source={require("../public/icons/ui/shoppingCart.png")}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image className="w-10 h-10" source={require("../public/icons/ui/person.png")}></Image>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
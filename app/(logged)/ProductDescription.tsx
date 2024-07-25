import { router } from "expo-router";
import { TouchableOpacity, Image } from "react-native";
import { H4, ScrollView, View, Text, H6, H5, Button } from "tamagui";
import { ShoppingCartToast } from "app/components/ShoppingCartToast";

export default function ProductDescription(){
    return(
        <View className="flex-1">
            <ScrollView className="bg-white">
            <View className='bg-white'>
                <View className="mt-10 flex flex-row justify-around items-center">
                        <H4 className="text-black">Descrição do produto</H4>
                    <Image className="w-20 h-20" source={require("../public/images/BrandIcon.png")}></Image>
                </View>
                <View className="mt-5">
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View className="flex items-center">
                                <Image className="w-80 h-60 rounded-lg" source={require("../public/images/slide01.jpg")}></Image>
                        </View>
                        <View>
                            <H4 className="text-black">Nome do produto</H4>
                            <H5 className="text-black">Hambúrguer de frango</H5>
                        </View>
                        <View>
                            <H4 className="text-black">Ingredientes</H4>
                            <H6 className="text-black text-xs">Pão de hambúrguer premium, molho especial da casa, bisteca de frango, tomate, alface, ketchup e mostarda</H6>
                        </View>
                        <View>
                            <H4 className="text-black">Preço</H4>
                            <H6 className="text-black">R$ 15,00</H6>
                        </View>
                        <View>
                            <H4 className="text-black">Quantidade</H4>
                            <View className="flex flex-row items-center">
                                <TouchableOpacity>
                                    <Image className="w-10 h-10" source={require("../public/icons/ui/plus.png")}></Image>
                                </TouchableOpacity>
                                <H4 className="text-black">1</H4>
                                <TouchableOpacity>
                                    <Image className="w-10 h-10" source={require("../public/icons/ui/minus.png")}></Image>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <ShoppingCartToast></ShoppingCartToast>
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
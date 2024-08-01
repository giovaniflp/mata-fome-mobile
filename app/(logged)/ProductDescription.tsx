import { router } from "expo-router";
import { TouchableOpacity, Image, ScrollView, View } from "react-native";
import { H4, Text, H6, H5, Button } from "tamagui";
import { ShoppingCartToast } from "app/components/ShoppingCartToast";
import { StarRatingDisplay } from 'react-native-star-rating-widget';
import BottomBar from "app/components/BottomBar";

export default function ProductDescription(){
    return(
        <View className="flex-1">
            <ScrollView className="bg-white">
            <View className='bg-white'>
                <View className="mt-10 flex flex-row justify-around items-center">
                        <H4 className="text-black">Descrição do produto</H4>
                    <Image className="w-20 h-20" source={require("../public/icons/tomato/TomatoSpeaker.png")}></Image>
                </View>
                <View className="mt-5">
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View className="flex items-center">
                                <Image className="w-80 h-60 rounded-lg" source={require("../public/images/slide01.jpg")}></Image>
                        </View>
                        <View className="flex flex-row justify-evenly items-center my-5">
                            <View className="flex items-center">
                                <StarRatingDisplay
                                    rating={4.5}
                                />
                                <H6 className="text-black">Baseado em <Text className="text-orange-500">4523</Text> opiniões</H6>
                            </View>
                            <View>
                                <Image className="w-10 h-10 rounded-full" source={require("../public/images/slide03.jpg")}></Image>
                            </View>
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
                            <H6 className="text-black">R$ 15,00 (Unid.)</H6>
                        </View>
                        <View>
                            <H4 className="text-black">Quantidade</H4>
                            <View className="flex flex-row items-center justify-around">
                                <View className="flex flex-row items-center">
                                    <TouchableOpacity>
                                        <Image className="w-10 h-10" source={require("../public/icons/ui/plus.png")}></Image>
                                    </TouchableOpacity>
                                    <H4 className="text-black">1</H4>
                                    <TouchableOpacity>
                                        <Image className="w-10 h-10" source={require("../public/icons/ui/minus.png")}></Image>
                                    </TouchableOpacity>
                                </View>
                                <ShoppingCartToast></ShoppingCartToast>
                            </View>
                        </View>
                        
                    </ScrollView>
                    </View>
                </View>
            </ScrollView>
            <BottomBar screen="ProductDescription"></BottomBar>
        </View>
    )
}
import { Button, H3, H4, H5, H6 } from "tamagui";
import { Image, Linking, View, ScrollView } from "react-native";
import { router } from "expo-router";
import BottomBar from "app/components/BottomBar";

export default function SupportScreen() {
    return (
        <View className="flex-1 bg-white">
            <ScrollView className="px-5">
                <View className="flex flex-row items-center justify-between mt-10">
                    <H3 className="text-black font-bold">Suporte</H3>
                    <Image className="w-20 h-20" source={require("../public/icons/tomato/TomatoSupport.png")} />
                </View>
                <View className="mt-10">
                    <H4 className="text-orange-500 font-bold mb-4">Perguntas frequentes</H4>
                    <View>
                        <H5 className="text-black text-sm font-bold mt-2">Caso ocorra problemas na entrega, o que faço?</H5>
                        <H6 className="text-black text-justify text-xs mt-2 leading-5">
                            Contate nosso suporte ou peça reembolso para resolvermos seu problema.
                        </H6>
                    </View>
                    <View className="mt-5">
                        <H5 className="text-black text-sm font-bold mt-2">Os restaurantes são verificados?</H5>
                        <H6 className="text-black text-justify text-xs mt-2 leading-5">
                            Sim, antes do fechamento dessa parceria, nós verificamos toda a documentação coerente do estabelecimento.
                        </H6>
                    </View>
                </View>
                <View className="mt-10">
                    <H4 className="text-orange-500 font-bold mb-4">Canais de comunicação e suporte</H4>
                    <View className="flex justify-center items-center">
                        <Button className="w-60 mt-4 bg-bl-500 text-white" onPress={() => {
                            Linking.openURL("mailto:matafomedeliveryIF@gmail.com?subject=Suporte")
                        }}>E-mail</Button>
                        <Button className="w-60 my-2 bg-green-700 text-white" onPress={() => {
                            Linking.openURL("https://www.instagram.com/matafomedeli/")
                        }}>Instagram</Button>
                        <Button className="w-60 bg-red-700 text-white">Telefone</Button>
                    </View>
                </View>
            </ScrollView>
            <BottomBar screen="SupportScreen"></BottomBar>
        </View>
    )
}

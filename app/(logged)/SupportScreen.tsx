import { Button, H3, H4, H5, H6  } from "tamagui";
import { Image, Linking, View, ScrollView } from "react-native";
import { router } from "expo-router";
import BottomBar from "app/components/BottomBar";

export default function SupportScreen(){
    return(
        <View className="flex-1">
            <ScrollView className="bg-white">
                <View className="flex flex-row items-center justify-around mt-10">
                    <H3 className="text-black">Suporte</H3>
                    <Image className="w-20 h-20" source={require("../public/icons/tomato/TomatoSupport.png")}></Image>
                </View>
                <View>
                    <H4 className="text-orange-500">Perguntas frequentes</H4>
                    <H5 className="text-black text-xs font-black mt-2">Caso ocorra problemas na entrega, o que faço?</H5>
                    <H6 className="text-black text-xs mt-2">Contate nosso suporte ou peça reembolso para resolvermos seu problema.</H6>
                    <H5 className="text-black text-xs font-black mt-5">Os restaurantes são verificados?</H5>
                    <H6 className="text-black text-xs mt-2">Sim, antes do fechamento dessa parceria, nós verificamos toda a documentação coerente do estabelecimento.</H6>
                </View>
                <View>
                    <H4 className="text-orange-500">Canais de comunicação e suporte</H4>
                    <View className="flex justify-center items-center">
                        <Button className="w-60 mt-5" onPress={()=>{
                            Linking.openURL("mailto:matafomedeliveryIF@gmail.com?subject=Suporte")
                        }}>E-mail</Button>
                        <Button className="w-60 my-2" onPress={()=>{
                            Linking.openURL("https://www.instagram.com/matafomedeli/")
                        }}>Instagram</Button>
                        <Button className="w-60">Chat</Button>
                    </View>
                </View>
            </ScrollView>
            <BottomBar screen="SupportScreen"></BottomBar>
        </View>
    )
}
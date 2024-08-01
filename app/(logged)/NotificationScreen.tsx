import BottomBar from "app/components/BottomBar";
import { Linking, Image, View, ScrollView } from "react-native";
import { Button, H3, H4, H5, H6, Switch, Separator } from "tamagui";

export default function NotificationScreen(){
    return(
        <View className="flex-1">
            <ScrollView className="bg-white">
                <View className="flex flex-row items-center justify-around mt-10">
                    <H3 className="text-black">Notificações do App</H3>
                    <Image className="w-20 h-20" source={require("../public/icons/tomato/TomatoSpeaker.png")}></Image>
                </View>
                <View>
                    <H4 className="text-orange-500">Notificações</H4>
                    <View className="mt-2">
                        <H5 className="text-black">Notificações por E-mail</H5>
                        <View className="flex flex-row mt-5">
                            <H6 className="text-black text-xs mt-2">Receber recibos de compras</H6>
                            <Separator vertical className="mx-2"></Separator>
                            <Switch>
                                <Switch.Thumb animation="quicker"></Switch.Thumb>
                            </Switch>
                        </View>
                        <View className="flex flex-row mt-5">
                            <H6 className="text-black text-xs mt-2">Alertas de promoções e descontos</H6>
                            <Separator vertical className="mx-2"></Separator>
                            <Switch>
                                <Switch.Thumb animation="quicker"></Switch.Thumb>
                            </Switch>
                        </View>
                    </View>
                    <View className="mt-2">
                        <H5 className="text-black">Notificações pelo App</H5>
                        <View className="flex flex-row mt-5">
                            <H6 className="text-black text-xs mt-2">Receber recomendações</H6>
                            <Separator vertical className="mx-2"></Separator>
                            <Switch>
                                <Switch.Thumb animation="quicker"></Switch.Thumb>
                            </Switch>
                        </View>
                        <View className="flex flex-row mt-5">
                            <H6 className="text-black text-xs mt-2">Alertas de promoções e descontos</H6>
                            <Separator vertical className="mx-2"></Separator>
                            <Switch>
                                <Switch.Thumb animation="quicker"></Switch.Thumb>
                            </Switch>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <BottomBar screen="SupportScreen"></BottomBar>
        </View>
    )
}
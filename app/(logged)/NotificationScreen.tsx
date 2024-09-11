import BottomBar from "app/components/BottomBar";
import { Image, View, ScrollView } from "react-native";
import { Button, H3, H4, H5, H6, Switch } from "tamagui";

export default function NotificationScreen() {
    return (
        <View className="flex-1 bg-gray-100">
            <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
                {/* Cabeçalho da tela com o título e a imagem */}
                <View className="bg-white p-4 mb-2">
                    <View className="mt-10 flex flex-row justify-between items-center px-4">
                        <H3 className="text-black">Notificações do App</H3>
                        <Image className="w-20 h-20" source={require("../public/icons/tomato/TomatoSpeaker.png")} />
                    </View>
                </View>

                {/* Seções de notificações */}
                <View className="bg-white p-4 mb-5 shadow-sm border border-gray-300 rounded-lg">
                    <H5 className="text-orange-500 mb-2">Notificações por E-mail</H5>
                    <View className="flex flex-row items-center mb-4">
                        <H6 className="text-black text-xs flex-1">Receber recibos de compras</H6>
                        <Switch
                            defaultChecked={false}  // Desabilitado (lado esquerdo)
                            onValueChange={(value) => console.log("Receber recibos de compras:", value)}
                            className="bg-gray-300" // Adicionando cor de fundo cinza para o desativado
                        >
                            <Switch.Thumb
                                animation="quicker"
                                className="bg-white" // Cor de fundo branca para o thumb
                            />
                        </Switch>
                    </View>
                    <View className="flex flex-row items-center">
                        <H6 className="text-black text-xs flex-1">Alertas de promoções e descontos</H6>
                        <Switch
                            defaultChecked={true}  // Habilitado (lado direito)
                            onValueChange={(value) => console.log("Alertas de promoções e descontos:", value)}
                            className="bg-orange-500" // Adicionando cor de fundo laranja para o ativado
                        >
                            <Switch.Thumb
                                animation="quicker"
                                className="bg-white" // Cor de fundo branca para o thumb
                            />
                        </Switch>
                    </View>
                </View>

                <View className="bg-white p-4 mb-5 shadow-sm border border-gray-300 rounded-lg">
                    <H5 className="text-orange-500 mb-2">Notificações pelo App</H5>
                    <View className="flex flex-row items-center mb-4">
                        <H6 className="text-black text-xs flex-1">Receber recomendações</H6>
                        <Switch
                            defaultChecked={false}  // Desabilitado (lado esquerdo)
                            onValueChange={(value) => console.log("Receber recomendações:", value)}
                            className="bg-gray-300" // Adicionando cor de fundo cinza para o desativado
                        >
                            <Switch.Thumb
                                animation="quicker"
                                className="bg-white" // Cor de fundo branca para o thumb
                            />
                        </Switch>
                    </View>
                    <View className="flex flex-row items-center">
                        <H6 className="text-black text-xs flex-1">Alertas de promoções e descontos</H6>
                        <Switch
                            defaultChecked={true}  // Habilitado (lado direito)
                            onValueChange={(value) => console.log("Alertas de promoções e descontos:", value)}
                            className="bg-orange-500" // Adicionando cor de fundo laranja para o ativado
                        >
                            <Switch.Thumb
                                animation="quicker"
                                className="bg-white" // Cor de fundo branca para o thumb
                            />
                        </Switch>
                    </View>
                </View>
            </ScrollView>

            {/* Barra inferior de navegação */}
            <BottomBar screen="NotificationScreen" />
        </View>
    );
}

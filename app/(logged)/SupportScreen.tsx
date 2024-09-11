import { H3, H4, H5, H6, Text } from "tamagui";
import { Image, TouchableOpacity, View, ScrollView, Linking } from "react-native";
import { Feather } from "@expo/vector-icons";
import BottomBar from "app/components/BottomBar";

const MenuItem = ({ icon, title, subtitle, onPress }) => (
  <TouchableOpacity onPress={onPress} className="flex-row items-center p-4 bg-white border-b border-gray-200">
    <View className="w-8 h-8 mr-4 justify-center items-center">
      {icon}
    </View>
    <View className="flex-1">
      <Text className="text-base font-medium text-gray-800">{title}</Text>
      {subtitle && <Text className="text-sm text-gray-600 mt-1">{subtitle}</Text>}
    </View>
    <Feather name="chevron-right" size={24} color="#999" />
  </TouchableOpacity>
);

export default function SupportScreen() {
  return (
    <View className="flex-1 bg-gray-100">
      <ScrollView>
        {/* Cabeçalho */}
        <View className="bg-white p-4 mb-4 border-b border-gray-200">
          <View className="mt-6 flex flex-row justify-around items-center">
            <H4 className="text-black font-bold">Ajuda</H4>
            <Image className="w-24 h-24" source={require("../public/icons/tomato/TomatoSupport.png")} />
          </View>
        </View>

        {/* Perguntas frequentes */}
        <View className="p-4 bg-white mb-4 border-b border-gray-200">
          <H4 className="text-orange-500 text-lg font-semibold mb-3">Perguntas frequentes</H4>

          <H5 className="text-black text-base font-semibold mb-2">O que fazer se minha entrega atrasar?</H5>
          <H6 className="text-gray-700 text-sm leading-relaxed">
            Se sua entrega atrasar, por favor, entre em contato com nosso suporte imediatamente. Podemos rastrear o status da entrega e tomar as medidas necessárias para resolver o problema ou fornecer um reembolso, se apropriado.
          </H6>

          <H5 className="text-black text-base font-semibold mt-6 mb-2">Como posso alterar meu endereço de entrega?</H5>
          <H6 className="text-gray-700 text-sm leading-relaxed">
            Para alterar seu endereço de entrega, vá até a seção 'Meus endereços' no menu de perfil e edite suas informações. Certifique-se de atualizar seu endereço antes de fazer um novo pedido para garantir que ele seja enviado para o local correto.
          </H6>

          <H5 className="text-black text-base font-semibold mt-6 mb-2">Os restaurantes são certificados?</H5>
          <H6 className="text-gray-700 text-sm leading-relaxed">
            Sim, todos os restaurantes parceiros passam por um processo de certificação rigoroso para garantir que atendem aos nossos padrões de qualidade e segurança alimentar antes de começarmos a parceria.
          </H6>
        </View>

        {/* Canais de comunicação e suporte */}
        <View className="bg-white">
          <H4 className="text-orange-500 text-lg font-semibold p-4 border-b border-gray-200">Canais de comunicação e suporte</H4>

          <MenuItem
            icon={<Feather name="mail" size={24} color="#000" />}
            title="E-mail"
            subtitle="Entre em contato por e-mail"
            onPress={() => Linking.openURL("mailto:matafomedeliveryIF@gmail.com?subject=Suporte")}
          />

          <MenuItem
            icon={<Feather name="instagram" size={24} color="#000" />}
            title="Instagram"
            subtitle="Nos siga e entre em contato"
            onPress={() => Linking.openURL("https://www.instagram.com/matafomedeli/")}
          />

          <MenuItem
            icon={<Feather name="message-circle" size={24} color="#000" />}
            title="Chat"
            subtitle="Converse com nosso suporte"
            onPress={() => {
              // ação do Chat
            }}
          />
        </View>
      </ScrollView>

      {/* Barra inferior de navegação */}
      <BottomBar screen="SupportScreen" />
    </View>
  );
}

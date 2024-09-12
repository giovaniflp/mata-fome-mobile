import { Avatar, H3, H4, H5, H6, Button, Text } from "tamagui";
import { Image, TouchableOpacity, ScrollView, View } from "react-native";
import { router } from "expo-router";
import BottomBar from "app/components/BottomBar";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { useCarrinho } from "app/providers/CarrinhoProvider";

const MenuItem = ({ icon, title, subtitle, onPress }) => (
  <TouchableOpacity onPress={onPress} className="flex-row items-center p-4 bg-white">
    <View className="w-8 h-8 mr-4 justify-center items-center">
      {icon}
    </View>
    <View className="flex-1">
      <Text className="text-base font-medium">{title}</Text>
      {subtitle && <Text className="text-sm text-gray-500">{subtitle}</Text>}
    </View>
    <Feather name="chevron-right" size={24} color="#999" />
  </TouchableOpacity>
);

export default function ProfileScreen() {
  const { limparCarrinho } = useCarrinho();
  const [username, setUsername] = useState("");

  useEffect(() => {
    getUsername();
  }, []);

  const getUsername = async () => {
    const usernameStorage = await SecureStore.getItemAsync("username");
    setUsername(JSON.parse(usernameStorage) || "");
  };

  const logoutAccount = async () => {
    await SecureStore.deleteItemAsync("token");
    await SecureStore.deleteItemAsync("username");
    await SecureStore.deleteItemAsync("idUser");
    await SecureStore.deleteItemAsync("empresaId");
    await SecureStore.deleteItemAsync("formaPagamentoId");
    await SecureStore.deleteItemAsync("enderecoEntregaId");
    limparCarrinho();
    router.push("/");
  };

  return (
    <View className="flex-1 bg-gray-100">
      <ScrollView>
        {/* Cabeçalho da tela com o título e a imagem */}
        <View className="bg-white p-4 mb-2">
          <View className="mt-10 flex flex-row justify-around items-center">
            <H4 className="text-black">Configuração de perfil</H4>
            <Image className="w-20 h-20" source={require("../public/icons/tomato/TomatoNumber_One.png")} />
          </View>
        </View>

        {/* Menu de itens do perfil */}
        <View className="mt-5 bg-white">
          <MenuItem
            icon={<Feather name="map-pin" size={24} color="#000" />}
            title="Meus endereços"
            subtitle="Gerencie seus endereços de entrega"
            onPress={() => router.push("RegisteredAddressProfileScreen")}
          />

          <MenuItem
            icon={<Feather name="credit-card" size={24} color="#000" />}
            title="Formas de pagamento"
            subtitle="Configure suas opções de pagamento"
            onPress={() => router.push("PaymentScreenForms")}
          />

          <MenuItem
            icon={<Feather name="bell" size={24} color="#000" />}
            title="Notificações no App"
            subtitle="Central de notificações e alertas"
            onPress={() => router.push("NotificationScreen")}
          />

          <MenuItem
            icon={<Feather name="headphones" size={24} color="#000" />}
            title="Suporte"
            subtitle="Entre em contato com o suporte"
            onPress={() => router.push("SupportScreen")}
          />

          <MenuItem
            icon={<Feather name="log-out" size={24} color="#f00" />}
            title="Deslogar da conta"
            subtitle="Sair da sua conta atual"
            onPress={logoutAccount}
          />
        </View>
      </ScrollView>

      {/* Barra inferior de navegação */}
      <BottomBar screen="ProfileScreen" />
    </View>
  );
}

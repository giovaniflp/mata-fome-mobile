import { useState, useEffect } from "react";
import { TouchableOpacity, Image, ScrollView, View } from "react-native";
import { H4, Input, Text } from "tamagui";
import { useRouter } from "expo-router";
import BottomBar from "app/components/BottomBar";
import axiosInstance from "app/config/axiosUrlConfig";

export default function SearchScreen() {
  const [empresas, setEmpresas] = useState([]); // Alterado para armazenar o array completo de empresas
  const [searchQuery, setSearchQuery] = useState(''); // Estado para armazenar o valor da barra de pesquisa

  const router = useRouter();

  const fetchnomeFantasia = async () => {
    try {
      const response = await axiosInstance.get(`/api/empresas`); // Substitua pela URL real
      const data = response.data;
      setEmpresas(data); // Salva todos os dados da empresa
    } catch (error) {
      console.error("Erro ao buscar os dados:", error.message);
    }
  };

  useEffect(() => {
    fetchnomeFantasia();
  }, []);

  const fetchEmpresasPorNomeFantasia = async (query) => {
    try {
      const response = await axiosInstance.get(
        `/api/empresas/buscarPorNomeFantasia`,
        {
          params: {
            nome_fantasia: query,
            page: 0,
            size: 10
          }
        }
      );
      const data = response.data;
      setEmpresas(data.content); // Supondo que a resposta seja paginada
    } catch (error) {
      console.error("Erro ao buscar empresas por nome fantasia:", error.message);
    }
  };

  useEffect(() => {
    if (searchQuery.length > 0) {
      fetchEmpresasPorNomeFantasia(searchQuery);
    } else {
      fetchnomeFantasia();
    }
  }, [searchQuery]);

  return (
    <View className="flex-1">
      <ScrollView>
        <View className="bg-white">
          <View className="mt-10 flex flex-row justify-around items-center">
            <H4 className="text-black">Categorias</H4>
            <Image
              className="w-20 h-20"
              source={require("../public/icons/tomato/TomatoShopping.png")}
            />
          </View>
          <View className="flex items-center my-3 p-3">
            <Input
              className="bg-slate-100 text-black w-11/12 border-transparent"
              placeholder="Busque por pratos, restaurantes e categorias"
              value={searchQuery} // Define o valor atual do input
              onChangeText={setSearchQuery} // Atualiza o estado de searchQuery conforme o usuário digita
            />
          </View>
          <View>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View className="flex justify-center flex-row flex-wrap">
                {empresas.map((empresa, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      router.push({
                        pathname: '/RestaurantScreen',
                        params: {
                          idEmpresa: empresa.id,
                          nomeEmpresa: empresa.nomeFantasia
                        }, // Passando os parâmetros corretamente
                      });
                    }}
                    className="bg-orange-300 rounded-3xl p-2 mr-2 mb-2"
                  >
                    <Image
                      className="w-40 h-24 rounded-lg"
                      source={{ uri: empresa.imgPerfil }} // Usando a imagem de perfil da API
                    />
                    <Text className="text-white text-center">{empresa.nomeFantasia}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
        </View>
      </ScrollView>
      <BottomBar screen="SearchScreen" />
    </View>
  );
}

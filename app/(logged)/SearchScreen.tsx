import { useState, useEffect } from "react";
import { TouchableOpacity, Image, ScrollView, View } from "react-native";
import { H4, Input, Text } from "tamagui";
import { useRouter } from "expo-router";
import BottomBar from "app/components/BottomBar";
import axiosInstance from "app/config/axiosUrlConfig";

export default function SearchScreen() {
  const [empresas, setEmpresas] = useState([]); // Estado para armazenar as empresas
  const [categorias, setCategorias] = useState([]); // Estado para armazenar as categorias
  const [searchQuery, setSearchQuery] = useState(''); // Estado para armazenar o valor da barra de pesquisa

  const router = useRouter();

  const fetchnomeFantasia = async () => {
    try {
      const response = await axiosInstance.get(/api/empresas); // Busca todas as empresas
      const data = response.data;
      setEmpresas(data); // Salva todos os dados das empresas
    } catch (error) {
      console.error("Erro ao buscar os dados:", error.message);
    }
  };

  useEffect(() => {
    fetchnomeFantasia();
  }, []);

  // Função para buscar categorias e transformá-las em um array de objetos
  const fetchCategorias = async () => {
    try {
      const response = await axiosInstance.get(/api/empresas/categorias); // Busca as categorias
      const data = response.data;

      // Transforma o objeto em um array de categorias
      const categoriasArray = Object.entries(data).map(([key, value]) => ({
        id: key,
        nome: value
      }));

      setCategorias(categoriasArray); // Salva todas as categorias no estado
    } catch (error) {
      console.error("Erro ao buscar os dados das categorias:", error.message);
    }
  };

  useEffect(() => {
    fetchCategorias();
  }, []);

  // Função para buscar empresas por nome fantasia
  const fetchEmpresasPorNomeFantasia = async (query) => {
    try {
      const response = await axiosInstance.get(
        /api/empresas/buscarPorNomeFantasia,
        {
          params: {
            nome_fantasia: query,
            page: 0,
            size: 10,
          }
        }
      );
      const data = response.data;
      setEmpresas(data.content); // Supondo que a resposta seja paginada
    } catch (error) {
      console.error("Erro ao buscar empresas por nome fantasia:", error.message);
    }
  };

  // Função para buscar restaurantes por categoria selecionada
  const fetchEmpresasPorCategoria = async (categoria) => {
    try {
      const response = await axiosInstance.get(
        /api/empresas/filtrarPorCategoria, 
        {
          params: {
            categoria: categoria.toLowerCase(), // Converte a categoria para minúsculas
            page: 0,
            size: 10,
          }
        }
      );
      const data = response.data;
      setEmpresas(data.content); // Atualiza o estado com os restaurantes filtrados
    } catch (error) {
      console.error("Erro ao buscar empresas por categoria:", error.message);
    }
  };

  // Quando o searchQuery muda, buscar por nome fantasia
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
                {categorias.map((categoria, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => fetchEmpresasPorCategoria(categoria.id)} // Chama a função ao clicar em uma categoria
                    className="bg-orange-300 rounded-3xl p-2 mr-2 mb-2 ml-1"
                  >
                    {/* Como não há imagem no objeto categoria, você pode usar uma imagem padrão ou remover a Image */}
                    <Text className="text-white text-center">{categoria.nome}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

          <View className="flex items-center my-3 p-3">
            <H4 className="text-black">Restaurantes</H4>
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
                        },
                      });
                    }}
                    className="bg-white rounded-lg shadow-lg m-2 p-3 w-40"
                    style={{ alignItems: "center" }} // Centraliza o conteúdo do card
                  >
                    {/* Exibe a imagem de perfil do restaurante */}
                    <Image
                      className="rounded-lg"
                      source={{ uri: empresa.imgCapa }} // Supondo que imgPerfil contenha a URL da imagem
                      style={{ width: 80, height: 80 }}
                    />
                    <Text className="text-black text-center mt-2">{empresa.nomeFantasia}</Text>
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
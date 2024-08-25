import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "expo-router"; // Corrigido import para useRouter
import { TouchableOpacity, Image, ScrollView, View } from "react-native";
import { H4, Input, Text } from "tamagui";
import BottomBar from "app/components/BottomBar";

export default function SearchScreen() {
  const [nomePrateleiras, setNomePrateleiras] = useState([]);
  const router = useRouter(); // Use useRouter ao invés de router diretamente

  const fetchNomePrateleiras = async () => {
    try {
      const response = await axios.get('http://matafome-api.ashyfield-34914be1.brazilsouth.azurecontainerapps.io/api/empresas/{empresaId}/prateleiras'); // Substitua pela URL real
      const data = response.data;
      const prateleiras = data.map((item) => item.nomePrateleira);
      setNomePrateleiras(prateleiras);
    } catch (error) {
      console.error("Erro ao buscar os dados:", error.message);
    }
  };

  useEffect(() => {
    fetchNomePrateleiras();
  }, []);

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
            />
          </View>
          <View>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View className="flex justify-center flex-row flex-wrap">
                {nomePrateleiras.map((nome, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      router.push({
                        pathname: '/RestaurantScreen', // Certifique-se de que o caminho está correto
                        params: { nomePrateleira: nome }, // Passando os parâmetros corretamente
                      });
                    }}
                    className="bg-orange-300 rounded-3xl p-2 mr-2 mb-2"
                  >
                    <Image
                      className="w-40 h-24 rounded-lg"
                      source={require("../public/images/slide01.jpg")}
                    />
                    <Text className="text-white text-center">{nome}</Text>
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

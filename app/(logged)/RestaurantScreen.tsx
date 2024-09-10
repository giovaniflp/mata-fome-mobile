import { router, useLocalSearchParams } from "expo-router";
import { TouchableOpacity, Image, ScrollView, View } from "react-native";
import { H4, Text, TextArea } from "tamagui";
import BottomBar from "app/components/BottomBar";
import axiosInstance from "app/config/axiosUrlConfig";
import { useEffect, useState } from "react";

export default function RestaurantScreen() {
  const { idEmpresa } = useLocalSearchParams();
  const { nomeEmpresa } = useLocalSearchParams();

  const [prateleiras, setPrateleiras] = useState([]);
  const [empresa, setEmpresa] = useState({
    imgCapa: "",
    imgPerfil: "",
    horarioFechamento: "",
    horarioAbertura: "",
    tempoEntrega: "",
    taxaFrete: "",
    
  });

  // Função para obter os detalhes da empresa, incluindo as imagens de capa e perfil
  const apiGetEmpresaDetails = async () => {
    try {
      const response = await axiosInstance.get(`/api/empresas/${idEmpresa}`);
      setEmpresa({
        imgCapa: response.data.imgCapa,
        imgPerfil: response.data.imgPerfil,
        horarioFechamento: response.data.horarioFechamento,
        horarioAbertura: response.data.horarioAbertura,
        tempoEntrega: response.data.tempoEntrega,
        taxaFrete: response.data.taxaFrete,
        
      });
    } catch (e) {
      console.error("Erro ao buscar detalhes da empresa:", e);
    }
  };

  // Função para obter as prateleiras da empresa
  const apiGetPrateleiras = async () => {
    try {
      const response = await axiosInstance.get(`/api/empresas/${idEmpresa}/prateleiras`);
      setPrateleiras(response.data.prateleiras);
    } catch (e) {
      alert(e);
    }
  };

  // Chama a API para obter os detalhes da empresa e as prateleiras ao carregar o componente
  useEffect(() => {
    apiGetEmpresaDetails();
    apiGetPrateleiras();
  }, []);

  return (
    <View className="flex-1">
      <ScrollView className="bg-white">
        <View className="bg-white">
          <Image
            className="w-full h-60"
            source={
              empresa.imgCapa
                ? { uri: empresa.imgCapa } // Usa a imagem de capa se disponível
                : require("../public/images/BrandIcon.png") // Imagem padrão se a URL for vazia
            }
          />

          {/* Exibe a imagem de perfil do restaurante e capa no fundo */}
          <View className="mt-20 items-center pb-10">
            {/* Imagem de capa do restaurante */}
            <View className="relative w-full">


              {/* Container para as informações e a imagem de perfil */}
              <View className="absolute bottom-0 left-5 right-5 bg-white rounded-xl items-center pb-5 border border-gray-200 shadow-sm">
                {/* Imagem de perfil posicionada no meio superior do container */}
                <Image
                  className="w-20 h-20 rounded-full border-2 border-black absolute -top-10"
                  source={
                    empresa.imgPerfil
                      ? { uri: empresa.imgPerfil } // Usa a imagem de perfil se disponível
                      : require("../public/images/BrandIcon.png") // Imagem padrão se a URL for vazia
                  }
                />

                {/* Informações do restaurante */}
                <View className="self-start mt-10">
                  <Text className="text-left font-bold text-lg pl-2">
                    {nomeEmpresa}
                  </Text>
                  

                  <Text className="text-left text-gray-500 pl-2">Abertura: {empresa.horarioAbertura}</Text>
                  <Text className="text-left text-gray-500 pl-2" >Encerramento: {empresa.horarioFechamento} </Text>
                  <Text className="text-left text-gray-500 pl-2">Tempo de entrega: {empresa.tempoEntrega}</Text>
                  <Text className="text-left text-gray-500 pl-2">Taxa de entrega: R$ {empresa.taxaFrete},00</Text>
                 
                </View>
              </View>
            </View>
          </View>


          {/* Exibe a lista de prateleiras e produtos */}
          <View className="mt-5">
            <ScrollView showsVerticalScrollIndicator={false}>
              <View className="flex justify-center flex-col ">
                {prateleiras.map(
                  (prateleira) =>
                    prateleira.produtos.length > 0 && ( // Verifica se há produtos na prateleira
                      <View key={prateleira.id} className="mb-5 p-1">
                        <Text className="text-lg font-bold text-black mb-2">{prateleira.nomePrateleira}</Text>
                        <View className="flex flex-col ">
                          {prateleira.produtos.map((produto) => (
                            <TouchableOpacity
                              key={produto.id}
                              onPress={() => {
                                router.push({
                                  pathname: "/ProductDescription",
                                  params: {
                                    idEmpresa: idEmpresa,
                                    idProduto: produto.id,
                                    idPrateleira: prateleira.id,
                                  },
                                });
                              }}
                              className="bg-orange-300 rounded-1xl p-2 mb-2 w-full flex-row justify-between items-center "
                            >
                              <View className="flex flex-col justify-between">
                                <Text className="text-white text-xl pb-1">{produto.nome}</Text>
                                <Text className="text-white text-x pb-5">{produto.descricao}</Text>

                                <Text className="text-white pt-5">
                                  {new Intl.NumberFormat("pt-BR", {
                                    style: "currency",
                                    currency: "BRL",
                                  }).format(produto.preco)}
                                </Text>
                              </View>
                              <Image
                                className="w-24 h-24 rounded-lg"
                                style={{ backgroundColor: "#FFFFFF" }}
                                source={
                                  produto.urlImagem
                                    ? { uri: produto.urlImagem }
                                    : require("../public/images/BrandIcon.png")
                                } // Imagem padrão caso `urlImagem` seja `null`
                              />
                            </TouchableOpacity>
                          ))}
                        </View>
                      </View>
                    )
                )}
              </View>
            </ScrollView>
          </View>
        </View>
      </ScrollView>
      <BottomBar screen="RestaurantScreen"></BottomBar>
    </View>
  );
}
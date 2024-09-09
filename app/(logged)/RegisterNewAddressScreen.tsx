import { useRouter } from "expo-router";
import { Image, ScrollView, View } from "react-native";
import { Button, H4, H5, Input, XStack, YStack } from "tamagui";
import BottomBar from "app/components/BottomBar";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import axios from "axios";
import axiosInstance from "app/config/axiosUrlConfig";
import * as SecureStore from "expo-secure-store";
import { TextInputMask } from "react-native-masked-text";

export default function RegisterNewAddressScreen() {
  const [cep, setCep] = useState("");
  const [estado, setEstado] = useState("");
  const [cidade, setCidade] = useState("");
  const [bairro, setBairro] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [logradouro, setLogradouro] = useState("");

  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const getSecureStorageData = async () => {
    setLoading(true);
    try {
      const tokenStorage = await SecureStore.getItemAsync("token");
      const idUserStorage = await SecureStore.getItemAsync("idUser");

      if (tokenStorage) {
        setToken(JSON.parse(tokenStorage));
      }

      if (idUserStorage) {
        setUserId(JSON.parse(idUserStorage));
      }
    } catch (e) {
      alert(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token === null || userId === null) {
      getSecureStorageData();
    }
  }, [token, userId]);

  const consultarCEP = async () => {
    if (!cep) return;
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      const data = response.data;

      if (data.erro) {
        alert("CEP não encontrado.");
        return;
      }

      setEstado(data.uf || "");
      setCidade(data.localidade || "");
      setBairro(data.bairro || "");
      setLogradouro(data.logradouro || "");
      setComplemento(data.complemento || "");
      setNumero("");  // O número não é retornado pela API do ViaCEP; deve ser inserido pelo usuário
    } catch (e) {
      alert("Erro ao consultar o CEP: " + e.message);
    }
  };

  const apiRegisterAddress = async () => {
    const registerAddressRequestData = {
      cep,
      estado,
      cidade,
      bairro,
      logradouro,
      numero,
      complemento,
    };

    try {
      const response = await axiosInstance.post(
        `/api/clientes/${userId}/enderecos`,
        registerAddressRequestData
      );
      console.log(response.data);
      alert("Endereço registrado com sucesso!");
      router.back(); // Retorna para a tela anterior
    } catch (e) {
      alert("Erro ao registrar o endereço: " + e.message);
    }
  };

  const commonInputStyle = {
    backgroundColor: "#fff",
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 8,
    height: 60,
    paddingHorizontal: 10,
    flex: 1,
    color: 'black',
  };

  return (
    <YStack f={1} bg="white">
      <ScrollView>
        <YStack bg="white" p="$5" space="$4">
          <XStack mt="$5" ai="center" jc="space-around">
            <H4 color="black">Registrar novo endereço</H4>
            <Image
              style={{ width: 80, height: 80 }}
              source={require("../public/icons/tomato/TomatoNumber_One.png")}
            />
          </XStack>

          <YStack space="$4">
            <H5 color="black">CEP</H5>
            <XStack ai="center">
              <TextInputMask
                type={"custom"}
                options={{ mask: "99999-999" }}
                value={cep}
                onChangeText={setCep}
                placeholder="00000-000"
                style={commonInputStyle}
              />
              <Button onPress={consultarCEP} ml="$3" w={50} h={50} p={0}>
                <Image
                  style={{ width: 24, height: 24 }}
                  source={require("../public/icons/ui/search.png")}
                />
              </Button>
            </XStack>
          </YStack>

          <YStack space="$4">
            <H5 color="black">Estado</H5>
            <YStack
              bg="white"
              borderColor="#000"
              borderWidth={1}
              borderRadius={8}
              height={60}
              paddingHorizontal={10}
              jc="center"
            >
              <Picker
                selectedValue={estado}
                onValueChange={setEstado}
                style={commonInputStyle}
              >
                <Picker.Item label="Acre" value="AC" />
                <Picker.Item label="Alagoas" value="AL" />
                <Picker.Item label="Amapá" value="AP" />
                <Picker.Item label="Amazonas" value="AM" />
                <Picker.Item label="Bahia" value="BA" />
                <Picker.Item label="Ceará" value="CE" />
                <Picker.Item label="Distrito Federal" value="DF" />
                <Picker.Item label="Espírito Santo" value="ES" />
                <Picker.Item label="Goiás" value="GO" />
                <Picker.Item label="Maranhão" value="MA" />
                <Picker.Item label="Mato Grosso" value="MT" />
                <Picker.Item label="Mato Grosso do Sul" value="MS" />
                <Picker.Item label="Minas Gerais" value="MG" />
                <Picker.Item label="Pará" value="PA" />
                <Picker.Item label="Paraíba" value="PB" />
                <Picker.Item label="Paraná" value="PR" />
                <Picker.Item label="Pernambuco" value="PE" />
                <Picker.Item label="Piauí" value="PI" />
                <Picker.Item label="Rio de Janeiro" value="RJ" />
                <Picker.Item label="Rio Grande do Norte" value="RN" />
                <Picker.Item label="Rio Grande do Sul" value="RS" />
                <Picker.Item label="Rondônia" value="RO" />
                <Picker.Item label="Roraima" value="RR" />
                <Picker.Item label="Santa Catarina" value="SC" />
                <Picker.Item label="São Paulo" value="SP" />
                <Picker.Item label="Sergipe" value="SE" />
                <Picker.Item label="Tocantins" value="TO" />
              </Picker>
            </YStack>
          </YStack>

          <YStack space="$4">
            <H5 color="black">Cidade</H5>
            <Input
              value={cidade}
              onChangeText={setCidade}
              placeholder="Digite a cidade"
              style={commonInputStyle}
            />
          </YStack>

          <YStack space="$4">
            <H5 color="black">Bairro</H5>
            <Input
              value={bairro}
              onChangeText={setBairro}
              placeholder="Digite o bairro"
              style={commonInputStyle}
            />
          </YStack>

          <YStack space="$4">
            <H5 color="black">Logradouro</H5>
            <Input
              value={logradouro}
              onChangeText={setLogradouro}
              placeholder="Digite o logradouro"
              style={commonInputStyle}
            />
          </YStack>

          <YStack space="$4">
            <H5 color="black">Número</H5>
            <Input
              value={numero}
              onChangeText={setNumero}
              placeholder="Digite o número"
              style={commonInputStyle}
            />
          </YStack>

          <YStack space="$4">
            <H5 color="black">Complemento</H5>
            <Input
            className="text-black"
              value={complemento}
              onChangeText={setComplemento}
              placeholder="Digite o complemento"
              style={commonInputStyle}
            />
          </YStack>

          <YStack mt="$5">
            <Button
              onPress={apiRegisterAddress}
              w="100%"
              h={60}
              bg="$orange10"
              borderRadius="$9"
              shadow="lg"
            >
              Registrar endereço
            </Button>
          </YStack>
        </YStack>
      </ScrollView>
      <BottomBar screen="RegisterNewAddressScreen" />
    </YStack>
  );
}

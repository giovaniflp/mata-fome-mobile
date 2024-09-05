import { useRouter } from "expo-router";
import {
  TouchableOpacity,
  Image,
  ScrollView,
  View,
  StyleSheet,
} from "react-native";
import { Button, H4, H5, Input } from "tamagui";
import BottomBar from "app/components/BottomBar";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import { RegisterAddressToast } from "app/components/RegisterAddressToast";
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
      setEstado(data.uf);
      setCidade(data.localidade);
      setBairro(data.bairro);
      setLogradouro(data.logradouro);
      setComplemento(data.complemento || "");
      setNumero(data.numero || "");
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
    } catch (e) {
      alert("Erro ao registrar o endereço: " + e.message);
    }
  };

  return (
    <View className="flex-1">
      <ScrollView className="bg-white">
        <View className="bg-white">
          <View className="mt-10 flex flex-row justify-around items-center">
            <H4 className="text-black">Registrar novo endereço</H4>
            <Image
              className="w-20 h-20"
              source={require("../public/icons/tomato/TomatoNumber_One.png")}
            />
          </View>
          <View className="mt-5 p-5">
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.inputGroup}>
                <H5 style={styles.label}>CEP</H5>
                <View style={styles.cepContainer}>
                  <TextInputMask
                    type={"custom"}
                    options={{
                      mask: "99999-999", // Máscara para o CEP
                    }}
                    value={cep}
                    onChangeText={setCep}
                    placeholder="00000-000"
                    style={styles.input}
                  />
                  <Button onPress={consultarCEP} style={styles.searchButton}>
                    <Image
                      style={styles.searchIcon}
                      source={require("../public/icons/ui/search.png")}
                    />
                  </Button>
                </View>
              </View>
              <View className="mb-4">
                <H5 className="text-black">Estado</H5>
                <View className="border rounded-lg">
                  <Picker selectedValue={estado} onValueChange={setEstado}>
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
                </View>
              </View>
              <View className="mb-4">
                <H5 className="text-black">Cidade</H5>
                <Input
                  value={cidade}
                  onChangeText={setCidade}
                  className="bg-white rounded-lg h-14 text-black"
                />
              </View>
              <View className="mb-4">
                <H5 className="text-black">Bairro</H5>
                <Input
                  value={bairro}
                  onChangeText={setBairro}
                  className="bg-white rounded-lg h-14 text-black"
                />
              </View>
              <View className="mb-4">
                <H5 className="text-black">Logradouro</H5>
                <Input
                  value={logradouro}
                  onChangeText={setLogradouro}
                  className="bg-white rounded-lg h-14 text-black"
                />
              </View>
              <View className="mb-4">
                <H5 className="text-black">Número</H5>
                <Input
                  value={numero}
                  onChangeText={setNumero}
                  className="bg-white rounded-lg h-14 text-black"
                />
              </View>
              <View className="mb-4">
                <H5 className="text-black">Complemento</H5>
                <Input
                  value={complemento}
                  onChangeText={setComplemento}
                  className="bg-white rounded-lg h-14 text-black"
                />
              </View>
              <View style={styles.buttonContainer}>
                <Button
                  onPress={apiRegisterAddress}
                  style={styles.submitButton}
                >
                  Registrar endereço
                </Button>
              </View>
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 10,
  },
  title: {
    color: "#000",
  },
  image: {
    width: 80,
    height: 80,
  },
  form: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    color: "#000",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#fff",
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 8,
    height: 60,
    paddingHorizontal: 10,
    flex: 1, // Isso garante que o TextInput ocupe o espaço disponível
  },
  cepContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchButton: {
    marginLeft: 10,
    padding: 0,
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  searchIcon: {
    width: 24,
    height: 24,
  },
  pickerContainer: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    overflow: "hidden",
  },
  picker: {
    height: 50,
    width: "100%",
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  submitButton: {
    backgroundColor: "#FFA500", // Laranja
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    color: "#fff",
  },
});

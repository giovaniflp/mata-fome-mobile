import { useRouter } from "expo-router";
import { TouchableOpacity, Image, ScrollView, View } from "react-native";
import { Button, H4, H5, Input } from "tamagui";
import BottomBar from "app/components/BottomBar";
import { Picker } from '@react-native-picker/picker';
import { useEffect, useState } from "react";
import { RegisterAddressToast } from "app/components/RegisterAddressToast";
import axios from "axios";
import axiosInstance from "app/config/axiosUrlConfig";
import * as SecureStore from 'expo-secure-store';

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
            const tokenStorage = await SecureStore.getItemAsync('token');
            const idUserStorage = await SecureStore.getItemAsync('idUser');

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
            setComplemento(data.complemento || '');
            setNumero(data.numero || '');
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
            complemento
        };

        try {
            const response = await axiosInstance.post(`/api/clientes/${userId}/enderecos`, registerAddressRequestData);
            console.log(response.data);
            alert("Endereço registrado com sucesso!");
        } catch (e) {
            alert("Erro ao registrar o endereço: " + e.message);
        }
    };

    return (
        <View className="flex-1">
            <ScrollView className="bg-white">
                <View className='bg-white'>
                    <View className="mt-10 flex flex-row justify-around items-center">
                        <H4 className="text-black">Registrar novo endereço</H4>
                        <Image className="w-20 h-20" source={require("../public/icons/tomato/TomatoNumber_One.png")} />
                    </View>
                    <View className="mt-5 p-5">
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View className="mb-4">
                                <H5 className="text-black">Nome do endereço</H5>
                                <Input
                                    value={logradouro}
                                    onChangeText={setLogradouro}
                                    className="bg-white rounded-lg h-14 text-black"
                                />
                            </View>
                            <View className="mb-4">
                                <H5 className="text-black">CEP</H5>
                                <View className="flex flex-row items-center">
                                    <Input
                                        value={cep}
                                        onChangeText={setCep}
                                        className="bg-white rounded-lg h-14 text-black w-72"
                                    />
                                    <Button
                                        onPress={consultarCEP}
                                        className="w-14 h-14 ml-2"
                                        icon={<Image className="w-10 h-10" source={require("../public/icons/ui/search.png")} />}
                                    />
                                </View>
                            </View>
                            <View className="mb-4">
                                <H5 className="text-black">Estado</H5>
                                <View className="border rounded-lg">
                                    <Picker
                                        selectedValue={estado}
                                        onValueChange={setEstado}
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
                            <View className="my-5">
                                <Button onPress={apiRegisterAddress}>Registrar endereço</Button>
                                <RegisterAddressToast />
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </ScrollView>
            <BottomBar screen="MyAddress" />
        </View>
    );
}

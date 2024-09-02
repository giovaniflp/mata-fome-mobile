import { useRouter, useLocalSearchParams } from "expo-router";
import { router } from "expo-router";
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
    const { idAddress, logradouro, numero, bairro, cidade, estado, cep, complemento } = useLocalSearchParams();

    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);
    const [loading, setLoading] = useState(false);

    const [cepValue, setCep] = useState(cep || '');
    const [logradouroValue, setLogradouro] = useState(logradouro || '');
    const [numeroValue, setNumero] = useState(numero || '');
    const [bairroValue, setBairro] = useState(bairro || '');
    const [cidadeValue, setCidade] = useState(cidade || '');
    const [estadoValue, setEstado] = useState(estado || '');
    const [complementoValue, setComplemento] = useState(complemento || '');

    const router = useRouter();

    const getSecureStorageData = async () => {
        setLoading(true);
        try {
            const tokenStorage = await SecureStore.getItemAsync('token');
            const idUserStorage = await SecureStore.getItemAsync('idUser');

            setToken(tokenStorage ? JSON.parse(tokenStorage) : null);
            setUserId(idUserStorage ? JSON.parse(idUserStorage) : null);
        } catch (e) {
            alert("Erro ao acessar dados seguros: " + e.message);
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
        if (!cepValue) return;
        try {
            const response = await axios.get(`https://viacep.com.br/ws/${cepValue}/json/`);
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

    const apiEditAddress = async () => {
        if (!userId) {
            alert("Usuário não encontrado.");
            return;
        }

        const registerAddressRequestData = {
            cep: cepValue,
            estado: estadoValue,
            cidade: cidadeValue,
            bairro: bairroValue,
            logradouro: logradouroValue,
            numero: numeroValue,
            complemento: complementoValue
        };

        try {
            const response = await axiosInstance.patch(`/api/clientes/${userId}/enderecos/${idAddress}`, registerAddressRequestData);
            console.log(response.data);
            alert("Endereço alterado com sucesso!");
            router.push("MyAddress");
        } catch (e) {
            alert("Erro ao alterar o endereço: " + e.message);
        }
    };

    return (
        <View className="flex-1">
            <ScrollView className="bg-white">
                <View className='bg-white'>
                    <View className="mt-10 flex flex-row justify-around items-center">
                        <H4 className="text-black">Alterar endereço</H4>
                        <Image className="w-20 h-20" source={require("../public/icons/tomato/TomatoNumber_One.png")} />
                    </View>
                    <View className="mt-5 p-5">
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View className="mb-4">
                                <H5 className="text-black">Nome do endereço</H5>
                                <Input
                                    value={logradouroValue}
                                    onChangeText={setLogradouro}
                                    className="bg-white rounded-lg h-14 text-black"
                                />
                            </View>
                            <View className="mb-4">
                                <H5 className="text-black">CEP</H5>
                                <View className="flex flex-row items-center">
                                    <Input
                                        value={cepValue}
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
                                        selectedValue={estadoValue}
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
                                    value={cidadeValue}
                                    onChangeText={setCidade}
                                    className="bg-white rounded-lg h-14 text-black"
                                />
                            </View>
                            <View className="mb-4">
                                <H5 className="text-black">Bairro</H5>
                                <Input
                                    value={bairroValue}
                                    onChangeText={setBairro}
                                    className="bg-white rounded-lg h-14 text-black"
                                />
                            </View>
                            <View className="mb-4">
                                <H5 className="text-black">Logradouro</H5>
                                <Input
                                    value={logradouroValue}
                                    onChangeText={setLogradouro}
                                    className="bg-white rounded-lg h-14 text-black"
                                />
                            </View>
                            <View className="mb-4">
                                <H5 className="text-black">Número</H5>
                                <Input
                                    value={numeroValue}
                                    onChangeText={setNumero}
                                    className="bg-white rounded-lg h-14 text-black"
                                />
                            </View>
                            <View className="mb-4">
                                <H5 className="text-black">Complemento</H5>
                                <Input
                                    value={complementoValue}
                                    onChangeText={setComplemento}
                                    className="bg-white rounded-lg h-14 text-black"
                                />
                            </View>
                            <View className="my-5">
                                <Button onPress={apiEditAddress}>Alterar endereço</Button>
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

import { router } from "expo-router";
import { TouchableOpacity, Image, ScrollView, View } from "react-native";
import { Button, H4, H5, Input } from "tamagui";
import BottomBar from "app/components/BottomBar";
import { Picker } from '@react-native-picker/picker';
import { useEffect, useState } from "react";
import axios from "axios";
import axiosInstance from "app/config/axiosUrlConfig";
import * as SecureStore from 'expo-secure-store';
import { TextInputMask } from 'react-native-masked-text'; // Se você estiver usando máscara para o CEP

export default function RegisterNewPaymentMethodScreen() {
    const [cepCobranca, setCepCobranca] = useState("");
    const [estadoCobranca, setEstadoCobranca] = useState("");
    const [cidadeCobranca, setCidadeCobranca] = useState("");
    const [enderecoCobranca, setEnderecoCobranca] = useState("");

    const [numeroCartao, setNumeroCartao] = useState("");
    const [dataValidade, setDataValidade] = useState("");
    const [nomeTitular, setNomeTitular] = useState("");
    const [cvv, setCvv] = useState("");

    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);
    const [loading, setLoading] = useState(false);

    const getSecureStorageData = async () => {
        setLoading(true);
        try {
            const tokenStorage = await SecureStore.getItemAsync('token');
            const idUserStorage = await SecureStore.getItemAsync('idUser');

            if (tokenStorage && idUserStorage) {
                setToken(JSON.parse(tokenStorage));
                setUserId(JSON.parse(idUserStorage));
            } else {
                alert('Dados de autenticação não encontrados.');
            }
        } catch (e) {
            console.error("Erro ao obter dados de armazenamento seguro: ", e);
            alert('Erro ao obter dados de autenticação.');
        } finally {
            setLoading(false);
        }
    }

    const consultarCEP = async () => {
        if (!cepCobranca) {
            alert('CEP não pode estar vazio.');
            return;
        }

        try {
            const response = await axios.get(`https://viacep.com.br/ws/${cepCobranca}/json/`);
            if (response.data.erro) {
                alert('CEP inválido.');
                return;
            }
            setEstadoCobranca(response.data.uf);
            setCidadeCobranca(response.data.localidade);
            setEnderecoCobranca(response.data.logradouro);
        } catch (e) {
            console.error("Erro ao consultar CEP: ", e);
            alert('Erro ao consultar o CEP.');
        }
    }

    useEffect(() => {
        if (token === null || userId === null) {
            getSecureStorageData();
        }
    }, [token, userId]);

    const apiRegisterNewCard = async () => {
        if (!numeroCartao || !dataValidade || !nomeTitular || !cvv || !enderecoCobranca || !cidadeCobranca || !estadoCobranca || !cepCobranca) {
            alert('Todos os campos devem ser preenchidos.');
            return;
        }

        const registerNewCardRequest = {
            tipo: "crédito",
            numero_cartao: numeroCartao,
            data_validade: dataValidade,
            nome_titular: nomeTitular,
            cvv: cvv,
            endereco_cobranca: enderecoCobranca,
            cidade_cobranca: cidadeCobranca,
            estado_cobranca: estadoCobranca,
            cep_cobranca: cepCobranca
        };

        try {
            const response = await axiosInstance.post(`/api/clientes/${userId}/formasDePagamentos`, registerNewCardRequest, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            alert("Cartão cadastrado com sucesso.");
            console.log(response.data);
        } catch (e) {
            console.error("Erro ao registrar o cartão: ", e.response ? e.response.data : e.message);
            alert('Ocorreu um erro ao registrar o cartão.');
        }
    };

    return (
        <View className="flex-1">
            <ScrollView className="bg-white">
                <View className='bg-white'>
                    <View className="mt-10 flex flex-row justify-around items-center">
                        <H4 className="text-black">Registrar novo cartão de crédito</H4>
                        <Image className="w-20 h-20" source={require("../public/icons/tomato/TomatoNumber_One.png")} />
                    </View>
                    <View className="mt-5 p-5">
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View className="mb-4">
                                <H5 className="text-black">Número do cartão</H5>
                                <Input
                                    value={numeroCartao}
                                    onChangeText={setNumeroCartao}
                                    className="bg-white rounded-lg h-14 text-black"
                                />
                            </View>
                            <View className="mb-4">
                                <H5 className="text-black">Data de validade</H5>
                                <Input
                                    value={dataValidade}
                                    onChangeText={setDataValidade}
                                    className="bg-white rounded-lg h-14 text-black"
                                />
                            </View>
                            <View className="mb-4">
                                <H5 className="text-black">Nome do titular</H5>
                                <Input
                                    value={nomeTitular}
                                    onChangeText={setNomeTitular}
                                    className="bg-white rounded-lg h-14 text-black"
                                />
                            </View>
                            <View className="mb-4">
                                <H5 className="text-black">CVV</H5>
                                <Input
                                    value={cvv}
                                    onChangeText={setCvv}
                                    className="bg-white rounded-lg h-14 text-black"
                                />
                            </View>
                            <View className="mb-4">
                                <H5 className="text-black">CEP de cobrança</H5>
                                <View className="flex flex-row items-center">
                                    <TextInputMask
                                        type={'zip-code'}
                                        value={cepCobranca}
                                        onChangeText={setCepCobranca}
                                        className="bg-white border pl-4 border-gray-200 rounded-lg h-14 text-black w-72"
                                    />
                                    <Button
                                        onPress={consultarCEP}
                                        className="w-14 h-14 ml-2 bg-black"
                                        icon={<Image className="w-10 h-10" source={require("../public/icons/ui/search.png")} />}
                                    />
                                </View>
                            </View>
                            <View className="mb-4">
                                <H5 className="text-black">Estado de cobrança</H5>
                                <View className="border border-gray-200 rounded-lg">
                                    <Picker
                                        selectedValue={estadoCobranca}
                                        onValueChange={setEstadoCobranca}
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
                                <H5 className="text-black">Cidade de cobrança</H5>
                                <Input
                                    value={cidadeCobranca}
                                    onChangeText={setCidadeCobranca}
                                    className="bg-white rounded-lg h-14 text-black"
                                />
                            </View>
                            <View className="mb-4">
                                <H5 className="text-black">Endereço de cobrança</H5>
                                <Input
                                    value={enderecoCobranca}
                                    onChangeText={setEnderecoCobranca}
                                    className="bg-white rounded-lg h-14 text-black"
                                />
                            </View>
                            <View className="my-5">
                                <Button className="bg-black text-white" onPress={apiRegisterNewCard}>
                                    Registrar novo cartão
                                </Button>
                                
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </ScrollView>
            <BottomBar screen="RegisterNewPaymentMethodScreen" />
        </View>
    )
}

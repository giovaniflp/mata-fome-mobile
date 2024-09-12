import { useRouter } from "expo-router";
import { Image, ScrollView, View } from "react-native";
import { Button, H4, H5, Input, XStack, YStack } from "tamagui";
import BottomBar from "app/components/BottomBar";
import { Picker } from '@react-native-picker/picker';
import { useEffect, useState } from "react";
import axios from "axios";
import axiosInstance from "app/config/axiosUrlConfig";
import * as SecureStore from 'expo-secure-store';
import { TextInputMask } from 'react-native-masked-text';

export default function RegisterNewDebitPaymentScreen() {
    const [cepCobranca, setCepCobranca] = useState("");
    const [estadoCobranca, setEstadoCobranca] = useState("");
    const [cidadeCobranca, setCidadeCobranca] = useState("");
    const [enderecoCobranca, setEnderecoCobranca] = useState("");
    const [numeroCartao, setNumeroCartao] = useState("");
    const [dataValidade, setDataValidade] = useState("");
    const [nomeTitular, setNomeTitular] = useState("");
    const [cvv, setCvv] = useState("");
    const [token, setToken] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const getSecureStorageData = async () => {
        setLoading(true);
        try {
            const tokenStorage = await SecureStore.getItemAsync('token');
            const idUserStorage = await SecureStore.getItemAsync('idUser');
            if (tokenStorage) setToken(JSON.parse(tokenStorage));
            if (idUserStorage) setUserId(JSON.parse(idUserStorage));
        } catch (error) {
            console.error("Erro ao obter dados do armazenamento seguro:", error);
            alert("Erro ao carregar dados de autenticação. Tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!token || !userId) {
            getSecureStorageData();
        }
    }, [token, userId]);

    const consultarCEP = async () => {
        if (!cepCobranca) return;

        try {
            const response = await axios.get(`https://viacep.com.br/ws/${cepCobranca}/json/`);
            const data = response.data;

            if (data.erro) {
                alert('CEP não encontrado.');
                return;
            }

            setEstadoCobranca(data.uf || "");
            setCidadeCobranca(data.localidade || "");
            setEnderecoCobranca(data.logradouro || "");
        } catch (error) {
            console.error("Erro ao consultar o CEP:", error);
            alert("Erro ao consultar o CEP. Tente novamente.");
        }
    };

    const apiRegisterNewCard = async () => {
        if (!token || !userId) {
            alert("Usuário não autenticado.");
            return;
        }

        if (!numeroCartao || !dataValidade || !nomeTitular || !cvv || !enderecoCobranca || !cidadeCobranca || !estadoCobranca || !cepCobranca) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        const formattedNumberCartao = numeroCartao.replace(/\s+/g, '');
        const formattedCvv = Number(cvv);

        // Validação do número do cartão
        if (formattedNumberCartao.length !== 16) {
            alert("Número do cartão deve ter exatamente 16 dígitos.");
            return;
        }

        if (isNaN(formattedCvv)) {
            alert("CVV inválido.");
            return;
        }

        const registerNewCardRequest = {
            tipo: "débito",
            numero_cartao: formattedNumberCartao,
            data_validade: dataValidade,
            nome_titular: nomeTitular,
            cvv: formattedCvv,
            endereco_cobranca: enderecoCobranca,
            cidade_cobranca: cidadeCobranca,
            estado_cobranca: estadoCobranca,
            cep_cobranca: cepCobranca,
        };

        try {
            await axiosInstance.post(`/api/clientes/${userId}/formasDePagamentos`, registerNewCardRequest, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            alert("Cartão cadastrado com sucesso.");
            router.back();
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                console.error("Erro ao registrar o cartão:", error.response.data);
                alert(`Erro ao registrar o cartão: ${error.response.data.message || 'Erro desconhecido.'}`);
            } else {
                console.error("Erro ao registrar o cartão:", error);
                alert('Erro ao registrar o cartão. Verifique os dados e tente novamente.');
            }
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
                        <H4 color="black">Novo cartão de débito</H4>
                        <Image
                            style={{ width: 80, height: 80 }}
                            source={require("../public/icons/tomato/TomatoNumber_One.png")}
                        />
                    </XStack>

                    <YStack space="$4">
                        <H5 color="black">Número do cartão</H5>
                        <TextInputMask
                            type={"custom"}
                            options={{ mask: "9999 9999 9999 9999" }}
                            value={numeroCartao}
                            onChangeText={setNumeroCartao}
                            placeholder="Digite o número do cartão"
                            style={commonInputStyle}
                        />
                    </YStack>

                    <YStack space="$4">
                        <H5 color="black">Data de validade</H5>
                        <Input
                            value={dataValidade}
                            onChangeText={setDataValidade}
                            placeholder="MM/AA"
                            style={commonInputStyle}
                        />
                    </YStack>

                    <YStack space="$4">
                        <H5 color="black">Nome do titular</H5>
                        <Input
                            value={nomeTitular}
                            onChangeText={setNomeTitular}
                            placeholder="Digite o nome do titular"
                            style={commonInputStyle}
                        />
                    </YStack>

                    <YStack space="$4">
                        <H5 color="black">CVV</H5>
                        <Input
                            value={cvv}
                            onChangeText={setCvv}
                            placeholder="CVV"
                            keyboardType="numeric"
                            style={commonInputStyle}
                        />
                    </YStack>

                    <YStack space="$4">
                        <H5 color="black">CEP de cobrança</H5>
                        <XStack ai="center">
                            <TextInputMask
                                type={"custom"}
                                options={{ mask: "99999-999" }}
                                value={cepCobranca}
                                onChangeText={setCepCobranca}
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
                        <H5 color="black">Estado de cobrança</H5>
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
                                selectedValue={estadoCobranca}
                                onValueChange={setEstadoCobranca}
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
                        <H5 color="black">Cidade de cobrança</H5>
                        <Input
                            value={cidadeCobranca}
                            onChangeText={setCidadeCobranca}
                            placeholder="Digite a cidade de cobrança"
                            style={commonInputStyle}
                        />
                    </YStack>

                    <YStack space="$4">
                        <H5 color="black">Endereço de cobrança</H5>
                        <Input
                            value={enderecoCobranca}
                            onChangeText={setEnderecoCobranca}
                            placeholder="Digite o endereço de cobrança"
                            style={commonInputStyle}
                        />
                    </YStack>

                    <YStack mt="$5">
                        <Button
                            onPress={apiRegisterNewCard}
                            w="100%"
                            h={60}
                            bg="$orange10"
                            borderRadius="$9"
                            shadow="lg"
                        >
                            Cadastrar Cartão
                        </Button>
                    </YStack>
                </YStack>
            </ScrollView>

            <BottomBar screen="RegisterNewDebitPaymentScreen" />
        </YStack>
    );
}

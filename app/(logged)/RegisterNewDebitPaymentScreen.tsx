import { router } from "expo-router";
import { TouchableOpacity, Image, ScrollView, View, Text } from "react-native";
import { Button, H4, H5, H6, Input } from "tamagui";
import BottomBar from "app/components/BottomBar";
import { Picker } from '@react-native-picker/picker';
import { useEffect, useState } from "react";
import { RegisterAddressToast } from "app/components/RegisterAddressToast";
import axios from "axios";
import axiosInstance from "app/config/axiosUrlConfig";
import * as SecureStore from 'expo-secure-store';

export default function RegisterNewAddressScreen() {
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
            const usernameStorage = await SecureStore.getItemAsync('username');
            const idUserStorage = await SecureStore.getItemAsync('idUser');

            const tokenParse = JSON.parse(tokenStorage);
            const usernameParse = JSON.parse(usernameStorage);
            const idUserParse = JSON.parse(idUserStorage);

            setToken(tokenParse);
            setUserId(idUserParse);

            console.log(token);
            console.log(userId);
        } catch (e) {
            alert(e);
        }
    }

    const consultarCEP = async () => {
        console.log(cepCobranca);
        try {
            await axios.get(`https://viacep.com.br/ws/${cepCobranca}/json/`).then((response) => {
                console.log(response.data);
                setEstadoCobranca(response.data.uf);
                setCidadeCobranca(response.data.localidade);
                setEnderecoCobranca(response.data.logradouro);
            });
        } catch (e) {
            alert(e);
        }
    }

    useEffect(() => {
        getSecureStorageData();
    }, [token == null, userId == null]);

    const apiRegisterNewCard = async () => {
        const registerNewCardRequest = {
            tipo: "débito",
            numero_cartao: numeroCartao,
            data_validade: dataValidade,
            nome_titular: nomeTitular,
            cvv: cvv,
            endereco_cobranca: enderecoCobranca,
            cidade_cobranca: cidadeCobranca,
            estado_cobranca: estadoCobranca,
            cep_cobranca: cepCobranca
        }
        try {
            await axiosInstance.post(`/api/clientes/${userId}/formasDePagamentos`, registerNewCardRequest).then((response) => {
                console.log(response.data);
                alert("Cartão registrado com sucesso")
            });
        } catch (e) {
            alert(e);
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View className='bg-white'>
                    <View className="mt-10 flex flex-row justify-around items-center">
                        <H4 className="text-black">Registrar novo cartão de débito</H4>
                        <Image className="w-20 h-20" source={require("../public/icons/tomato/TomatoNumber_One.png")} />
                    </View>
                    <View className="mt-5 p-5">
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View style={styles.inputContainer}>
                                <H5 style={styles.inputLabel}>Número do cartão</H5>
                                <Input
                                    value={numeroCartao}
                                    onChangeText={setNumeroCartao}
                                    style={styles.input}
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <H5 style={styles.inputLabel}>Data de validade</H5>
                                <Input
                                    value={dataValidade}
                                    onChangeText={setDataValidade}
                                    style={styles.input}
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <H5 style={styles.inputLabel}>Nome do titular</H5>
                                <Input
                                    value={nomeTitular}
                                    onChangeText={setNomeTitular}
                                    style={styles.input}
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <H5 style={styles.inputLabel}>CVV</H5>
                                <Input
                                    value={cvv}
                                    onChangeText={setCvv}
                                    style={styles.input}
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <H5 style={styles.inputLabel}>CEP de cobrança</H5>
                                <View style={styles.cepContainer}>
                                    <Input
                                        value={cepCobranca}
                                        onChangeText={setCepCobranca}
                                        style={[styles.input, { width: '72%' }]}
                                    />
                                    <Button
                                        onPress={consultarCEP}
                                        style={styles.searchButton}
                                        icon={<Image style={styles.searchIcon} source={require("../public/icons/ui/search.png")} />}
                                    />
                                </View>
                            </View>
                            <View style={styles.inputContainer}>
                                <H5 style={styles.inputLabel}>Estado de cobrança</H5>
                                <View style={styles.pickerContainer}>
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
                            <View style={styles.inputContainer}>
                                <H5 style={styles.inputLabel}>Cidade de cobrança</H5>
                                <Input
                                    value={cidadeCobranca}
                                    onChangeText={setCidadeCobranca}
                                    style={styles.input}
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <H5 style={styles.inputLabel}>Endereço de cobrança</H5>
                                <Input
                                    value={enderecoCobranca}
                                    onChangeText={setEnderecoCobranca}
                                    style={styles.input}
                                />
                            </View>
                            <View style={styles.buttonContainer}>
                                <Button onPress={apiRegisterNewCard} className="bg-black text-white">
                                    Registrar novo cartão
                                </Button>

                            </View>
                        </ScrollView>
                    </View>
                </View>
            </ScrollView>
            <BottomBar screen="MyAddress" />
        </View>
    );
}

const styles = {
    inputContainer: {
        marginBottom: 20,
    },
    inputLabel: {
        fontSize: 16,
        color: 'black',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 10,
        backgroundColor: '#f9f9f9',
    },
    cepContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchButton: {
        marginLeft: 10,
        padding: 10,
        borderRadius: 8,
        backgroundColor: '#007bff',
    },
    searchIcon: {
        width: 20,
        height: 20,
        tintColor: 'white',
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        backgroundColor: '#f9f9f9',
    },
    buttonContainer: {
        marginTop: 20,
    },
    submitButton: {
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 8,
    },
};

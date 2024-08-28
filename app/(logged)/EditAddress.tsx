import { useRouter, useLocalSearchParams } from "expo-router";
import { TouchableOpacity, Image, ScrollView, View } from "react-native";
import { Button, H4, H5, H6, Text, Input } from "tamagui";
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

            setToken(JSON.parse(tokenStorage));
            setUserId(JSON.parse(idUserStorage));
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
        console.log(cepValue);
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
            alert(e);
        }
    };

    const apiEditAddress = async () => {

        const idUserStorage = await SecureStore.getItemAsync('idUser');
        const idUserParse = JSON.parse(idUserStorage);
        
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
            const response = await axiosInstance.put(`/api/clientes/${idUser}/enderecos/${idAddress}/`, registerAddressRequestData);
            console.log(response.data);
            alert("Endereço alterado com sucesso!");
        } catch (e) {
            alert(e);
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
                                        {/* Lista de estados */}
                                        <Picker.Item label="Acre" value="AC" />
                                        {/* ... outros estados */}
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
                                <Button onPress={apiEditAddress}>Registrar endereço</Button>
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

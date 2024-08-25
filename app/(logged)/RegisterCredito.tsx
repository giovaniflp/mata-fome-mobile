import { router } from "expo-router";
import { TouchableOpacity, Image, ScrollView, View } from "react-native";
import { Button, H4, H5, H6, Text, Input } from "tamagui";
import BottomBar from "app/components/BottomBar";
import {Picker} from '@react-native-picker/picker';
import { useEffect, useState } from "react";
import { RegisterAddressToast } from "app/components/RegisterAddressToast";
import axios from "axios";
import axiosInstance from "app/config/axiosUrlConfig";
import * as SecureStore from 'expo-secure-store';

export default function RegisterCredito(){

    const[cepCobranca, setCepCobranca] = useState("")
    const[estadoCobranca, setEstadoCobranca] = useState("")
    const[cidadeCobranca, setCidadeCobranca] = useState("")
    const[enderecoCobranca, setEnderecoCobranca] = useState("")

    const[numeroCartao, setNumeroCartao] = useState("")
    const[dataValidade, setDataValidade] = useState("")
    const[nomeTitular, setNomeTitular] = useState("")
    const[cpfTitular, setcpfTitular] = useState("")
    const[cvv, setCvv] = useState("")

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
        }
        catch (e) {
            alert(e);
        }
    }

    const consultarCEP = async () => {
        console.log(cepCobranca)
        try{
            await axios.get(`https://viacep.com.br/ws/${cepCobranca}/json/`).then((response)=>{
                console.log(response.data)
                setEstadoCobranca(response.data.uf)
                setCidadeCobranca(response.data.localidade)
                setEnderecoCobranca(response.data.logradouro)
            })
        }
        catch(e){
            alert(e)
        }
    }

    useEffect(()=>{
        getSecureStorageData();
    },[token == null])

    useEffect(()=>{
        getSecureStorageData();
    },[userId == null])

    const apiRegisterNewCard = async () => {
        const registerNewCardRequest = {
            tipo: "crédito",
            numero_cartao: numeroCartao,
            data_validade: dataValidade,
            nome_titular: nomeTitular,
            cpf_titular: cpfTitular,
            cvv: cvv,
            endereco_cobranca: enderecoCobranca,
            cidade_cobranca: cidadeCobranca,
            estado_cobranca: estadoCobranca,
            cep_cobranca: cepCobranca
        }
        try{
            await axiosInstance.post(`/api/cliente/formasDePagamento/${userId}`, registerNewCardRequest).then((response)=>{
                console.log(response.data)
            })
        }
        catch(e){
            alert(e)
        }
    }

    return(
        <View className="flex-1">
            <ScrollView className="bg-white">
            <View className='bg-white'>
            <View className="mt-5 flex flex-row justify-beetwed items-center">
                    <H4 className="text-black p-5" >Registrar Cartão de Crédito</H4>
                        <Image className="w-20 h-20" source={require("../public/icons/tomato/TomatoNumber_One.png")}></Image>
                    </View>
                <View className="p-8">
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View className="mb-4">
                            <H5 className="text-black">Número do cartão</H5>
                            <Input value={numeroCartao} onChangeText={(text)=>{setNumeroCartao(text)}} className="bg-white rounded-lg h-14 text-black"></Input>
                        </View>

                        <View className="mb-4">
                            <H5 className="text-black">Data de validade</H5>
                            <Input value={dataValidade} onChangeText={(text)=>{setDataValidade(text)}} className="bg-white rounded-lg h-14 text-black"></Input>
                        </View>

                        <View className="mb-4">
                            <H5 className="text-black">CVV</H5>
                            <Input value={cvv} onChangeText={(text)=>{setCvv(text)}} className="bg-white rounded-lg h-14 text-black"></Input>
                        </View>

                        <View className="mb-4">
                            <H5 className="text-black">Nome do titular</H5>
                            <Input value={nomeTitular} onChangeText={(text)=>{setNomeTitular(text)}} className="bg-white rounded-lg h-14 text-black"></Input>
                        </View>

                        <View className="mb-4">
                            <H5 className="text-black">CPF</H5>
                            <Input value={cpfTitular} onChangeText={(text)=>{setcpfTitular(text)}} className="bg-white rounded-lg h-14 text-black"></Input>
                        </View>

                        <View className="mb-4">
                        <H5 className="text-black">CEP de cobrança</H5>
                            <View className="flex flex-row items-center">
                                <Input value={cepCobranca} onChangeText={(text) => setCepCobranca(text)}  className="bg-white rounded-lg h-14 text-black w-60"></Input>
                                <Button onPress={consultarCEP} className="w-14 h-14 ml-8" icon={<Image className="w-10 h-10" source={require("../public/icons/ui/search.png")}></Image>}></Button>
                            </View>
                        </View>
                        <View className="mb-4">
                            <H5 className="text-black">Estado de cobrança</H5>
                            <View className="border rounded-lg">
                                <Picker
                                selectedValue={estadoCobranca}
                                onValueChange={setEstadoCobranca}> 
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
                            <Input value={cidadeCobranca} onChangeText={(text)=>{setCidadeCobranca(text)}} className="bg-white rounded-lg h-14 text-black"></Input>
                        </View>
                        <View className="mb-4">
                            <H5 className="text-black">Endereço de cobrança</H5>
                            <Input value={enderecoCobranca} onChangeText={(text)=>{setEnderecoCobranca(text)}} className="bg-white rounded-lg h-14 text-black"></Input>
                        </View>
                        <View className="my-5">
                        <RegisterAddressToast></RegisterAddressToast>
                        </View>
                    </ScrollView>
                    </View>
                </View>
            </ScrollView>
            <BottomBar screen="MyAddress"></BottomBar>
        </View>
    )
}
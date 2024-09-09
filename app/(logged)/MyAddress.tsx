import BottomBar from "app/components/BottomBar";
import axiosInstance from "app/config/axiosUrlConfig";
import { useRouter } from "expo-router";
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState, useCallback } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View, Alert } from "react-native";
import { Button, H4, H5, H6 } from "tamagui"; // Ajuste conforme necessário para a biblioteca de UI
import { useFocusEffect } from 'expo-router'; // Importa useFocusEffect

export default function MyAddress() {
    const [addressList, setAddressList] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const router = useRouter();

    const fetchAddressList = useCallback(async () => {
        const idUserStorage = await SecureStore.getItemAsync('idUser');
        const idUserParse = JSON.parse(idUserStorage);

        if (!idUserParse) {
            alert("Usuário não encontrado.");
            return;
        }

        try {
            const response = await axiosInstance.get(`/api/clientes/${idUserParse}/enderecos`);
            setAddressList(response.data.enderecos);
        } catch (e) {
            alert(e.message || "Erro ao buscar endereços.");
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            fetchAddressList();
        }, [fetchAddressList])
    );

    const apiDeleteAddress = (addressId) => {
        if (!addressId) {
            alert("Endereço não encontrado.");
            return;
        }

        // Mostra o pop-up de confirmação
        Alert.alert(
            "Confirmar Exclusão",
            "Tem certeza de que deseja excluir este endereço?",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Excluir",
                    onPress: async () => {
                        try {
                            const response = await axiosInstance.delete(`/api/clientes/enderecos/${addressId}`);

                            if (response.status === 204) {
                                console.log("Endereço excluído com sucesso!");
                                alert("Endereço excluído com sucesso!");
                                setAddressList((prevList) => prevList.filter(address => address.id !== addressId));
                            } else {
                                console.log(response.data);
                                alert("Erro ao excluir o endereço!");
                            }
                        } catch (e) {
                            console.error("Erro ao excluir o endereço:", e);
                            alert("Erro ao excluir o endereço: " + e.message);
                        }
                    }
                }
            ],
            { cancelable: true } // Permite que o alerta seja cancelado clicando fora do pop-up
        );
    };

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View className='bg-white'>
                    <View className="mt-10 flex flex-row justify-around items-center">
                        <H4 className="text-black">Selecione o local de entrega</H4>
                        <Image className="w-20 h-20" source={require("../public/icons/tomato/TomatoNumber_One.png")} />
                    </View>
                    <View className="mt-5">
                        {addressList.map((address, index) => {
                            const isSelected = address.id === selectedAddress;

                            return (
                                <TouchableOpacity
                                    onPress={() => setSelectedAddress(address.id)}
                                    key={address.id}
                                    style={{
                                        backgroundColor: 'white',
                                        shadowColor: '#000',
                                        shadowOffset: { width: 0, height: 2 },
                                        shadowOpacity: 0.1,
                                        shadowRadius: 3,
                                        elevation: 1,
                                        borderRadius: 8,
                                        padding: 16,
                                        marginHorizontal: 8,
                                        marginBottom: 16,
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        borderWidth: isSelected ? 2 : 1,
                                        borderColor: isSelected ? 'orange' : '#ccc'
                                    }}
                                >
                                    <View style={{ flex: 1 }}>
                                        <H5 style={{ color: 'black', fontWeight: '600' }}>Endereço {index + 1}</H5>
                                        <H6 style={{ color: '#333', marginTop: 4 }}>{address.logradouro}, {address.numero}, {address.bairro}, {address.cidade} - {address.estado}</H6>
                                        <Text style={{ color: '#666', marginTop: 4 }}>CEP: {address.cep}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                router.push({
                                                    pathname: "/EditAddress",
                                                    params: {
                                                        idAddress: address.id,
                                                        logradouro: address.logradouro,
                                                        numero: address.numero,
                                                        bairro: address.bairro,
                                                        cidade: address.cidade,
                                                        estado: address.estado,
                                                        cep: address.cep,
                                                        complemento: address.complemento
                                                    }
                                                });
                                            }}
                                            style={{
                                                padding: 8,
                                                backgroundColor: '#eee',
                                                borderRadius: 50,
                                                shadowColor: '#000',
                                                shadowOffset: { width: 0, height: 1 },
                                                shadowOpacity: 0.2,
                                                shadowRadius: 2,
                                                elevation: 1,
                                                marginBottom: 8
                                            }}
                                        >
                                            <Image style={{ width: 24, height: 24, tintColor: 'black' }} source={require("../public/icons/ui/edit.png")} />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => apiDeleteAddress(address.id)}
                                            style={{
                                                padding: 8,
                                                backgroundColor: '#fdd',
                                                borderRadius: 50,
                                                shadowColor: '#000',
                                                shadowOffset: { width: 0, height: 1 },
                                                shadowOpacity: 0.2,
                                                shadowRadius: 2,
                                                elevation: 1
                                            }}
                                        >
                                            <Image style={{ width: 24, height: 24, tintColor: 'black' }} source={require("../public/icons/ui/delete.png")} />
                                        </TouchableOpacity>
                                    </View>
                                </TouchableOpacity>
                            );
                        })}

                        <View style={{ padding: 16, alignItems: 'center' }}>
                            <TouchableOpacity
                                onPress={() => router.push("RegisterNewAddressScreen")}
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: 'orange',
                                    borderRadius: 50,
                                    padding: 12
                                }}
                            >
                                <H4 style={{ color: 'white' }}>Adicionar novo endereço</H4>
                                <Image style={{ width: 40, height: 40, marginLeft: 8, tintColor: 'white' }} source={require("../public/icons/ui/plus.png")} />
                            </TouchableOpacity>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginVertical: 20 }}>
                                <Button style={{ backgroundColor: 'green', width: 160, marginRight: 10 }}>
                                    <Text style={{ color: 'white', fontSize: 12 }}>Vou retirar no local</Text>
                                </Button>
                                <Button onPress={() => router.push("PaymentScreen")} style={{ backgroundColor: 'orange', width: 160 }}>
                                    <Text style={{ color: 'white' }}>Continuar</Text>
                                </Button>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <BottomBar screen="RegisteredAddressProfileScreen" />
        </View>
    );
}

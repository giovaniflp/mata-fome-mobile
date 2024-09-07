import BottomBar from "app/components/BottomBar";
import axiosInstance from "app/config/axiosUrlConfig";
import { useRouter } from "expo-router";
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Button, H4, H5, H6 } from "tamagui"; // Ajuste conforme necessário para a biblioteca de UI

export default function MyAddress() {
    const [addressList, setAddressList] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const router = useRouter();

    const saveAddressIdInStorage = async (addressId) => {
        await SecureStore.setItemAsync('enderecoEntregaId', JSON.stringify(addressId));
    }

    useEffect(() => {
        const apiGetAllRegisteredAddress = async () => {
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
        };

        apiGetAllRegisteredAddress();
    }, []);

    const apiDeleteAddress = async (addressId) => {
        if (!addressId) {
            alert("Endereço não encontrado.");
            return;
        }

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
    };

    return (
        <View className="flex-1">
            <ScrollView className="bg-white">
                <View className='bg-white'>
                    <View className="mt-10 flex flex-row justify-around items-center">
                        <H4 className="text-black">Selecione o local de entrega</H4>
                        <Image className="w-20 h-20" source={require("../public/icons/tomato/TomatoNumber_One.png")} />
                    </View>
                    <View className="mt-5">
                        <ScrollView showsVerticalScrollIndicator={false}>
                            {addressList.map((address, index) => {
                                const isSelected = address.id === selectedAddress;

                                return (
                                    <TouchableOpacity
                                        onPress={
                                            () => (
                                                setSelectedAddress(address.id),
                                                saveAddressIdInStorage(address.id)
                                            )
                                        }
                                        key={address.id}
                                        className={`bg-gray-200 rounded-3xl p-4 mx-2 mt-5 flex flex-row justify-between ${isSelected ? 'border-2 border-orange-500' : 'border-transparent'}`}
                                    >
                                        <View className="w-3/4">
                                            <H5 className="text-black">Endereço {index + 1} - CEP: {address.cep}</H5>
                                            <H6 className="text-black">{address.logradouro}, {address.numero}, {address.bairro}, {address.cidade} - {address.estado}</H6>
                                        </View>
                                        {/* Ajuste para empilhar os botões verticalmente */}
                                        <View className="flex flex-col items-center space-y-2">
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
                                                className="p-2 bg-gray-300 rounded-full"
                                            >
                                                <Image className="w-8 h-8" source={require("../public/icons/ui/edit.png")} />
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                onPress={() => apiDeleteAddress(address.id)}
                                                className="p-2 bg-red-300 rounded-full"
                                            >
                                                <Image className="w-8 h-8" source={require("../public/icons/ui/delete.png")} />
                                            </TouchableOpacity>
                                        </View>
                                    </TouchableOpacity>
                                );
                            })}

                            <View className="p-4 mx-2 mt-5 flex items-center">
                                <TouchableOpacity onPress={() => router.push("RegisterNewAddressScreen")} className="flex flex-row justify-center items-center">
                                    <H4 className="text-black">Adicionar novo endereço</H4>
                                    <Image className="w-10 h-10 ml-2" source={require("../public/icons/ui/plus.png")} />
                                </TouchableOpacity>
                            </View>
                            <View className="flex flex-row justify-around items-center my-5">
                                <Button className="bg-green-500 w-40">
                                    <Text className="text-xs text-white">Vou retirar no local</Text>
                                </Button>
                                <Button onPress={() => router.push("PaymentScreen")} className="bg-orange-500 w-40">
                                    <Text className="text-white">Continuar</Text>
                                </Button>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </ScrollView>
            <BottomBar screen="RegisteredAddressScreen" />
        </View>
    );
}

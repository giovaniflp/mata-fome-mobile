import { ShoppingCartToast } from "app/components/ShoppingCartToast";
import { router } from "expo-router";
import { TouchableOpacity, Image, ScrollView, View } from "react-native";
import { Button, H4, H5, H6, Text } from "tamagui";
import BottomBar from "app/components/BottomBar";
import { useState, useEffect } from "react";
import axiosInstance from "app/config/axiosUrlConfig";
import * as SecureStore from 'expo-secure-store';

export default function RegisteredAddressScreen() {
    const [addressList, setAddressList] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState();

    const apiGetAllRegisteredAddress = async () => {
        const idUserStorage = await SecureStore.getItemAsync('idUser');
        const idUserParse = JSON.parse(idUserStorage);

        try {
            await axiosInstance.get(`/api/clientes/${idUserParse}/enderecos`).then((response) => {
                setAddressList(response.data.enderecos);
            });
        } catch (e) {
            alert(e);
        }
    };

    useEffect(() => {
        apiGetAllRegisteredAddress();
    }, []);

    const saveAddressIdInStorage = async (addressId) => {
        await SecureStore.setItemAsync('enderecoEntregaId', JSON.stringify(addressId));
    };

    const handleContinue = () => {
        if (selectedAddress) {
            router.push("PaymentScreen");
        } else {
            alert("Por favor, selecione um endereço antes de continuar.");
        }
    };

    return (
        <View className="flex-1">
            <ScrollView className="bg-white">
                <View className="bg-white">
                    <View className="mt-10 flex flex-row justify-around items-center">
                        <H4 className="text-black">Endereços cadastrados</H4>
                        <Image className="w-20 h-20" source={require("../public/icons/tomato/TomatoNumber_One.png")}></Image>
                    </View>
                    <View className="mt-5">
                        <ScrollView showsVerticalScrollIndicator={false}>
                            {addressList.map((address, index) => {
                                const isSelected = address.id === selectedAddress;

                                return (
                                    <TouchableOpacity
                                        onPress={() => {
                                            setSelectedAddress(address.id);
                                            saveAddressIdInStorage(address.id);
                                        }}
                                        key={address.id}
                                        className={`bg-gray-200 rounded-3xl p-4 mx-2 mt-5 flex flex-row ${isSelected ? 'border-2 border-orange-500' : 'border-transparent'}`}
                                    >
                                        <View className="w-80">
                                            <H5 className="text-black">Endereço {index + 1} - CEP: {address.cep}</H5>
                                            <H6 className="text-black">{address.logradouro}, {address.numero}, {address.bairro}, {address.cidade} - {address.estado}</H6>
                                        </View>
                                        <View>
                                            <TouchableOpacity>
                                                <Image className="w-10 h-10" source={require("../public/icons/ui/edit.png")}></Image>
                                            </TouchableOpacity>
                                            <TouchableOpacity>
                                                <Image className="w-10 h-10" source={require("../public/icons/ui/delete.png")}></Image>
                                            </TouchableOpacity>
                                        </View>
                                    </TouchableOpacity>
                                );
                            })}
                            <View className="p-4 mx-2 mt-5 flex items-center">
                                <TouchableOpacity
                                    onPress={() => {
                                        router.push("RegisterNewAddressScreen");
                                    }}
                                    className="flex flex-row justify-center items-center"
                                >
                                    <H4 className="text-black">Adicionar novo endereço</H4>
                                    <Image className="w-10 h-10" source={require("../public/icons/ui/plus.png")}></Image>
                                </TouchableOpacity>
                            </View>
                            <View className="flex flex-row justify-around items-center my-5">
                                <Button className="bg-green-500 w-40">
                                    <Text className="text-xs text-white">Vou retirar no local</Text>
                                </Button>
                                <Button onPress={handleContinue} className="bg-orange-500 w-40">
                                    <Text className="text-white">Continuar</Text>
                                </Button>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </ScrollView>
            <BottomBar screen="RegisteredAddressScreen"></BottomBar>
        </View>
    );
}

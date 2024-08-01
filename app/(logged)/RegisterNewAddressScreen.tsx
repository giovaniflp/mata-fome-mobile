import { router } from "expo-router";
import { TouchableOpacity, Image, ScrollView, View } from "react-native";
import { Button, H4, H5, H6, Text, Input } from "tamagui";
import BottomBar from "app/components/BottomBar";
import {Picker} from '@react-native-picker/picker';
import { useState } from "react";
import { RegisterAddressToast } from "app/components/RegisterAddressToast";

export default function RegisterNewAddressScreen(){

    const[estado, setEstado] = useState()

    return(
        <View className="flex-1">
            <ScrollView className="bg-white">
            <View className='bg-white'>
                <View className="mt-10 flex flex-row justify-around items-center">
                        <H4 className="text-black">Registrar novo endereço</H4>
                    <Image className="w-20 h-20" source={require("../public/icons/tomato/TomatoNumber_One.png")}></Image>
                </View>
                <View className="mt-5">
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View>
                            <H5 className="text-black">Nome do endereço</H5>
                            <Input className="bg-white rounded-lg h-14 text-black"></Input>
                        </View>
                        <View>
                            <H5 className="text-black">CEP</H5>
                            <View className="flex flex-row items-center">
                                <Input className="bg-white rounded-lg h-14 text-black w-60"></Input>
                                <Button className="w-14 h-14" icon={<Image className="w-10 h-10" source={require("../public/icons/ui/search.png")}></Image>}></Button>
                            </View>
                        </View>
                        <View>
                            <H5 className="text-black">Estado</H5>
                            <View className="border rounded-lg">
                                <Picker
                                selectedValue={estado}
                                onValueChange={setEstado}> 
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
                        <View>
                            <H5 className="text-black">Cidade</H5>
                            <Input className="bg-white rounded-lg h-14 text-black"></Input>
                        </View>
                        <View>
                            <H5 className="text-black">Bairro</H5>
                            <Input className="bg-white rounded-lg h-14 text-black"></Input>
                        </View>
                        <View>
                            <H5 className="text-black">Número</H5>
                            <Input className="bg-white rounded-lg h-14 text-black"></Input>
                        </View>
                        <View>
                            <H5 className="text-black">Complemento</H5>
                            <Input className="bg-white rounded-lg h-14 text-black"></Input>
                        </View>
                        <View>
                            <H5 className="text-black">Logradouro</H5>
                            <Input className="bg-white rounded-lg h-14 text-black"></Input>
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
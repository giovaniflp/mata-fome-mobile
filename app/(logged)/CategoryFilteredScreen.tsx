import { router } from "expo-router";
import { TouchableOpacity, Image, ScrollView, View } from "react-native";
import { H4, H6, Input, Text } from "tamagui";
import { Check } from '@tamagui/lucide-icons'
import { Checkbox } from 'tamagui'
import BottomBar from "app/components/BottomBar";
import { useState, useEffect } from "react";

export default function CategoryFilteredScreen(){

    const[sushiCheck, setSushiCheck] = useState(false)
    const[onigiriCheck, setOnigiriCheck] = useState(false)
    const[tonkatsuCheck, setTonkatsuCheck] = useState(false)
    const [open, setOpen] = useState(false)

    return(
        <View className="flex-1">
            <ScrollView showsVerticalScrollIndicator={false}>
            <View className='bg-white'>
                <View className="mt-10 flex flex-row justify-around items-center">
                        <H4 className="text-black">Comida Japonesa</H4>
                    <Image className="w-20 h-20" source={require("../public/icons/tomato/TomatoChicken.png")}></Image>
                </View>
                <View className="flex items-center my-3 p-3">
                    <Input className="bg-slate-100 text-black w-11/12 border-transparent" placeholder="Busque por pratos e restaurantes japoneses"></Input>
                    <View className="flex w-11/12 mt-5">
                        <View className="flex flex-row w-3/6">
                            <Checkbox className="w-6 h-6" onCheckedChange={()=>{
                                setSushiCheck(!sushiCheck)
                            }}>
                                <Checkbox.Indicator>
                                    <Check />
                                </Checkbox.Indicator>
                            </Checkbox>
                            <H6 className="ml-2 text-black">Sushi</H6>
                        </View>
                        <View className="flex flex-row w-3/6 mt-2">
                            <Checkbox className="w-6 h-6" onCheckedChange={()=>{
                                setOnigiriCheck(!onigiriCheck)
                            }}>
                                <Checkbox.Indicator>
                                    <Check />
                                </Checkbox.Indicator>
                            </Checkbox>
                            <H6 className="ml-2 text-black">Onigiri</H6>
                        </View>
                        <View className="flex flex-row w-3/6 mt-2">
                            <Checkbox className="w-6 h-6" onCheckedChange={()=>{
                                setTonkatsuCheck(!tonkatsuCheck)
                            }}>
                                <Checkbox.Indicator >
                                    <Check />
                                </Checkbox.Indicator>
                            </Checkbox>
                            <H6 className="ml-2 text-black">Tonkatsu</H6>
                        </View>
                    </View>
                </View>
                <View>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View className="flex justify-center flex-row flex-wrap">
                            <TouchableOpacity onPress={()=>{
                                router.push('ProductDescription')
                            }} className="bg-orange-300 rounded-3xl p-2 mt-2 mr-2">
                                <Image className="w-40 h-24 rounded-lg" source={require("../public/images/slide01.jpg")}></Image>
                                <Image className="w-10 h-10 rounded-full absolute bottom-8 right-3" source={require("../public/images/PizzaBox.png")}></Image>
                                <Text className="text-white text-center">Sushi grelhado</Text>
                            </TouchableOpacity>
                            <View className="bg-orange-300 rounded-3xl p-2 mt-2 ">
                                <Image className="w-40 h-24 rounded-lg" source={require("../public/images/slide01.jpg")}></Image>
                                <Text className="text-white text-center">Yang Ping</Text>
                            </View>
                            <View className="bg-orange-300 rounded-3xl p-2 mt-2 mr-2">
                                <Image className="w-40 h-24 rounded-lg" source={require("../public/images/slide01.jpg")}></Image>
                                <Text className="text-white text-center">Sushi</Text>
                            </View>
                            <View className="bg-orange-300 rounded-3xl p-2 mr-1 mt-2">
                                <Image className="w-40 h-24 rounded-lg" source={require("../public/images/slide01.jpg")}></Image>
                                <Text className="text-white text-center">Sushi</Text>
                            </View>
                            <View className="bg-orange-300 rounded-3xl p-2 mt-2 mr-2">
                                <Image className="w-40 h-24 rounded-lg" source={require("../public/images/slide01.jpg")}></Image>
                                <Text className="text-white text-center">Sushi</Text>
                            </View>
                            <View className="bg-orange-300 rounded-3xl p-2 mr-1 mt-2">
                                <Image className="w-40 h-24 rounded-lg" source={require("../public/images/slide01.jpg")}></Image>
                                <Text className="text-white text-center">Sushi</Text>
                            </View>
                            <View className="bg-orange-300 rounded-3xl p-2 mr-2 mt-2">
                                <Image className="w-40 h-24 rounded-lg" source={require("../public/images/slide01.jpg")}></Image>
                                <Text className="text-white text-center">Sushi</Text>
                            </View>
                            <View className="bg-orange-300 rounded-3xl p-2 mr-1 mt-2">
                                <Image className="w-40 h-24 rounded-lg" source={require("../public/images/slide01.jpg")}></Image>
                                <Text className="text-white text-center">Sushi</Text>
                            </View>
                            <View className="bg-orange-300 rounded-3xl p-2 mr-2 mt-2">
                                <Image className="w-40 h-24 rounded-lg" source={require("../public/images/slide01.jpg")}></Image>
                                <Text className="text-white text-center">Sushi</Text>
                            </View>
                            <View className="bg-orange-300 rounded-3xl p-2 mr-1 mt-2">
                                <Image className="w-40 h-24 rounded-lg" source={require("../public/images/slide01.jpg")}></Image>
                                <Text className="text-white text-center">Sushi</Text>
                            </View>
                        </View>
                    </ScrollView>
                    </View>
                </View>
            </ScrollView>
            <BottomBar screen="CategoryFilteredScreen"></BottomBar>
        </View>
    )
}
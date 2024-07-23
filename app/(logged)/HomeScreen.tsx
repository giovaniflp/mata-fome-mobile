import { ScrollView, View, Text, Input, H4, H6 } from "tamagui";
import { Image, TouchableOpacity } from "react-native";
import Carousel from 'react-native-reanimated-carousel';
import Search from '@tamagui/lucide-icons';
import { Home } from '@tamagui/lucide-icons'

export default function HomeScreen(){

    const imagesList = [
        {
            image: require("../public/images/slide01.jpg")
        },
        {
            image: require("../public/images/slide02.jpg")
        },
        {
            image: require("../public/images/slide03.jpg")
        }
    ]

    return (
        <View className="flex-1">
            <ScrollView>
            <View className='bg-white'>
                <View className="mt-20 flex flex-row justify-center items-center">
                    <Image className="w-20 h-20" source={require("../public/images/BrandIcon.png")}></Image>
                    <View className="ml-5">
                        <H4 className="text-black">Olá, usuário</H4>
                        <H6 className="text-black">Bem - Vindo(a)!</H6>
                    </View>
                </View>
                <View className="flex items-center my-5">
                    <Input className="bg-white text-black w-80" placeholder="Buscar"></Input>
                </View>
                <View className="flex items-center">
                    <Carousel
                        className="rounded-3xl"
                        loop
                        width={208}
                        height={208}
                        autoPlay={true}
                        data={imagesList}
                        scrollAnimationDuration={1000}
                        renderItem={({ item }) => (
                            <View
                                style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                }}
                            >
                                <Image className="w-52 h-52" source={item.image}></Image>
                            </View>
                        )}
                    />
                </View>
                <View className="mt-5">
                    <H4 className="text-black ml-4">Tipos de comidas</H4>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <View className="flex flex-row gap-4 ml-1">
                            <View className="bg-white rounded-3xl p-4">
                                <Image className="w-36 h-36" source={require("../public/images/slide01.jpg")}></Image>
                                <Text className="text-black text-center">Hambúrguer</Text>
                            </View>
                            <View className="bg-white rounded-3xl p-4">
                                <Image className="w-36 h-36" source={require("../public/images/slide01.jpg")}></Image>
                                <Text className="text-black text-center">Frango</Text>
                            </View>
                            <View className="bg-white rounded-3xl p-4">
                                <Image className="w-36 h-36" source={require("../public/images/slide01.jpg")}></Image>
                                <Text className="text-black text-center">Pizza</Text>
                            </View>
                            <View className="bg-white rounded-3xl p-4 mr-1">
                                <Image className="w-36 h-36" source={require("../public/images/slide01.jpg")}></Image>
                                <Text className="text-black text-center">Batata frita</Text>
                            </View>
                        </View>
                    </ScrollView>
                    <H4 className="text-black ml-4">Categorias</H4>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <View className="flex flex-row gap-4 ml-3">
                            <View className="bg-white rounded-3xl p-2">
                                <Image className="w-24 h-24" source={require("../public/images/slide01.jpg")}></Image>
                                <Text className="text-black text-center">Bebidas</Text>
                            </View>
                            <View className="bg-white rounded-3xl p-2">
                                <Image className="w-24 h-24" source={require("../public/images/slide01.jpg")}></Image>
                                <Text className="text-black text-center">Restaurantes</Text>
                            </View>
                            <View className="bg-white rounded-3xl p-2">
                                <Image className="w-24 h-24" source={require("../public/images/slide01.jpg")}></Image>
                                <Text className="text-black text-center">Japonesa</Text>
                            </View>
                            <View className="bg-white rounded-3xl p-2">
                                <Image className="w-24 h-24" source={require("../public/images/slide01.jpg")}></Image>
                                <Text className="text-black text-center">Brasileira</Text>
                            </View>
                            <View className="bg-white rounded-3xl p-2 mr-3">
                                <Image className="w-24 h-24" source={require("../public/images/slide01.jpg")}></Image>
                                <Text className="text-black text-center">Ver mais +</Text>
                            </View>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </ScrollView>
            <View className="w-full h-16 bg-orange-500 flex justify-center">
                <View className="flex flex-row items-center justify-center gap-16">
                    <TouchableOpacity>
                        <Image className="w-10 h-10" source={require("../public/icons/ui/home.png")}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image className="w-10 h-10" source={require("../public/icons/ui/search.png")}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image className="w-10 h-10" source={require("../public/icons/ui/list.png")}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image className="w-10 h-10" source={require("../public/icons/ui/person.png")}></Image>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
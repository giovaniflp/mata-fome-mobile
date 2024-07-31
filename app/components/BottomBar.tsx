import { View } from "tamagui"
import { Image, TouchableOpacity } from "react-native"
import { router } from "expo-router"

export default function BottomBar({screen} : {screen:string}){
    return(
        screen === 'HomeScreen' &&
            <View className="w-full h-16 bg-orange-500 flex justify-center">
                <View className="flex flex-row items-center justify-center gap-16">
                    <TouchableOpacity>
                        <Image className="w-10 h-10" source={require("../public/icons/ui/home.png")}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{router.push('SearchScreen')}}>
                        <Image className="w-10 h-10" source={require("../public/icons/ui/search.png")}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{router.push('CategoryScreen')}}>
                        <Image className="w-10 h-10" source={require("../public/icons/ui/list.png")}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{router.push('ProfileScreen')}}>
                        <Image className="w-10 h-10" source={require("../public/icons/ui/person.png")}></Image>
                    </TouchableOpacity>
                </View>
            </View>
        ||
        screen === 'SearchScreen' &&
            <View className="w-full h-16 bg-orange-500 flex justify-center">
                <View className="flex flex-row items-center justify-center gap-16">
                    <TouchableOpacity onPress={()=>{router.push('HomeScreen')}}>
                        <Image className="w-10 h-10" source={require("../public/icons/ui/home.png")}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image className="w-10 h-10" source={require("../public/icons/ui/search.png")}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{router.push('CategoryScreen')}}>
                        <Image className="w-10 h-10" source={require("../public/icons/ui/list.png")}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{router.push('ProfileScreen')}}>
                        <Image className="w-10 h-10" source={require("../public/icons/ui/person.png")}></Image>
                    </TouchableOpacity>
                </View>
            </View>
        ||
        screen === 'CategoryScreen' &&
            <View className="w-full h-16 bg-orange-500 flex justify-center">
                <View className="flex flex-row items-center justify-center gap-16">
                    <TouchableOpacity onPress={()=>{router.push('HomeScreen')}}>
                        <Image className="w-10 h-10" source={require("../public/icons/ui/home.png")}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{router.push('SearchScreen')}}>
                        <Image className="w-10 h-10" source={require("../public/icons/ui/search.png")}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image className="w-10 h-10" source={require("../public/icons/ui/list.png")}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{router.push('ProfileScreen')}}>
                        <Image className="w-10 h-10" source={require("../public/icons/ui/person.png")}></Image>
                    </TouchableOpacity>
                </View>
            </View>
        ||
        screen === 'ProfileScreen' &&
            <View className="w-full h-16 bg-orange-500 flex justify-center">
                <View className="flex flex-row items-center justify-center gap-16">
                    <TouchableOpacity onPress={()=>{router.push('HomeScreen')}}>
                        <Image className="w-10 h-10" source={require("../public/icons/ui/home.png")}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{router.push('SearchScreen')}}>
                        <Image className="w-10 h-10" source={require("../public/icons/ui/search.png")}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{router.push('CategoryScreen')}}>
                        <Image className="w-10 h-10" source={require("../public/icons/ui/list.png")}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image className="w-10 h-10" source={require("../public/icons/ui/person.png")}></Image>
                    </TouchableOpacity>
                </View>
            </View>
        ||
            <View className="w-full h-16 bg-orange-500 flex justify-center">
                <View className="flex flex-row items-center justify-center gap-16">
                    <TouchableOpacity onPress={()=>{router.push('HomeScreen')}}>
                        <Image className="w-10 h-10" source={require("../public/icons/ui/home.png")}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{router.push('SearchScreen')}}>
                        <Image className="w-10 h-10" source={require("../public/icons/ui/search.png")}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{router.push('CategoryScreen')}}>
                        <Image className="w-10 h-10" source={require("../public/icons/ui/list.png")}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{router.push('ProfileScreen')}}>
                        <Image className="w-10 h-10" source={require("../public/icons/ui/person.png")}></Image>
                    </TouchableOpacity>
                </View>
            </View>
    )
}

import { useState } from "react";
import { router } from "expo-router";
import { Button, H2, H6, Input } from "tamagui";
import { Image, Alert, ScrollView, View } from "react-native";

export default function RedefinePassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // Regex para validação da senha com no mínimo 6 caracteres
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

  const validateAndSubmit = () => {
    if (!passwordRegex.test(newPassword)) {
      Alert.alert("Erro", "A senha deve ter no mínimo 6 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais.");
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert("Erro", "As senhas não coincidem.");
      return;
    }

    // Se tudo estiver válido, redireciona para a próxima tela
    router.push('/AccountRecovered');
  };

  return (
    <ScrollView className="bg-white">
      <View className="h-full bg-white flex justify-between">
        <View className="mt-40">
          <View className="flex justify-center items-center">
            <Image source={require("./public/images/BrandIcon.png")} className="w-40 h-40" />
          </View>
          <H2 className="text-center text-orange-500 p-5">Redefina sua senha</H2>
          <View className="flex items-center gap-5">
            <View>
              <H6 className="text-black">Nova senha</H6>
              <Input 
                className="w-80 bg-white text-black" 
                placeholder="Digite sua nova senha" 
                secureTextEntry
                value={newPassword}
                onChangeText={setNewPassword}
              />
            </View>
            <View>
              <H6 className="text-black">Confirme sua senha</H6>
              <Input 
                className="w-80 bg-white text-black" 
                placeholder="Confirme a senha digitada anteriormente" 
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
            </View>
          </View>
        </View>
        <View className="flex items-center mt-48">
          <Button onPress={validateAndSubmit} className="w-60 bg-orange-500 rounded-3xl text-white">
            Redefinir senha
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}

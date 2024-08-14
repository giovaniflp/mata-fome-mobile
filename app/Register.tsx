import React, { useState } from 'react';
import { H2, H6, Input, Button } from 'tamagui';
import { Image, View } from 'react-native';
import { router } from 'expo-router';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = re.test(String(email).toLowerCase());
        console.log(`Validating email: ${email} - Valid: ${isValid}`);
        return isValid;
    };

    const validatePassword = (password) => {
        const isValid = password.length >= 6;
        console.log(`Validating password: ${password} - Valid: ${isValid}`);
        return isValid;
    };

    const validatePhone = (phone) => {
        const re = /^\d{10,11}$/;
        const isValid = re.test(phone);
        console.log(`Validating phone: ${phone} - Valid: ${isValid}`);
        return isValid;
    };

    const handleSubmit = () => {
        console.log('Submitting form');
        console.log(`Name: ${name}`);
        console.log(`Email: ${email}`);
        console.log(`Password: ${password}`);
        console.log(`Confirm Password: ${confirmPassword}`);
        console.log(`Phone: ${phone}`);

        if (!name) {
            setErrorMessage('Nome é obrigatório');
            console.log('Nome é obrigatório');
            return;
        }
        if (!validateEmail(email)) {
            setErrorMessage('Email inválido');
            console.log('Email inválido');
            return;
        }
        if (!validatePassword(password)) {
            setErrorMessage('A senha deve ter pelo menos 6 caracteres');
            console.log('A senha deve ter pelo menos 6 caracteres');
            return;
        }
        if (password !== confirmPassword) {
            setErrorMessage('As senhas não coincidem');
            console.log('As senhas não coincidem');
            return;
        }
        if (!validatePhone(phone)) {
            setErrorMessage('Número de telefone inválido');
            console.log('Número de telefone inválido');
            return;
        }

        setErrorMessage('');
        console.log('Form is valid, navigating to ConfirmEmailCode');
        router.push('/ConfirmEmailCode');
    };

    return (
        <View className='h-full bg-white flex justify-center'>
            <View className='flex justify-center items-center'>
                <Image source={require('./public/images/BrandIcon.png')} className="w-40 h-40"></Image>
            </View>
            <H2 className="text-center text-orange-500">Registrar</H2>
            <View className="flex items-center mt-4">
                <View>
                    <H6 className="text-black">Nome</H6>
                    <Input
                        className="w-80 bg-white text-black"
                        placeholder="Digite seu nome"
                        value={name}
                        onChangeText={setName}
                    />
                </View>
                <View className="mt-4">
                    <H6 className="text-black">Email</H6>
                    <Input
                        className="w-80 bg-white text-black"
                        placeholder="Digite seu e-mail"
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>
                <View className="mt-4">
                    <H6 className="text-black">Senha</H6>
                    <Input
                        className="w-80 bg-white text-black"
                        placeholder="Digite sua senha"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />
                </View>
                <View className="mt-4">
                    <H6 className="text-black">Confirmar senha</H6>
                    <Input
                        className="w-80 bg-white text-black"
                        placeholder="Confirme sua senha"
                        secureTextEntry
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                    />
                </View>
                <View className="mt-4">
                    <H6 className="text-black">Telefone</H6>
                    <Input
                        className="w-80 bg-white text-black"
                        placeholder="Digite seu número"
                        value={phone}
                        onChangeText={setPhone}
                    />
                </View>
                {errorMessage ? (
                    <View className="mt-4">
                        <H6 className="text-red-500">{errorMessage}</H6>
                    </View>
                ) : null}
                <Button
                    onPress={handleSubmit}
                    className='w-60 bg-orange-500 rounded-3xl mt-8 text-white'
                >
                    Enviar
                </Button>
            </View>
        </View>
    );
}

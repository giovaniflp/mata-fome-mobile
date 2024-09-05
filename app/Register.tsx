import React, { useState } from 'react';
import { H2, H6, Input, Button, ScrollView } from 'tamagui';
import { Image, View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { router } from 'expo-router';
import axiosInstance from './config/axiosUrlConfig';
import { TextInputMask } from 'react-native-masked-text';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [cpf, setCpf] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const validatePassword = (password) => {
        return password.length >= 6;
    };

    const validatePhone = (phone) => {
        const re = /^\d{10,11}$/;
        return re.test(phone);
    };

    const handleSubmit = () => {
        if (!name) {
            setErrorMessage('Nome é obrigatório');
            return;
        }
        if (!validateEmail(email)) {
            setErrorMessage('Email inválido');
            return;
        }
        if (!validatePassword(password)) {
            setErrorMessage('A senha deve ter pelo menos 6 caracteres');
            return;
        }
        if (password !== confirmPassword) {
            setErrorMessage('As senhas não coincidem');
            return;
        }
        if (!validatePhone(phone)) {
            setErrorMessage('Número de telefone inválido');
            return;
        }
        setErrorMessage('');
        router.push('/ConfirmEmailCode');
    };

    const apiRegisterUser = async () => {
        const registerRequestData = {
            nome: name,
            foneCelular: phone,
            cpf: cpf,
            email: email,
            password: password
        };
        try {
            const response = await axiosInstance.post("/api/clientes", registerRequestData);
            if (response.status === 201) {
                router.push('/ConfirmEmailCode');
            }
        } catch (e) {
            alert(e.message || 'Erro ao registrar usuário');
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                keyboardShouldPersistTaps='handled'
            >
                <View style={styles.container}>
                    <View style={styles.imageContainer}>
                        <Image source={require('./public/images/BrandIcon.png')} style={styles.image} />
                    </View>
                    <H2 style={styles.title}>Registrar</H2>
                    <View style={styles.form}>
                        <View style={styles.inputContainer}>
                            <H6 style={styles.label}>Nome</H6>
                            <Input
                                style={styles.input}
                                placeholder="Digite seu nome"
                                value={name}
                                onChangeText={setName}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <H6 style={styles.label}>Email</H6>
                            <Input
                                style={styles.input}
                                placeholder="Digite seu e-mail"
                                value={email}
                                onChangeText={setEmail}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <H6 style={styles.label}>CPF</H6>
                            <TextInputMask
                                type={'cpf'}
                                value={cpf}
                                onChangeText={setCpf}
                                style={styles.input}
                                placeholder="Digite seu CPF"
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <H6 style={styles.label}>Telefone</H6>
                            <TextInputMask
                                type={'custom'}
                                options={{
                                    mask: '(99) 9999-9999'
                                }}
                                value={phone}
                                onChangeText={setPhone}
                                style={styles.input}
                                placeholder="Digite seu telefone"
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <H6 style={styles.label}>Senha</H6>
                            <Input
                                style={styles.input}
                                placeholder="Digite sua senha"
                                secureTextEntry
                                value={password}
                                onChangeText={setPassword}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <H6 style={styles.label}>Confirmar senha</H6>
                            <Input
                                style={styles.input}
                                placeholder="Confirme sua senha"
                                secureTextEntry
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                            />
                        </View>
                        {errorMessage ? (
                            <View style={styles.errorContainer}>
                                <H6 style={styles.errorMessage}>{errorMessage}</H6>
                            </View>
                        ) : null}
                        <View style={styles.buttonContainer}>
                            <Button
                                onPress={apiRegisterUser}
                                style={styles.submitButton}
                            >
                                Enviar
                            </Button>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    imageContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    image: {
        width: 128,
        height: 128,
    },
    title: {
        textAlign: 'center',
        color: '#FFA500', // Laranja
        marginBottom: 20,
    },
    form: {
        flex: 1,
    },
    inputContainer: {
        marginBottom: 16,
    },
    label: {
        color: '#000',
        marginBottom: 8,
    },
    input: {
        width: '100%',
        backgroundColor: '#fff',
        color: '#000',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        padding: 10,
    },
    errorContainer: {
        marginTop: 16,
    },
    errorMessage: {
        color: '#ff0000', // Vermelho
    },
    buttonContainer: {
        alignItems: 'center',
        marginTop: 32,
    },
    submitButton: {
        width: '60%',
        backgroundColor: '#FFA500', // Laranja
        borderRadius: 24,
        color: '#fff',
        paddingVertical: 12,
        paddingHorizontal: 20,
    },
});

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useAuth, useSignIn } from '@clerk/clerk-expo';

export default function ForgotPassComponent({ navigation, route }: any) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [code, setCode] = useState('');
    const [successfulCreation, setSuccessfulCreation] = useState(false);
    const [error, setError] = useState('');
    const { isLoaded, signIn, setActive } = useSignIn();

    if (!isLoaded) {
        return null;
    }

    async function create() {
        if (!email) return;
        try {
            await signIn?.create({
                strategy: 'reset_password_email_code',
                identifier: email,
            });
            setSuccessfulCreation(true);
            setError('');
        } catch (err: any) {
            console.error('error', err.errors[0]?.longMessage || err.message);
            setError(err.errors[0]?.longMessage || 'An error occurred.');
            if(err.errors[0].code === "form_identifier_not_found") Alert.alert('Atenção', 'Email não encontrado. Tente novamente.')
        }
    }

    async function reset() {
        try {
            const result = await signIn?.attemptFirstFactor({
                strategy: 'reset_password_email_code',
                code,
                password,
            });

            if (result?.status === 'needs_second_factor') {
                setError('');
            } else if (result?.status === 'complete') {
                setActive({ session: result.createdSessionId });
                setError('');
            } else {
                console.log(result);
            }
        } catch (err: any) {
            console.error('error', err.errors[0]?.longMessage || err.message);
            setError(err.errors[0]?.longMessage || 'An error occurred.');
        }
    }

    return (
        <View className="flex-1 bg-white px-6 py-8">
            {!successfulCreation ? (
                <>
                    <Text className="text-lg font-OutfitMedium text-gray-600 mb-8">
                        Insira seu e-mail para receber um link de redefinição de senha.
                    </Text>

                    <View className="space-y-4">
                        <TextInput
                            placeholder="E-mail"
                            keyboardType="email-address"
                            value={email}
                            onChangeText={setEmail}
                            className="border border-gray-300 font-OutfitMedium rounded-lg px-4 py-3 text-gray-900"
                        />
                    </View>

                    <TouchableOpacity className="bg-blue-500 mt-6 rounded-lg py-2" onPress={create}>
                        <Text className="text-center text-white font-OutfitSemiBold text-lg">Enviar link</Text>
                    </TouchableOpacity>

                    <TouchableOpacity className="mt-4" onPress={() => navigation.navigate('LoginScreen')}>
                        <Text className="text-center font-OutfitRegular text-gray-500">
                            Lembrou sua senha?{' '}
                            <Text className="text-blue-500 font-OutfitBold">Faça login</Text>
                        </Text>
                    </TouchableOpacity>
                </>
            ) : (
                <View className="">
                    <Text className='font-OutfitMedium text-base mb-4'>Informe uma nova senha e o código de redefinição enviado para o seu email.</Text>
                    <TextInput
                        placeholder="Insira uma nova senha"
                        secureTextEntry
                        className="bg-gray-50 border-l-4 my-3 border-blue-500 font-OutfitMedium rounded-lg px-4 py-3 text-gray-900"
                        value={password}
                        placeholderTextColor="#666666"
                        onChangeText={setPassword}
                    />

                    <TextInput
                        placeholder="Código de Redefinição"
                        keyboardType="default"
                        className="bg-gray-50 border-l-4 my-1 border-blue-500 font-OutfitMedium rounded-lg px-4 py-3 text-gray-900"
                        value={code}
                        placeholderTextColor="#666666"
                        onChangeText={setCode}
                    />

                    <TouchableOpacity className="bg-blue-500 mt-6 rounded-lg py-2" onPress={reset}>
                        <Text className="text-center text-white font-OutfitSemiBold text-lg">Redefinir Senha</Text>
                    </TouchableOpacity>
                </View>
            )}

        </View>
    );
}
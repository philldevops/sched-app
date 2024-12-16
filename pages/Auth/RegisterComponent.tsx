import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';

export default function RegisterComponent({ route, navigation }: any) {
    return (
        <ScrollView className="flex-1 bg-white px-6 py-8">
            {/* <Text className="text-3xl font-OutfitMedium text-gray-900 mb-6">Crie sua conta</Text> */}
            <Text className="text-lg font-OutfitMedium text-gray-600 mb-8">
                Realize seu cadastro para poder realizar agendamentos.
            </Text>
            <View className="space-y-4">
                <TextInput
                    placeholder="Nome completo"
                    className="bg-gray-50 border-l-4 border-blue-500 font-OutfitMedium rounded-lg px-4 py-3 text-gray-900"
                />
                <TextInput
                    placeholder="E-mail"
                    keyboardType="email-address"
                    className="bg-gray-50 border-l-4 border-blue-500 font-OutfitMedium rounded-lg px-4 py-3 text-gray-900"
                />
                <TextInput
                    placeholder="Senha"
                    secureTextEntry
                    className="bg-gray-50 border-l-4 border-blue-500 font-OutfitMedium rounded-lg px-4 py-3 text-gray-900"
                />
                <TextInput
                    placeholder="Confirmar senha"
                    secureTextEntry
                    className="bg-gray-50 border-l-4 border-blue-500 font-OutfitMedium rounded-lg px-4 py-3 text-gray-900"
                />
            </View>

            <TouchableOpacity className="bg-blue-500 mt-6 rounded-lg py-3">
                <Text className="text-center text-white font-OutfitBold text-lg">Registrar</Text>
            </TouchableOpacity>

            <TouchableOpacity className="mt-4" onPress={() => navigation.navigate('LoginScreen')}>
                <Text className="text-center text-gray-500 font-OutfitRegular">
                    Já possui uma conta?{' '}
                    <Text className="text-blue-500 font-OutfitBold">Entre</Text>
                </Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

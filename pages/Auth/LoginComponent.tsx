import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import Constants from "expo-constants";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

export default function LoginComponent({ route, navigation }: any) {
    return (
        <View className="flex-1 bg-white px-6" style={{ paddingTop: Constants.statusBarHeight * 2 }}>
            <StatusBar style="auto" />
            <Text className="text-3xl font-OutfitBold text-gray-900 mb-6">Bem-vindo(a)!</Text>
            <Text className="text-lg text-gray-600 font-OutfitMedium mb-8">Faça login para continuar</Text>

            <View className="space-y-4">
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
            </View>

            <TouchableOpacity className="mt-4" onPress={() => navigation.navigate('ForgotScreen')}>
                <Text className="text-right text-blue-500 font-OutfitSemiBold">Esqueceu sua senha?</Text>
            </TouchableOpacity>

            <TouchableOpacity className="bg-blue-500 mt-6 rounded-lg py-3">
                <Text className="text-center text-white font-OutfitSemiBold text-lg">Entrar</Text>
            </TouchableOpacity>

            <TouchableOpacity className="mt-4" onPress={() => navigation.navigate('RegisterScreen')}>
                <Text className="text-center font-OutfitRegular text-gray-500">
                    Não possui uma conta?{' '}
                    <Text className="text-blue-500 font-OutfitSemiBold">Cadastre-se</Text>
                </Text>
            </TouchableOpacity>

            <View className="flex-row items-center mt-6">
                <View className="flex-1 h-px bg-gray-300"></View>
                <Text className="px-4 text-gray-500 font-OutfitSemiBold">ou</Text>
                <View className="flex-1 h-px bg-gray-300"></View>
            </View>

            <TouchableOpacity className="border border-gray-300 mt-6 rounded-lg py-3 flex-row items-center justify-center space-x-2">
                <MaterialCommunityIcons size={28} name='google-plus' />
                <Text className="text-gray-900 font-OutfitSemiBold">Entrar com Google</Text>
            </TouchableOpacity>
        </View>
    );
};

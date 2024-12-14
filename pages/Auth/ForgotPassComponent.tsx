import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

export default function ForgotPassComponent({ navigation, route }: any) {
    return (
        <View className="flex-1 bg-white px-6 py-8">
            {/* <Text className="text-3xl font-OutfitMedium text-gray-900 mb-6">Recuperar senha</Text> */}
            <Text className="text-lg font-OutfitMedium text-gray-600 mb-8">
                Insira seu e-mail para receber um link de redefinição de senha.
            </Text>

            <View className="space-y-4">
                <TextInput
                    placeholder="E-mail"
                    keyboardType="email-address"
                    className="border border-gray-300 font-OutfitMedium rounded-lg px-4 py-3 text-gray-900"
                />
            </View>

            <TouchableOpacity className="bg-blue-500 mt-6 rounded-lg py-3">
                <Text className="text-center text-white font-OutfitBold text-lg">Enviar link</Text>
            </TouchableOpacity>

            <TouchableOpacity className="mt-4" onPress={()=>navigation.navigate('LoginScreen')}>
                <Text className="text-center font-OutfitRegular text-gray-500">
                    Lembrou sua senha?{' '}
                    <Text className="text-blue-500 font-OutfitBold">Faça login</Text>
                </Text>
            </TouchableOpacity>
        </View>
    );
}
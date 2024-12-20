import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ActivityIndicator, Alert } from 'react-native';
import Constants from "expo-constants";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import * as WebBrowser from "expo-web-browser"
import { useOAuth, useUser, useSignIn, useAuth } from '@clerk/clerk-expo';
import axios from 'axios';

WebBrowser.maybeCompleteAuthSession()

export default function LoginComponent({ route, navigation }: any) {
    const [isLoading, setIsLoading] = useState(false);
    const [isEmailLoading, setIsEmailLoading] = useState(false);
    const googleOAuth = useOAuth({ strategy: "oauth_google" });
    const { signIn, setActive, isLoaded } = useSignIn()
    const { user } = useUser();
    const { userId } = useAuth();

    const [emailAddress, setEmailAddress] = useState('')
    const [password, setPassword] = useState('')

    // Handle the submission of the sign-in form
    const onSignInEmailPress = React.useCallback(async () => {
        if (!emailAddress && !password) return
        if (!isLoaded) return

        // Start the sign-in process using the email and password provided
        try {
            setIsEmailLoading(true);
            const signInAttempt = await signIn.create({
                identifier: emailAddress,
                password,
            })

            // If sign-in process is complete, set the created session as active
            // and redirect the user
            if (signInAttempt.status === 'complete') {
                await setActive({ session: signInAttempt.createdSessionId })
            } else {
                // If the status isn't complete, check why. User might need to
                // complete further steps.
                console.error(JSON.stringify(signInAttempt, null, 2))
            }
            setIsEmailLoading(false)
        } catch (err: any) {
            // See https://clerk.com/docs/custom-flows/error-handling
            // for more info on error handling
            const error_type: any = err.errors.map((ex: any) => ex.code)
            if (error_type[0] === "strategy_for_user_invalid") {
                Alert.alert('Ops!', 'Usuário não encontrado. Parece que você não usou este método de autenticação para se cadastrar anteriormente.')
            }

            if (error_type[0] === "form_password_incorrect") {
                Alert.alert('Atenção', 'Senha incorreta. Tente novamente, ou use outro método de login.')
            }

            console.error(JSON.stringify(err, null, 2))
            setIsEmailLoading(false)
        }
    }, [isLoaded, emailAddress, password])


    const handleRegister = async () => {
        const clerkId = user?.id; // Obtenha o ID do usuário
        const createUserDto = { clerkId }; // Formate como um objeto

        try {
            const response = await axios.post('http://10.19.30.33:3000/users/', createUserDto);
            console.log(JSON.stringify(response, null, 2))
            if (response.status === 201) {
                //console.log("registro de usuário realizado com sucesso!", JSON.stringify(response.data, null, 2));
                return "success"
            } else {
                console.error("Erro ao realizar agendamento.", response.data);
                return "failed"
            }
        } catch (error) {
            console.error("Erro ao conectar ao servidor:", error);
            return "failed"
        }
    }

    async function SignIn() {
        try {
            setIsLoading(true)
            const oAuthFlow = await googleOAuth.startOAuthFlow()

            if (oAuthFlow.authSessionResult?.type === "success") {
                if (oAuthFlow.setActive) {
                    await oAuthFlow.setActive({ session: oAuthFlow.createdSessionId })
                }
                
                console.log(userId)
                console.log(user?.id);
                
                
                //fazer também o registro no back-end, caso ainda não tenha.
                //const result = await handleRegister();
                //console.log(result);

                setIsLoading(false)
            } else {
                setIsLoading(false)
            }
        } catch (error) {
            console.log(JSON.stringify(error, null, 2))
            setIsLoading(false)
        }
    }

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
                    autoCapitalize="none"
                    value={emailAddress}
                    onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
                />
                <TextInput
                    placeholder="Senha"
                    secureTextEntry
                    className="bg-gray-50 border-l-4 border-blue-500 font-OutfitMedium rounded-lg px-4 py-3 text-gray-900"
                    value={password}
                    onChangeText={(password) => setPassword(password)}
                />
            </View>

            <TouchableOpacity className="mt-4" onPress={() => navigation.navigate('ForgotScreen')}>
                <Text className="text-right text-blue-500 font-OutfitSemiBold">Esqueceu sua senha?</Text>
            </TouchableOpacity>

            <TouchableOpacity className="bg-blue-500 mt-6 rounded-lg py-2" onPress={onSignInEmailPress}>
                {isEmailLoading ? (<ActivityIndicator size={'small'} color={'#fff'} />) : (
                    <Text className="text-center text-white font-OutfitSemiBold text-lg">Entrar</Text>
                )}
            </TouchableOpacity>

            <TouchableOpacity className="mt-4" onPress={() => navigation.navigate('RegisterScreen', {
                email: emailAddress
            })}>
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

            <TouchableOpacity onPress={SignIn} className="border border-orange-500 mt-6 rounded-lg py-3 flex-row items-center justify-center space-x-2">
                {isLoading ? (<ActivityIndicator size={'small'} color={'#f97316'} />) : (
                    <>
                        <MaterialCommunityIcons size={22} name='google-plus' color={"#f97316"} />
                        <Text className="text-orange-500 font-OutfitSemiBold">Entrar com Google</Text>
                    </>
                )}
            </TouchableOpacity>
        </View>
    );
};

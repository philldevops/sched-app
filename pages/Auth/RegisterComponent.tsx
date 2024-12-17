import * as React from 'react'
import { Text, TextInput, Button, View, TouchableOpacity, ScrollView, Alert } from 'react-native'
import { useSignUp } from '@clerk/clerk-expo'

export default function RegisterComponent({ route, navigation }: any) {
    const { isLoaded, signUp, setActive } = useSignUp()
    const [firstName, setFirstName] = React.useState('')
    const [lastName, setLastName] = React.useState('')
    const [emailAddress, setEmailAddress] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [pendingVerification, setPendingVerification] = React.useState(false)
    const [code, setCode] = React.useState('')
    const email = route?.params?.email || "exemplo@email.com";

    // Handle submission of sign-up form
    const onSignUpPress = async () => {
        if (!isLoaded) return

        // Start sign-up process using email and password provided
        try {
            await signUp.create({
                emailAddress,
                password,
                firstName,
                lastName
            })

            // Send user an email with verification code
            await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

            // Set 'pendingVerification' to true to display second form
            // and capture OTP code
            setPendingVerification(true)
        } catch (err: any) {
            // See https://clerk.com/docs/custom-flows/error-handling
            // for more info on error handling
            const error_type: any = err.errors.map((ex: any) => ex.code)
            if (error_type[0] === "form_password_pwned") {
                Alert.alert('Atenção', 'Esta é uma senha comum, escolha uma nova senha.')
            }
            console.error(JSON.stringify(err, null, 2))
        }
    }

    // Handle submission of verification form
    const onVerifyPress = async () => {
        if (!isLoaded) return

        try {
            // Use the code the user provided to attempt verification
            const signUpAttempt = await signUp.attemptEmailAddressVerification({
                code,
            })

            // If verification was completed, set the session to active
            // and redirect the user
            if (signUpAttempt.status === 'complete') {
                await setActive({ session: signUpAttempt.createdSessionId })
                //navigation.navigate('Home')
            } else {
                // If the status is not complete, check why. User may need to
                // complete further steps.
                console.error(JSON.stringify(signUpAttempt, null, 2))
            }
        } catch (err) {
            // See https://clerk.com/docs/custom-flows/error-handling
            // for more info on error handling
            console.error(JSON.stringify(err, null, 2))
        }
    }

    if (pendingVerification) {
        return (
            <View className="flex-1 bg-white px-6">
                <Text className="text-xl text-gray-600 font-OutfitBold mt-8 mb-4">Verifique seu email</Text>
                <Text className="text-lg text-gray-600 font-OutfitMedium mb-8">Enviamos um código de confirmação para o email informado. Digite o código recebido no campo abaixo.</Text>
                <View className="space-y-4">
                    <TextInput
                        placeholder="Digite o código de verificação"
                        keyboardType="number-pad"
                        className="bg-gray-50 border-l-4 border-blue-500 font-OutfitMedium rounded-lg px-4 py-3 text-gray-900"
                        autoCapitalize="none"
                        value={code}
                        onChangeText={(code) => setCode(code)}
                    />
                </View>
                <TouchableOpacity className="bg-blue-500 mt-6 rounded-lg py-2" onPress={onVerifyPress}>
                    <Text className="text-center text-white font-OutfitSemiBold text-lg">Verificar Email</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <ScrollView className="flex-1 bg-white px-6 py-8">
            <Text className="text-3xl font-OutfitMedium text-gray-900 mb-6">Crie sua conta</Text>
            <Text className="text-lg font-OutfitMedium text-gray-600 mb-8">
                Realize seu cadastro para poder realizar agendamentos.
            </Text>
            <View className="space-y-4">
                <TextInput
                    placeholder="Nome"
                    keyboardType="default"
                    className="bg-gray-50 border-l-4 border-blue-500 font-OutfitMedium rounded-lg px-4 py-3 text-gray-900"
                    value={firstName}
                    placeholderTextColor="#666666"
                    onChangeText={(firstName) => setFirstName(firstName)}
                />

                <TextInput
                    placeholder="Sobrenome"
                    keyboardType="default"
                    className="bg-gray-50 border-l-4 border-blue-500 font-OutfitMedium rounded-lg px-4 py-3 text-gray-900"
                    value={lastName}
                    placeholderTextColor="#666666"
                    onChangeText={(lastName) => setLastName(lastName)}
                />
                <TextInput
                    placeholder="E-mail"
                    keyboardType="email-address"
                    className="bg-gray-50 border-l-4 border-blue-500 font-OutfitMedium rounded-lg px-4 py-3 text-gray-900"
                    value={emailAddress}
                    placeholderTextColor="#666666"
                    onChangeText={(email) => setEmailAddress(email)}
                />
                <TextInput
                    placeholder="Senha"
                    secureTextEntry
                    className="bg-gray-50 border-l-4 border-blue-500 font-OutfitMedium rounded-lg px-4 py-3 text-gray-900"
                    value={password}
                    placeholderTextColor="#666666"
                    onChangeText={(password) => setPassword(password)}
                />
            </View>

            <TouchableOpacity onPress={onSignUpPress} className="bg-blue-500 mt-6 rounded-lg py-3">
                <Text className="text-center text-white font-OutfitBold text-lg">Registrar</Text>
            </TouchableOpacity>

            <TouchableOpacity className="mt-4" onPress={() => navigation.navigate('LoginScreen')}>
                <Text className="text-center text-gray-500 font-OutfitRegular">
                    Já possui uma conta?{' '}
                    <Text className="text-blue-500 font-OutfitBold">Entre</Text>
                </Text>
            </TouchableOpacity>
        </ScrollView>
    )
}
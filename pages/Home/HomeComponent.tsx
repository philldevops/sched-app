import { Text, TouchableOpacity, View, Image, ActivityIndicator } from "react-native";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useUser } from "@clerk/clerk-expo";
import { useEffect, useState } from "react";
import { capitalize } from "../../routes/routes";

const DoctorCard = ({ navigation, username }: any) => {
    return (
        <View className="bg-white p-4">
            <View className="flex-row justify-between items-center mb-10">
                <View>
                    <Text className="text-2xl font-OutfitBold text-gray-900">Olá, {capitalize(username as string) ?? 'Usuário'}</Text>
                    <Text className="text-gray-500 text-base font-OutfitMedium">Como você está se sentindo hoje?</Text>
                </View>
                <TouchableOpacity className="bg-gray-100 rounded-full p-2 self-start">
                    <MaterialCommunityIcons
                        name="bell-outline"
                        className="w-8 h-8"
                        size={22}
                    />
                </TouchableOpacity>
            </View>

            <View className="bg-blue-500 rounded-2xl p-4 py-5 flex-row items-center relative">
                <View className="flex-1 max-w-[52%]">
                    <Text className="text-white text-start text-lg font-OutfitMedium mb-3">
                        Agende a sua próxima consulta de forma fácil e rápida.
                    </Text>
                    <TouchableOpacity className="bg-white rounded-full py-2 px-4 self-start" onPress={() => navigation.navigate('Pesquisar')}>
                        <Text className="text-blue-500 font-OutfitMedium">Agendar</Text>
                    </TouchableOpacity>
                </View>
                <Image
                    source={require('../../assets/office.png')}
                    className="w-40 h-52 ml-2 absolute right-2 bottom-0"
                    resizeMode="cover"
                />
            </View>
        </View>
    );
};

const NextSched = ({ navigation }: any) => {
    return (
        <View className="p-4 justify-start">
            <View className="gap-4">
                <Text className="font-OutfitSemiBold text-lg">Próximo Agendamento</Text>
                <TouchableOpacity className="rounded-xl bg-yellow-200 px-4 py-5" onPress={() => navigation.navigate('Scheds', {
                    screen: "ScheduleDetails"
                })}>
                    <View className="flex-row justify-between items-center">
                        <View>
                            <Text className="font-OutfitSemiBold">Nome do Doutor</Text>
                            <View className="flex-row items-center space-x-2">
                                <Text className="font-OutfitRegular">Especialidade</Text>
                                <Text>|</Text>
                                <Text className="font-OutfitRegular">Nome da Clínica</Text>
                            </View>
                        </View>
                        <MaterialCommunityIcons
                            name="chevron-right"
                            size={28}
                            color="#333"
                        />
                    </View>
                    <View className="flex-row justify-between items-center bg-yellow-50 w-full p-2 px-3 mt-3 rounded-lg">
                        <View className="flex-row space-x-2">
                            <MaterialCommunityIcons
                                name="calendar-outline"
                                size={20}
                                color="#333"
                            />
                            <Text className="font-OutfitMedium">{"14 de Dezembro de 2024"}</Text>
                        </View>
                        <Text className="font-OutfitMedium">{"17:30h"}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default function HomeComponent({ navigation }: any) {
    const { user, isSignedIn } = useUser();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const handleUser = async () => {
            if (isSignedIn) {
                setIsLoading(false)
            } else {
                setIsLoading(true)
            }
        }

        handleUser();

        return () => {
            setIsLoading(false)
        }
    }, [])
    ActivityIndicator

    return (
        <View className="flex-1 bg-white" style={{ paddingTop: Constants.statusBarHeight }}>
            <StatusBar style="auto" />
            {isLoading ? (
                <View className="flex-1 justify-center items-center text-center">
                    <ActivityIndicator size={26} color={"#3b82f6"} />
                </View>
            ) : (
                <>
                    <DoctorCard username={user?.firstName} navigation={navigation} />
                    <NextSched navigation={navigation} />
                </>
            )}
        </View >
    );
}
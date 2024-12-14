import { Text, TouchableOpacity, View, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import Constants from "expo-constants";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const DoctorCard = ({ navigation }: any) => {
    return (
        <View className="bg-white p-4">
            {/* Saudações e ícone de notificação */}
            <View className="flex-row justify-between items-center mb-10">
                <View>
                    <Text className="text-2xl font-OutfitBold text-gray-900">Olá, Philip!</Text>
                    <Text className="text-gray-500 font-OutfitMedium">Como você está se sentindo hoje?</Text>
                </View>
                <TouchableOpacity className="bg-gray-100 rounded-full p-2">
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
                    // source={{
                    //     uri: 'https://img.freepik.com/free-photo/smiling-young-female-doctor-holding-folder-hospital-office_1303-21268.jpg',
                    // }}
                    className="w-40 h-52 ml-2 absolute right-2 bottom-0"
                    resizeMode="cover"
                />
            </View>
        </View>
    );
};


export default function HomeComponent({ navigation }: any) {
    return (
        <View className="flex-1 bg-white" style={{ paddingTop: Constants.statusBarHeight }}>
            <StatusBar style="auto" />
            <DoctorCard navigation={navigation} />
            <View className="flex-1 p-4 justify-start gap-4">
                <Text className="font-OutfitSemiBold text-lg">Próximo Agendamento</Text>
                <TouchableOpacity className="rounded-xl bg-yellow-200 p-4" onPress={() => navigation.navigate('Scheds', {
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

                <LinearGradient
                    colors={['#3b82f6', '#2563eb', '#1e40af']}
                    start={{ x: 1, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    className="p-4 rounded-2xl"
                >
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Scheds')}
                        className="flex-row items-center gap-4"
                    >
                        <MaterialCommunityIcons name="calendar-check" size={32} color="white" />
                        <Text className="font-OutfitMedium text-white text-lg">
                            Meus Agendamentos
                        </Text>
                    </TouchableOpacity>
                </LinearGradient>
            </View>

            <View className="items-center my-4">
                <Text className="font-OutfitRegular text-gray-400">
                    © 2024 Seu App de Agendamento
                </Text>
            </View>
        </View>
    );
}
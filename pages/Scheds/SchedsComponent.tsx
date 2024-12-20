import { StatusBar } from "expo-status-bar";
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Constants from "expo-constants";
import { useUser } from "@clerk/clerk-expo";
import axios from "axios";

// Lista de agendamentos
const SchedulesList = ({ schedules, navigation, color }: any) => (
    <View>
        {schedules.length > 0 ? (
            schedules.map((schedule: any) => (
                <TouchableOpacity
                    key={schedule.id}
                    className="mb-4"
                    onPress={() => navigation.navigate('ScheduleDetails', { schedule })}
                >
                    <View className="flex-row items-start gap-4">
                        {/* Data */}
                        <View className="items-center">
                            <Text className={`text-${color} font-OutfitBold text-lg`}>
                                {new Date(schedule.vacancy.date).toLocaleString('pt-BR', { month: 'short' }).toUpperCase()}
                            </Text>
                            <Text className={`text-${color} font-OutfitBold text-2xl`}>
                                {new Date(schedule.vacancy.date).getDate()}
                            </Text>
                        </View>

                        {/* Detalhes do agendamento */}
                        <View className={`flex-1 bg-[#fff] shadow-gray-300 border-r-4 border-${color} rounded-xl p-4 pt-3`}>
                            <View className="flex-row justify-between items-center">
                                <Text className="font-OutfitMedium text-gray-800 text-lg">
                                    {schedule.selectedTime === 'manha' ? 'Manhã' : schedule.selectedTime === 'tarde' ? 'Tarde' : 'Noite'}
                                </Text>
                                <Text className="text-gray-500 font-OutfitMedium text-sm">
                                    #SCHD{schedule.id.toString().padStart(5, '0')}
                                </Text>
                            </View>
                            <Text className="font-OutfitSemiBold text-gray-800 text-base mb-1">
                                Dr. {schedule.vacancy?.doctor?.name}
                            </Text>
                            <View className="flex-row justify-start items-center space-x-2">
                                <Text className="font-OutfitRegular text-gray-600 text-base">
                                    {schedule.speciality.title}
                                </Text>
                                <Text>|</Text>
                                <Text className="font-OutfitRegular text-gray-600 text-base">
                                    {schedule.clinic.name}
                                </Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            ))
        ) : (
            <Text className="text-gray-500 text-center">Nenhum agendamento encontrado.</Text>
        )}
    </View>
);


export default function SchedsComponent({ navigation }: any) {
    const [isUpcomingVisible, setUpcomingVisible] = useState(true);
    const [isFutureVisible, setFutureVisible] = useState(true);
    const [isCompletedVisible, setCompletedVisible] = useState(true);
    const { user } = useUser();
    const [schedules, setSchedules] = useState([]);
    const [upcoming, setUpcoming] = useState<any>([]);
    const [completed, setCompleted] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const categorizeSchedules = (schedules: any[]) => {
            const now = new Date();
            const past: any[] = [];
            const upcoming: any[] = [];

            schedules.forEach((schedule) => {
                const scheduleDate = new Date(schedule.vacancy.date);

                if (scheduleDate < now) {
                    past.push(schedule); // Agendamentos passados
                } else {
                    upcoming.push(schedule); // Agendamentos futuros e atuais
                }
            });

            setUpcoming(upcoming); // Todos os agendamentos futuros ou iguais à data de hoje vão para 'Próximos'
            setCompleted(past); // Agendamentos passados vão para 'Concluídos'
        };

        const getSchedulesByUser = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`http://10.19.30.33:3000/schedules/clerk/${user?.id}`);
                if (response.status === 200) {
                    const data = response.data.schedules || [];
                    setSchedules(data);
                    categorizeSchedules(data);
                }
            } catch (error) {
                console.error("Erro ao buscar agendamentos:", error);
            } finally {
                setIsLoading(false);
            }
        };

        getSchedulesByUser();
    }, [user]);

    return (
        <View className="flex-1 bg-[#f6f8fe]" style={{ paddingTop: Constants.statusBarHeight * 1.3 }}>
            <StatusBar style="auto" />
            <View className="px-4 pb-[1px]">
                <Text className="text-gray-800 font-OutfitBold text-2xl mb-4">Meus Agendamentos</Text>

                {isLoading ? (
                    <View className="h-[90%] justify-center items-center">
                        <ActivityIndicator size={22} color={"blue"} />
                    </View>
                ) : (
                    <ScrollView contentContainerStyle={{ paddingBottom: 50, paddingTop: 20 }}>
                        {/* Próximos */}
                        <View>
                            <View className="flex-row justify-between items-center mb-2">
                                <Text className="text-gray-700 font-OutfitMedium text-xl">Próximos ({upcoming.length})</Text>
                                <TouchableOpacity onPress={() => setUpcomingVisible(!isUpcomingVisible)}>
                                    <MaterialCommunityIcons
                                        name={isUpcomingVisible ? "chevron-down" : "chevron-up"}
                                        size={20}
                                        color="#888"
                                    />
                                </TouchableOpacity>
                            </View>
                            {isUpcomingVisible && <SchedulesList navigation={navigation} schedules={upcoming} color="green-500" />}
                        </View>

                        {/* Concluídos */}
                        <View>
                            <View className="flex-row justify-between items-center my-4">
                                <Text className="text-gray-700 font-OutfitMedium text-xl">Concluídos ({completed.length})</Text>
                                <TouchableOpacity onPress={() => setCompletedVisible(!isCompletedVisible)}>
                                    <MaterialCommunityIcons
                                        name={isCompletedVisible ? "chevron-down" : "chevron-up"}
                                        size={20}
                                        color="#888"
                                    />
                                </TouchableOpacity>
                            </View>
                            {isCompletedVisible && <SchedulesList navigation={navigation} schedules={completed} color="gray-400" />}
                        </View>
                    </ScrollView>
                )}
            </View>
        </View>
    );
}

import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Alert, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Calendar, LocaleConfig } from "react-native-calendars";
import DropDownPicker from "react-native-dropdown-picker";
import { CommonActions } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useUser } from "@clerk/clerk-expo";
import axios from "axios";

// Configuração de idioma para português
LocaleConfig.locales["pt-br"] = {
    monthNames: [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho",
        "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
    ],
    monthNamesShort: [
        "Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez",
    ],
    dayNames: [
        "Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira",
        "Quinta-feira", "Sexta-feira", "Sábado",
    ],
    dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
    today: "Hoje",
};
LocaleConfig.defaultLocale = "pt-br";

export default function SchedulingComponent({ route, navigation }: any) {
    const { user } = useUser();

    const scheduleOptions = route.params?.storeDetails?.scheduleOptions;
    const slug = route.params?.storeDetails?.slug;
    const { store } = route.params;
    const speciality = scheduleOptions[0]?.speciality; // Especialidade definida automaticamente

    const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
    const [schedObservations, setSchedObservations] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [availableDates, setAvailableDates] = useState<string[]>([]);
    const [timeSlots, setTimeSlots] = useState<string[]>([]);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [doctorOptions, setDoctorOptions] = useState<any[]>([]);
    const [openDropdownDoctor, setOpenDropdownDoctor] = useState(false);

    // Atualiza os médicos disponíveis ao carregar a especialidade
    useEffect(() => {
        //console.log('scheduling', JSON.stringify(scheduleOptions, null, 2))
        //console.log('route.params?.storeDetails', JSON.stringify(route.params?.storeDetails, null, 2));
        //console.log('storeee', JSON.stringify(store, null, 2))
        if (speciality) {
            const selectedOption = scheduleOptions.find(
                (option: any) => option.speciality === speciality
            );

            if (selectedOption) {
                setDoctorOptions(selectedOption.doctors.map((doctor: any) => ({
                    label: doctor.name,
                    value: doctor.name,
                })));
                setSelectedDoctor(null); // Resetar o médico ao trocar de especialidade
                setAvailableDates([]); // Resetar as datas ao trocar de especialidade
                setSelectedDate(null); // Resetar a data ao trocar de especialidade
                setSelectedTime(null); // Resetar o horário ao trocar de especialidade
                setTimeSlots([]); // Limpar os horários ao trocar de especialidade
            }
        }
    }, [speciality, scheduleOptions]);

    // Atualiza as datas disponíveis ao selecionar um médico
    useEffect(() => {
        if (selectedDoctor) {
            const selectedOption = scheduleOptions.find(
                (option: any) => option.speciality === speciality
            );

            const doctor = selectedOption?.doctors.find(
                (doc: any) => doc.name === selectedDoctor
            );

            if (doctor) {
                const newDates = doctor.availableSlots.map((slot: any) => slot.date);
                setAvailableDates(newDates);
                setSelectedDate(null);
                setSelectedTime(null);
                setTimeSlots([]);
                setSchedObservations(doctor.schedObservations);
            }
        } else {
            setAvailableDates([]);
            setSelectedDate(null);
            setSelectedTime(null);
            setTimeSlots([]);
            setSchedObservations(null);
        }
    }, [selectedDoctor]);

    // Obtém os horários disponíveis para uma data
    const handleDateSelection = (date: string) => {
        setSelectedDate(date);
        const selectedOption = scheduleOptions.find(
            (option: any) => option.speciality === speciality
        );

        const doctor = selectedOption?.doctors.find(
            (doc: any) => doc.name === selectedDoctor
        );

        const selectedSlot = doctor?.availableSlots.find(
            (slot: any) => slot.date === date
        );

        if (selectedSlot) {
            setTimeSlots(selectedSlot.times);
        }
    };

    // Estiliza as datas disponíveis
    const markedDates = availableDates.reduce((acc: Record<string, any>, date: string) => {
        acc[date] = {
            customStyles: {
                container: {
                    backgroundColor: selectedDate === date ? "#3b82f6" : "#10B981",
                    borderRadius: 20,
                    width: 36,
                    height: 36,
                    alignItems: "center",
                    justifyContent: "center",
                },
                text: {
                    color: "white",
                    fontWeight: "bold",
                },
            },
        };
        return acc;
    }, {});


    const submitSchedule = async () => {
        // Validações preliminares
        if (!selectedTime || !selectedDoctor || !selectedDate || !speciality || !store) {
            //console.log("Erro: Todos os campos devem ser preenchidos antes de agendar.");
            return;
        }

        // Encontrar o availableSlot correspondente
        const clinicDetails = store.details[0];
        const scheduleOptions = clinicDetails.scheduleOptions.find(
            (option: any) => option.speciality === speciality
        );

        if (!scheduleOptions) {
            console.error("Erro: Nenhuma opção de especialidade encontrada.");
            return;
        }

        const doctor = scheduleOptions.doctors.find((doc: any) => doc.name === selectedDoctor);

        if (!doctor) {
            console.error("Erro: Nenhum médico correspondente encontrado.");
            return;
        }

        const availableSlot = doctor.availableSlots.find((slot: any) =>
            slot.date === selectedDate && slot.times.includes(selectedTime)
        );



        if (!availableSlot) {
            console.error("Erro: Nenhum horário disponível encontrado.");
            return;
        }

        const scheduleData = {
            user: String(user?.id), // Substitua por userId autenticado
            selectedTime,
            clinic: store,
            speciality,
            vacancy: availableSlot.vacancyId
        };

        try {
            const response = await axios.post(`http://10.19.30.33:3000/schedules/`, scheduleData);
            if (response.status === 201) {
                //console.log("Agendamento realizado com sucesso!", JSON.stringify(response.data, null, 2));
                return "success"
            } else {
                console.error("Erro ao realizar agendamento.", response.data);
                return "failed"
            }
        } catch (error) {
            console.error("Erro ao conectar ao servidor:", error);
            return "failed"
        }
    };


    return (
        <View className="flex-1 bg-[#f6f8fe]">
            <ScrollView className="px-4 py-4" showsVerticalScrollIndicator={true} contentContainerStyle={{
                paddingBottom: 40,
                elevation: 40
            }}>
                <StatusBar style="auto" />

                <Text className="text-gray-600 text-2xl font-OutfitBold capitalize my-3 border-b border-gray-200">
                    {speciality}
                </Text>

                {doctorOptions.length > 0 && (
                    <>
                        <Text className="text-blue-600 text-base font-OutfitBold uppercase my-3">
                            1. Selecione um(a) médico(a):
                        </Text>
                        <DropDownPicker
                            open={openDropdownDoctor}
                            setOpen={setOpenDropdownDoctor}
                            value={selectedDoctor}
                            setValue={setSelectedDoctor}
                            items={doctorOptions}
                            placeholder="Selecione um médico"
                            style={{ borderColor: "#3b82f6", borderLeftWidth: 4, borderRightWidth: 0, borderTopWidth: 0, borderBottomWidth: 0, elevation: 5, shadowColor: '#d1d5db' }}
                            dropDownContainerStyle={{ borderColor: "#f97316", borderLeftWidth: 4, borderRightWidth: 0, borderTopWidth: 0, borderBottomWidth: 0 }}
                            textStyle={{ fontSize: 16, fontFamily: "Outfit-Medium", color: "#333" }}
                            zIndex={2000}
                            zIndexInverse={2000}
                        />
                    </>
                )}

                {schedObservations && (
                    <View className="bg-yellow-100 p-2 px-4 rounded-lg mt-3">
                        <Text className="text-base font-OutfitBold text-gray-900">Observações</Text>
                        <Text className="text-base font-OutfitRegular">{schedObservations}</Text>
                    </View>
                )}

                {availableDates.length > 0 && (
                    <>
                        <Text className="text-blue-600 text-base font-OutfitBold uppercase my-3">
                            2. Selecione uma data:
                        </Text>
                        <Calendar
                            minDate={availableDates[0]}
                            maxDate={availableDates[availableDates.length - 1]}
                            onDayPress={(day: any) => {
                                handleDateSelection(day.dateString);
                            }}
                            markedDates={markedDates}
                            markingType={"custom"}
                            monthFormat={"MMMM yyyy"}
                            theme={{
                                arrowColor: "#1D4ED8",
                                textDisabledColor: "rgba(0,0,0,0.1)",
                            }}
                            //elevation: 5, shadowColor: '#d1d5db'
                            style={{
                                borderRadius: 20,
                                height: 325,
                                boxShadow: '10px',
                                // borderWidth: 1,
                                // borderColor: '#3b82f6',
                            }}
                        />
                    </>
                )}

                {timeSlots.length > 0 && (
                    <>
                        <Text className="text-blue-600 text-base font-OutfitBold uppercase my-3">
                            3. Selecione um horário:
                        </Text>
                        <View className="flex-row flex-wrap w-full space-x-2">
                            {timeSlots.map((time: string) => (
                                <TouchableOpacity
                                    key={time}
                                    className={`p-2 w-[48%] rounded-full ${selectedTime === time ? "bg-blue-500" : "bg-gray-200"}`}
                                    onPress={() => setSelectedTime(time)}
                                >
                                    <Text
                                        className={`font-OutfitMedium text-center capitalize ${selectedTime === time ? "text-white" : "text-gray-700"}`}
                                    >
                                        {time}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </>
                )}

                {selectedTime && (
                    <TouchableOpacity
                        focusable={false}
                        className={`flex-row items-center justify-between px-4 py-3 rounded-lg mt-4 ${selectedTime ? "bg-blue-500" : "bg-gray-200"}`}
                        onPress={() => {
                            if (!speciality || !selectedDoctor || !selectedDate || !selectedTime) {
                                Alert.alert("Erro", "Por favor, preencha todos os campos antes de confirmar.");
                                return;
                            }

                            const formattedDate = new Date(selectedDate).toLocaleDateString('pt-BR');

                            Alert.alert(
                                "Confirmação de Agendamento",
                                `Você confirma o agendamento para:\n\nEspecialidade: ${speciality}\nData: ${formattedDate}\nHorário: ${selectedTime}?`,
                                [
                                    { text: "Não", style: "cancel" },
                                    {
                                        text: "Sim",
                                        onPress: async () => {
                                            const result = await submitSchedule();

                                            if (result == "success") {
                                                Alert.alert("Sucesso", "Agendamento realizado!");

                                                // Redefine o stack atual e navega para ScheduleDetails
                                                navigation.dispatch(
                                                    CommonActions.reset({
                                                        index: 0, // Define a tela inicial como SchedsScreen
                                                        routes: [
                                                            { name: "Scheds" }, // Scheds é a tab associada ao SchedsStack
                                                        ],
                                                    })
                                                );

                                                // Após resetar o stack, navega para ScheduleDetails
                                                setTimeout(() => {
                                                    navigation.navigate('Scheds', {
                                                        screen: 'ScheduleDetails',
                                                        params: {},
                                                    })
                                                }, 500); // Timeout curto para garantir o reset
                                            } else {
                                                Alert.alert("Erro", "O agendamento falhou. Tente novamente.");
                                            }
                                        },
                                    },
                                ]
                            )
                        }}>
                        <View className="flex-1">
                            <Text className="text-white text-base font-OutfitBold">
                                Confirmar Agendamento
                            </Text>
                            <Text className="text-white font-OutfitRegular text-sm mt-1">
                                Clique para ver mais detalhes
                            </Text>
                        </View>
                        <MaterialCommunityIcons
                            name="chevron-right"
                            size={28}
                            color="#fff"
                        />
                    </TouchableOpacity>
                )}
            </ScrollView>
        </View>
    )
};


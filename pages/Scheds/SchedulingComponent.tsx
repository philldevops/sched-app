import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Alert, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Calendar, LocaleConfig } from "react-native-calendars";
import DropDownPicker from "react-native-dropdown-picker";
import { CommonActions } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

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
    const scheduleOptions = route.params?.storeDetails?.scheduleOptions;
    const slug = route.params?.storeDetails?.slug;
    const [selectedSpeciality, setSelectedSpeciality] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [availableDates, setAvailableDates] = useState<string[]>([]);
    const [timeSlots, setTimeSlots] = useState<string[]>([]);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [openDropdown, setOpenDropdown] = useState(false);

    // Atualiza as datas disponíveis ao selecionar uma especialidade
    useEffect(() => {
        if (selectedSpeciality) {
            const selectedOption = scheduleOptions.find(
                (option: any) => option.speciality === selectedSpeciality
            );

            if (selectedOption) {
                const newDates = selectedOption.availableSlots.map((slot: any) => slot.date);
                setAvailableDates(newDates);
                setSelectedDate(null); // Resetar a data ao trocar de especialidade
                setSelectedTime(null); // Resetar o horário ao trocar de especialidade
                setTimeSlots([]); // Limpar os horários ao trocar de especialidade
            } else {
                setAvailableDates([]);
                setSelectedDate(null); // Resetar a data se não houver especialidade
                setSelectedTime(null); // Resetar o horário se não houver especialidade
                setTimeSlots([]); // Limpar os horários ao trocar de especialidade
            }
        } else {
            setAvailableDates([]);
            setSelectedDate(null); // Resetar a data se não houver especialidade
            setSelectedTime(null); // Resetar o horário se não houver especialidade
            setTimeSlots([]); // Limpar os horários ao trocar de especialidade
        }
    }, [selectedSpeciality, scheduleOptions]);

    // Obtém os horários disponíveis para uma data
    const handleDateSelection = (date: string) => {
        setSelectedDate(date);
        const selectedOption = scheduleOptions.find(
            (option: any) => option.speciality === selectedSpeciality
        );

        const selectedSlot = selectedOption?.availableSlots.find(
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

    return (
        <View className="flex-1 bg-white px-4 py-4">
            <ScrollView showsVerticalScrollIndicator={false}>
                <StatusBar style="auto" />

                <Text className="font-OutfitMedium text-2xl text-blue-700 mb-4">{slug}</Text>

                <Text className="font-OutfitMedium text-lg text-gray-700 mb-2">1. Selecione uma especialidade:</Text>
                <DropDownPicker
                    open={openDropdown}
                    setOpen={setOpenDropdown}
                    value={selectedSpeciality}
                    setValue={setSelectedSpeciality}
                    items={scheduleOptions.map((option: any) => ({
                        label: option.speciality,
                        value: option.speciality,
                    }))}
                    placeholder="Selecione uma especialidade"
                    style={{ borderColor: "#D1D5DB" }}
                    dropDownContainerStyle={{ borderColor: "#D1D5DB" }}
                    textStyle={{ fontSize: 16, fontFamily: "Outfit-Medium", color: "#333" }}
                />

                {availableDates.length > 0 && (
                    <>
                        <Text className="font-OutfitMedium text-lg text-gray-700 mb-2 mt-6">2. Selecione uma data:</Text>
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
                        />
                    </>
                )}

                {timeSlots.length > 0 && (
                    <>
                        <Text className="font-OutfitMedium text-lg text-gray-700 mb-2 mt-4">3. Selecione um horário:</Text>
                        <View className="flex-row flex-wrap gap-2">
                            {timeSlots.map((time: string) => (
                                <TouchableOpacity
                                    key={time}
                                    className={`p-2 px-4 rounded-full ${selectedTime === time ? "bg-blue-500" : "bg-gray-200"}`}
                                    onPress={() => setSelectedTime(time)}
                                >
                                    <Text
                                        className={`font-OutfitMedium ${selectedTime === time ? "text-white" : "text-gray-700"
                                            }`}
                                    >
                                        {time}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </>
                )}
            </ScrollView>

            <TouchableOpacity
                focusable={false}
                className={`flex-row items-center justify-between px-4 py-3 rounded-lg ${selectedTime ? "bg-blue-500" : "bg-gray-200"}`}
                onPress={() => {
                    if (!selectedSpeciality || !selectedDate || !selectedTime) {
                        Alert.alert("Erro", "Por favor, preencha todos os campos antes de confirmar.");
                        return;
                    }

                    const formattedDate = new Date(selectedDate).toLocaleDateString('pt-BR');

                    Alert.alert(
                        "Confirmação de Agendamento",
                        `Você confirma o agendamento para:\n\nEspecialidade: ${selectedSpeciality}\nData: ${formattedDate}\nHorário: ${selectedTime}?`,
                        [
                            { text: "Não", style: "cancel" },
                            {
                                text: "Sim",
                                onPress: () => {
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
                                        });

                                    }, 500); // Timeout curto para garantir o reset
                                },
                            },
                        ]
                    );
                }}
            >
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
        </View>
    );
}

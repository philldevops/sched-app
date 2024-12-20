import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";

export default function ScheduleComponent({ route, navigation }: any) {
    const { schedule } = route?.params;

    return (
        <View className="bg-gray-100 p-4">
            <ScrollView className="bg-white rounded-xl p-4">
                <Text className="text-gray-900 font-OutfitSemiBold text-xl px-2 border-b border-gray-100">
                    Agendamento
                </Text>

                <View className="p-3 py-4">
                    <Text className="text-gray-800 font-OutfitRegular text-base">
                        <Text className="font-OutfitSemiBold">Especialidade: </Text>
                        {schedule?.speciality?.title}
                    </Text>

                    <Text className="text-gray-800 font-OutfitRegular text-base">
                        <Text className="font-OutfitSemiBold">Dr. </Text>
                        {schedule?.vacancy?.doctor?.name}
                    </Text>

                    <Text className="text-gray-800 font-OutfitRegular text-base">
                        <Text className="font-OutfitSemiBold">Data: </Text>
                        {new Date(schedule?.vacancy?.date).toLocaleDateString("pt-BR")}
                    </Text>

                    <Text className="text-gray-800 font-OutfitRegular text-base">
                        <Text className="font-OutfitSemiBold">Período: </Text>
                        {schedule?.selectedTime}
                    </Text>

                    <Text className="text-gray-800 font-OutfitRegular text-base">
                        <Text className="font-OutfitSemiBold">Observações da Consulta: </Text>
                        {schedule?.vacancy?.observations || "Nenhuma observação disponível."}
                    </Text>
                </View>

                <Text className="text-gray-900 font-OutfitSemiBold text-xl px-2 border-b border-gray-100">Clínica</Text>

                <View className="p-3 py-4 mb-4">
                    <Text className="text-gray-800 font-OutfitRegular text-base">
                        <Text className="font-OutfitSemiBold">Nome: </Text>
                        {schedule?.clinic?.name}
                    </Text>

                    <Text className="text-gray-800 font-OutfitRegular text-base">
                        <Text className="font-OutfitSemiBold">Endereço: </Text>
                        {schedule?.clinic?.address}
                    </Text>

                    <Text className="text-gray-800 font-OutfitRegular text-base">
                        <Text className="font-OutfitSemiBold">Telefone: </Text>
                        {schedule?.clinic?.phone}
                    </Text>

                    <Text className="text-gray-800 font-OutfitRegular text-base">
                        <Text className="font-OutfitSemiBold">Email: </Text>
                        {schedule?.clinic?.email}
                    </Text>

                    <Text className="text-gray-800 font-OutfitRegular text-base">
                        <Text className="font-OutfitSemiBold">Observações da Clínica: </Text>
                        {schedule?.clinic?.observations || "Nenhuma observação disponível."}
                    </Text>
                </View>
            </ScrollView>
        </View>
    );
}

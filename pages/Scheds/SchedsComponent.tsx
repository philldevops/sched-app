import { StatusBar } from "expo-status-bar";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function SchedsComponent({ navigation, route }: any) {
    const [isUpcomingVisible, setUpcomingVisible] = useState(true);
    const [isFutureVisible, setFutureVisible] = useState(true);
    const [isCompletedVisible, setCompletedVisible] = useState(true);

    return (
        <View className="flex-1 bg-gray-50">
            <StatusBar style="auto" />
            <View className="px-4 pb-[1px]">
                {/* <View className="flex-row justify-between items-center mb-4">
                    <Text className="text-gray-800 font-OutfitBold text-2xl">Agendamentos</Text>
                    <MaterialCommunityIcons name="dots-vertical" size={24} color="#888" />
                </View> */}

                <ScrollView showsVerticalScrollIndicator={false}>
                    <View>
                        <View className="flex-row justify-between items-center mb-2 pt-5">
                            <Text className="text-gray-700 font-OutfitMedium text-xl">Próximos (1)</Text>
                            <TouchableOpacity
                                onPress={() => setUpcomingVisible(!isUpcomingVisible)}
                            >
                                <MaterialCommunityIcons
                                    name={isUpcomingVisible ? "chevron-down" : "chevron-up"}
                                    size={20}
                                    color="#888"
                                />
                            </TouchableOpacity>
                        </View>

                        {isUpcomingVisible && (
                            <>
                                <TouchableOpacity className="mb-4" onPress={() => navigation.navigate('ScheduleDetails')}>
                                    <View className="flex-row items-start gap-4">
                                        <View className="items-center">
                                            <Text className="text-blue-500 font-OutfitBold text-lg">DEZ</Text>
                                            <Text className="text-blue-500 font-OutfitBold text-2xl">12</Text>
                                            <View className="w-1 bg-blue-500 flex-1 rounded-full mt-2"></View>
                                        </View>

                                        <View className="flex-1 bg-white shadow-sm border border-gray-200 rounded-xl p-4 pb-0">
                                            <View className="flex-row justify-between items-center mb-2">
                                                <Text className="font-OutfitMedium text-gray-800">
                                                    10:00 - 11:00 AM
                                                </Text>
                                                <Text className="text-gray-500 font-OutfitMedium text-sm">
                                                    #RSV10102
                                                </Text>
                                            </View>
                                            <Text className="font-OutfitBold text-gray-800 text-lg mb-1">
                                                Tooth Scaling
                                            </Text>
                                            <Text className="font-OutfitRegular text-gray-600 text-sm">
                                                Visit #2 - Scaling Maxilla (Q1+Q2)
                                            </Text>
                                            <Text className="text-gray-500 text-sm flex-row items-center mt-1">
                                                <MaterialCommunityIcons
                                                    name="office-building"
                                                    size={16}
                                                    color="#888"
                                                />
                                                {"  "}Zendral Dental
                                            </Text>
                                            <View className="flex-row flex-wrap gap-2 my-2">
                                                <TouchableOpacity className="bg-purple-200 rounded-full px-2 py-1 self-start">
                                                    <Text className="text-purple-600 font-OutfitMedium text-xs">
                                                        SOMENTE DINHEIRO
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </>
                        )}
                    </View>

                    <View>
                        <View className="flex-row justify-between items-center my-2">
                            <Text className="text-gray-700 font-OutfitMedium text-xl">Futuros (2)</Text>
                            <TouchableOpacity
                                onPress={() => setFutureVisible(!isFutureVisible)}
                            >
                                <MaterialCommunityIcons
                                    name={isFutureVisible ? "chevron-down" : "chevron-up"}
                                    size={20}
                                    color="#888"
                                />
                            </TouchableOpacity>
                        </View>

                        {isFutureVisible &&
                            [1, 2].map((item, index) => (
                                <View key={index} className="mb-4">
                                    <View className="flex-row items-start gap-4">
                                        <View className="items-center">
                                            <Text className="text-green-500 font-OutfitBold text-lg">DEZ</Text>
                                            <Text className="text-green-500 font-OutfitBold text-2xl">20</Text>
                                            <View className="w-1 flex-1 top-[-2] bg-green-500 rounded-full mt-2"></View>
                                        </View>

                                        <View className="flex-1 bg-white shadow-sm border border-gray-200 rounded-xl p-4 pb-0">
                                            <View className="flex-row justify-between items-center mb-2">
                                                <Text className="font-OutfitMedium text-gray-800">
                                                    09:00 - 10:00 AM
                                                </Text>
                                                <Text className="text-gray-500 font-OutfitMedium text-sm">
                                                    #RSV10105
                                                </Text>
                                            </View>
                                            <View className="">
                                                <Text className="font-OutfitBold text-gray-800 text-lg mb-1">
                                                    Dr. Paula Fernandes
                                                </Text>
                                                <Text className="font-OutfitRegular text-gray-600 text-sm">
                                                    Pediatra
                                                </Text>
                                                <Text className="text-gray-500 font-OutfitRegular text-sm flex-row items-center mt-1">
                                                    <MaterialCommunityIcons
                                                        name="office-building"
                                                        size={16}
                                                        color="#888"
                                                    />
                                                    {"  "}Clínica Unimed
                                                </Text>
                                                <View className="flex-row flex-wrap gap-2 my-2">
                                                    <TouchableOpacity className="bg-purple-200 rounded-full px-2 py-1 self-start">
                                                        <Text className="text-purple-600 font-OutfitMedium text-xs">
                                                            SOMENTE DINHEIRO
                                                        </Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity className="bg-green-200 rounded-full px-2 py-1 self-start">
                                                        <Text className="text-green-600 font-OutfitMedium text-xs">
                                                            ORDEM DE CHEGADA
                                                        </Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity className="bg-indigo-200 rounded-full px-2 py-1 self-start">
                                                        <Text className="text-indigo-600 font-OutfitMedium text-xs">
                                                            LOREM
                                                        </Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            ))}
                    </View>


                    <View>
                        <View className="flex-row justify-between items-center my-2">
                            <Text className="text-gray-700 font-OutfitMedium text-xl">
                                Concluídos/Expirados (2)
                            </Text>
                            <TouchableOpacity
                                onPress={() => setCompletedVisible(!isCompletedVisible)}
                            >
                                <MaterialCommunityIcons
                                    name={isCompletedVisible ? "chevron-down" : "chevron-up"}
                                    size={20}
                                    color="#888"
                                />
                            </TouchableOpacity>
                        </View>

                        {/* Completed Cards */}
                        {isCompletedVisible &&
                            [1, 2].map((item, index) => (
                                <View key={index} className="mb-4">
                                    <View className="flex-row items-start gap-4">
                                        <View className="items-center">
                                            <Text className="text-gray-300 font-OutfitBold text-lg">DEZ</Text>
                                            <Text className="text-gray-300 font-OutfitBold text-2xl">2</Text>
                                            <View className="w-1 bg-gray-300 flex-1 top-[-2] rounded-full mt-2"></View>
                                        </View>

                                        <View className="flex-1 bg-white shadow-sm border border-gray-200 rounded-xl p-4">
                                            <View className="flex-row justify-between items-center mb-2">
                                                <Text className="font-OutfitMedium text-gray-800">
                                                    09:00 - 10:00 AM
                                                </Text>
                                                <Text className="text-gray-500 font-OutfitMedium text-sm">
                                                    #RSV10105
                                                </Text>
                                            </View>
                                            <View className="">
                                                <Text className="font-OutfitBold text-gray-800 text-lg mb-1">
                                                    Dr. Paula Fernandes
                                                </Text>
                                                <Text className="font-OutfitRegular text-gray-600 text-sm">
                                                    Pediatra
                                                </Text>
                                                <Text className="text-gray-500 font-OutfitRegular text-sm flex-row items-center mt-1">
                                                    <MaterialCommunityIcons
                                                        name="office-building"
                                                        size={16}
                                                        color="#888"
                                                    />
                                                    {"  "}Clínica Unimed
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            ))}
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}

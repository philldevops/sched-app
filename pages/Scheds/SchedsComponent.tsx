// import { StatusBar } from "expo-status-bar";
// import { View, Text, TouchableOpacity, ScrollView } from "react-native";
// import Constants from "expo-constants";
// import { LinearGradient } from "expo-linear-gradient";
// import { MaterialCommunityIcons } from '@expo/vector-icons';

// export default function SchedsComponent({ navigation }: any) {
//     return (
//         <View className="flex-1 bg-white">
//             <StatusBar style="auto" />

//             {/* Cabeçalho */}
//             <View className="items-start m-4">
//                 {/* <Text className="font-OutfitBold text-2xl text-gray-800">Meus Agendamentos</Text> */}
//                 <Text className="font-OutfitRegular text-xl text-gray-500">
//                     Visualize e gerencie seus horários
//                 </Text>
//             </View>

//             <ScrollView className="w-full px-4" showsVerticalScrollIndicator={false}>
//                 {/* Sessão: Próximos */}
//                 <Text className="font-OutfitMedium text-gray-800 text-xl mb-3">Próximos</Text>

//                 <LinearGradient
//                     colors={['#eafff5', '#c3ffe4', '#5ffebd']}
//                     start={{ x: 0, y: 0.5 }}
//                     end={{ x: 1, y: 1 }}
//                     className="px-4 py-3 rounded-lg mb-4 shadow-sm"
//                 >
//                     <TouchableOpacity className="flex-row items-center gap-4">
//                         <LinearGradient
//                             colors={['#3b82f6', '#2563eb', '#1e40af']}
//                             start={{ x: 1, y: 0 }}
//                             end={{ x: 0, y: 1 }}
//                             className="p-1 px-4 rounded-lg items-center"
//                         >
//                             <Text className="font-OutfitMedium text-white text-lg">Dez</Text>
//                             <Text className="font-OutfitBold text-white text-2xl">10</Text>
//                         </LinearGradient>
//                         <View className="flex-auto">
//                             <Text className="font-OutfitMedium text-gray-800 text-lg">
//                                 08:00 às 12:00
//                             </Text>
//                             <Text className="font-OutfitRegular text-gray-600">Baby Lab</Text>
//                         </View>
//                         <MaterialCommunityIcons name="chevron-right" size={32} color="#2a5f4a" />
//                     </TouchableOpacity>
//                 </LinearGradient>

//                 {/* Sessão: Futuros */}
//                 <Text className="font-OutfitMedium text-gray-800 text-xl mt-6 mb-3">Futuros</Text>

//                 {[1, 2].map((item: any, index: any) => (
//                     <View
//                         key={index}
//                         className="px-4 py-0 rounded-lg border-[1px] border-gray-300 bg-white shadow-sm mb-4"
//                     >
//                         <TouchableOpacity className="flex-row items-center gap-4 py-2">
//                             <View className="min-w-[70px] items-center justify-center bg-gray-100 rounded-lg py-2">
//                                 <Text className="font-OutfitMedium text-gray-700 text-lg">Dez</Text>
//                                 <Text className="font-OutfitBold text-gray-900 text-2xl">10</Text>
//                             </View>
//                             <View className="flex-auto">
//                                 <Text className="font-OutfitMedium text-gray-800 text-lg">
//                                     08:00 às 12:00
//                                 </Text>
//                                 <Text className="font-OutfitRegular text-gray-600">Baby Lab</Text>
//                             </View>
//                             <MaterialCommunityIcons name="chevron-right" size={32} color="#888" />
//                         </TouchableOpacity>
//                     </View>
//                 ))}
//             </ScrollView>
//         </View>
//     );
// }


import { StatusBar } from "expo-status-bar";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useState } from "react";
import Constants from "expo-constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function SchedsComponent({ navigation }: any) {
    // Estado para controlar a exibição dos cards
    const [isUpcomingVisible, setUpcomingVisible] = useState(true);
    const [isFutureVisible, setFutureVisible] = useState(true);
    const [isCompletedVisible, setCompletedVisible] = useState(true);

    return (
        <View className="flex-1 bg-white" style={{ paddingTop: Constants.statusBarHeight * 0.5 }}>
            <StatusBar style="auto" />
            <View className="px-4 pb-[1px]">
                {/* Header */}
                {/* <View className="flex-row justify-between items-center mb-4">
                    <Text className="text-gray-800 font-OutfitBold text-2xl">Agendamentos</Text>
                    <MaterialCommunityIcons name="dots-vertical" size={24} color="#888" />
                </View> */}

                <ScrollView showsVerticalScrollIndicator={false}>
                    {/* Upcoming Section */}
                    <View>
                        <View className="flex-row justify-between items-center mb-2">
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

                        {/* Upcoming Cards */}
                        {isUpcomingVisible && (
                            <View className="mb-4">
                                <View className="flex-row items-start gap-4">
                                    {/* Month, Date, and Vertical Line */}
                                    <View className="items-center">
                                        <Text className="text-blue-500 font-OutfitBold text-lg">DEZ</Text>
                                        <Text className="text-blue-500 font-OutfitBold text-2xl">12</Text>
                                        <View className="w-1 bg-blue-500 flex-1 rounded-full mt-2"></View>
                                    </View>

                                    {/* Event Details */}
                                    <View className="flex-1 bg-white shadow-sm border border-gray-200 rounded-xl p-4">
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
                                        <TouchableOpacity className="bg-purple-200 rounded-full px-2 py-1 mt-3 w-20">
                                            <Text className="text-purple-600 font-OutfitMedium text-center text-xs">
                                                MULTIPLE
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        )}
                    </View>

                    {/* Future Section */}
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

                        {/* Future Cards */}
                        {isFutureVisible &&
                            [1, 2].map((item, index) => (
                                <View key={index} className="mb-4">
                                    <View className="flex-row items-start gap-4">
                                        {/* Month, Date, and Vertical Line */}
                                        <View className="items-center">
                                            <Text className="text-green-500 font-OutfitBold text-lg">DEZ</Text>
                                            <Text className="text-green-500 font-OutfitBold text-2xl">20</Text>
                                            <View className="w-1 flex-1 top-[-2] bg-green-500 rounded-full mt-2"></View>
                                        </View>

                                        {/* Event Details */}
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

                    {/* Completed Section */}
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
                                        {/* Month, Date, and Vertical Line */}
                                        <View className="items-center">
                                            <Text className="text-gray-300 font-OutfitBold text-lg">DEZ</Text>
                                            <Text className="text-gray-300 font-OutfitBold text-2xl">2</Text>
                                            <View className="w-1 bg-gray-300 flex-1 top-[-2] rounded-full mt-2"></View>
                                        </View>

                                        {/* Event Details */}
                                        <View className="flex-1 bg-white shadow-sm border border-gray-200 rounded-xl p-4">
                                            <View className="flex-row justify-between items-center mb-2">
                                                <Text className="font-OutfitMedium text-gray-800">
                                                    09:00 - 10:00 AM
                                                </Text>
                                                <Text className="text-gray-500 font-OutfitMedium text-sm">
                                                    #RSV10105
                                                </Text>
                                            </View>
                                            <Text className="font-OutfitBold text-gray-800 text-lg mb-1">
                                                Simple Extractions
                                            </Text>
                                            <Text className="font-OutfitRegular text-gray-600 text-sm">
                                                Visit #2 - Simple Extractions (Q1+Q2)
                                            </Text>
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

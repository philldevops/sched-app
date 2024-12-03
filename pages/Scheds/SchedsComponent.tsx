import { StatusBar } from "expo-status-bar";
import { View, Text, TouchableOpacity } from "react-native";
import Constants from "expo-constants";

export default function SchedsComponent({ route, navigation }: any) {
    return (
        <View
            className="flex-1 bg-gray-100 pt-4"
        // style={{ paddingTop: Constants.statusBarHeight }}
        >
            <StatusBar style="auto" />
            <View className="w-full px-3">
                <View className="px-4 py-3 rounded-xl bg-white">
                    <View className="flex-row items-center gap-3 mb-3">
                        <View className="h-9 w-9 rounded-full p-1 text-center justify-center bg-indigo-400">
                            <Text className="text-center justify-center">1</Text>
                        </View>
                        <View>
                            <Text className="font-OutfitMedium text-gray-900 text-lg">Dr. Kevon Lane</Text>
                            <Text className="font-OutfitMedium text-gray-900 top-[-5]">Pediatra</Text>
                        </View>
                    </View>
                    <View className="bg-gray-200 p-2 rounded-xl">
                        <View className="flex-row justify-evenly gap-2 pb-1">
                            <Text className="font-OutfitMedium rounded-full text-black text-[15px]">{"Data: 03/12/2024"}</Text>
                            <Text className="font-OutfitMedium rounded-full text-black text-[15px]">{"Horário: Manhã"}</Text>
                        </View>
                        <TouchableOpacity className="rounded-xl p-2 bg-green-950" onPress={() => { }}>
                            <Text className="font-OutfitMedium text-white text-center">Ver agendamento {"  >"}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}
import { Text, View, TouchableOpacity, FlatList } from "react-native";
import { StatusBar } from "expo-status-bar";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function SearchResultComponent({ route, navigation }: any) {
    const { data } = route.params || { data: [] };

    const renderSubItems = (subItens: Array<any>) => {
        return (
            <FlatList
                data={subItens}
                focusable={false}
                renderItem={({ item }) => (
                    <>
                        <TouchableOpacity
                            focusable={false}
                            onPress={() =>
                                navigation.navigate("Pesquisar", {
                                    screen: "SearchResultStore",
                                    params: {
                                        store: item,
                                    },
                                })
                            }
                            className="flex-row items-center justify-between px-4 py-3 bg-white rounded-lg border mb-1 border-gray-200"
                        >
                            <View className="flex-1">
                                <Text className="text-gray-800 text-base font-OutfitMedium">
                                    {item.title}
                                </Text>
                                <Text className="text-gray-500 font-OutfitRegular text-sm mt-1">
                                    Clique para ver mais detalhes
                                </Text>
                            </View>
                            <MaterialCommunityIcons
                                name="chevron-right"
                                size={28}
                                color="#2563eb"
                            />
                        </TouchableOpacity>
                    </>
                )}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
            />
        );
    };

    return (
        <View className="flex-1 bg-[#fbfcfc]">
            <StatusBar style="dark" />
            <View className="flex-1">
                {data.length > 0 ? (
                    data.map((category: any) => (
                        <View key={category.id} className="mb-4">
                            <Text className="text-blue-600 text-base font-OutfitBold uppercase px-4 mt-6 mb-2">
                                {category.title}
                            </Text>
                            <View className="mx-2" focusable={false}>
                                {renderSubItems(category.subItens)}
                            </View>
                        </View>
                    ))
                ) : (
                    <Text className="text-gray-500 text-lg font-OutfitMedium text-center mt-5">
                        Nenhum resultado encontrado.
                    </Text>
                )}
            </View>
        </View>
    );
}

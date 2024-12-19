import { Text, View, TouchableOpacity, FlatList, ScrollView } from "react-native";
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
                            className="bg-[#fff] shadow-gray-300 border-l-4 border-orange-500 rounded-xl flex-1 mb-2 flex-row h-[70px] justify-between items-center px-4"
                            style={{ elevation: 5 }}
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
        <View className="flex-1 bg-[#f6f8fe]">
            <StatusBar style="dark" />
            <View className="flex-1">
                <ScrollView className="pt-3" contentContainerStyle={{ paddingBottom: 20}}>
                    {data.length > 0 ? (
                        data.map((category: any) => (
                            <View key={category.id} className="">
                                <Text className="text-blue-600 text-base font-OutfitBold uppercase px-4 mt-3 mb-3">
                                    {category.title}
                                </Text>
                                <View className="mx-4" focusable={false}>
                                    {renderSubItems(category.subItens)}
                                </View>
                            </View>
                        ))
                    ) : (
                        <Text className="text-gray-500 text-lg font-OutfitMedium text-center mt-5">
                            Nenhum resultado encontrado.
                        </Text>
                    )}
                </ScrollView>
            </View>
        </View>
    );
}

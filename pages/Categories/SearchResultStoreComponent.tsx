import { StatusBar } from "expo-status-bar";
import { Text, TouchableOpacity, View, ScrollView } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function SearchResultStoreComponent({ route, navigation }: any) {
    const { store } = route.params || {};
    const storeDetails = store?.details?.[0]; // Verifica se há detalhes disponíveis

    //console.log(JSON.stringify(storeDetails, null, 2))

    return (
        <View className="flex-1 bg-gray-50">
            <StatusBar style="dark" />

            {/* Cabeçalho */}
            <View className="p-4 px-6 bg-white border-b border-gray-200">
                <Text className="text-2xl font-OutfitSemiBold text-gray-900">{store?.title || "Detalhes da Loja"}</Text>
            </View>

            {/* Conteúdo Principal com Scroll */}
            <ScrollView
                contentContainerStyle={{
                    paddingBottom: 1, // Espaço para evitar sobreposição com o rodapé
                }}
            >
                {/* Informações de Endereço e Contato */}
                {storeDetails && (
                    <View className="py-0 my-0">
                        <View className="bg-white border-b border-gray-200 p-2 px-6">
                            <Text className="text-base font-OutfitMedium text-gray-500">Endereço</Text>
                            <Text className="text-lg font-OutfitRegular text-gray-800">{storeDetails.address}</Text>
                        </View>
                        <View className="bg-white border-b border-gray-200 p-2 px-6">
                            <Text className="text-base font-OutfitMedium text-gray-500">Email</Text>
                            <Text className="text-lg font-OutfitRegular text-gray-800">{storeDetails.email}</Text>
                        </View>
                        <View className="bg-white border-b border-gray-200 p-2 px-6">
                            <Text className="text-base font-OutfitMedium text-gray-500">Telefone</Text>
                            <Text className="text-lg font-OutfitRegular text-gray-800">{storeDetails.phone}</Text>
                        </View>
                        <View className="bg-white border-b border-gray-200 p-2 px-6">
                            <Text className="text-base font-OutfitMedium text-gray-500">Expediente</Text>
                            <Text className="text-lg font-OutfitRegular text-gray-800">{storeDetails.expedient}</Text>
                        </View>

                        {/* Especialidades */}
                        {storeDetails?.scheduleOptions?.length > 0 && (
                            <View className="bg-white p-3 px-6 space-y-0 pb-5">
                                <Text className="text-base font-OutfitMedium text-gray-500">Especialidades</Text>
                                <View className="flex-row flex-wrap gap-2 mt-1">
                                    {storeDetails.scheduleOptions.map((item: any, index: number) => (
                                        <Text
                                            key={index}
                                            className="px-3 py-1 border-blue-500 border-l-4 bg-[#f6f8fe] text-gray-900 text-base rounded-lg font-OutfitRegular"
                                        >
                                            {item.speciality}
                                        </Text>
                                    ))}
                                </View>
                            </View>
                        )}

                        {storeDetails?.observations?.length > 0 && (
                            <View className="bg-yellow-100 p-3 px-6">
                                <Text className="text-base font-OutfitBold text-gray-900">Observações</Text>
                                <Text className="text-base font-OutfitRegular">{storeDetails?.observations}</Text>
                            </View>
                        )}
                    </View>
                )}
            </ScrollView>

            {/* Botões no rodapé fixo */}
            <View className="bottom-0 left-0 right-0 px-6 py-4 bg-white" style={{ elevation: 50 }}>
                <LinearGradient
                    colors={["#ff6b6b", "#ffcc00", "#1dd1a1", "#54a0ff", "#5f27cd"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{ padding: 2, borderRadius: 10 }}
                    className="mb-2"
                >
                    <View className="bg-white rounded-lg">
                        <TouchableOpacity
                            focusable={false}
                            onPress={() => { }}
                            className="flex-row items-center justify-between px-4 py-3 rounded-lg"
                        >
                            <View className="flex-1">
                                <Text className="text-gray-800 text-base font-OutfitMedium">
                                    Ver no Mapa
                                </Text>
                                <Text className="text-gray-500 font-OutfitRegular text-sm mt-1">
                                    Clique para ver mais detalhes
                                </Text>
                            </View>
                            <MaterialCommunityIcons
                                name="chevron-right"
                                size={28}
                                color="#333"
                            />
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
                {/* <TouchableOpacity
                    focusable={false}
                    onPress={() => { }}
                    className="flex-row items-center justify-between px-4 py-3 bg-white rounded-lg border mb-2 border-gray-200"
                >
                    <View className="flex-1">
                        <Text className="text-gray-800 text-base font-OutfitMedium">
                            Ver no Mapa
                        </Text>
                        <Text className="text-gray-500 font-OutfitRegular text-sm mt-1">
                            Clique para ver mais detalhes
                        </Text>
                    </View>
                    <MaterialCommunityIcons
                        name="chevron-right"
                        size={28}
                        color="#333"
                    />
                </TouchableOpacity> */}
                {storeDetails?.isScheduling && (
                    <TouchableOpacity
                        focusable={false}
                        onPress={() =>
                            navigation.navigate("Pesquisar", {
                                screen: "ScheduleScreen",
                                params: { storeDetails },
                            })
                        }
                        className="flex-row items-center justify-between px-4 py-3 bg-blue-500 rounded-lg mb-1"
                    >
                        <View className="flex-1">
                            <Text className="text-white text-base font-OutfitBold">
                                Agendar Agora
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
            </View>
        </View>
    );
}

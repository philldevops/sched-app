import { StatusBar } from "expo-status-bar";
import { Text, TouchableOpacity, View } from "react-native";

export default function SearchResultStoreComponent({ route, navigation }: any) {
    const { store } = route.params || {};
    // Verifica se há detalhes disponíveis
    const storeDetails = store?.details?.[0];

    return (
        <View className="flex-1 items-start justify-start bg-white">
            <StatusBar style="auto" />
            <View className="w-full p-5">
                <Text className="text-3xl font-OutfitMedium mb-4 text-blue-700">{store?.title || "Detalhes da Loja"}</Text>

                {storeDetails ? (
                    <View>
                        {/* Informações Gerais */}
                        <Text className="font-OutfitRegular uppercase text-lg text-blue-700 py-1">INFORMAÇÕES GERAIS</Text>
                        <Text className="font-OutfitRegular text-lg text-gray-700">
                            <Text className="font-OutfitMedium text-lg">Endereço:</Text> {storeDetails.address || "Não informado"}
                        </Text>
                        <Text className="font-OutfitRegular text-lg text-gray-700">
                            <Text className="font-OutfitMedium text-lg">Email:</Text> {storeDetails.email || "Não informado"}
                        </Text>
                        <Text className="font-OutfitRegular text-lg text-gray-700">
                            <Text className="font-OutfitMedium text-lg">Telefone:</Text> {storeDetails.phone || "Não informado"}
                        </Text>
                        <Text className="font-OutfitRegular text-lg text-gray-700">
                            <Text className="font-OutfitMedium text-lg">Expediente:</Text> {storeDetails.expedient || "Não informado"}
                        </Text>

                        {/* Agendamento */}
                        <Text className="font-OutfitRegular uppercase text-lg text-blue-700 py-1 mt-5">AGENDAMENTO</Text>
                        <Text className="font-OutfitRegular text-lg text-gray-700">
                            <Text className="font-OutfitMedium text-lg">Agendamento:</Text>{" "}
                            {storeDetails.isScheduling ? "Disponível" : "Indisponível"}
                        </Text>

                        {/* Especialidades */}
                        <Text className="font-OutfitRegular uppercase text-lg text-blue-700 py-1 mt-5">ESPECIALIDADES</Text>
                        <View className="flex flex-wrap flex-row gap-[10] gap-x-2 mt-1">
                            {storeDetails?.scheduleOptions && storeDetails?.scheduleOptions.length > 0 ? (
                                storeDetails?.scheduleOptions.map((item: any) => (
                                    <Text
                                        key={item?.speciality}
                                        className="font-OutfitRegular text-base text-gray-700 px-3 py-1 bg-blue-50 rounded-full"
                                    >
                                        {item?.speciality}
                                    </Text>
                                ))
                            ) : (
                                <Text className="text-base text-gray-500">Nenhuma especialidade disponível.</Text>
                            )}
                        </View>

                        {/* Botão de Agendamento */}
                        {storeDetails.isScheduling && (
                            <View className="mt-5">
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.navigate("Categories", {
                                            screen: "ScheduleScreen",
                                            params: {
                                                storeDetails,
                                            },
                                        });
                                    }}
                                >
                                    <Text className="font-OutfitMedium text-white text-lg bg-blue-500 rounded-full p-[3] my-2 text-center">
                                        Agendar
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                ) : (
                    <Text className="text-base text-gray-500">Detalhes não disponíveis.</Text>
                )}
            </View>
        </View>
    );
}

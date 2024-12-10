import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { Text, TouchableOpacity, View, ScrollView } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function SearchResultStoreComponent({ route, navigation }: any) {
    const { store } = route.params || {};
    const storeDetails = store?.details?.[0]; // Verifica se há detalhes disponíveis

    return (
        <View className="flex-1 bg-white">
            <StatusBar style="auto" />

            {/* Cabeçalho */}
            <View className="bg-blue-500 p-5">
                <Text className="text-2xl font-OutfitBold text-white text-center">{store?.title || "Detalhes da Loja"}</Text>
            </View>

            {/* Conteúdo Principal */}
            <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 20 }}>
                {storeDetails ? (
                    <>
                        {/* Card de Informações Gerais */}
                        <InfoCard title="Informações Gerais">
                            <InfoRow label="Endereço" value={storeDetails.address} />
                            <InfoRow label="Email" value={storeDetails.email} />
                            <InfoRow label="Telefone" value={storeDetails.phone} />
                            <InfoRow label="Expediente" value={storeDetails.expedient} />
                        </InfoCard>

                        {/* Card de Agendamento */}
                        <InfoCard title="Agendamento">
                            <InfoRow
                                label="Disponibilidade"
                                value={storeDetails.isScheduling ? "Disponível" : "Indisponível"}
                            />
                        </InfoCard>

                        {/* Card de Especialidades */}
                        <InfoCard title="Especialidades">
                            {storeDetails?.scheduleOptions?.length > 0 ? (
                                <View className="flex flex-wrap flex-row gap-2">
                                    {storeDetails.scheduleOptions.map((item: any, index: number) => (
                                        <Text
                                            key={index}
                                            className="px-3 py-1 bg-white text-blue-700 text-base rounded-full font-OutfitRegular"
                                        >
                                            {item.speciality}
                                        </Text>
                                    ))}
                                </View>
                            ) : (
                                <Text className="text-base text-gray-500">Nenhuma especialidade disponível.</Text>
                            )}
                        </InfoCard>

                        {/* Botão de Agendamento */}
                        {storeDetails.isScheduling && (
                            <View className="w-full">
                                {/* Rodapé */}
                                {/* Botão: Novo Agendamento */}
                                <LinearGradient
                                    colors={['#3b82f6', '#2563eb', '#1e40af']}
                                    start={{ x: 1, y: 0 }}
                                    end={{ x: 0, y: 1 }}
                                    className="p-2 rounded-xl items-center"
                                >
                                    <TouchableOpacity
                                        onPress={() =>
                                            navigation.navigate("Pesquisar", {
                                                screen: "ScheduleScreen",
                                                params: { storeDetails },
                                            })
                                        }
                                        className="flex-row items-center gap-4 rounded-0"
                                    >
                                        <Text className="font-OutfitMedium text-white text-lg">
                                            Agendar
                                        </Text>
                                    </TouchableOpacity>
                                </LinearGradient>
                            </View>
                        )}
                    </>
                ) : (
                    <Text className="text-center text-gray-500 text-lg mt-10">
                        Nenhuma informação disponível.
                    </Text>
                )}
            </ScrollView>
        </View >
    );
}

/* Componente Card para Seções */
function InfoCard({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <View className="bg-gray-100 p-4 rounded-xl shadow-sm mb-4">
            <Text className="font-OutfitBold text-lg text-blue-700 mb-2">{title}</Text>
            {children}
        </View>
    );
}

/* Linha de Informação Individual */
function InfoRow({ label, value }: { label: string; value: string | undefined }) {
    return (
        <View className="flex-row justify-between mb-2">
            <Text className="font-OutfitMedium text-base text-gray-700">{label}:</Text>
            <Text className="font-OutfitRegular text-base text-gray-800">{value || "Não informado"}</Text>
        </View>
    );
}

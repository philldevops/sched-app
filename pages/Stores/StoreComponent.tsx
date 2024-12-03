import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";

export default function StoreComponent({ route, navigation }: any) {
    const { store } = route.params || {};

    return (
        <View className="flex-1 items-center justify-center bg-white">
            <StatusBar style="auto" />
            <Text className="text-3xl font-bold mb-4 text-blue-700">{store.title}</Text>
            {/* Exibindo detalhes adicionais da loja, caso existam */}
            <View className="w-full px-5">
                {store.details ? (
                    <Text className="text-base text-center text-gray-700">{store.details}</Text>
                ) : (
                    <Text className="text-base text-center text-gray-500">Detalhes não disponíveis.</Text>
                )}
            </View>
        </View>
    );
}

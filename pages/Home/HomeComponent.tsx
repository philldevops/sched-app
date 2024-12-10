import { Text, TouchableOpacity, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import Constants from "expo-constants";
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function HomeComponent({ navigation }: any) {
    return (
        <View className="flex-1 bg-white" style={{ paddingTop: Constants.statusBarHeight }}>
            <StatusBar style="auto" />

            {/* Cabeçalho */}
            <View className="items-center my-4">w
                <Text className="font-OutfitBold text-2xl text-gray-800">Bem-vindo!</Text>
                <Text className="font-OutfitRegular text-lg text-gray-500">
                    Agende com facilidade e evite filas
                </Text>
            </View>

            {/* Botões de ação */}
            <View className="flex-1 px-4 justify-start gap-4">
                {/* Botão: Meus Agendamentos */}
                <LinearGradient
                    colors={['#3b82f6', '#2563eb', '#1e40af']}
                    start={{ x: 1, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    className="p-4 rounded-2xl"
                >
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Scheds')}
                        className="flex-row items-center gap-4"
                    >
                        <MaterialCommunityIcons name="calendar-check" size={32} color="white" />
                        <Text className="font-OutfitMedium text-white text-lg">
                            Meus Agendamentos
                        </Text>
                    </TouchableOpacity>
                </LinearGradient>

                {/* Botão: Novo Agendamento */}
                <LinearGradient
                    colors={['#34d399', '#10b981', '#047857']}
                    start={{ x: 1, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    className="p-4 rounded-2xl"
                >
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Pesquisar')}
                        className="flex-row items-center gap-4"
                    >
                        <MaterialCommunityIcons name="calendar-plus" size={32} color="white" />
                        <Text className="font-OutfitMedium text-white text-lg">
                            Novo Agendamento
                        </Text>
                    </TouchableOpacity>
                </LinearGradient>

                {/* Botão: Ajuda */}
                <LinearGradient
                    colors={['#f59e0b', '#d97706', '#b45309']}
                    start={{ x: 1, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    className="p-4 rounded-2xl"
                >
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Help')}
                        className="flex-row items-center gap-4"
                    >
                        <MaterialCommunityIcons name="help-circle" size={32} color="white" />
                        <Text className="font-OutfitMedium text-white text-lg">
                            Ajuda
                        </Text>
                    </TouchableOpacity>
                </LinearGradient>
            </View>

            {/* Rodapé */}
            <View className="items-center my-4">
                <Text className="font-OutfitRegular text-gray-400">
                    © 2024 Seu App de Agendamento
                </Text>
            </View>
        </View>
    );
}
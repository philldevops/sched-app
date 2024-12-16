import { View, Text, ScrollView, Button, Image, TouchableOpacity } from "react-native";
import { useAuth, useUser } from '@clerk/clerk-expo'
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";

export default function ProfileComponent({ route, navigation }: any) {
    const { signOut } = useAuth();
    const { user } = useUser();

    return (
        <View className="flex-1 bg-white" style={{ paddingTop: Constants.statusBarHeight }}>
            <StatusBar style="auto" />
            <ScrollView>
                <View className="border-b border-gray-300 flex-row gap-3 p-3 justify-start items-center">
                    <Image
                        source={{
                            uri: user?.imageUrl,
                        }}
                        height={48}
                        width={48}
                        className="rounded-full"
                    />
                    <View className="self-center top-1">
                        <Text className="font-OutfitBold text-lg">{user?.fullName}</Text>
                        <Text className="font-OutfitMedium top-[-5] text-lg">{user?.emailAddresses.map((e) => e.emailAddress)}</Text>
                    </View>
                </View>
            </ScrollView>
            <TouchableOpacity className="p-4 bg-blue-500" onPress={() => signOut()}>
                <Text className="font-OutfitMedium text-lg text-center text-white">Sair da Conta</Text>
            </TouchableOpacity>
        </View>
    )
}
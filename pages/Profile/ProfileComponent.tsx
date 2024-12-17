import { View, Text, ScrollView, Button, Image, TouchableOpacity } from "react-native";
import { useAuth, useUser } from '@clerk/clerk-expo'
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import * as ImagePicker from 'expo-image-picker'
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function ProfileComponent({ route, navigation }: any) {
    const { signOut } = useAuth();
    const { user } = useUser();
    const metaData: any = user?.unsafeMetadata as {};


    async function onPickImage() {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 4],
                quality: 0.1,
                base64: true,
            });

            if (!result.canceled && result.assets[0].base64) {
                const base64 = result.assets[0].base64;
                const mimeType = result.assets[0].mimeType;

                const image = `data:${mimeType};base64,${base64}`;

                await user?.setProfileImage({
                    file: image,
                });
            }
        } catch (err: any) {
            alert(err.errors[0].message);
        }
    }

    return (
        <View className="flex-1 bg-white px-6" style={{ paddingTop: Constants.statusBarHeight }}>
            <StatusBar style="auto" />
            <ScrollView>
                <View className="border-b border-gray-100 flex-row gap-5 p-3 px-0 justify-start items-center">
                    <TouchableOpacity onPress={onPickImage}>
                        <Image
                            source={{
                                uri: user?.imageUrl,
                            }}
                            height={48}
                            width={48}
                            className="rounded-full"
                        />
                    </TouchableOpacity>
                    <View className="self-center">
                        <Text className="font-OutfitSemiBold text-lg capitalize">{user?.fullName ?? 'Usuário'}</Text>
                        <Text className="font-OutfitRegular top-[-5] text-base">{user?.emailAddresses.map((e) => e.emailAddress)}</Text>
                        {metaData?.phoneNumber && (<Text className="font-OutfitRegular top-[-5] text-base">{metaData?.phoneNumber}</Text>)}
                    </View>
                </View>
            </ScrollView>
            <TouchableOpacity
                focusable={false}
                onPress={() =>
                    signOut()
                }
                className="flex-row items-center justify-between px-4 py-2 bg-orange-100 border border-orange-200 rounded-lg my-6"
            >
                <View className="flex-1">
                    <Text className="text-gray-600 text-base font-OutfitBold">
                        Sair da Conta
                    </Text>
                    <Text className="text-gray-600 font-OutfitRegular text-sm mt-1">
                        Faz o logout e retorna à tela de login
                    </Text>
                </View>
                <MaterialCommunityIcons
                    name="chevron-right"
                    size={28}
                    color="orange"
                />
            </TouchableOpacity>
        </View>
    )
}
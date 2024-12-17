import { View, Text, ScrollView, Button, Image, TouchableOpacity } from "react-native";
import { useAuth, useUser } from '@clerk/clerk-expo'
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import * as ImagePicker from 'expo-image-picker'
import { capitalize } from "../../routes/routes";

export default function ProfileComponent({ route, navigation }: any) {
    const { signOut } = useAuth();
    const { user } = useUser();
    const metaData: any = user?.publicMetadata as {};


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
        <View className="flex-1 bg-white" style={{ paddingTop: Constants.statusBarHeight }}>
            <StatusBar style="auto" />
            <ScrollView>
                <View className="border-b border-gray-300 flex-row gap-5 p-3 justify-start items-center">
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
                    <View className="self-center top-1">
                        <Text className="font-OutfitBold text-lg">{capitalize(user?.fullName as string) ?? 'Usuário'}</Text>
                        <Text className="font-OutfitMedium top-[-5] text-lg">{user?.emailAddresses.map((e) => e.emailAddress)}</Text>
                        <Text className="font-OutfitRegular top-[-5] text-base">Contato: {metaData?.phone}</Text>
                        <Text className="font-OutfitRegular top-[-5] text-base">Sexo: {metaData?.gender}</Text>
                    </View>
                </View>
            </ScrollView>
            <TouchableOpacity className="p-4 bg-blue-500" onPress={() => signOut()}>
                <Text className="font-OutfitMedium text-lg text-center text-white">Sair da Conta</Text>
            </TouchableOpacity>
        </View>
    )
}
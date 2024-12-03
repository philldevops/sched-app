import { Text, View } from "react-native";
import { Button } from '@react-navigation/elements';
import { StatusBar } from "expo-status-bar";


export default function HomeComponent({ route, navigation }: any) {
    return (
        <View className="flex-1 items-center justify-center bg-red-600">
            <StatusBar style="auto" />
            <Text className="text-white text-3xl">Test!</Text>
            <Button color="white" onPress={() => navigation.navigate('Categories')}>
                Go Categories
            </Button>
        </View>
    )
}
import { Text, View, TextInput, TouchableOpacity, FlatList, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { DATA } from "../../assets/trash";

export default function CategoriesComponent({ navigation }: any) {
    const [isblur, setIsBlur] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState<string>("");

    const filterData = () => {
        if (searchValue.trim().length < 3) {
            Alert.alert("Atenção", "Informe ao menos três caracteres.");
            return;
        }

        const filteredData = DATA.reduce((acc: any, category) => {
            const filteredSubItems = category.subItens.filter(subItem =>
                subItem.title.toLowerCase().includes(searchValue.toLowerCase())
            );
            if (
                category.title.toLowerCase().includes(searchValue.toLowerCase()) ||
                filteredSubItems.length > 0
            ) {
                acc.push({ ...category, subItens: filteredSubItems });
            }
            return acc;
        }, []);

        navigation.navigate("SearchResult", { data: filteredData });
    };

    const Item = ({ title, id }: { title: string, id: string | any }) => (
        <TouchableOpacity
            className="bg-gray-100 rounded-xl flex-1 flex-row h-[70px] justify-between items-center px-4"
            onPress={() =>
                navigation.navigate("SearchResult", {
                    data: DATA.filter(item => item.title.toLowerCase().includes(title.toLowerCase())),
                })
            }
        >
            <Text className="text-center font-OutfitMedium text-lg text-gray-700">{title}</Text>
            <View className="left-1">
                <MaterialCommunityIcons
                    name="chevron-right"
                    size={23}
                    color="#3b82f6"
                />
            </View>
        </TouchableOpacity>
    );

    return (
        <View className="flex-1 bg-white" style={{ paddingTop: Constants.statusBarHeight }}>
            <StatusBar style="auto" />

            {/* Cabeçalho */}
            <View className="w-full px-4 mb-4">
                <Text className="font-OutfitBold text-2xl text-gray-800">Categorias</Text>
                {/* <Text className="font-OutfitRegular text-lg text-gray-500 mt-1">
                    Encontre o que você precisa de forma rápida e fácil.
                </Text> */}
            </View>

            {/* Barra de Pesquisa */}
            <View className="w-full px-4 mb-4">
                <View className="relative">
                    <TextInput
                        onEndEditing={() => setIsBlur(false)}
                        onFocus={() => setIsBlur(true)}
                        autoFocus={true}
                        onChangeText={text => setSearchValue(text)}
                        onSubmitEditing={filterData}
                        value={searchValue}
                        className={`rounded-full w-full border p-3 pl-4 font-OutfitSemiBold text-gray-900 ${isblur ? "border-blue-600" : "border-gray-200"}`}
                        placeholder="Pesquise aqui"
                        placeholderTextColor="#2563eb"
                    />
                    <View className="absolute top-[10] right-3">
                        <TouchableOpacity
                            disabled={searchValue.trim().length < 3}
                            onPress={filterData}
                        >
                            <MaterialCommunityIcons
                                name="text-box-search-outline"
                                size={25}
                                color={isblur ? "#2563eb" : "#999"}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {/* Instrução */}
            <Text className="font-OutfitMedium text-base text-gray-700 py-3 text-center">
                Pesquise uma área ou escolha uma categoria abaixo:
            </Text>

            {/* Lista de Categorias */}
            <FlatList
                data={DATA}
                renderItem={({ item }) => <Item title={item.title} id={item.id} />}
                keyExtractor={item => item.id.toString()}
                numColumns={2}
                columnWrapperStyle={{
                    justifyContent: "space-between",
                    marginVertical: 2,
                    marginHorizontal: 10,
                    gap: 6,
                }}
                contentContainerStyle={{
                    paddingHorizontal: 2,
                    gap: 3,
                }}
            />
        </View>
    );
}

import { Text, View, TextInput, TouchableOpacity, FlatList, Alert, Image, ActivityIndicator } from "react-native";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import { useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
// import { DATA } from "../../assets/trash";
import axios from "axios";

const FindNextStores = ({ navigation }: any) => {
    return (
        <View className="bg-blue-500 rounded-2xl p-4 flex-row items-center relative m-3">
            <View className="flex-1 max-w-[70%]">
                <Text className="text-white text-start text-xl font-OutfitBold mb-3">
                    Pesquise ou escolha uma categoria abaixo:
                </Text>
            </View>
            <Image
                source={require('../../assets/male.png')}
                className="w-40 h-40 ml-2 absolute right-5 bottom-0"
                resizeMode="cover"
            />
        </View>
    );
};

export default function CategoriesComponent({ navigation }: any) {
    const [isblur, setIsBlur] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState<string>("");
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const filterData = () => {
        if (searchValue.trim().length < 3) {
            Alert.alert("Atenção", "Informe ao menos três caracteres.");
            return;
        }

        if (!data) return;

        const filteredData = data.reduce((acc: any, category: any) => {
            const filteredSubItems = category.subItens.filter((subItem: { title: string; }) =>
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

    const Item = ({ title, id }: { title: string | any, id: string | any }) => (
        <TouchableOpacity
            className="bg-[#fff] shadow-gray-300 border-l-4 border-blue-500 rounded-xl flex-1 max-w-[50%] flex-row h-[70px] justify-between items-center px-4"
            style={{ elevation: 5 }}
            onPress={() =>
                navigation.navigate("SearchResult", {
                    data: data.filter((item) => item.title.toLowerCase().includes(title.toLowerCase())),
                })
            }
        >
            <Text className="text-start font-OutfitMedium text-lg text-gray-700">{title}</Text>
            <View className="left-1">
                <MaterialCommunityIcons
                    name="chevron-right"
                    size={23}
                    color="#3b82f6"
                />
            </View>
        </TouchableOpacity>
    );

    const getData = async () => {
        try {
            setIsLoading(true)
            const { data }: any = await axios.get(`http://10.19.30.33:3000/vacancies/`, {})

            if (data) {
                setIsLoading(false)
                setData(data)
            }

        } catch (error) {
            setIsLoading(false)
            console.log(error)
        }
    }

    useEffect(() => {
        getData();
        return () => { }
    }, [])

    return (
        <View className="flex-1 bg-[#f6f8fe]" style={{ paddingTop: Constants.statusBarHeight * 1.3 }}>
            <StatusBar style="auto" />

            {isLoading ? (
                <View className="items-center justify-center flex-auto">
                    <ActivityIndicator size={22} color={'#3b82f6'} />
                </View>
            ) : (
                <>
                    <FindNextStores />
                    <View className="py-4 pt-0 mx-3 rounded-[22px]">
                        {/* Barra de Pesquisa */}
                        <View className="">
                            <View className="relative">
                                <TextInput
                                    onEndEditing={() => setIsBlur(false)}
                                    onFocus={() => setIsBlur(true)}
                                    autoFocus={true}
                                    onChangeText={text => setSearchValue(text)}
                                    onSubmitEditing={filterData}
                                    value={searchValue}
                                    className={`rounded-lg w-full p-4 pl-4 text-lg text-[#666jhvv] font-OutfitMedium border-l-4 border-orange-500 bg-[#fff] shadow-gray-300`}
                                    style={{ elevation: 50 }}
                                    placeholder="Pesquise aqui"
                                    placeholderTextColor="#333"
                                />
                                <View className="absolute bottom-4 right-3">
                                    <TouchableOpacity
                                        disabled={searchValue.trim().length < 3}
                                        onPress={filterData}
                                    >
                                        <MaterialCommunityIcons
                                            name="text-box-search-outline"
                                            size={32}
                                            color={"#f97316"}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* Lista de Categorias */}
                    <View className="w-full m-4">
                        <Text className="font-OutfitBold text-2xl text-gray-900">Categorias</Text>
                    </View>
                    <FlatList
                        data={data}
                        renderItem={({ item }: any) => <Item title={item.title} id={item.id} />}
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
                </>
            )}
        </View>
    );
}

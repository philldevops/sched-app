import { Text, View, TextInput, TouchableOpacity, FlatList, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function CategoriesComponent({ route, navigation }: any) {
    const [isblur, setIsBlur] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState<string>("");

    const DATA = [
        {
            id: 78,
            title: "Saúde",
            subItens: [
                {
                    id: 209,
                    title: "Clínica Biama",
                    details: [
                        {
                            address: "Rua das Flores, 123 - Centro",
                            email: "contato@biama.com",
                            phone: "(11) 98765-4321",
                            expedient: "Seg a Sex: 8h às 18h",
                            slug: "Clínica Biama",
                            isScheduling: 1,
                            scheduleOptions: [
                                {
                                    speciality: "Clínica Geral",
                                    availableSlots: [
                                        { date: "2024-12-02", times: ["Manhã", "Tarde"] },
                                        { date: "2024-12-09", times: ["Manhã"] },
                                    ],
                                },
                                {
                                    speciality: "Pediatria",
                                    availableSlots: [
                                        { date: "2024-12-03", times: ["Tarde"] },
                                        { date: "2024-12-10", times: ["Manhã", "Tarde"] },
                                    ],
                                },
                                {
                                    speciality: "Cardiologia",
                                    availableSlots: [
                                        { date: "2024-12-11", times: ["Manhã"] },
                                    ],
                                },
                                {
                                    speciality: "Dermatologia",
                                    availableSlots: [
                                        { date: "2024-12-27", times: ["Tarde"] },
                                    ],
                                },
                            ],
                        },
                    ],
                },
                {
                    id: 210,
                    title: "BabyLab",
                    details: [
                        {
                            address: "Av. Paulista, 456 - Bela Vista",
                            email: "contato@babylab.com",
                            phone: "(11) 99876-5432",
                            expedient: "Seg a Sab: 9h às 17h",
                            slug: "BabyLab",
                            isScheduling: 1,
                            scheduleOptions: [
                                {
                                    speciality: "Pediatria",
                                    availableSlots: [
                                        { date: "2024-12-02", times: ["Manhã", "Tarde"] },
                                        { date: "2024-12-03", times: ["Tarde"] },
                                    ],
                                },
                                {
                                    speciality: "Neonatologia",
                                    availableSlots: [
                                        { date: "2024-12-09", times: ["Manhã"] },
                                    ],
                                },
                                {
                                    speciality: "Testes Laboratoriais Infantis",
                                    availableSlots: [
                                        { date: "2024-12-10", times: ["Tarde"] },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            id: 10,
            title: 'Estética',
            subItens: [
                {
                    id: 509,
                    title: 'Clínica Fernanda',
                    details: [{
                        address: 'Rua Bela, 11 - Jardim',
                        email: 'contato@fernanda.com',
                        phone: '(21) 97654-3210',
                        expedient: 'Seg a Sex: 9h às 18h',
                        slug: 'Clínica Fernanda',
                        isScheduling: 1,
                        scheduleOptions: [
                            {
                                speciality: "Dermatologia Estética",
                                availableSlots: [
                                    { date: "2024-12-02", times: ["Manhã", "Tarde"] },
                                    { date: "2024-12-09", times: ["Manhã"] },
                                ],
                            },
                            {
                                speciality: "Limpeza de Pele",
                                availableSlots: [
                                    { date: "2024-12-03", times: ["Tarde"] },
                                    { date: "2024-12-10", times: ["Manhã", "Tarde"] },
                                ],
                            },
                            {
                                speciality: "Aplicação de Botox",
                                availableSlots: [
                                    { date: "2024-12-11", times: ["Manhã"] },
                                ],
                            },
                            {
                                speciality: "Tratamentos Anti-idade",
                                availableSlots: [
                                    { date: "2024-12-27", times: ["Tarde"] },
                                ],
                            },
                        ],
                    }]
                },
                {
                    id: 510,
                    title: 'Clínica LuxLab',
                    details: [{
                        address: 'Av. Lux, 234 - Centro',
                        email: 'contato@luxlab.com',
                        phone: '(21) 99876-2109',
                        expedient: 'Seg a Sab: 10h às 20h',
                        slug: 'Clínica LuxLab',
                        isScheduling: 1,
                        scheduleOptions: [
                            {
                                speciality: "Procedimentos a Laser",
                                availableSlots: [
                                    { date: "2024-12-02", times: ["Manhã", "Tarde"] },
                                    { date: "2024-12-09", times: ["Manhã"] },
                                ],
                            },
                            {
                                speciality: "Rejuvenescimento Facial",
                                availableSlots: [
                                    { date: "2024-12-03", times: ["Tarde"] },
                                    { date: "2024-12-10", times: ["Manhã", "Tarde"] },
                                ],
                            },
                            {
                                speciality: "Microagulhamento",
                                availableSlots: [
                                    { date: "2024-12-11", times: ["Manhã"] },
                                ],
                            },
                            {
                                speciality: "Peelings Químicos",
                                availableSlots: [
                                    { date: "2024-12-27", times: ["Tarde"] },
                                ],
                            },
                        ],
                    }]
                },
            ]
        }
    ];

    const filterData = () => {
        if (searchValue.trim().length < 3) {
            Alert.alert("Atenção", "Informe ao menos três caracteres.");
            return;
        }

        const filteredData = DATA.reduce((acc: any, category) => {
            const filteredSubItems = category.subItens.filter(subItem =>
                subItem.title.toLowerCase().includes(searchValue.toLowerCase())
            );
            // Verifica se houve resultados nos subitens ou no título da categoria
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

    type ItemProps = { title: string, id: string | any };

    const Item = ({ title, id }: ItemProps) => (
        <TouchableOpacity
            className="bg-gray-100 rounded-xl h-[70px] w-1/2 flex-1 items-center justify-center"
            onPress={() =>
                navigation.navigate("SearchResult", {
                    data: DATA.filter(item => item.title.toLowerCase().includes(title.toLowerCase())),
                })
            }
        >
            <Text className="text-center font-OutfitMedium text-xl text-blue-700">{title}</Text>
        </TouchableOpacity>
    );

    return (
        <View
            className="flex-1 bg-white"
            style={{ paddingTop: Constants.statusBarHeight }}
        >
            <StatusBar style="auto" />
            <View className="w-full px-3">
                <View className="relative">
                    <TextInput
                        onEndEditing={() => setIsBlur(false)}
                        onFocus={() => setIsBlur(true)}
                        autoFocus={true}
                        onChangeText={text => setSearchValue(text)}
                        onSubmitEditing={filterData}
                        value={searchValue}
                        className={`rounded-full w-full border p-3 pl-4 font-OutfitSemiBold text-gray-900 ${isblur ? "border-blue-600" : "border-gray-200"
                            }`}
                        placeholder="Pesquise aqui"
                        keyboardType="default"
                        placeholderTextColor={"#2563eb"}
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
                <Text className="font-OutfitMedium text-lg text-gray-700 py-3 text-center">
                    Pesquise uma área acima ou escolha uma categoria abaixo:
                </Text>
                <FlatList
                    data={DATA}
                    renderItem={({ item }) => <Item title={item.title} id={item.id} />}
                    keyExtractor={item => item.id.toString()}
                    numColumns={2}
                    columnWrapperStyle={{
                        justifyContent: "space-between",
                        marginVertical: 2,
                        gap: 6,
                    }}
                    contentContainerStyle={{
                        paddingHorizontal: 2,
                        gap: 3,
                    }}
                />
            </View>
        </View>
    );
}

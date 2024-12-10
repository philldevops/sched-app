import { Text, View, TextInput, TouchableOpacity, FlatList, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import { useState, useEffect, useCallback } from "react";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from "expo-linear-gradient";

export default function SearchResultComponent({ route, navigation }: any) {
    const { data } = route.params || { data: [] };

    const renderSubItems = (subItens: Array<any>) => {
        return (
            <FlatList
                data={subItens}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Pesquisar', {
                            screen: 'SearchResultStore',
                            params: {
                                store: item
                            }
                        })}
                        className={"border-b py-3 px-4 left-1 border-blue-50 flex-row flex w-full max-w-[99%] justify-between items-center"}>
                        <Text className="text-gray-800 text-lg font-OutfitMedium text-start">{item.title}</Text>
                        <MaterialCommunityIcons
                            name="chevron-right"
                            size={32}
                            color={"#888"}
                        />
                    </TouchableOpacity>
                )}
                keyExtractor={item => item.id.toString()}
            />
        );
    };

    return (
        <View className="flex-1 bg-white">
            <StatusBar style="auto" />
            <View className="w-full flex-1">
                {data.length > 0 ? (
                    data.map((category: any) => (
                        <View key={category.id} className="">
                            <LinearGradient
                                colors={['#3b82f6', '#2563eb', '#1e40af']}
                                start={{ x: 1, y: 0 }}
                                end={{ x: 0, y: 1 }}
                                className="p-2 rounded-0"
                            >
                                <Text className="font-OutfitMedium uppercase text-lg text-white text-start px-5 py-3">
                                    {category.title}
                                </Text>
                            </LinearGradient>
                            {renderSubItems(category.subItens)}
                        </View>
                    ))
                ) : (
                    <Text className="font-OutfitMedium text-lg text-gray-700 py-3 text-center">
                        Nenhum resultado encontrado.
                    </Text>
                )}
            </View>
        </View>
    );
}

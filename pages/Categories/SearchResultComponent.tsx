import { Text, View, TextInput, TouchableOpacity, FlatList, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import { useState, useEffect, useCallback } from "react";
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function SearchResultComponent({ route, navigation }: any) {
    const { data } = route.params || { data: [] };

    const renderSubItems = (subItens: Array<any>) => {
        return (
            <FlatList
                data={subItens}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Categories', {
                            screen: 'SearchResultStore',
                            params: {
                                store: item
                            }
                        })}
                        className={"border-b py-3 px-5 border-blue-50 flex-row flex w-full max-w-[99%] justify-between"}>
                        <Text className="text-gray-800 font-OutfitMedium text-start uppercase">{item.title}</Text>
                        <MaterialCommunityIcons
                            name="message-arrow-right-outline"
                            size={20}
                            color={"#1d4ed8"}
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
                            <Text className="font-OutfitMedium uppercase text-lg text-blue-700 text-start px-5 py-3 bg-blue-50">
                                {category.title}
                            </Text>
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

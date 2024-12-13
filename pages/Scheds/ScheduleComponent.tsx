import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Alert, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function ScheduleComponent({ route, navigation }: any) {
    return (
        <View>
            <Text>{route.name}</Text>
        </View>
    )
}
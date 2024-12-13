import * as React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { AppState, TouchableOpacity, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CategoriesComponent from '../pages/Categories/CategoriesComponent';
import HomeComponent from '../pages/Home/HomeComponent';
import SearchResultComponent from '../pages/Categories/SearchResultComponent';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getFocusedRouteNameFromRoute, useNavigation } from '@react-navigation/native';
import StoreComponent from '../pages/Stores/StoreComponent';
import SearchResultStoreComponent from '../pages/Categories/SearchResultStoreComponent';
import SchedulingComponent from '../pages/Scheds/SchedulingComponent';
import SchedsComponent from '../pages/Scheds/SchedsComponent';
import ScheduleComponent from '../pages/Scheds/ScheduleComponent';

const HIDDEN_ROUTES: any[] = [];

const Tab = createBottomTabNavigator();

const CategoryStack = createNativeStackNavigator();
const SchedsStack = createNativeStackNavigator();

const CategoryStackScreen = React.memo(({ }: any) => (
    <CategoryStack.Navigator screenOptions={{
        headerShown: false,
    }}>
        <CategoryStack.Screen name="CategoriesScreen" options={{
            headerShown: false,
        }}>
            {(props) => (
                <CategoriesComponent {...props} />
            )}
        </CategoryStack.Screen>
        <CategoryStack.Screen name="SearchResult" options={{
            headerShown: true,
            headerTitle: 'Resultados encontrados',
            headerTitleStyle: {
                fontFamily: 'Outfit-SemiBold',
                fontSize: 18,
            },
            //headerShadowVisible: false,
            headerTitleAlign: 'left',
            headerStyle: {
                backgroundColor: '#fff',
            },
            headerTintColor: '#374151',
        }}>
            {(props) => (
                <SearchResultComponent {...props} />
            )}
        </CategoryStack.Screen>
        <CategoryStack.Screen name="SearchResultStore" options={{
            headerShown: true,
            headerTitle: 'Dados da Loja',
            headerTitleStyle: {
                fontFamily: 'Outfit-SemiBold',
                fontSize: 18,
            },
            //headerShadowVisible: false,
            headerTitleAlign: 'left',
            headerStyle: {
                backgroundColor: '#fff',
            },
            headerTintColor: '#374151',
        }}>
            {(props) => (
                <SearchResultStoreComponent {...props} />
            )}
        </CategoryStack.Screen>
        <CategoryStack.Screen name="ScheduleScreen" options={{
            headerShown: true,
            headerTitle: 'Agendamento',
            headerTitleStyle: {
                fontFamily: 'Outfit-SemiBold',
                fontSize: 18,
            },
            //headerShadowVisible: false,
            headerTitleAlign: 'left',
            headerStyle: {
                backgroundColor: '#fff',
            },
            headerTintColor: '#374151',
        }}>
            {(props) => (
                <SchedulingComponent {...props} />
            )}
        </CategoryStack.Screen>
        {/* <CategoryStack.Screen name="ScheduleOnCategoryDetails" options={{
            headerTitle: 'Detalhes do Agendamento',
            headerShown: true,
            headerTitleStyle: {
                fontFamily: 'Outfit-SemiBold',
                fontSize: 20,
            },
            headerTitleAlign: 'left',
            headerStyle: {
                backgroundColor: '#fff',
            },
            headerTintColor: '#374151',
        }}>
            {(props) => (
                <ScheduleComponent {...props} />
            )}
        </CategoryStack.Screen> */}
    </CategoryStack.Navigator >
));

const SchedsStackScreen = React.memo(({ navigation }: any) => (
    <SchedsStack.Navigator screenOptions={{
        //headerShown: false,
    }}>
        <SchedsStack.Screen
            name="SchedsScreen"
            options={{
                headerTitle: 'Meus Agendamentos',
                headerShown: true,
                headerTitleStyle: {
                    fontFamily: 'Outfit-SemiBold',
                    fontSize: 20,
                },
                headerTitleAlign: 'left',
                headerStyle: {
                    backgroundColor: '#fff',
                },
                headerTintColor: '#374151',
                headerLeft: () => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Home')}
                        style={{ marginRight: 35 }} // Adicionando margem à esquerda
                    >
                        <MaterialCommunityIcons name="arrow-left" size={22} color="#333" />
                    </TouchableOpacity>
                ),
            }}>
            {(props) => (
                <SchedsComponent {...props} />
            )}
        </SchedsStack.Screen>
        <SchedsStack.Screen name="ScheduleDetails" options={{
            headerTitle: 'Detalhes do Agendamento',
            headerShown: true,
            headerTitleStyle: {
                fontFamily: 'Outfit-SemiBold',
                fontSize: 20,
            },
            headerTitleAlign: 'left',
            headerStyle: {
                backgroundColor: '#fff',
            },
            headerTintColor: '#374151',
        }}>
            {(props) => (
                <ScheduleComponent {...props} />
            )}
        </SchedsStack.Screen>
    </SchedsStack.Navigator >
));

export function MainTabs() {
    const navigation = useNavigation();
    const appState = useRef(AppState.currentState);
    const [appStateVisible, setAppStateVisible] = useState(appState.current);

    useEffect(() => {
        const subscription = AppState.addEventListener("change", (nextAppState) => {
            if (
                appState.current.match(/inactive|background/) &&
                nextAppState === "active"
            ) {
                console.log("App has come to the foreground!");
            }

            appState.current = nextAppState;
            setAppStateVisible(appState.current);

            console.log("AppState", appState.current); //ou appStateVisible
        });

        return () => {
            subscription.remove();
        };
    }, []);

    const [fontsLoaded] = useFonts({
        "Roboto-Medium": require("../assets/fonts/Roboto-Medium.ttf"),
        "Roboto-Light": require("../assets/fonts/Roboto-Light.ttf"),
        "Roboto-Bold": require("../assets/fonts/Roboto-Bold.ttf"),
        "Outfit-Black": require("../assets/fonts/Outfit-Black.ttf"),
        "Outfit-Bold": require("../assets/fonts/Outfit-Bold.ttf"),
        "Outfit-ExtraBold": require("../assets/fonts/Outfit-ExtraBold.ttf"),
        "Outfit-ExtraLight": require("../assets/fonts/Outfit-ExtraLight.ttf"),
        "Outfit-Light": require("../assets/fonts/Outfit-Light.ttf"),
        "Outfit-Medium": require("../assets/fonts/Outfit-Medium.ttf"),
        "Outfit-Regular": require("../assets/fonts/Outfit-Regular.ttf"),
        "Outfit-SemiBold": require("../assets/fonts/Outfit-SemiBold.ttf"),
        "Outfit-Thin": require("../assets/fonts/Outfit-Thin.ttf")
    });

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    return (
        <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
            <Tab.Navigator
                screenOptions={({ navigation, route }) => ({
                    //headerShown: HIDDEN_ROUTES.includes(getFocusedRouteNameFromRoute(route)) ? false : true,
                    tabBarStyle: [
                        {
                            height: 65,
                            paddingTop: 4,
                            paddingBottom: 8,
                            elevation: 0,
                            display: HIDDEN_ROUTES.includes(getFocusedRouteNameFromRoute(route)) ? "none" : "flex",
                        },
                        null,
                    ],
                    tabBarLabelStyle: {
                        fontFamily: "Outfit-Medium",
                        fontSize: 13,
                        //paddingBottom: 3,
                    },
                    tabBarActiveTintColor: "#2563eb",
                    tabBarInactiveTintColor: "#665",
                    tabBarHideOnKeyboard: true,
                    headerShadowVisible: false,
                })}>
                <Tab.Screen
                    name="Home"
                    component={HomeComponent}
                    options={{
                        tabBarLabel: 'Home', headerShown: false, tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="home-circle-outline" color={color} size={26} />
                        )
                    }}
                />
                <Tab.Screen name="Pesquisar" options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="calendar-account-outline" color={color} size={26} />
                    ),
                }}>
                    {() => <CategoryStackScreen />}
                </Tab.Screen>
                <Tab.Screen name="Scheds" options={{
                    headerShown: false,
                    tabBarItemStyle: { display: "none" },
                    tabBarStyle: {
                        display: "none"
                    },
                    tabBarIcon: () => null
                }}>
                    {() => <SchedsStackScreen navigation={navigation} />}
                </Tab.Screen>
            </Tab.Navigator>
        </View>
    );
}
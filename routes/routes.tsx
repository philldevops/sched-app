import * as React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { AppState, TouchableOpacity, View, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CategoriesComponent from '../pages/Categories/CategoriesComponent';
import HomeComponent from '../pages/Home/HomeComponent';
import SearchResultComponent from '../pages/Categories/SearchResultComponent';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getFocusedRouteNameFromRoute, useNavigation } from '@react-navigation/native';
import SearchResultStoreComponent from '../pages/Categories/SearchResultStoreComponent';
import SchedulingComponent from '../pages/Scheds/SchedulingComponent';
import SchedsComponent from '../pages/Scheds/SchedsComponent';
import ScheduleComponent from '../pages/Scheds/ScheduleComponent';
import LoginComponent from '../pages/Auth/LoginComponent';
import RegisterComponent from '../pages/Auth/RegisterComponent';
import ForgotPassComponent from '../pages/Auth/ForgotPassComponent';
import { useUser } from '@clerk/clerk-expo';
import ProfileComponent from '../pages/Profile/ProfileComponent';

const HIDDEN_ROUTES: any[] = [];

const Tab = createBottomTabNavigator();

const CategoryStack = createNativeStackNavigator();
const SchedsStack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();

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
    </CategoryStack.Navigator >
));

const SchedsStackScreen = React.memo(({ navigation }: any) => (
    <SchedsStack.Navigator screenOptions={{
        //headerShown: false,
    }}>
        <SchedsStack.Screen
            name="SchedsScreen"
            options={{
                headerShown: false,
                // headerTitle: 'Meus Agendamentos',
                // headerTitleStyle: {
                //     fontFamily: 'Outfit-SemiBold',
                //     fontSize: 20,
                // },
                // headerTitleAlign: 'left',
                // headerStyle: {
                //     backgroundColor: '#fff',
                // },
                // headerTintColor: '#374151',
                // headerLeft: () => (
                //     <TouchableOpacity
                //         onPress={() => navigation.navigate('Home')}
                //         style={{ marginRight: 35 }} // Adicionando margem à esquerda
                //     >
                //         <MaterialCommunityIcons name="arrow-left" size={22} color="#333" />
                //     </TouchableOpacity>
                // ),
            }}>
            {(props) => (
                <SchedsComponent {...props} />
            )}
        </SchedsStack.Screen>
        <SchedsStack.Screen name="ScheduleDetails" options={{
            headerTitle: 'Detalhes do Agendamento',
            headerShown: true,
            headerLeft: () => (
                <TouchableOpacity
                    onPress={() => navigation.navigate('SchedsScreen')}
                    style={{ marginRight: 35 }} // Adicionando margem à esquerda
                >
                    <MaterialCommunityIcons name="arrow-left" size={22} color="#333" />
                </TouchableOpacity>
            ),
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

const AuthStackScreen = React.memo(({ navigation }: any) => (
    <AuthStack.Navigator
        screenOptions={{
            // headerShown: false,
        }}
    >
        <AuthStack.Screen
            name="LoginScreen"
            options={{
                headerShown: false,
            }}
        >
            {(props) => <LoginComponent {...props} />}
        </AuthStack.Screen>
        <AuthStack.Screen
            name="RegisterScreen"
            options={{
                headerTitle: 'Cadastre-se',
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
            }}
        >
            {(props) => <RegisterComponent {...props} />}
        </AuthStack.Screen>
        <AuthStack.Screen
            name="ForgotScreen"
            options={{
                headerTitle: 'Redefinir Senha',
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
            }}
        >
            {(props) => <ForgotPassComponent {...props} />}
        </AuthStack.Screen>
    </AuthStack.Navigator>
));


// Função utilitária para capitalizar a primeira letra
export const capitalize = (str: string) => {
    if (!str) return ''; // Tratamento para strings vazias
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};



export function MainTabs() {
    const navigation = useNavigation();
    const appState = useRef(AppState.currentState);
    const [appStateVisible, setAppStateVisible] = useState(appState.current);
    const { isLoaded, isSignedIn, user } = useUser();


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
                            height: 70,
                            paddingTop: 6,
                            elevation: 50,
                            display: HIDDEN_ROUTES.includes(getFocusedRouteNameFromRoute(route)) ? "none" : "flex",
                            backgroundColor: '#fff'
                        },
                        null,
                    ],
                    tabBarLabelStyle: {
                        fontFamily: "Outfit-Regular",
                        fontSize: 13,
                        //paddingBottom: 3,
                    },
                    tabBarActiveTintColor: "#2563eb",
                    tabBarInactiveTintColor: "#665",
                    tabBarHideOnKeyboard: true,
                    headerShadowVisible: false,
                })}>
                {!isSignedIn || !user ? (
                    <Tab.Screen name="Auth" options={{
                        headerShown: false,
                        tabBarItemStyle: { display: "none" },
                        tabBarStyle: {
                            display: "none"
                        },
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="account-circle-outline" color={color} size={26} />
                        ),
                    }}>
                        {() => <AuthStackScreen user={user} isSignedIn={isSignedIn} />}
                    </Tab.Screen>
                ) : (
                    <>
                        <Tab.Screen
                            name="Home"
                            component={HomeComponent}
                            options={{
                                // title: "Início", //voce pode usar title ou tabBarLabel
                                tabBarLabel: 'Início',
                                headerShown: false,
                                tabBarIcon: ({ color, size }) => (
                                    <MaterialCommunityIcons name="home-circle-outline" color={color} size={26} />
                                )
                            }}
                        />
                        <Tab.Screen name="Pesquisar" options={{
                            headerShown: false,
                            tabBarIcon: ({ color, size }) => (
                                <MaterialCommunityIcons name="magnify" color={color} size={26} />
                            ),
                        }}>
                            {() => <CategoryStackScreen />}
                        </Tab.Screen>
                        <Tab.Screen name="Scheds" options={{
                            headerShown: false,
                            //tabBarItemStyle: { display: "none" },
                            // tabBarStyle: {
                            //     display: "none"
                            // },
                            title: "Agendamentos",
                            tabBarIcon: ({ color, size }) => (
                                <MaterialCommunityIcons name="calendar-check-outline" color={color} size={26} />
                            ),
                        }}>
                            {() => <SchedsStackScreen navigation={navigation} />}
                        </Tab.Screen>
                        <Tab.Screen
                            name="Profile"
                            component={ProfileComponent}
                            options={{
                                // title: "Início", //voce pode usar title ou tabBarLabel
                                tabBarLabel: capitalize(user?.firstName as string) ?? 'Perfil',
                                headerShown: false,
                                tabBarIcon: ({ color, size }) => (
                                    // <MaterialCommunityIcons name="face-man-outline" color={color} size={26} />
                                    <Image
                                        source={{
                                            uri: user?.imageUrl,
                                        }}
                                        height={26}
                                        width={26}
                                        style={{ borderRadius: 50 }}
                                    />
                                )
                            }}
                        />
                    </>
                )}
            </Tab.Navigator>
        </View>
    );
}
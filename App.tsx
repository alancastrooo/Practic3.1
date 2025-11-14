import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { StyledProvider } from "@gluestack-style/react";
import { config } from "@gluestack-ui/config";

// 🧩 Pantallas
import SplashScreen from "./screens/SplashScreen";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import SettingsScreen from "./screens/SettingsScreen";
import FormScreen from "./screens/FormScreen";
import DisplayScreen from "./screens/DisplayScreen"; // 👈 Nueva pantalla añadida

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const COLORS = ["#1565C0", "#8E24AA", "#2E7D32", "#E65100", "#C62828"];

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          const icons: any = {
            Inicio: "home",
            Perfil: "person",
            Ajustes: "settings",
          };
          return <Ionicons name={icons[route.name]} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#1565C0",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Inicio" component={HomeScreen} />
      <Tab.Screen name="Perfil" component={ProfileScreen} />
      <Tab.Screen name="Ajustes" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

// 🧭 Drawer personalizado
function CustomDrawerContent(props: any) {
  const { navigation, color, setColor } = props;
  return (
    <DrawerContentScrollView {...props}>
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>
          Alan Castro – 21151078
        </Text>
        <Text style={{ color: "#555", marginBottom: 12 }}>Menú principal</Text>
      </View>

      {/* ✅ Opciones del Drawer */}
      <DrawerItem
        label="Inicio"
        icon={() => <Ionicons name="home-outline" size={20} />}
        onPress={() => navigation.navigate("Tabs", { screen: "Inicio" })}
      />
      <DrawerItem
        label="Perfil"
        icon={() => <Ionicons name="person-outline" size={20} />}
        onPress={() => navigation.navigate("Tabs", { screen: "Perfil" })}
      />
      <DrawerItem
        label="Ajustes"
        icon={() => <Ionicons name="settings-outline" size={20} />}
        onPress={() => navigation.navigate("Tabs", { screen: "Ajustes" })}
      />
      <DrawerItem
        label="Formulario"
        icon={() => <Ionicons name="document-text-outline" size={20} />}
        onPress={() => navigation.navigate("Formulario")}
      />
      <DrawerItem
        label="Display"
        icon={() => <Ionicons name="albums-outline" size={20} />}
        onPress={() => navigation.navigate("Display")}
      />

      {/* 🎨 Selector de color de barra */}
      <View style={{ padding: 16, borderTopWidth: 1, borderColor: "#ddd" }}>
        <Text style={{ fontWeight: "bold", marginBottom: 8 }}>
          Color de la barra
        </Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {COLORS.map((c) => (
            <TouchableOpacity
              key={c}
              onPress={() => setColor(c)}
              style={{
                width: 30,
                height: 30,
                borderRadius: 15,
                backgroundColor: c,
                margin: 5,
                borderWidth: color === c ? 3 : 1,
                borderColor: color === c ? "#000" : "#ccc",
              }}
            />
          ))}
        </View>
      </View>
    </DrawerContentScrollView>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [headerColor, setHeaderColor] = useState("#1565C0");

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <SplashScreen />;
  if (!loggedIn) return <LoginScreen onLogin={() => setLoggedIn(true)} />;

  return (
    <GluestackUIProvider config={config}>
      <StyledProvider config={config}>
        <NavigationContainer>
          <Drawer.Navigator
            initialRouteName="Tabs"
            drawerContent={(props) => (
              <CustomDrawerContent
                {...props}
                color={headerColor}
                setColor={setHeaderColor}
              />
            )}
            screenOptions={{
              headerStyle: { backgroundColor: headerColor },
              headerTintColor: "#fff",
              headerTitle: () => (
                <Text
                  style={{
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: 16,
                  }}
                >
                  Alan Castro – 21151078
                </Text>
              ),
            }}
          >
            <Drawer.Screen
              name="Tabs"
              component={Tabs}
              options={{ title: "Menú principal" }}
            />
            <Drawer.Screen
              name="Formulario"
              component={FormScreen}
              options={{ title: "Formulario Gluestack" }}
            />
            <Drawer.Screen
              name="Display"
              component={DisplayScreen}
              options={{ title: "Pantalla Display" }}
            />
          </Drawer.Navigator>
        </NavigationContainer>
      </StyledProvider>
    </GluestackUIProvider>
  );
}

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

// CONTEXTOS
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { LanguageProvider, useLanguage } from "./context/LanguageContext";

// PANTALLAS
import SplashScreen from "./screens/SplashScreen";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import SettingsScreen from "./screens/SettingsScreen";
import FormScreen from "./screens/FormScreen";
import DisplayScreen from "./screens/DisplayScreen";
import Users from "./screens/UsersScreen";
import LanguageScreen from "./screens/LanguageScreen";

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const COLORS = ["#1565C0", "#8E24AA", "#2E7D32", "#E65100", "#C62828"];

// ----------------------------------------------------------
// 🟦 TRADUCCIONES GLOBALES
// ----------------------------------------------------------
const translations = {
  es: {
    home: "Inicio",
    profile: "Perfil",
    settings: "Ajustes",
    form: "Formulario",
    display: "Display",
    users: "Usuarios",
    languages: "Idiomas",
    mainMenu: "Menú principal",
    barColor: "Color de la barra",
    appTheme: "Tema de la App",
    changeLanguage: "Cambiar idioma",
  },
  en: {
    home: "Home",
    profile: "Profile",
    settings: "Settings",
    form: "Form",
    display: "Display",
    users: "Users",
    languages: "Languages",
    mainMenu: "Main menu",
    barColor: "Bar color",
    appTheme: "App theme",
    changeLanguage: "Change language",
  },
};

// ----------------------------------------------------------
//  🟩 TABS SIN WARNINGS + TIPADO CORRECTO
// ----------------------------------------------------------
type TabNames = "Home" | "Profile" | "Settings";

function Tabs({ color }: { color: string }) {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const isDark = theme === "dark";

  const tabBg = isDark ? "#202020" : "#FFFFFF";
  const borderColor = isDark ? "#2B2B2B" : "#E0E0E0";

  const labels: Record<TabNames, string> = {
    Home: translations[language].home,
    Profile: translations[language].profile,
    Settings: translations[language].settings,
  };

  const iconMap: Record<TabNames, keyof typeof Ionicons.glyphMap> = {
    Home: "home",
    Profile: "person",
    Settings: "settings",
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { backgroundColor: tabBg, borderTopColor: borderColor },
        tabBarActiveTintColor: isDark ? "#90CAF9" : color,
        tabBarInactiveTintColor: isDark ? "#BDBDBD" : "gray",

        // ICONOS ⬇ CORRECTAMENTE TIPADOS
        tabBarIcon: ({ size, color: iconColor }) => (
          <Ionicons name={iconMap[route.name as TabNames]} size={size} color={iconColor} />
        ),
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: labels.Home }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: labels.Profile }} />
      <Tab.Screen name="Settings" component={SettingsScreen} options={{ title: labels.Settings }} />
    </Tab.Navigator>
  );
}

// ----------------------------------------------------------
//  🟧 DRAWER PERSONALIZADO CON IDIOMA
// ----------------------------------------------------------
function CustomDrawerContent(props: any) {
  const { navigation, color, setColor } = props;
  const { theme, toggleTheme } = useTheme();
  const { language } = useLanguage();

  const tr = translations[language];
  const isDark = theme === "dark";

  const drawerBg = isDark ? "#1E1E1E" : "#FFFFFF";
  const drawerText = isDark ? "#EFEFEF" : "#222222";
  const drawerSubtitle = isDark ? "#BBBBBB" : "#555555";
  const drawerBorder = isDark ? "#2A2A2A" : "#DDDDDD";

  return (
    <DrawerContentScrollView {...props} style={{ backgroundColor: drawerBg }}>
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 16, fontWeight: "bold", color: drawerText }}>
          Alan Castro – 21151078
        </Text>
        <Text style={{ color: drawerSubtitle, marginBottom: 12 }}>{tr.mainMenu}</Text>
      </View>

      <DrawerItem
        label={tr.home}
        labelStyle={{ color: drawerText }}
        icon={() => <Ionicons name="home-outline" size={20} color={drawerText} />}
        onPress={() => navigation.navigate("Tabs", { screen: "Home" })}
      />

      <DrawerItem
        label={tr.profile}
        labelStyle={{ color: drawerText }}
        icon={() => <Ionicons name="person-outline" size={20} color={drawerText} />}
        onPress={() => navigation.navigate("Tabs", { screen: "Profile" })}
      />

      <DrawerItem
        label={tr.settings}
        labelStyle={{ color: drawerText }}
        icon={() => <Ionicons name="settings-outline" size={20} color={drawerText} />}
        onPress={() => navigation.navigate("Tabs", { screen: "Settings" })}
      />

      <DrawerItem
        label={tr.form}
        labelStyle={{ color: drawerText }}
        icon={() => <Ionicons name="document-text-outline" size={20} color={drawerText} />}
        onPress={() => navigation.navigate("Formulario")}
      />

      <DrawerItem
        label={tr.display}
        labelStyle={{ color: drawerText }}
        icon={() => <Ionicons name="albums-outline" size={20} color={drawerText} />}
        onPress={() => navigation.navigate("Display")}
      />

      <DrawerItem
        label={tr.users}
        labelStyle={{ color: drawerText }}
        icon={() => <Ionicons name="person-circle-outline" size={20} color={drawerText} />}
        onPress={() => navigation.navigate("User")}
      />

      <DrawerItem
        label={tr.languages}
        labelStyle={{ color: drawerText }}
        icon={() => <Ionicons name="language-outline" size={20} color={drawerText} />}
        onPress={() => navigation.navigate("Idiomas")}
      />

      {/* COLOR SELECTOR */}
      <View style={{ padding: 16, borderTopWidth: 1, borderColor: drawerBorder }}>
        <Text style={{ color: drawerText, fontWeight: "bold", marginBottom: 8 }}>
          {tr.barColor}
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
                borderColor: color === c ? "#FFF" : "#AAA",
              }}
            />
          ))}
        </View>
      </View>

      {/* TEMA */}
      <View style={{ padding: 16, borderTopWidth: 1, borderColor: drawerBorder }}>
        <Text style={{ fontWeight: "bold", marginBottom: 12, color: drawerText }}>
          {tr.appTheme}
        </Text>

        <TouchableOpacity
          onPress={toggleTheme}
          style={{
            width: 70,
            height: 35,
            borderRadius: 50,
            backgroundColor: isDark ? "#000" : "#CCC",
            justifyContent: "center",
            paddingHorizontal: 5,
          }}
        >
          <View
            style={{
              width: 28,
              height: 28,
              borderRadius: 14,
              backgroundColor: "#FFF",
              marginLeft: isDark ? 35 : 0,
            }}
          />
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
}

// ----------------------------------------------------------
// 🟥 APP PRINCIPAL
// ----------------------------------------------------------
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
    <LanguageProvider>
      <ThemeProvider>
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
                    <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>
                      Alan Castro – 21151078
                    </Text>
                  ),
                }}
              >
                <Drawer.Screen name="Tabs">
                  {(props) => <Tabs {...props} color={headerColor} />}
                </Drawer.Screen>


                <Drawer.Screen
                  name="Formulario"
                  component={FormScreen}
                  options={{ title: "Formulario" }}
                />

                <Drawer.Screen
                  name="Display"
                  component={DisplayScreen}
                  options={{ title: "Display" }}
                />

                <Drawer.Screen
                  name="User"
                  component={Users}
                  options={{ title: "Usuarios" }}
                />

                <Drawer.Screen
                  name="Idiomas"
                  component={LanguageScreen}
                  options={{ title: "Cambiar Idioma" }}
                />
              </Drawer.Navigator>
            </NavigationContainer>
          </StyledProvider>
        </GluestackUIProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}

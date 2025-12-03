// screens/HomeScreen.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";

export default function HomeScreen() {
  const { theme } = useTheme();
  const { language } = useLanguage(); // ← idioma actual

  const backgroundColor = theme === "dark" ? "#121212" : "#FFFFFF";
  const textColor = theme === "dark" ? "#FFFFFF" : "#000000";

  // 🟦 Traducciones locales
  const translations = {
    es: {
      homeTitle: "Pantalla de Inicio 🏠",
    },
    en: {
      homeTitle: "Home Screen 🏠",
    },
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={[styles.text, { color: textColor }]}>
        {translations[language].homeTitle}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: 18 },
});

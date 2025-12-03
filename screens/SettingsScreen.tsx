import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";

export default function SettingsScreen() {
  const { theme } = useTheme();
  const { language } = useLanguage();

  const backgroundColor = theme === "dark" ? "#121212" : "#FFFFFF";
  const textColor = theme === "dark" ? "#FFFFFF" : "#000000";

  // Traducciones para esta pantalla
  const translations = {
    es: {
      title: "Configuraciones ⚙️",
    },
    en: {
      title: "Settings ⚙️",
    },
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={[styles.text, { color: textColor }]}>
        {translations[language].title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: 18 },
});

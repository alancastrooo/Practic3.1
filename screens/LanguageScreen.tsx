import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { LanguageContext } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";

export default function LanguageScreen() {
  const { language, toggleLanguage } = useContext(LanguageContext);
  const { theme } = useTheme();

  const isDark = theme === "dark";

  const bg = isDark ? "#121212" : "#F5F5F5";
  const cardBg = isDark ? "#1E1E1E" : "#FFFFFF";
  const text = isDark ? "#FFFFFF" : "#222222";
  const subText = isDark ? "#BBBBBB" : "#555555";

  return (
    <View style={[styles.container, { backgroundColor: bg }]}>
      <View style={[styles.card, { backgroundColor: cardBg }]}>
        <Ionicons
          name="language-outline"
          size={48}
          color={isDark ? "#90CAF9" : "#1565C0"}
          style={{ marginBottom: 10 }}
        />

        <Text style={[styles.title, { color: text }]}>
          Idioma actual
        </Text>

        <Text style={[styles.current, { color: subText }]}>
          {language === "es" ? "Español" : "Inglés"}
        </Text>

        <TouchableOpacity style={styles.button} onPress={toggleLanguage}>
          <Text style={styles.buttonText}>
            {language === "es" ? "Cambiar a Inglés" : "Switch to Spanish"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  card: {
    width: "100%",
    padding: 30,
    borderRadius: 20,
    alignItems: "center",

    // sombra en iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,

    // sombra en Android
    elevation: 6,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 5,
  },

  current: {
    fontSize: 18,
    marginBottom: 25,
  },

  button: {
    backgroundColor: "#1565C0",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
  },

  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
});

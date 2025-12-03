import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { useTheme } from "../context/ThemeContext"; // ← IMPORTANTE (ajusta ruta)

export default function SplashScreen() {
  const { theme } = useTheme();

  // 🎨 Colores dinámicos según el tema
  const colors = {
    background: theme === "light" ? "#1565C0" : "#0A1A30",
    text: "#fff", // Mantener blanco por contraste
  };

  return (
    <View
      style={[
        styles.splashContainer,
        { backgroundColor: colors.background },
      ]}
    >
      <Image
        source={require("../assets/images/tics-icon.png")}
        style={styles.splashImage}
        resizeMode="contain"
      />
      <Text style={[styles.splashText, { color: colors.text }]}>
        Cargando aplicación...
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  splashImage: {
    width: 200,
    height: 200,
    marginBottom: 30,
  },
  splashText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

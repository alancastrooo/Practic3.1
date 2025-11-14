import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export default function SplashScreen() {
  return (
    <View style={styles.splashContainer}>
      <Image
        source={require("../assets/images/tics-icon.png")}
        style={styles.splashImage}
        resizeMode="contain"
      />
      <Text style={styles.splashText}>Cargando aplicación...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    backgroundColor: "#1565C0",
    alignItems: "center",
    justifyContent: "center",
  },
  splashImage: {
    width: 200,
    height: 200,
    marginBottom: 30,
  },
  splashText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

interface LoginProps {
  onLogin: () => void;
}

export default function LoginScreen({ onLogin }: LoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  const handleLogin = () => {
    // Muestra alerta al iniciar sesión
    Alert.alert("Alerta", "El usuario ha iniciado sesión correctamente");

    // Marca como autenticado
    setAuthenticated(true);

    // Avanza a Home
    if (onLogin) onLogin();
  };

  return (
    <View style={styles.container}>
      {/* Encabezado azul con tus datos */}
      <View style={styles.header}>
        <Text style={styles.studentName}>Alan Castro</Text>
        <Text style={styles.subtitle}>21151078</Text>
      </View>

      {/* Contenedor del login */}
      <View style={styles.loginContainer}>
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your username"
          value={username}
          onChangeText={setUsername}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          style={[styles.button, authenticated && styles.buttonDisabled]}
          onPress={handleLogin}
          disabled={authenticated}
        >
          <Text style={styles.buttonText}>Sign in</Text>
        </TouchableOpacity>

        {/* Estado visual */}
        <Text style={styles.statusText}>
          {authenticated ? "✅ Sesión iniciada" : "❌ No has iniciado sesión"}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    backgroundColor: "#1565C0",
    paddingVertical: 40,
    alignItems: "center",
    justifyContent: "center",
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
  },
  studentName: { color: "#fff", fontSize: 20, fontWeight: "bold" },
  subtitle: { color: "#E3F2FD", fontSize: 14, marginTop: 5 },
  loginContainer: { marginTop: 50, paddingHorizontal: 30 },
  label: { fontSize: 16, marginBottom: 6, color: "#333" },
  input: {
    backgroundColor: "#F1F3F6",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  button: {
    backgroundColor: "#1565C0",
    borderRadius: 25,
    paddingVertical: 12,
    alignItems: "center",
  },
  buttonDisabled: { backgroundColor: "#9E9E9E" },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  statusText: {
    textAlign: "center",
    marginTop: 15,
    color: "#1565C0",
    fontSize: 12,
  },
});

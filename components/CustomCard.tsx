import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface CustomCardProps {
  title: string;
  description: string;
}

export default function CustomCard({ title, description }: CustomCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardDescription}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginVertical: 10,
    elevation: 4, // sombra Android
    shadowColor: "#000", // sombra iOS
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1565C0",
    marginBottom: 6,
  },
  cardDescription: {
    fontSize: 15,
    color: "#555",
  },
});

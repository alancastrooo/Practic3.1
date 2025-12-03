import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Badge, useToast } from "@gluestack-ui/themed";
import { ShoppingCart, CheckCircle } from "lucide-react-native";

import { useTheme } from "../context/ThemeContext";  // ← IMPORTANTE

export default function DisplayScreen() {
  const toast = useToast();
  const { theme } = useTheme();

  const colors = {
    background: theme === "light" ? "#f5f5f5" : "#121212",
    card: theme === "light" ? "#fff" : "#1e1e1e",
    textPrimary: theme === "light" ? "#000" : "#fff",
    textSecondary: theme === "light" ? "#444" : "#ccc",
    border: theme === "light" ? "#ddd" : "#333",
    tableHeader: theme === "light" ? "#f2f2f2" : "#222",
    toastBg: theme === "light" ? "#d9f7dc" : "#1b3d1f",
    toastBorder: theme === "light" ? "#a5d6a7" : "#2e7d32",
  };

  const handleAddToCart = () => {
    toast.show({
      placement: "bottom",
      duration: 3000,
      render: () => (
        <View
          style={[
            styles.toastContainer,
            {
              backgroundColor: colors.toastBg,
              borderColor: colors.toastBorder,
            },
          ]}
        >
          <CheckCircle size={24} color="#2e7d32" style={{ marginRight: 10 }} />
          <View>
            <Text style={[styles.toastTitle, { color: "#2e7d32" }]}>
              Success
            </Text>
            <Text style={[styles.toastMessage, { color: "#2e7d32" }]}>
              Your order was placed successfully, thanks for shopping with us!
            </Text>
          </View>
        </View>
      ),
    });
  };

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
    >
      {/* CARD PRODUCTO */}
      <View style={[styles.card, { backgroundColor: colors.card }]}>
        <Image
          source={{
            uri: "https://gluestack.github.io/public-blog-video-assets/saree.png",
          }}
          style={styles.image}
        />

        <Text style={[styles.category, { color: colors.textSecondary }]}>
          Fashion Clothing
        </Text>
        <Text style={[styles.title, { color: colors.textPrimary }]}>
          Cotton Kurta
        </Text>

        <Text style={[styles.description, { color: colors.textSecondary }]}>
          Floral embroidered notch neck thread work cotton kurta in white and
          black.
        </Text>

        {/* Botones */}
        <View style={styles.buttonColumn}>
          <TouchableOpacity
            style={[styles.button, styles.addButton]}
            onPress={handleAddToCart}
          >
            <Text style={[styles.buttonText, { color: "#fff" }]}>
              Add to cart
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              styles.wishlistButton,
              { borderColor: colors.border },
            ]}
          >
            <Text style={[styles.buttonText, { color: colors.textPrimary }]}>
              Wishlist
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* TABLA */}
      <View style={[styles.tableCard, { backgroundColor: colors.card }]}>
        <Text style={[styles.tableTitle, { color: colors.textPrimary }]}>
          Tabla de Productos
        </Text>

        <View
          style={[
            styles.tableRow,
            styles.tableHeader,
            { backgroundColor: colors.tableHeader },
          ]}
        >
          <Text style={[styles.tableCell, styles.headerText, { color: colors.textPrimary }]}>
            Producto
          </Text>
          <Text style={[styles.tableCell, styles.headerText, { color: colors.textPrimary }]}>
            Precio
          </Text>
          <Text style={[styles.tableCell, styles.headerText, { color: colors.textPrimary }]}>
            ST
          </Text>
        </View>

        {/* FILAS */}
        <View style={[styles.tableRow, { borderBottomColor: colors.border }]}>
          <Text style={[styles.tableCell, { color: colors.textPrimary }]}>
            Kurta
          </Text>
          <Text style={[styles.tableCell, { color: colors.textPrimary }]}>
            $40
          </Text>
          <View style={[styles.tableCell, styles.statusCell]}>
            <Badge action="error" variant="solid">
              <Text style={{ color: "#fff", fontSize: 12 }}>Sold Out</Text>
            </Badge>
            <ShoppingCart size={18} style={{ marginLeft: 6 }} color={colors.textPrimary} />
          </View>
        </View>

        <View style={[styles.tableRow, { borderBottomColor: colors.border }]}>
          <Text style={[styles.tableCell, { color: colors.textPrimary }]}>
            Alan
          </Text>
          <Text style={[styles.tableCell, { color: colors.textPrimary }]}>
            $55
          </Text>
          <View style={[styles.tableCell, styles.statusCell]}>
            <Badge action="success" variant="solid">
              <Text style={{ color: "#fff", fontSize: 12 }}>Available</Text>
            </Badge>
            <ShoppingCart size={18} style={{ marginLeft: 6 }} color={colors.textPrimary} />
          </View>
        </View>

        <View style={[styles.tableRow, { borderBottomColor: colors.border }]}>
          <Text style={[styles.tableCell, { color: colors.textPrimary }]}>
            Saree
          </Text>
          <Text style={[styles.tableCell, { color: colors.textPrimary }]}>
            $55
          </Text>
          <View style={[styles.tableCell, styles.statusCell]}>
            <Badge action="success" variant="solid">
              <Text style={{ color: "#fff", fontSize: 12 }}>Available</Text>
            </Badge>
            <ShoppingCart size={18} style={{ marginLeft: 6 }} color={colors.textPrimary} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, alignItems: "center", padding: 20 },
  card: {
    borderRadius: 12,
    padding: 20,
    width: "90%",
    maxWidth: 380,
    elevation: 4,
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: 220,
    borderRadius: 10,
    marginBottom: 15,
    resizeMode: "cover",
  },
  category: { fontSize: 14, marginBottom: 4 },
  title: { fontSize: 20, fontWeight: "700", marginBottom: 6 },
  description: { fontSize: 14, lineHeight: 20, marginBottom: 20 },

  buttonColumn: { flexDirection: "column", gap: 10 },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  addButton: { backgroundColor: "#000" },
  wishlistButton: { backgroundColor: "transparent", borderWidth: 1 },

  buttonText: { fontSize: 14, fontWeight: "600" },

  tableCard: {
    borderRadius: 12,
    padding: 15,
    width: "90%",
    maxWidth: 380,
    elevation: 3,
  },
  tableTitle: { fontSize: 18, fontWeight: "700", marginBottom: 10 },

  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
  },
  tableHeader: {},
  tableCell: { flex: 1, textAlign: "center", fontSize: 14 },
  headerText: { fontWeight: "700" },
  statusCell: { flexDirection: "row", justifyContent: "center", alignItems: "center" },

  toastContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    maxWidth: 360,
  },
  toastTitle: { fontWeight: "700", fontSize: 16 },
  toastMessage: { fontSize: 13 },
});

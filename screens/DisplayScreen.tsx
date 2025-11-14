import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Badge, useToast, Toast } from "@gluestack-ui/themed";
import { ShoppingCart, CheckCircle } from "lucide-react-native";

export default function DisplayScreen() {
  const toast = useToast();

  const handleAddToCart = () => {
    toast.show({
      placement: "bottom",
      duration: 3000,
      render: () => (
        <View style={styles.toastContainer}>
          <CheckCircle size={24} color="#2e7d32" style={{ marginRight: 10 }} />
          <View>
            <Text style={styles.toastTitle}>Success</Text>
            <Text style={styles.toastMessage}>
              Your order was placed successfully, thanks for shopping with us!
            </Text>
          </View>
        </View>
      ),
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Image
          source={{
            uri: "https://gluestack.github.io/public-blog-video-assets/saree.png",
          }}
          style={styles.image}
        />

        <Text style={styles.category}>Fashion Clothing</Text>
        <Text style={styles.title}>Cotton Kurta</Text>

        <Text style={styles.description}>
          Floral embroidered notch neck thread work cotton kurta in white and
          black.
        </Text>

        {/* 🔹 Botones en columna (Add to cart arriba, Wishlist abajo) */}
        <View style={styles.buttonColumn}>
          <TouchableOpacity
            style={[styles.button, styles.addButton]}
            onPress={handleAddToCart}
          >
            <Text style={[styles.buttonText, styles.addButtonText]}>
              Add to cart
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.wishlistButton]}>
            <Text style={[styles.buttonText, styles.wishlistButtonText]}>
              Wishlist
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* === Tabla de productos === */}
      <View style={styles.tableCard}>
        <Text style={styles.tableTitle}>Tabla de Productos</Text>

        {/* Encabezado */}
        <View style={[styles.tableRow, styles.tableHeader]}>
          <Text style={[styles.tableCell, styles.headerText]}>Producto</Text>
          <Text style={[styles.tableCell, styles.headerText]}>Precio</Text>
          <Text style={[styles.tableCell, styles.headerText]}>ST</Text>
        </View>

        {/* Filas */}



        
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Kurta</Text>
          <Text style={styles.tableCell}>$40</Text>
          <View style={[styles.tableCell, styles.statusCell]}>
            <Badge action="error" variant="solid">
              <Text style={{ color: "#fff", fontSize: 12 }}>Sold Out</Text>
            </Badge>
            <ShoppingCart size={18} color="#000" style={{ marginLeft: 6 }} />
          </View>

        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Alan</Text>
          <Text style={styles.tableCell}>$55</Text>
          <View style={[styles.tableCell, styles.statusCell]}>
             <Badge action="success" variant="solid">
              <Text style={{ color: "#fff", fontSize: 12 }}>Available</Text>
            </Badge>
            <ShoppingCart size={18} color="#000" style={{ marginLeft: 6 }} />
          </View>
        </View>

        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Saree</Text>
          <Text style={styles.tableCell}>$55</Text>
          <View style={[styles.tableCell, styles.statusCell]}>
            <Badge action="success" variant="solid">
              <Text style={{ color: "#fff", fontSize: 12 }}>Available</Text>
            </Badge>
            <ShoppingCart size={18} color="#000" style={{ marginLeft: 6 }} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    width: "90%",
    maxWidth: 380,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
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
  category: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000",
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: "#444",
    lineHeight: 20,
    marginBottom: 20,
  },

  // 🔹 Botones en columna
  buttonColumn: {
    flexDirection: "column",
    gap: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  addButton: {
    backgroundColor: "#000",
  },
  wishlistButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "600",
  },
  addButtonText: {
    color: "#fff",
  },
  wishlistButtonText: {
    color: "#333",
  },

  // === Tabla de productos ===
  tableCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    width: "90%",
    maxWidth: 380,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  tableTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  tableHeader: {
    backgroundColor: "#f2f2f2",
  },
  tableCell: {
    flex: 1,
    textAlign: "center",
    fontSize: 14,
    color: "#333",
  },
  headerText: {
    fontWeight: "700",
  },
  statusCell: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  // === Toast personalizado ===
  toastContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#d9f7dc",
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#a5d6a7",
    maxWidth: 360,
  },
  toastTitle: {
    fontWeight: "700",
    color: "#2e7d32",
    fontSize: 16,
  },
  toastMessage: {
    color: "#2e7d32",
    fontSize: 13,
  },
});

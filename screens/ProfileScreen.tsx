import React from "react";
import { ScrollView, View, Image as RNImage, StyleSheet } from "react-native";
import {
  Box,
  Text,
  VStack,
  HStack,
  Avatar,
  AvatarImage,
  AvatarFallbackText,
  Progress,
  ProgressFilledTrack,
  Badge,
} from "@gluestack-ui/themed";
import { MaterialIcons } from "@expo/vector-icons";
import CustomCard from "../components/CustomCard";

// Imágenes optimizadas (ahora 7)
const PHOTO_GRID_URIS: string[] = [
  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80", // nueva
];

export default function ProfileScreen() {
  return (
    <ScrollView contentContainerStyle={{ paddingVertical: 24, backgroundColor: "#FFFFFF" }}>
      <VStack space="lg" alignItems="center">
        {/* Foto de perfil */}
        <Avatar size="2xl" bgColor="#1565C0" style={styles.avatarShadow}>
          <AvatarImage alt="Foto de perfil" />
          <AvatarFallbackText>AC</AvatarFallbackText>
        </Avatar>

        {/* Nombre */}
        <Text style={styles.name}>Alan Castro</Text>
        <Text style={styles.subtitle}>
          Estudiante de Ingeniería en TIC's • 21151078
        </Text>

        {/* Sección tipo estadísticas */}
        <HStack justifyContent="center" space="2xl" mt="$3" alignItems="center">
          <VStack alignItems="center">
            <MaterialIcons name="email" size={22} color="#1565C0" />
            <Text bold color="#0D47A1">Correo</Text>
            <Text color="#424242" fontSize={12}>alan@gmail.com</Text>
          </VStack>

          <VStack alignItems="center">
            <MaterialIcons name="phone" size={22} color="#1565C0" />
            <Text bold color="#0D47A1">Teléfono</Text>
            <Text color="#424242" fontSize={12}>+52 449 457 0000</Text>
          </VStack>

          <VStack alignItems="center">
            <MaterialIcons name="school" size={22} color="#1565C0" />
            <Text bold color="#0D47A1">Carrera</Text>
            <Text color="#424242" fontSize={12}>Ing. en TIC's</Text>
          </VStack>
        </HStack>

        {/* Galería (similar al ejemplo, ahora con 7 imágenes) */}
        <Box w="100%" mt="$6" px="$4">
          <Text bold color="#0D47A1" mb="$2">Galería</Text>

          {/* Imagen principal */}
          <View style={styles.mainImageContainer}>
            <RNImage
              source={{ uri: PHOTO_GRID_URIS[0] }}
              style={styles.mainImage}
              resizeMode="cover"
            />
          </View>

          {/* Primera fila de miniaturas */}
          <HStack justifyContent="space-between" mt="$2">
            {PHOTO_GRID_URIS.slice(1, 4).map((uri, idx) => (
              <View key={`row1-${idx}`} style={styles.thumbWrapper}>
                <RNImage source={{ uri }} style={styles.thumbImage} resizeMode="cover" />
              </View>
            ))}
          </HStack>

          {/* Segunda fila de miniaturas */}
          <HStack justifyContent="space-between" mt="$2">
            {PHOTO_GRID_URIS.slice(4, 7).map((uri, idx) => (
              <View key={`row2-${idx}`} style={styles.thumbWrapper}>
                <RNImage source={{ uri }} style={styles.thumbImage} resizeMode="cover" />
              </View>
            ))}
          </HStack>
        </Box>

        {/* Progreso académico */}
        <Box
          mt="$6"
          p="$4"
          bg="#EDF6FF"
          rounded="$xl"
          w="90%"
          borderWidth={1}
          borderColor="#90CAF9"
          alignItems="center"
        >
          <Text bold color="#0D47A1" mb="$2">
            Progreso académico
          </Text>
          <Progress value={80} w="100%">
            <ProgressFilledTrack bg="#1565C0" />
          </Progress>
          <HStack justifyContent="space-between" mt="$2" w="100%">
            <Text color="#424242">Completado 80%</Text>
            <Badge bg="#C8E6C9">
              <Text color="#1B5E20" bold>
                Activo
              </Text>
            </Badge>
          </HStack>
        </Box>

        {/* Sección sobre mí */}
        <Box
          mt="$5"
          p="$4"
          bg="#F0F7FF"
          borderWidth={1}
          borderColor="#90CAF9"
          rounded="$xl"
          w="90%"
        >
          <Text bold color="#0D47A1" mb="$2">Sobre mí</Text>
          <Text color="#424242" textAlign="center">
            Soy Alan Castro, estudiante de Ingeniería en Tecnologías de la
            Información y Comunicaciones. Actualmente cursando 9no semestre.
          </Text>
        </Box>

        {/* Componente propio */}
        <CustomCard
          title="Mis metas"
          description="Seguir aprendiendo más de la carrera y mejorar mis habilidades (Componente propio)."
        />
      </VStack>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  avatarShadow: {
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  name: {
    fontSize: 22,
    fontWeight: "700",
    marginTop: 8,
    color: "#0D47A1",
  },
  subtitle: {
    color: "#424242",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 8,
  },
  mainImageContainer: {
    borderRadius: 16,
    overflow: "hidden",
  },
  mainImage: {
    width: "100%",
    height: 150,
    borderRadius: 16,
  },
  thumbWrapper: {
    width: "32%",
    borderRadius: 12,
    overflow: "hidden",
  },
  thumbImage: {
    width: "100%",
    aspectRatio: 1,
  },
});


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
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";

// 🔵 TRADUCCIONES
const translations = {
  es: {
    info: "Información",
    email: "Correo",
    phone: "Teléfono",
    career: "Carrera",
    gallery: "Galería",
    progress: "Progreso académico",
    completed: "Completado 80%",
    active: "Activo",
    about: "Sobre mí",
    aboutText:
      "Soy Alan Castro, estudiante de Ingeniería en TIC's. Actualmente cursando 9no semestre.",
    goals: "Mis metas",
    goalsDesc:
      "Seguir aprendiendo más de la carrera y mejorar mis habilidades.",
  },
  en: {
    info: "Information",
    email: "Email",
    phone: "Phone",
    career: "Major",
    gallery: "Gallery",
    progress: "Academic progress",
    completed: "Completed 80%",
    active: "Active",
    about: "About me",
    aboutText:
      "I am Alan Castro, an IT Engineering student. Currently in the 9th semester.",
    goals: "My Goals",
    goalsDesc: "Keep learning and improving my skills.",
  },
};

const PHOTO_GRID_URIS = [
  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80",
];

export default function ProfileScreen() {
  const { theme } = useTheme();
  const { language } = useLanguage();

  const t = translations[language];
  const isDark = theme === "dark";

  const bgColor = isDark ? "#0D0D0D" : "#F5F7FA";
  const cardBg = isDark ? "#1C1C1C" : "#FFFFFF";
  const textPrimary = isDark ? "#FFFFFF" : "#0D47A1";
  const textSecondary = isDark ? "#CCCCCC" : "#555555";

  const shadowStyle = {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  };

  return (
    <ScrollView
      style={{ backgroundColor: bgColor }}
      contentContainerStyle={{ paddingBottom: 50 }}
    >
      <VStack space="lg" alignItems="center" mt="$6" px="$4">

        {/* 🔵 TARJETA PRINCIPAL */}
        <Box
          w="100%"
          p="$5"
          bg={cardBg}
          rounded="$2xl"
          alignItems="center"
          style={shadowStyle}
        >
          <Avatar size="2xl" bgColor="#1565C0" style={styles.avatarShadow}>
            <AvatarImage alt="Foto de perfil" />
            <AvatarFallbackText>AC</AvatarFallbackText>
          </Avatar>

          <Text mt="$3" fontSize={22} bold style={{ color: textPrimary }}>
            Alan Castro
          </Text>

          <Text mt="$1" fontSize={14} style={{ color: textSecondary }}>
            Ing. TIC's • 21151078
          </Text>
        </Box>

        {/* 🔵 INFORMACIÓN */}
        <Box w="100%" p="$4" bg={cardBg} rounded="$2xl" style={shadowStyle}>
          <Text bold color={textPrimary} fontSize={16} mb="$3">
            {t.info}
          </Text>

          <HStack justifyContent="space-between">
            <VStack alignItems="center" flex={1}>
              <MaterialIcons name="email" size={24} color="#1565C0" />
              <Text bold color={textPrimary}>{t.email}</Text>
              <Text color={textSecondary} fontSize={12}>alan@gmail.com</Text>
            </VStack>

            <VStack alignItems="center" flex={1}>
              <MaterialIcons name="phone" size={24} color="#1565C0" />
              <Text bold color={textPrimary}>{t.phone}</Text>
              <Text color={textSecondary} fontSize={12}>+52 449 457 0000</Text>
            </VStack>

            <VStack alignItems="center" flex={1}>
              <MaterialIcons name="school" size={24} color="#1565C0" />
              <Text bold color={textPrimary}>{t.career}</Text>
              <Text color={textSecondary} fontSize={12}>Ing. TIC's</Text>
            </VStack>
          </HStack>
        </Box>

        {/* 🔵 GALERÍA */}
        <Box w="100%">
          <Text bold color={textPrimary} mb="$2">{t.gallery}</Text>

          <Box p="$4" bg={cardBg} rounded="$2xl" style={shadowStyle}>
            <View style={styles.mainImageContainer}>
              <RNImage source={{ uri: PHOTO_GRID_URIS[0] }} style={styles.mainImage} />
            </View>

            <View style={{ marginTop: 12 }}>
              <HStack justifyContent="space-between" mb="$2">
                {PHOTO_GRID_URIS.slice(1, 4).map((uri, idx) => (
                  <View key={`r1-${idx}`} style={styles.thumbWrapper}>
                    <RNImage source={{ uri }} style={styles.thumbImage} />
                  </View>
                ))}
              </HStack>

              <HStack justifyContent="space-between">
                {PHOTO_GRID_URIS.slice(4, 7).map((uri, idx) => (
                  <View key={`r2-${idx}`} style={styles.thumbWrapper}>
                    <RNImage source={{ uri }} style={styles.thumbImage} />
                  </View>
                ))}
              </HStack>
            </View>
          </Box>
        </Box>

        {/* 🔵 PROGRESO */}
        <Box w="100%" p="$5" bg={cardBg} rounded="$2xl" style={shadowStyle}>
          <Text bold color={textPrimary} mb="$2" fontSize={16}>
            {t.progress}
          </Text>

          <Progress value={80} w="100%">
            <ProgressFilledTrack bg="#1565C0" />
          </Progress>

          <HStack justifyContent="space-between" mt="$2" w="100%">
            <Text color={textSecondary}>{t.completed}</Text>
            <Badge bg="#C8E6C9">
              <Text color="#1B5E20" bold>
                {t.active}
              </Text>
            </Badge>
          </HStack>
        </Box>

        {/* 🔵 SOBRE MÍ */}
        <Box w="100%" p="$5" bg={cardBg} rounded="$2xl" style={shadowStyle}>
          <Text bold color={textPrimary} mb="$2">{t.about}</Text>
          <Text color={textSecondary} textAlign="center">
            {t.aboutText}
          </Text>
        </Box>

        {/* 🔵 CUSTOM CARD */}
        <CustomCard title={t.goals} description={t.goalsDesc} />
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
  mainImageContainer: {
    borderRadius: 18,
    overflow: "hidden",
  },
  mainImage: {
    width: "100%",
    height: 160,
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

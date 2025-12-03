import React, { useState, useEffect } from "react";
import { ref, onValue, push, set } from "firebase/database";
import { db } from "../config/config";

import { ScrollView, StyleSheet, View } from "react-native";
import { ChevronDownIcon } from "lucide-react-native";

import {
  Box,
  Button,
  ButtonText,
  VStack,
  HStack,
  Text,
  Spinner,
  Heading,
  Card,
  Modal,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  ModalBackdrop,
  Icon,
  CloseIcon,
  Input,
  InputField,
  Select,
  SelectTrigger,
  SelectInput,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectItem,
  SelectIcon,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
} from "@gluestack-ui/themed";

import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";  // ⬅️ IMPORTANTE

interface User {
  id: number;
  first_name: string;
  last_name: string;
  age: string;
  gender: string;
  email: string;
}

export default function Users() {
  const { theme } = useTheme();
  const { language } = useLanguage();   // ⬅️ OBTENEMOS EL IDIOMA

  // 🌎 TRADUCCIONES
  const t = {
    createUser: language === "en" ? "Create User" : "Crear Usuario",
    noUsers:
      language === "en"
        ? "No users registered"
        : "No hay usuarios registrados",
    newUser: language === "en" ? "Create New User" : "Crear Nuevo Usuario",
    name: language === "en" ? "Name *" : "Nombre *",
    lastname: language === "en" ? "Last Name *" : "Apellido *",
    age: language === "en" ? "Age *" : "Edad *",
    email: language === "en" ? "Email *" : "Correo *",
    gender: language === "en" ? "Gender *" : "Género *",
    placeholderName:
      language === "en" ? "Enter name" : "Ingresa el nombre",
    placeholderLastname:
      language === "en" ? "Enter last name" : "Ingresa el apellido",
    placeholderAge:
      language === "en" ? "Enter age" : "Ingresa la edad",
    placeholderEmail:
      language === "en" ? "email@example.com" : "correo@ejemplo.com",
    placeholderGender:
      language === "en" ? "Select gender" : "Selecciona el género",
    male: language === "en" ? "Male" : "Masculino",
    female: language === "en" ? "Female" : "Femenino",
    cancel: language === "en" ? "Cancel" : "Cancelar",
    save: language === "en" ? "Save" : "Guardar",
    ageLabel: language === "en" ? "Age:" : "Edad:",
    emailLabel: language === "en" ? "Email:" : "Email:",
    idLabel: language === "en" ? "ID:" : "ID:",
  };

  // 🎨 Colores según tema
  const colors = {
    bg: theme === "light" ? "#FFFFFF" : "#0A0F1A",
    text: theme === "light" ? "#000" : "#FFF",
    cardBg: theme === "light" ? "#FFFFFF" : "#121A2A",
    border: theme === "light" ? "#DDD" : "#2A3442",
    maleTag: theme === "light" ? "#BBDEFB" : "#1E3A5F",
    femaleTag: theme === "light" ? "#F8BBD0" : "#573044",
    maleText: theme === "light" ? "#0D47A1" : "#90CAF9",
    femaleText: theme === "light" ? "#AD1457" : "#FF80AB",
  };

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");

  useEffect(() => {
    const usersRef = ref(db, "users");

    const unsubscribe = onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const usersArray = Object.values(data) as User[];
        setUsers(usersArray);
      } else {
        setUsers([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleCreateUser = () => setShowModal(true);

  const handleCloseModal = () => {
    setShowModal(false);
    setFirstName("");
    setLastName("");
    setEmail("");
    setGender("");
    setAge("");
  };

  const handleSaveUser = async () => {
    if (!firstName || !lastName || !email || !gender || !age) {
      alert(
        language === "en"
          ? "Please fill out all required fields"
          : "Por favor completa todos los campos obligatorios"
      );
      return;
    }

    setSaving(true);

    try {
      const usersRef = ref(db, "users");
      const newUserRef = push(usersRef);
      const newId = Date.now();

      const newUser: User = {
        id: newId,
        first_name: firstName,
        last_name: lastName,
        age,
        gender,
        email,
      };

      await set(newUserRef, newUser);

      handleCloseModal();

      alert(
        language === "en"
          ? "User created successfully"
          : "Usuario creado exitosamente"
      );
    } catch (error) {
      console.error("Error:", error);
      alert(
        language === "en"
          ? "Error creating user"
          : "Error al crear el usuario"
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box flex={1} bg={colors.bg}>
      {/* BOTÓN */}
      <View style={styles.headerWrapper}>
        <View style={styles.buttonWrapper}>
          <Button size="lg" variant="solid" onPress={handleCreateUser}>
            <ButtonText>{t.createUser}</ButtonText>
          </Button>
        </View>
      </View>

      {/* LISTA */}
      <ScrollView style={styles.scroll}>
        {loading ? (
          <View style={styles.center}>
            <Spinner size="large" />
          </View>
        ) : users.length === 0 ? (
          <View style={styles.center}>
            <Text style={{ color: colors.text }}>{t.noUsers}</Text>
          </View>
        ) : (
          <VStack space="md" mb="$10">
            {users.map((user) => (
              <Card
                key={user.id}
                p="$4"
                style={{ backgroundColor: colors.cardBg, borderColor: colors.border }}
              >
                <VStack space="sm">
                  <HStack justifyContent="space-between" alignItems="center">
                    <Heading size="md" style={{ color: colors.text }}>
                      {user.first_name} {user.last_name}
                    </Heading>

                    <View
                      style={[
                        styles.genderTag,
                        user.gender === "Male" || user.gender === "Masculino"
                          ? { backgroundColor: colors.maleTag }
                          : { backgroundColor: colors.femaleTag },
                      ]}
                    >
                      <Text
                        style={
                          user.gender === "Male" || user.gender === "Masculino"
                            ? { color: colors.maleText, fontSize: 12 }
                            : { color: colors.femaleText, fontSize: 12 }
                        }
                      >
                        {user.gender}
                      </Text>
                    </View>
                  </HStack>

                  <VStack space="xs">
                    <HStack space="xs">
                      <Text style={[styles.label, { color: colors.text }]}>
                        {t.ageLabel}
                      </Text>
                      <Text style={{ color: colors.text }}>{user.age}</Text>
                    </HStack>

                    <HStack space="xs">
                      <Text style={[styles.label, { color: colors.text }]}>
                        {t.emailLabel}
                      </Text>
                      <Text style={{ color: colors.text }}>{user.email}</Text>
                    </HStack>

                    <HStack space="xs">
                      <Text style={[styles.label, { color: colors.text }]}>{t.idLabel}</Text>
                      <Text style={{ color: colors.text }}>{user.id}</Text>
                    </HStack>
                  </VStack>
                </VStack>
              </Card>
            ))}
          </VStack>
        )}
      </ScrollView>

      {/* MODAL */}
      <Modal isOpen={showModal} onClose={handleCloseModal} size="lg">
        <ModalBackdrop />
        <ModalContent style={{ backgroundColor: colors.cardBg }}>
          <ModalHeader>
            <Heading size="lg" style={{ color: colors.text }}>
              {t.newUser}
            </Heading>
            <ModalCloseButton>
              <Icon as={CloseIcon} />
            </ModalCloseButton>
          </ModalHeader>

          <ModalBody>
            <VStack space="lg">
              <VStack>
                <Text style={{ color: colors.text }}>{t.name}</Text>
                <Input>
                  <InputField
                    placeholder={t.placeholderName}
                    value={firstName}
                    onChangeText={setFirstName}
                  />
                </Input>
              </VStack>

              <VStack>
                <Text style={{ color: colors.text }}>{t.lastname}</Text>
                <Input>
                  <InputField
                    placeholder={t.placeholderLastname}
                    value={lastName}
                    onChangeText={setLastName}
                  />
                </Input>
              </VStack>

              <VStack>
                <Text style={{ color: colors.text }}>{t.age}</Text>
                <Input>
                  <InputField
                    placeholder={t.placeholderAge}
                    value={age}
                    onChangeText={setAge}
                    keyboardType="numeric"
                  />
                </Input>
              </VStack>

              <VStack>
                <Text style={{ color: colors.text }}>{t.email}</Text>
                <Input>
                  <InputField
                    placeholder={t.placeholderEmail}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </Input>
              </VStack>

              <VStack>
                <Text style={{ color: colors.text }}>{t.gender}</Text>
                <Select selectedValue={gender} onValueChange={setGender}>
                  <SelectTrigger>
                    <SelectInput placeholder={t.placeholderGender} />
                    <SelectIcon as={ChevronDownIcon} />
                  </SelectTrigger>

                  <SelectPortal>
                    <SelectBackdrop />
                    <SelectContent>
                      <SelectDragIndicatorWrapper>
                        <SelectDragIndicator />
                      </SelectDragIndicatorWrapper>

                      <SelectItem label={t.male} value={t.male} />
                      <SelectItem label={t.female} value={t.female} />
                    </SelectContent>
                  </SelectPortal>
                </Select>
              </VStack>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <HStack space="md" w="$full">
              <Button variant="outline" onPress={handleCloseModal}>
                <ButtonText>{t.cancel}</ButtonText>
              </Button>

              <Button onPress={handleSaveUser} isDisabled={saving}>
                {saving ? (
                  <Spinner size="small" />
                ) : (
                  <ButtonText>{t.save}</ButtonText>
                )}
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

const styles = StyleSheet.create({
  headerWrapper: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonWrapper: {
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
  },

  scroll: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },

  center: {
    paddingVertical: 40,
    alignItems: "center",
  },

  genderTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },

  label: {
    fontWeight: "600",
  },
});

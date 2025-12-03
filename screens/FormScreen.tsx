import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  Switch,
  Pressable,
  StyleSheet,
  Alert,
} from "react-native";
import Slider from "@react-native-community/slider";
import { Picker } from "@react-native-picker/picker";
import CustomCard from "../components/CustomCard";
import {
  Link,
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  RadioGroup,
  HStack,
  Radio,
  RadioIndicator,
  RadioIcon,
  CircleIcon,
  RadioLabel,
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
  Textarea,
  TextareaInput,
} from "@gluestack-ui/themed";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";

export default function FormScreen() {
  const { theme } = useTheme();
  const { language } = useLanguage();

  const isDark = theme === "dark";

  const t = {
    es: {
      title: "Formulario de Componentes",
      checkbox: "Checkbox - Intereses",
      interests: ["Música", "Deportes", "Programación"],
      link: "Link",
      pressable: "Pressable",
      pressMe: "Presióname",
      pressed: "Presionado",
      radio: "Radio - Método de pago",
      selectLabel: "Selecciona una opción",
      select: "Select - Color favorito",
      slider: "Slider - Avance",
      switch: "Switch - Notificaciones",
      notifOn: "✅ Activadas",
      notifOff: "❌ Desactivadas",
      comments: "Comentarios",
      placeholderComment: "Tu comentario...",
      customComponent: "Componente Propio",
      customDesc: "Este componente fue creado por Alan Castro.",
      submit: "Enviar",
      formSent: "Formulario Enviado",
      thanks: "¡Gracias por llenar el formulario!",
    },
    en: {
      title: "Components Form",
      checkbox: "Checkbox - Interests",
      interests: ["Music", "Sports", "Programming"],
      link: "Link",
      pressable: "Pressable",
      pressMe: "Press me",
      pressed: "Pressed",
      radio: "Radio - Payment Method",
      selectLabel: "Select an option",
      select: "Select - Favorite Color",
      slider: "Slider - Progress",
      switch: "Switch - Notifications",
      notifOn: "✅ Enabled",
      notifOff: "❌ Disabled",
      comments: "Comments",
      placeholderComment: "Your comment...",
      customComponent: "Custom Component",
      customDesc: "This component was created by Alan Castro.",
      submit: "Submit",
      formSent: "Form Sent",
      thanks: "Thank you for completing the form!",
    },
  }[language];

  const colors = {
    background: isDark ? "#121212" : "#FFFFFF",
    text: isDark ? "#FFFFFF" : "#000000",
    primary: isDark ? "#90CAF9" : "#1565C0",
    card: isDark ? "#1E1E1E" : "#E3F2FD",
    border: isDark ? "#333" : "#ccc",
  };

  const [rValues, setRValues] = useState("Cash On Delivery");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedColor, setSelectedColor] = useState("");
  const [sliderValue, setSliderValue] = useState(50);
  const [notifications, setNotifications] = useState(false);
  const [textValue, setTextValue] = useState("");

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleSubmit = () => {
    Alert.alert(t.formSent, t.thanks);
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={{ paddingBottom: 50 }}
    >
      <Text style={[styles.title, { color: colors.primary }]}>
        {t.title}
      </Text>

      {/* Checkbox */}
      <Text style={[styles.sectionTitle, { color: colors.text }]}>
        {t.checkbox}
      </Text>

      <View style={styles.checkboxGroup}>
        {t.interests.map((interest) => (
          <Pressable
            key={interest}
            style={[
              styles.checkboxItem,
              { borderColor: colors.border },
              selectedInterests.includes(interest) && {
                backgroundColor: colors.card,
                borderColor: colors.primary,
              },
            ]}
            onPress={() => toggleInterest(interest)}
          >
            <Text style={[styles.checkboxLabel, { color: colors.text }]}>
              {selectedInterests.includes(interest) ? "☑" : "☐"} {interest}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Link */}
      <Text style={[styles.sectionTitle, { color: colors.text }]}>
        {t.link}
      </Text>
      <Link href="https://gluestack.io">
        <Text style={{ color: colors.primary, textDecorationLine: "underline" }}>
          🔗 gluestack.io
        </Text>
      </Link>

      {/* Pressable */}
      <Text style={[styles.sectionTitle, { color: colors.text }]}>
        {t.pressable}
      </Text>
      <Pressable
        onPressIn={() => setTextValue(t.pressed)}
        onPressOut={() => setTextValue("")}
        style={[
          styles.pressable,
          { backgroundColor: isDark ? "#333" : "#444" },
          textValue && { backgroundColor: colors.primary },
        ]}
      >
        <Text style={[styles.pressableText, { color: "#fff" }]}>
          {textValue ? t.pressed : t.pressMe}
        </Text>
      </Pressable>

      {/* Radio */}
      <Text style={[styles.sectionTitle, { color: colors.text }]}>
        {t.radio}
      </Text>

      <FormControl isRequired isInvalid={!rValues}>
        <FormControlLabel>
          <FormControlLabelText>{t.selectLabel}</FormControlLabelText>
        </FormControlLabel>

        <RadioGroup value={rValues} onChange={setRValues}>
          <HStack space="2xl" mt="$2">
            <Radio value="Credit Card">
              <RadioIndicator>
                <RadioIcon as={CircleIcon} />
              </RadioIndicator>
              <RadioLabel>Credit Card</RadioLabel>
            </Radio>
            <Radio value="Cash On Delivery">
              <RadioIndicator>
                <RadioIcon as={CircleIcon} />
              </RadioIndicator>
              <RadioLabel>Cash</RadioLabel>
            </Radio>
          </HStack>
        </RadioGroup>
      </FormControl>

      {/* Select */}
      <Text style={[styles.sectionTitle, { color: colors.text }]}>
        {t.select}
      </Text>

      <FormControl isRequired isInvalid={!selectedColor}>
        <Select selectedValue={selectedColor} onValueChange={setSelectedColor}>
          <SelectTrigger>
            <SelectInput placeholder={t.selectLabel} />
            <SelectIcon as={CircleIcon} />
          </SelectTrigger>
          <SelectPortal>
            <SelectBackdrop />
            <SelectContent>
              <SelectDragIndicatorWrapper>
                <SelectDragIndicator />
              </SelectDragIndicatorWrapper>
              <SelectItem label={language === "es" ? "Rojo" : "Red"} value="red" />
              <SelectItem label={language === "es" ? "Azul" : "Blue"} value="blue" />
              <SelectItem label={language === "es" ? "Negro" : "Black"} value="black" />
              <SelectItem label={language === "es" ? "Verde" : "Green"} value="green" />
            </SelectContent>
          </SelectPortal>
        </Select>
      </FormControl>

      {/* Slider */}
      <Text style={[styles.sectionTitle, { color: colors.text }]}>
        {t.slider} {Math.round(sliderValue)}%
      </Text>

      <Slider
        style={{ width: "90%", alignSelf: "center" }}
        minimumValue={0}
        maximumValue={100}
        step={1}
        minimumTrackTintColor={colors.primary}
        maximumTrackTintColor={colors.border}
        thumbTintColor={colors.primary}
        value={sliderValue}
        onValueChange={setSliderValue}
      />

      {/* Switch */}
      <Text style={[styles.sectionTitle, { color: colors.text }]}>
        {t.switch}
      </Text>
      <View style={styles.switchContainer}>
        <Text style={[styles.switchLabel, { color: colors.text }]}>
          {notifications ? t.notifOn : t.notifOff}
        </Text>
        <Switch
          value={notifications}
          onValueChange={setNotifications}
          trackColor={{ false: colors.border, true: "#64B5F6" }}
          thumbColor={notifications ? colors.primary : "#f4f3f4"}
        />
      </View>

      {/* Textarea */}
      <Text style={[styles.sectionTitle, { color: colors.text }]}>
        {t.comments}
      </Text>

      <FormControl isRequired isInvalid={!textValue}>
        <Textarea>
          <TextareaInput
            value={textValue}
            onChangeText={setTextValue}
            placeholder={t.placeholderComment}
          />
        </Textarea>
      </FormControl>

      {/* CustomCard */}
      <Text style={[styles.sectionTitle, { color: colors.text }]}>
        {t.customComponent}
      </Text>
      <CustomCard
        title={t.customComponent}
        description={t.customDesc}
      />

      {/* Submit */}
      <Pressable
        style={[styles.submitButton, { backgroundColor: colors.primary }]}
        onPress={handleSubmit}
      >
        <Text style={[styles.submitText, { color: "#fff" }]}>
          {t.submit}
        </Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 10,
  },
  checkboxGroup: {
    flexDirection: "column",
    gap: 10,
  },
  checkboxItem: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
  },
  checkboxLabel: {
    fontSize: 16,
  },
  pressable: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: "center",
    marginVertical: 10,
  },
  pressableText: {
    fontSize: 16,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  switchLabel: {
    fontSize: 16,
  },
  submitButton: {
    marginTop: 25,
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: "center",
  },
  submitText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

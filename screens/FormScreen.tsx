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
  FormControlError,
  FormControlErrorIcon,
  AlertCircleIcon,
  FormControlErrorText,
  FormControlHelper,
  FormControlHelperText,
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

export default function FormScreen() {
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
    Alert.alert("Formulario Enviado", "¡Gracias por llenar el formulario!");
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 50 }}>
      <Text style={styles.title}>Formulario de Componentes</Text>

      {/* Checkbox */}
      <Text style={styles.sectionTitle}>Checkbox - Intereses</Text>
      <View style={styles.checkboxGroup}>
        {["Música", "Deportes", "Programación"].map((interest) => (
          <Pressable
            key={interest}
            style={[
              styles.checkboxItem,
              selectedInterests.includes(interest) && styles.checkboxSelected,
            ]}
            onPress={() => toggleInterest(interest)}
          >
            <Text style={styles.checkboxLabel}>
              {selectedInterests.includes(interest) ? "☑" : "☐"} {interest}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Link */}
      <Text style={styles.sectionTitle}>Link</Text>
      <Link href="https://gluestack.io">
        <Text style={{ color: "#1565C0", textDecorationLine: "underline" }}>
          🔗 gluestack.io
        </Text>
      </Link>

      {/* Pressable */}
      <Text style={styles.sectionTitle}>Pressable</Text>
      <Pressable
        onPressIn={() => setTextValue("Presionado")}
        onPressOut={() => setTextValue("")}
        style={[styles.pressable, textValue && styles.pressableActive]}
      >
        <Text style={styles.pressableText}>
          {textValue ? "Pressed" : "Press me"}
        </Text>
      </Pressable>

      {/* Radio */}
      <Text style={styles.sectionTitle}>Radio - Método de pago</Text>
      <FormControl isRequired isInvalid={!rValues}>
        <FormControlLabel>
          <FormControlLabelText>Selecciona una opción</FormControlLabelText>
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
        <FormControlError>
          <FormControlErrorIcon as={AlertCircleIcon} />
          <FormControlErrorText>Campo obligatorio</FormControlErrorText>
        </FormControlError>
      </FormControl>

      {/* Select */}
      <Text style={styles.sectionTitle}>Select - Color favorito</Text>
      <FormControl isRequired isInvalid={!selectedColor}>
        <FormControlLabel>
          <FormControlLabelText>Selecciona un color</FormControlLabelText>
        </FormControlLabel>
        <Select selectedValue={selectedColor} onValueChange={setSelectedColor}>
          <SelectTrigger>
            <SelectInput placeholder="Selecciona una opción" />
            <SelectIcon as={CircleIcon} />
          </SelectTrigger>
          <SelectPortal>
            <SelectBackdrop />
            <SelectContent>
              <SelectDragIndicatorWrapper>
                <SelectDragIndicator />
              </SelectDragIndicatorWrapper>
              <SelectItem label="Rojo" value="red" />
              <SelectItem label="Azul" value="blue" />
              <SelectItem label="Negro" value="black" />
              <SelectItem label="Verde" value="green" />
            </SelectContent>
          </SelectPortal>
        </Select>
        <FormControlHelper>
          <FormControlHelperText>Solo puedes elegir uno</FormControlHelperText>
        </FormControlHelper>
        <FormControlError>
          <FormControlErrorIcon as={AlertCircleIcon} />
          <FormControlErrorText>Campo obligatorio</FormControlErrorText>
        </FormControlError>
      </FormControl>

      {/* Slider */}
      <Text style={styles.sectionTitle}>
        Slider - Avance {Math.round(sliderValue)}%
      </Text>
      <Slider
        style={{ width: "90%", alignSelf: "center" }}
        minimumValue={0}
        maximumValue={100}
        step={1}
        minimumTrackTintColor="#1565C0"
        maximumTrackTintColor="#ccc"
        thumbTintColor="#1565C0"
        value={sliderValue}
        onValueChange={setSliderValue}
      />

      {/* Switch */}
      <Text style={styles.sectionTitle}>Switch - Notificaciones</Text>
      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>
          {notifications ? "✅ Activadas" : "❌ Desactivadas"}
        </Text>
        <Switch
          value={notifications}
          onValueChange={setNotifications}
          trackColor={{ false: "#ccc", true: "#64B5F6" }}
          thumbColor={notifications ? "#1565C0" : "#f4f3f4"}
        />
      </View>

      {/* Textarea */}
      <Text style={styles.sectionTitle}>Comentarios</Text>
      <FormControl isRequired isInvalid={!textValue}>
        <FormControlLabel>
          <FormControlLabelText>Escribe algo</FormControlLabelText>
        </FormControlLabel>
        <Textarea>
          <TextareaInput
            value={textValue}
            onChangeText={setTextValue}
            placeholder="Tu comentario..."
          />
        </Textarea>
        <FormControlHelper>
          <FormControlHelperText>Campo opcional</FormControlHelperText>
        </FormControlHelper>
        <FormControlError>
          <FormControlErrorIcon as={AlertCircleIcon} />
          <FormControlErrorText>Campo obligatorio</FormControlErrorText>
        </FormControlError>
      </FormControl>

      {/* Componente propio */}
      <Text style={styles.sectionTitle}>Componente Propio</Text>
      <CustomCard
        title="Información del formulario"
        description="Este componente fue creado por Alan Castro. Aquí podrías mostrar datos del formulario o mensajes personalizados."
      />

      {/* Submit */}
      <Pressable style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Enviar</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color: "#1565C0",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
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
    borderColor: "#ccc",
  },
  checkboxSelected: {
    backgroundColor: "#E3F2FD",
    borderColor: "#1565C0",
  },
  checkboxLabel: {
    fontSize: 16,
  },
  pressable: {
    backgroundColor: "#333",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: "center",
    marginVertical: 10,
  },
  pressableActive: {
    backgroundColor: "#1565C0",
  },
  pressableText: {
    color: "#fff",
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
    backgroundColor: "#1565C0",
    marginTop: 25,
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: "center",
  },
  submitText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

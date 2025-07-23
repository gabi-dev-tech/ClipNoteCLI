import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Toast from "react-native-toast-message";
import { formStyle } from "../../styles/formStyle";
import { isTitleUnique } from "../../helpers/isTitleUnique";
import { API_URL } from '@env';

export default function FormComponent({ onNotesClick, data }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async () => {
    if (isTitleUnique(title, data)) {
      Toast.show({
        type: "error",
        text1: "Operación fallida",
        text2: "El titulo ya existe, elija otro.",
        position: "top",
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 1,
      });
      return;
    }
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `action=add&Titulo=${title}&Contenido=${content}`,
      });
      if (!response.ok) throw new Error("Error al enviar la nota");
      Toast.show({
        type: "success",
        text1: "Operación exitosa",
        text2: "La nota se cargo correctamente👋",
        position: "top",
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 1,
      });
      setTitle("");
      setContent("");
      onNotesClick && onNotesClick();
    } catch (error) {
      console.error('Error al enviar nota.')
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={formStyle.cardContainer}
    >
      <Text style={formStyle.title}>Agregar Nota</Text>
      <View style={formStyle.form}>
        <Text style={formStyle.label}>Título Nota</Text>
        <TextInput
          placeholder="Título de la nota"
          style={formStyle.input_field}
          value={title}
          onChangeText={setTitle}
          minLength={3}
          maxLength={50}
          required
        />
        <Text style={formStyle.label}>Contenido</Text>
        <TextInput
          placeholder="Contenido de la nota"
          style={[
            formStyle.input_field,
            { height: 90, textAlignVertical: "top" },
          ]}
          value={content}
          onChangeText={setContent}
          minLength={3}
          maxLength={500}
          required
          multiline
        />
        <TouchableOpacity style={formStyle.button} onPress={handleSubmit}>
          <Text style={formStyle.buttonText}>Agregar</Text>
        </TouchableOpacity>
      </View>
      <Toast />
    </KeyboardAvoidingView>
  );
}
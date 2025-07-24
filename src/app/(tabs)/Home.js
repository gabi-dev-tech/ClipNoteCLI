import { useEffect, useState } from "react";
import { View, Text, Button, Alert } from "react-native";
import { FlatList } from "react-native";
import Toast from "react-native-toast-message";
import { homeStyle } from "../../styles/homeStyle";
import { API_URL } from '@env';
import { useNotes } from "../../context/NotesContext";

export default function Home() {
  const { data, loading, refetch } = useNotes();

  const handleDelete = (itemId) => {
    Alert.alert("¿Estás seguro?", "No puedes revertir estos cambios!", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Si, eliminar",
        style: "destructive",
        onPress: () => {
          fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `action=delete&ID=${itemId}`,
          })
            .then(() => {
              Toast.show({
                type: "success",
                text1: "Operación exitosa",
                text2: "La nota se elimino corectamente👋",
                position: "top",
                visibilityTime: 3000,
                autoHide: true,
                topOffset: 1,
              });
              refetch();
            })
            .catch(() => {
              Alert.alert("Error", "Error al eliminar");
            });
        },
      },
    ]);
  };

  const renderItem = ({ item, drag }) => (
    <View style={homeStyle.cardContainer}>
      <View style={homeStyle.headCard}>
        <Text style={homeStyle.labels}>{`Nota ${item[0]}`}</Text>
        <Button title="Eliminar" onPress={() => handleDelete(item[0])} />
      </View>
      <View style={homeStyle.bodyCard}>
        <Text style={homeStyle.labels}>Titulo</Text>
        <Text>{item[1]}</Text>
        <Text style={homeStyle.labels}>Contenido</Text>
        <Text>{item[2]}</Text>
      </View>
    </View>
  );

  return (
    <View style={homeStyle.container}>
      <Toast />
      <Text style={homeStyle.titulo}>ClipNote...</Text>
      {data.length > 0 && !loading ? (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item[0].toString()}
          onDragEnd={({ data }) => setData(data)}
          contentContainerStyle={homeStyle.containerLista}
        />
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
}
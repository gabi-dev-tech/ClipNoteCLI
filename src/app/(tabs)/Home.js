import { useEffect, useState } from "react";
import { View, Text, Button, Alert } from "react-native";
import { FlatList } from "react-native";
import Toast from "react-native-toast-message";
import { homeStyle } from "../../styles/homeStyle";
import { API_URL } from '@env';

export default function Home() {
  const [data, setData] = useState([]);

  const getData = () => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setData(data.slice(1)))
      .catch((err) => console.error("Error al obtener la data", err));
  };

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
              getData();
              Toast.show({
                type: "success",
                text1: "Operación exitosa",
                text2: "La nota se elimino corectamente👋",
                position: "top",
                visibilityTime: 3000,
                autoHide: true,
                topOffset: 1,
              });
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

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={homeStyle.container}>
      <Toast />
      <Text style={homeStyle.titulo}>ClipNote...</Text>
      {data.length > 0 ? (
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
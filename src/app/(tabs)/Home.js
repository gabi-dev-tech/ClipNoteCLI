import { useState } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { FlatList, ActivityIndicator } from 'react-native';
import Toast from 'react-native-toast-message';
import { homeStyle } from '../../styles/homeStyle';
import { API_URL } from '@env';
import { useNotes } from '../../context/NotesContext';
import { IconButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Home() {
  const [loadingBtn, setLoadingBtn] = useState(false);
  const { data, loading, refetch } = useNotes();
  const [deletingItemId, setDeletingItemId] = useState(null);

  const handleDelete = itemId => {
    setDeletingItemId(itemId);
    Alert.alert('¿Estás seguro?', 'No puedes revertir estos cambios!', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Si, eliminar',
        style: 'destructive',
        onPress: () => {
          setLoadingBtn(true);
          fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `action=delete&ID=${itemId}`,
          })
            .then(() => {
              setLoadingBtn(false);
              Toast.show({
                type: 'success',
                text1: 'Operación exitosa',
                text2: 'La nota se elimino corectamente👋',
                position: 'top',
                visibilityTime: 3000,
                autoHide: true,
                topOffset: 1,
              });
              refetch();
            })
            .catch(() => {
              Alert.alert('Error', 'Error al eliminar');
            });
        },
      },
    ]);
  };

  const renderItem = ({ item }) => {
    const itemId = item[0];
    const isLoading = deletingItemId === itemId;
    return (
      <View style={homeStyle.cardContainer}>
        <View style={homeStyle.headCard}>
          <Text style={homeStyle.labels}>{`Nota ${item[0]}`}</Text>
          <View style={homeStyle.headCardRight}>
            <Text style={{  color: 'gray', fontWeight: 'bold', fontSize: 12, }}>{item[3]}</Text>
            <Text style={{ color: 'gray', fontWeight: 'bold', fontSize: 12, }}>{item[4]}</Text>
            {loadingBtn && isLoading ? (
              <ActivityIndicator size="small" color="#2196F3" />
            ) : (
              <IconButton
                icon="trash-can-outline"
                size={16}
                iconColor="white"
                onPress={() => handleDelete(item[0])}
                style={{ backgroundColor: '#2196F3' }}
              />
            )}
          </View>
        </View>
        <View style={homeStyle.bodyCard}>
          <Text style={homeStyle.labels}>Titulo</Text>
          <Text>{item[1]}</Text>
          <Text style={homeStyle.labels}>Contenido</Text>
          <Text>{item[2]}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={homeStyle.container}>
      <Text style={homeStyle.titulo}>ClipNote</Text>
      <Toast />
      {data.length > 0 && !loading ? (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item[0].toString()}
          onDragEnd={({ data }) => setData(data)}
          contentContainerStyle={homeStyle.containerLista}
        />
      ) : (
        <SafeAreaView
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <ActivityIndicator size="large" color="#2196F3" />
          <Text>Cargando...</Text>
        </SafeAreaView>
      )}
    </View>
  );
}

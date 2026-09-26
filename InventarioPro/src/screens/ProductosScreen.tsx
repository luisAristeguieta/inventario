import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useProductos, Producto } from '../context/ProductoContext';

export default function ProductosScreen() {
  const { productos, deleteProducto, cargando } = useProductos();

  const handleDelete = (id: number, name: string) => {
    Alert.alert('Eliminar Producto', `¿Deseas eliminar "${name}"?`, [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: () => deleteProducto(id),
      },
    ]);
  };

  if (cargando && productos.length === 0) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View>
      <FlatList
        data={productos}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<Text>No hay productos en inventario.</Text>}
        renderItem={({ item }: { item: Producto }) => (
          <View>
            {item.fotoBase64 ? (
              <Image
                source={{ uri: `data:image/jpeg;base64,${item.fotoBase64}` }}
                style={{ width: 60, height: 60 }}
              />
            ) : (
              <View style={{ width: 60, height: 60 }}>
                <Text>Sin foto</Text>
              </View>
            )}

            <Text>{item.nombre}</Text>
            <Text>Categoría: {item.categoria}</Text>
            <Text>Precio: ${item.precio}</Text>

            <TouchableOpacity onPress={() => handleDelete(item.id, item.nombre)}>
              <Text>Eliminar</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
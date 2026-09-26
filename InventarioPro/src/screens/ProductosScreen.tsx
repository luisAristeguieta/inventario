import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { useProductos, Producto } from '../context/ProductoContext';

export default function ProductosScreen() {
  const { productos, deleteProducto, cargando } = useProductos();

  const handleDelete = (id: number, name: string) => {
    Alert.alert(
      'Eliminar Producto',
      `¿Estás seguro de que deseas eliminar "${name}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => deleteProducto(id),
        },
      ]
    );
  };

  if (cargando && productos.length === 0) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={productos}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>📦</Text>
            <Text style={styles.emptyText}>No hay productos en inventario.</Text>
          </View>
        }
        renderItem={({ item }: { item: Producto }) => (
          <View style={styles.card}>
            {item.fotoBase64 ? (
              <Image
                source={{ uri: `data:image/jpeg;base64,${item.fotoBase64}` }}
                style={styles.avatar}
              />
            ) : (
              <View style={[styles.avatar, styles.noImage]}>
                <Text style={styles.noImageText}>Sin foto</Text>
              </View>
            )}

            <View style={styles.info}>
              <Text style={styles.name} numberOfLines={1}>
                {item.nombre}
              </Text>
              <Text style={styles.category}>{item.categoria}</Text>
              <Text style={styles.price}>${item.precio.toFixed(2)}</Text>
            </View>

            <TouchableOpacity
              style={styles.btnDelete}
              onPress={() => handleDelete(item.id, item.nombre)}
            >
              <Text style={styles.btnDeleteText}>🗑️</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  listContent: {
    padding: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e1e1e',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#2e2e2e',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  noImage: {
    backgroundColor: '#2c2c2c',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noImageText: {
    fontSize: 10,
    color: '#888888',
    fontWeight: '600',
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: '#f3f4f6',
  },
  category: {
    fontSize: 13,
    color: '#9ca3af',
    marginTop: 2,
  },
  price: {
    fontSize: 15,
    fontWeight: '700',
    color: '#34d399',
    marginTop: 3,
  },
  btnDelete: {
    backgroundColor: '#3b1c1e',
    padding: 10,
    borderRadius: 8,
    marginLeft: 8,
  },
  btnDeleteText: {
    fontSize: 16,
  },
  emptyContainer: {
    paddingVertical: 50,
    alignItems: 'center',
  },
  emptyIcon: {
    fontSize: 42,
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 15,
    color: '#9ca3af',
  },
});
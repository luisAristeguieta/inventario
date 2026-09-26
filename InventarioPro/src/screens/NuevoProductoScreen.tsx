import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  StyleSheet,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useProductos } from '../context/ProductoContext';

export default function NuevoProductoScreen({ navigation }: any) {
  const { addProducto } = useProductos();

  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [categoria, setCategoria] = useState('');
  const [fotoBase64, setFotoBase64] = useState<string | null>(null);

  const esFormularioValido = nombre.trim().length > 0 && precio.trim().length > 0;

  const tomarFoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso denegado', 'Se requiere acceso a la cámara');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      base64: true,
      quality: 0.3,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      if (result.assets[0].base64) {
        setFotoBase64(result.assets[0].base64);
      }
    }
  };

  const handleGuardar = async () => {
    if (!esFormularioValido) return;

    const precioNumero = parseFloat(precio.trim());
    if (isNaN(precioNumero) || precioNumero <= 0) {
      Alert.alert('Error', 'El precio debe ser un número válido');
      return;
    }

    const exito = await addProducto({
      nombre: nombre.trim(),
      precio: precioNumero,
      categoria: categoria.trim() || 'General',
      fotoBase64,
    });

    if (exito) {
      setNombre('');
      setPrecio('');
      setCategoria('');
      setFotoBase64(null);
      navigation.navigate('Inventario');
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.label}>Nombre del producto *</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej: Teclado Mecánico RGB"
        placeholderTextColor="#666666"
        value={nombre}
        onChangeText={setNombre}
      />

      <Text style={styles.label}>Precio ($) *</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej: 45.99"
        placeholderTextColor="#666666"
        keyboardType="numeric"
        value={precio}
        onChangeText={setPrecio}
      />

      <Text style={styles.label}>Categoría</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej: Periféricos"
        placeholderTextColor="#666666"
        value={categoria}
        onChangeText={setCategoria}
      />

      <TouchableOpacity style={styles.btnSecondary} onPress={tomarFoto}>
        <Text style={styles.btnSecondaryText}>
          {fotoBase64 ? '📸 Cambiar Fotografía' : '📸 Tomar Fotografía'}
        </Text>
      </TouchableOpacity>

      {fotoBase64 && (
        <View style={styles.previewContainer}>
          <Text style={styles.previewLabel}>Foto capturada:</Text>
          <Image
            source={{ uri: `data:image/jpeg;base64,${fotoBase64}` }}
            style={styles.previewImage}
          />
        </View>
      )}

      <TouchableOpacity
        style={[
          styles.btnPrimary,
          !esFormularioValido && styles.btnPrimaryDisabled,
        ]}
        onPress={handleGuardar}
        disabled={!esFormularioValido}
      >
        <Text style={styles.btnPrimaryText}>Guardar Producto</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  content: {
    padding: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#d1d5db',
    marginBottom: 6,
    marginTop: 8,
  },
  input: {
    backgroundColor: '#1e1e1e',
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: '#ffffff',
    marginBottom: 10,
  },
  btnSecondary: {
    backgroundColor: '#1e293b',
    paddingVertical: 13,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  btnSecondaryText: {
    color: '#60a5fa',
    fontWeight: '700',
    fontSize: 15,
  },
  previewContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  previewLabel: {
    fontSize: 13,
    color: '#9ca3af',
    marginBottom: 6,
  },
  previewImage: {
    width: 140,
    height: 140,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#374151',
  },
  btnPrimary: {
    backgroundColor: '#16a34a',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 18,
    marginBottom: 30,
  },
  btnPrimaryDisabled: {
    backgroundColor: '#1b432a',
    opacity: 0.5,
  },
  btnPrimaryText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 16,
  },
});
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert,} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useProductos } from '../context/ProductoContext';

export default function NuevoProductoScreen({ navigation }: any) {
  const { addProducto } = useProductos();

  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [categoria, setCategoria] = useState('');
  const [fotoBase64, setFotoBase64] = useState<string | null>(null);

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

    if (!result.canceled && result.assets && result.assets[0].base64) {
      setFotoBase64(result.assets[0].base64);
    }
  };

  const handleGuardar = async () => {
    if (!nombre.trim() || !precio.trim()) {
      Alert.alert('Error', 'Nombre y precio son obligatorios');
      return;
    }

    const precioNumero = parseFloat(precio);
    if (isNaN(precioNumero) || precioNumero < 0) {
      Alert.alert('Error', 'El precio debe ser un número');
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
    <View>
      <Text>Nombre:</Text>
      <TextInput
        placeholder="Nombre del producto"
        value={nombre}
        onChangeText={setNombre}
      />

      <Text>Precio:</Text>
      <TextInput
        placeholder="0.00"
        keyboardType="numeric"
        value={precio}
        onChangeText={setPrecio}
      />

      <Text>Categoría:</Text>
      <TextInput
        placeholder="Categoría"
        value={categoria}
        onChangeText={setCategoria}
      />

      <TouchableOpacity onPress={tomarFoto}>
        <Text>Tomar Foto</Text>
      </TouchableOpacity>

      {fotoBase64 && (
        <Image
          source={{ uri: `data:image/jpeg;base64,${fotoBase64}` }}
          style={{ width: 100, height: 100 }}
        />
      )}

      <TouchableOpacity onPress={handleGuardar}>
        <Text>Guardar Producto</Text>
      </TouchableOpacity>
    </View>
  );
}
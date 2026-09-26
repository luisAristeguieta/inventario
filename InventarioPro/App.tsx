import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ProductosScreen from './src/screens/ProductosScreen';
import NuevoProductoScreen from './src/screens/NuevoProductoScreen';
import { ProductoProvider } from './src/context/ProductoContext';

export type RootTabParamList = {
  Inventario: undefined;
  Nuevo: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function App() {
  return (
    <ProductoProvider>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="Inventario"
            component={ProductosScreen}
            options={{ title: 'Inventario' }}
          />
          <Tab.Screen
            name="Nuevo"
            component={NuevoProductoScreen}
            options={{ title: 'Nuevo Producto' }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </ProductoProvider>
  );
}


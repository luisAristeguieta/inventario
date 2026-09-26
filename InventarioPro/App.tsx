import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

import ProductosScreen from './src/screens/ProductosScreen';
import NuevoProductoScreen from './src/screens/NuevoProductoScreen';
import { ProductoProvider } from './src/context/ProductoContext';

export type RootTabParamList = {
  Inventario: undefined;
  Nuevo: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

function TabNavigator() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#1e1e1e',
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: '#2d2d2d',
        },
        headerTitleStyle: {
          fontWeight: '700',
          color: '#ffffff',
        },
        tabBarActiveTintColor: '#3b82f6',
        tabBarInactiveTintColor: '#888888',
        tabBarStyle: {
          backgroundColor: '#1e1e1e',
          height: 60 + insets.bottom,
          paddingBottom: insets.bottom > 0 ? insets.bottom : 8,
          paddingTop: 6,
          borderTopWidth: 1,
          borderTopColor: '#2d2d2d',
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen
        name="Inventario"
        component={ProductosScreen}
        options={{
          title: 'Inventario',
          tabBarLabel: 'Inventario',
          tabBarIcon: () => <Text style={{ fontSize: 20 }}>📦</Text>,
        }}
      />
      <Tab.Screen
        name="Nuevo"
        component={NuevoProductoScreen}
        options={{
          title: 'Nuevo Producto',
          tabBarLabel: 'Agregar',
          tabBarIcon: () => <Text style={{ fontSize: 20 }}>➕</Text>,
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <ProductoProvider>
        <NavigationContainer theme={DarkTheme}>
          <TabNavigator />
        </NavigationContainer>
      </ProductoProvider>
    </SafeAreaProvider>
  );
}
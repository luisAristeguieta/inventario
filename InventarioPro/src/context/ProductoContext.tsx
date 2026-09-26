import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Alert } from 'react-native';
import { api } from '../config/api';

export type Producto = {
    id: number;
    nombre: string;
    precio: number;
    categoria: string;
    fotoBase64?: string | null;
    createdAt?: string;
};

export type ProductoInput = Omit<Producto, 'id' | 'createdAt'>; // Asi no se coloca la condicion en editar y crear

// Solo obtener, crear y eliminar productos
type ProductoContextType = {
    productos: Producto[];
    cargando: boolean;
    fetchProductos: () => Promise<void>;
    addProducto: (producto: ProductoInput) => Promise<boolean>;
    deleteProducto: (id: number) => Promise<boolean>;
};

const ProductoContext = createContext<ProductoContextType | undefined>(undefined);

export function ProductoProvider({ children }: { children: ReactNode }) {
    const [productos, setProductos] = useState<Producto[]>([]);
    const [cargando, setCargando] = useState<boolean>(false);

    // Obtener la lista de productos (GET /productos)
    const fetchProductos = async (): Promise<void> => {
        setCargando(true);
        try {
            const response = await api.get<Producto[]>('/productos');
            setProductos(response.data);
        } catch (error) {
            console.error('Error al conectar con la API:', error);
            Alert.alert('Error', 'No se pudo conectar con el servidor local');
        } finally {
            setCargando(false);
        };
    };

    useEffect(() => {
        fetchProductos();
    }, []);

    // Post
    const addProducto = async (nuevoProducto: ProductoInput): Promise<boolean> => {
        try {
            const response = await api.post<Producto>('/productos', nuevoProducto);
            setProductos((prev) => [response.data, ...prev]);
            return true;
        } catch (error) {
            console.error('Error al guardar producto:', error);
            Alert.alert('Error', 'No se pudo guardar el producto');
            return false;
        };
    };

    // Eliminar un producto (DELETE /productos/:id)
    const deleteProducto = async (id: number): Promise<boolean> => {
        try {
            await api.delete(`/productos/${id}`);
            // Filtra y remueve del estado local
            setProductos((prev) => prev.filter((p) => p.id !== id));
            return true;
        } catch (error) {
            console.error('Error al eliminar producto:', error);
            Alert.alert('Error', 'No se pudo eliminar el producto');
            return false;
        }
    };

    return (
        <ProductoContext.Provider
            value={{ productos, cargando, fetchProductos, addProducto, deleteProducto, }}>
            {children}
        </ProductoContext.Provider>
    );
};

export function useProductos() {
    const context = useContext(ProductoContext);
    if (!context) {
        throw new Error('useProductos debe usarse dentro de un ProductoProvider');
    }
    return context;
};
# InventarioPro - Gestión de Inventario Fullstack Móvil

Aplicación móvil desarrollada con React Native, Expo y TypeScript, conectada a una API REST en Node.js, Express y PostgreSQL.

Para la realización de este proyecto se diseñó una solución integral de inventario con captura multimedia y persistencia en base de datos relacional, implementando navegación nativa y manejo de estado global:

📱 **Tab Navigation (createBottomTabNavigator):** Gestiona la navegación principal de la aplicación mediante una barra inferior persistente con soporte para áreas seguras (`SafeAreaProvider`), permitiendo alternar al instante entre el catálogo de "Inventario" y el formulario de "Nuevo Producto".

---

## 📦 Descripción del Proyecto

La aplicación implementa un flujo completo de gestión de stock en tiempo real consumiendo endpoints REST mediante Axios y un Contexto global (`ProductoContext`):

* **Pestaña 1 - Inventario (`ProductosScreen`):**
  * Listado reactivo con `FlatList` alimentado directamente desde la base de datos PostgreSQL.
  * Tarjetas de producto con nombre, categoría y precio formateado.
  * Condicional visual de imagen: renderiza la fotografía en Base64 (`data:image/jpeg;base64,...`) si existe, o muestra un contenedor alternativo de "Sin foto".
  * Eliminación física del registro (`DELETE /productos/:id`) con ventana modal de confirmación nativa (`Alert.alert`).
* **Pestaña 2 - Nuevo Producto (`NuevoProductoScreen`):**
  * Formulario controlado para captura de datos: nombre, precio numérico y categoría.
  * Integración de hardware con `expo-image-picker` para capturar fotos con la cámara en formato Base64 optimizado (calidad 0.3) y previsualización inmediata.
  * Botón condicional "Guardar Producto": se mantiene deshabilitado hasta que los campos obligatorios (nombre y precio) contengan información válida.
  * Redirección automática a la pestaña de Inventario y limpieza del formulario tras completar el guardado con éxito.

---

## 🕹️ Tecnologías Implementadas

* React Native
* Expo
* TypeScript
* @react-navigation/native
* @react-navigation/bottom-tabs
* react-native-safe-area-context
* expo-image-picker
* axios
* Node.js & Express
* PostgreSQL

---

## 📸 Capturas de Pantalla y Video Demostrativo

A continuación se presentan las evidencias visuales del funcionamiento de la aplicación, ubicadas en la carpeta `Entregable Frontend`:

| Captura de Foto | Listado con Estilo |
| :---: | :---: |
| ![Captura de foto sin formato](./InventarioPro/Entregable%20Frontend/Capture%20de%20foto%20sin%20formato.png) | ![Listado con estilo](./InventarioPro/Entregable%20Frontend/Listado%20con%20estilo.png) |

| Guardar Producto | Producto Guardado |
| :---: | :---: |
| ![Guardar Producto](./InventarioPro/Entregable%20Frontend/Guardar%20Producto.png) | ![Producto Guardado](./InventarioPro/Entregable%20Frontend/Producto%20Guardado.png) |

| Eliminar Producto | Pantallas sin Formato |
| :---: | :---: |
| ![Eliminar Producto](./InventarioPro/Entregable%20Frontend/Eliminar%20Producto.png) | ![Pantallas sin formato](./InventarioPro/Entregable%20Frontend/Pantallas%20sin%20formato.png) |

🎥 **Video Funcional de la App:**
[Ver Video Funcional](./InventarioPro/Entregable%20Frontend/Video%20funcional%20app.mp4)

---

## 🔧 Instalación y Uso

Para poder ejecutar el proyecto, sigue los siguientes pasos:

1. Clona el repositorio desde la terminal:
   ```bash
   git clone https://github.com/luisAristeguieta/inventarioo.git
   cd inventarioo

2. Instala las dependencias del frontend:
    ```bash
    cd InventarioPro
    npm install

3. Configura y ejecuta el backend (en otra terminal):
    ```bash
    cd backend-inventario
    npm install
    npm run dev:watch

4. Inicia la aplicación móvil:
    ```bash
    cd InventarioPro
    npx expo start

⚠️ Aclaratoria
Este proyecto fue desarrollado con fines exclusivamente educativos como parte de un proceso de aprendizaje en el desarrollo de aplicaciones móviles Fullstack. No está destinado a uso comercial ni a producción en su estado actual. El código, la arquitectura y las prácticas implementadas tienen como objetivo demostrar el dominio de las tecnologías utilizadas (React Native, Expo, Node.js, Express y PostgreSQL) en un entorno controlado de estudio.
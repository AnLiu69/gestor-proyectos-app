# Gestor de Proyectos y Tareas - Guía Completa

## 📋 Descripción del Proyecto

**Gestor de Proyectos y Tareas** es una aplicación web moderna desarrollada con **Vue 3** y **Vite** que permite administrar eficientemente tus proyectos y tareas. La aplicación ofrece funcionalidades para crear, editar, eliminar, filtrar y visualizar el estado en tiempo real de tus actividades profesionales.

### Características Principales

✅ **Gestión de Proyectos**
- Crear nuevos proyectos con nombre, descripción y estado
- Editar información de proyectos existentes
- Visualizar lista completa de proyectos
- Filtrar proyectos por estado (Activo, En pausa, Completado, Cancelado)
- Eliminar proyectos

✅ **Gestión de Tareas**
- Crear tareas asociadas a proyectos
- Asignar prioridad (Baja, Media, Alta) a las tareas
- Cambiar estado de tareas (Pendiente, En progreso, Completada, Bloqueada)
- Editar información de tareas
- Filtrar tareas por proyecto y estado
- Eliminar tareas

✅ **Interfaz Intuitiva**
- Tabla interactiva con scroll horizontal
- Modales para crear y editar información
- Componentes de filtro dinámicos
- Diseño responsivo

✅ **Arquitectura Moderna**
- Gestión de estado con Pinia
- Rutas dinámicas con Vue Router
- Peticiones HTTP con Axios
- Componentes Vue reutilizables
- Estilos CSS modular

---

## 🚀 Instalación

### Requisitos Previos

Asegúrate de tener instalado:
- **Node.js** v18 o superior ([Descargar aquí](https://nodejs.org))
- **npm** v9 o superior (incluido con Node.js)

Verifica las versiones instaladas:
```bash
node -v
npm -v
```

### Pasos de Instalación

#### 1. Clonar el Repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd gestor-proyectos-app
```

#### 2. Instalar Dependencias

```bash
npm install
```

Este comando descargará e instalará todas las dependencias especificadas en el archivo `package.json`:

| Dependencia | Versión | Propósito |
|------------|---------|----------|
| Vue | ^3.5.22 | Framework de UI |
| Vue Router | ^4.5.1 | Enrutamiento de páginas |
| Pinia | ^3.0.3 | Gestión de estado global |
| Axios | ^1.13.2 | Cliente HTTP |

---

## 🎮 Uso y Comandos

### Ejecutar en Desarrollo

Para iniciar el servidor de desarrollo con recarga en caliente:

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173` (Vite usa este puerto por defecto).

**Características del modo desarrollo:**
- Recarga automática al guardar cambios
- HMR (Hot Module Replacement) habilitado
- Acceso completo a DevTools de Vue

### Crear Build de Producción

Para compilar la aplicación para producción:

```bash
npm run build
```

Esto generará los archivos optimizados en la carpeta `dist/`. Los archivos estarán listos para desplegarse en cualquier servidor web estático.

### Vista Previa de Producción

Para previsualizar cómo se verá en producción:

```bash
npm run preview
```

---

## 📂 Estructura del Proyecto

```
gestor-proyectos-app/
├── src/
│   ├── api/
│   │   └── axios.js              # Configuración del cliente HTTP
│   ├── assets/
│   │   ├── style.css             # Estilos generales
│   │   ├── form-styles.css       # Estilos de formularios
│   │   ├── modal-styles.css      # Estilos de modales
│   │   ├── view-styles.css       # Estilos de vistas
│   │   └── img/                  # Imágenes y recursos
│   ├── components/
│   │   ├── ButtonComponent.vue   # Componente de botones
│   │   ├── FilterComponent.vue   # Componente de filtros
│   │   ├── FormComponent.vue     # Componente de formularios
│   │   └── TableComponent.vue    # Componente de tabla
│   ├── composibles/
│   │   ├── useProjectForm.js     # Lógica reutilizable para formularios de proyectos
│   │   └── useTaskForm.js        # Lógica reutilizable para formularios de tareas
│   ├── router/
│   │   └── index.js              # Configuración de enrutamiento
│   ├── stores/
│   │   ├── project.js            # Store Pinia para proyectos
│   │   └── task.js               # Store Pinia para tareas
│   ├── utils/
│   │   ├── dataProjectsCleaners.js    # Funciones de limpieza de datos de proyectos
│   │   ├── dataTasksCleaners.js       # Funciones de limpieza de datos de tareas
│   │   ├── diccionaryStatus.js        # Diccionario de estados
│   │   ├── httpErrorHandler.js        # Manejo de errores HTTP
│   │   └── slugify.js                 # Convertir strings a slugs
│   ├── views/
│   │   ├── ProjectList.vue       # Vista principal de proyectos
│   │   └── TaskList.vue          # Vista de tareas
│   ├── App.vue                   # Componente raíz
│   └── main.js                   # Punto de entrada de la aplicación
├── index.html                    # HTML principal
├── vite.config.js                # Configuración de Vite
├── package.json                  # Dependencias y scripts
├── package-lock.json             # Lock file de dependencias
└── README.md                      # Este archivo
```

---

## 🔧 Variables de Entorno

Por seguridad, las variables de entorno no se incluyen en el repositorio.

**Configurar entorno** En la raíz del proyecto, verás un archivo llamado .env.example.

- Crea un nuevo archivo llamado .env.
- Copia la estructura del ejemplo.
- Ingresa tu propia URL de MockAPI (o el endpoint que desees utilizar).



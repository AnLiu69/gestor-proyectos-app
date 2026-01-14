# Gestor de Proyectos y Tareas - Guía Completa

## 📋 Descripción del Proyecto

**Gestor de Proyectos y Tareas** es una aplicación web moderna desarrollada con **Vue 3** y **Vite** que permite administrar eficientemente tus proyectos y tareas. La aplicación ofrece funcionalidades completas para crear, editar, filtrar y visualizar el estado en tiempo real de tus actividades profesionales con una interfaz intuitiva y responsiva.

### Características Principales

✅ **Gestión de Proyectos**
- Crear nuevos proyectos con nombre, descripción y estado
- Editar información de proyectos existentes
- Visualizar lista completa de proyectos con paginación
- Filtrar proyectos por estado (Activo, En pausa, Completado, Cancelado)

✅ **Gestión de Tareas**
- Crear tareas asociadas a proyectos
- Asignar prioridad (Baja, Media, Alta) a las tareas
- Cambiar estado de tareas (Pendiente, En progreso, Completada, Bloqueada)
- Editar información de tareas
- Filtrar tareas por proyecto y estado
- Paginación automática con límite de 10 registros por página

✅ **Interfaz Intuitiva**
- Tabla interactiva con scroll horizontal
- Modales para crear y editar información
- Componentes de filtro dinámicos
- Componentes de botones reutilizables
- Sistema de navegación completo
- Diseño responsivo

✅ **Arquitectura Moderna**
- Gestión de estado global con Pinia
- Rutas dinámicas con Vue Router (SPA)
- Peticiones HTTP con Axios
- Manejo robusto de errores HTTP
- Componentes Vue reutilizables y modular
- Estilos CSS modular con escalabilidad
- Composables reutilizables para lógica común

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
| Vue | ^3.5.22 | Framework de UI y componentes |
| Vue Router | ^4.5.1 | Enrutamiento y navegación SPA |
| Pinia | ^3.0.3 | Gestión de estado global reactividad |
| Axios | ^1.13.2 | Cliente HTTP para peticiones |
| @vueuse/core | ^14.1.0 | Composables reutilizables de Vue |
| Vite | ^7.1.7 | Build tool y dev server |
| @vitejs/plugin-vue | ^6.0.1 | Plugin de Vue para Vite |

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
│   │   └── axios.js                      # Configuración del cliente HTTP con Axios
│   ├── assets/
│   │   ├── style.css                     # Estilos generales de la aplicación
│   │   ├── form-styles.css               # Estilos específicos de formularios
│   │   ├── modal-styles.css              # Estilos de modales y diálogos
│   │   ├── view-styles.css               # Estilos de vistas principales
│   │   └── img/                          # Imágenes y recursos visuales
│   ├── components/
│   │   ├── ArrowComponent.vue            # Componente de icono de flecha
│   │   ├── ButtonComponent.vue           # Componente reutilizable de botones
│   │   ├── FilterComponent.vue           # Componente de filtros dinámicos
│   │   ├── FormComponent.vue             # Componente de formularios genérico
│   │   ├── NavComponent.vue              # Componente de navegación
│   │   └── TableComponent.vue            # Componente de tabla interactiva
│   ├── composibles/
│   │   ├── useProjectForm.js             # Composable para lógica de formularios de proyectos
│   │   └── useTaskForm.js                # Composable para lógica de formularios de tareas
│   ├── router/
│   │   └── index.js                      # Configuración de rutas Vue Router
│   ├── stores/
│   │   ├── project.js                    # Store Pinia para estado de proyectos
│   │   └── task.js                       # Store Pinia para estado de tareas
│   ├── utils/
│   │   ├── dataProjectsCleaners.js       # Funciones para limpiar/procesar datos de proyectos
│   │   ├── dataTasksCleaners.js          # Funciones para limpiar/procesar datos de tareas
│   │   ├── diccionaryStatus.js           # Diccionario centralizado de estados
│   │   ├── httpErrorHandler.js           # Manejo centralizado de errores HTTP
│   │   └── slugify.js                    # Convertir strings a slugs URL-friendly
│   ├── views/
│   │   ├── ProjectList.vue               # Vista principal de gestión de proyectos
│   │   └── TaskList.vue                  # Vista de gestión de tareas
│   ├── App.vue                           # Componente raíz de la aplicación
│   └── main.js                           # Punto de entrada y configuración inicial
├── public/
│   └── _redirects                        # Configuración de redirecciones (Netlify)
├── index.html                            # HTML principal
├── vite.config.js                        # Configuración de Vite
├── package.json                          # Dependencias y scripts del proyecto
├── package-lock.json                     # Lock file de npm
└── README.md                              # Este archivo
```

---

## 🌐 Configuración de API

El cliente HTTP Axios está configurado en `src/api/axios.js` con:
- Base URL configurable
- Interceptores para peticiones/respuestas
- Manejo de autenticación (si aplica)

---

## 🚀 Ruta de Navegación

La aplicación utiliza Vue Router con dos rutas principales:

| Ruta | Vista | Descripción |
|------|-------|-------------|
| `/` | ProjectList.vue | Gestión de proyectos |
| `/tasks` | TaskList.vue | Gestión de tareas |

Las rutas son lazy-loaded para optimizar el bundle inicial.


## 🔧 Variables de Entorno

Por seguridad, las variables de entorno no se incluyen en el repositorio.

**Configurar entorno:** En la raíz del proyecto, verás un archivo llamado .env.example.

- Crea un nuevo archivo llamado .env.
- Copia la estructura del ejemplo.
- Ingresa tu propia URL de API (MockAPI, backend propio, etc.)
- El prefijo `VITE_` es necesario para que Vite exponga la variable

---

## 📝 Paginación y Rendimiento

- **Límite por página:** 10 registros
- **Carga bajo demanda:** Los datos se cargan por página
- **Lazy loading de componentes:** Vue Router carga vistas bajo demanda
- **Lazy loading de imágenes:** Optimizado en assets

---

## 🎨 Estilos y Temas

El proyecto utiliza CSS modular con archivos separados por funcionalidad:
- **style.css** - Variables globales y reset
- **form-styles.css** - Estilos de entrada de datos
- **modal-styles.css** - Estilos de diálogos
- **view-styles.css** - Layout de vistas

**Escalabilidad:** Los estilos están organizados para facilitar la implementación futura de temas o cambios globales.

### 🌙 Dark Mode

La aplicación está preparada para implementar Dark Mode:

**Características:**
- ✅ Detección automática de preferencia del sistema (prefers-color-scheme)
- ✅ Toggle manual en la interfaz
- ✅ Persistencia en localStorage
- ✅ Transiciones suaves entre temas
- ✅ Soporte para contraste accesible

**Estados Preparados:**
- Dark mode para reducción de fatiga visual
- Modo claro para entornos bien iluminados
- Modo automático basado en hora del día (opcional)

---

## 🐛 Manejo de Errores

La aplicación incluye manejo robusto de errores:
- **Errores HTTP:** Capturados y convertidos a mensajes legibles
- **Errores de validación:** Mostrados en formularios
- **Estados de carga:** Feedback visual durante operaciones
- **Reintentos:** Posibilidad de reintentar operaciones fallidas

---

## 🔐 Seguridad

- ✅ Validación de entrada en formularios
- ✅ CORS configurado en backend
- ✅ Axios interceptors para manejo de autenticación
- ✅ Variables de entorno no expuestas en código

## � Integración Continua (CI/CD)

### GitHub Actions

La aplicación está preparada para implementar workflows de CI/CD con GitHub Actions:


### Automatización Implementada

- ✅ **Build Automático** - Se ejecuta en cada push
- ✅ **Testing** - Validación en múltiples versiones de Node.js
- ✅ **Despliegue Automático** - A Netlify/Vercel en rama main
- ✅ **Validación de Dependencias** - npm ci para reproducibilidad
- ✅ **Caché de Dependencias** - Acelera CI workflows

### Monitoreo

- Monitorizar logs de build en GitHub Actions
- Alertas de fallos en despliegue
- Versioning semántico de releases


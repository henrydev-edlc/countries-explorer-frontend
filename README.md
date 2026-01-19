# 🌍 Countries Explorer - Frontend

Aplicación desarrollada con **React** y **TypeScript** para la exploración, búsqueda y comparación de países. Este proyecto fue diseñado con un enfoque en la experiencia de usuario (UX) y siguiendo estándares de la industria.

## 🚀 Características
- **Filtrado Avanzado**: Búsqueda por nombre, región y lenguajes dinámicos.
- **Comparativa de Países**: Panel interactivo para comparar datos demográficos de dos países a la vez.
- **Modo Oscuro/Claro**: Alternador de tema profesional con iconos dinámicos y paleta de colores personalizada (`#0a1929`).
- **Navegación Fluida**: Navegación entre países vecinos manteniendo el estado de filtros y paginación mediante historial.
- **Diseño Responsivo**: Contenedores centrados y cuadrículas adaptables con Material UI.

## 🛠️ Tecnologías
- **Framework**: React 18 (Vite) + TypeScript.
- **UI & Estilos**: Material UI (MUI).
- **Gestión de Rutas**: React Router DOM.
- **API**: Axios (RestCountries API).
- **Despliegue**: Docker & Docker Compose.

## 📦 Instalación y Uso Local

1.  **Clonar y entrar a la carpeta:**
    ```bash
    git clone https://github.com/henrydev-edlc/countries-explorer-frontend.git
    cd countries-app
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Correr en desarrollo:**
    ```bash
    npm run dev
    ```

## 🐳 Docker y Despliegue

### Imagen en DockerHub
La imagen oficial de esta aplicación puede encontrarse en:
> **URL:** [https://hub.docker.com/r/TU_USUARIO/countries-frontend](https://hub.docker.com/r/henrydev2026/countries-frontend)

### Ejecutar con Docker Compose
Este proyecto incluye una configuración de orquestación para levantar el Frontend y el Backend simultáneamente:

```bash
docker-compose up --build

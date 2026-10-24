# Préstamos Lab

Aplicación web para controlar el préstamo de equipos del laboratorio de cómputo: qué equipo está prestado, a quién y hasta cuándo.

Hecha con React + TypeScript (Vite), con una API REST simulada con json-server.

## Requisitos

- Node.js 18 o superior
- npm
- Git

## Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/mchenc1-tech/prestamos-lab.git
cd prestamos-lab
```

2. Instalar las dependencias:

```bash
npm install
```

## Variables de entorno

El proyecto incluye un archivo `.env` con la URL base de la API:

```
VITE_API_URL=/api
```

Vite redirige las peticiones de `/api` hacia `http://localhost:3001` (ver `vite.config.ts`), así se evitan problemas de CORS.

## Ejecución

Se necesitan **dos terminales abiertas al mismo tiempo**, ambas dentro de la carpeta del proyecto.

**Terminal 1: levantar la API** (puerto 3001)

```bash
npm run api
```

**Terminal 2: levantar el frontend**

```bash
npm run dev
```

Luego abrir en el navegador la dirección que muestra la terminal, normalmente `http://localhost:5173`.

> Si se cambia el archivo `.env` o `vite.config.ts`, hay que detener y volver a iniciar `npm run dev`.

## Endpoints de la API

| Método | Endpoint | Uso |
|--------|----------|-----|
| GET | `/equipos` | Cargar el inventario |
| GET | `/prestamos?devuelto=false` | Cargar préstamos activos |
| POST | `/prestamos` | Registrar un préstamo |
| PATCH | `/equipos/:id` | Cambiar disponibilidad |
| PATCH | `/prestamos/:id` | Marcar un préstamo como devuelto |

Los datos se guardan en el archivo `db.json`.

## Estructura del proyecto

```
src/
  components/   Componentes de presentación
  pages/        Vistas principales
  services/     Funciones que llaman a la API
  hooks/        Custom hooks (useEquipos, usePrestamos)
  utils/        Validaciones
  types/        Interfaces TypeScript
  data/         Datos de prueba
```

## Reglas de la variante

- Categorías de equipo: Tablet, Cámara y Micrófono
- Máximo de días de préstamo: 2
- No se presta los fines de semana: una fecha límite en sábado o domingo no es válida
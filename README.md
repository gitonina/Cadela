# Cadela

Proyecto para el ramo CC5003 - Aplicaciones Web Reactivas

## Ejecución del proyecto

- Ejecutar los siguientes comandos para correr el backend:

```sh
cd backend
npm install
ts-node src/seed_data.ts
npm run dev
```

- Para correr el frontend:

```sh
cd frontend
npm install
npm run dev
```

Mapa de rutas:

Como registrarse: Colocas tu nombre, tu rut, numero de dorsal y club. 
Como loguearse: Colocas tu rut y tu contraseña.

Finalmente, abrir el sitio web en [localhost](http://localhost:5173/) en el puerto 5173

# Tema del proyecto

El presente proyecto consiste en el desarrollo de una nueva plataforma web que la organización de
ciclismo CANADELA pudiera utilizar, inspirada en la página actual https://ciclismocanadela.cl/, pero
creada desde cero con un enfoque moderno, interactivo y escalable.
Actualmente, el sitio oficial de la agrupación cumple funciones básicas, como la publicación de inscripciones, difusión de resultados y entrega de información de carreras. Sin embargo, estas se gestionan de
forma limitada: la inscripción se realiza mediante formularios externos (Google Forms), los resultados
se publican en imágenes estáticas (pantallazos de planillas Excel) y la difusión de carreras se centra en
afiches o publicaciones poco estructuradas. Esto dificulta tanto la experiencia de los deportistas como
la labor administrativa de la organización.
Nuestro proyecto busca modernizar esta experiencia digital mediante una aplicación fullstack utilizando React. La plataforma permitirá a los corredores acceder de manera simple a la información de las
carreras, inscribirse a través de formularios integrados en el sistema, visualizar resultados en formatos
más claros e interactivos, y acceder a un calendario organizado de próximas competencias.
Asimismo, se contempla la creación de un módulo administrativo, que permitirá a los organizadores
gestionar carreras (crear, editar y publicar) y cargar resultados de manera estructurada, mejorando así
la transparencia y accesibilidad de la información deportiva.
Con este proyecto, buscamos no solo recrear el sitio existente, sino elevarlo a un estándar más moderno
y funcional, que beneficie tanto a los corredores y clubes, como a la organización y a la comunidad
ciclista en general.

# Pruebas End-to-End (E2E) - Cadela

Este directorio contiene las pruebas automatizadas de extremo a extremo para la aplicación Cadela, implementadas con Playwright.

El objetivo de estas pruebas es simular la interacción de un usuario real con la aplicación, asegurando que los flujos críticos (Login, Registro, Administración) funcionen correctamente integrados con el Backend y la Base de Datos.

📋 Prerrequisitos

Para ejecutar estas pruebas, el ecosistema completo debe estar corriendo en un modo especial de pruebas.

1. Backend en "Modo Test"

Las pruebas E2E requieren borrar y repoblar la base de datos constantemente. Por seguridad, esto solo se permite si el backend corre en modo test.

Puerto esperado: 3001

Base de Datos: test_cadela (MongoDB)

## En la terminal del Backend (/backend)

npm run start:test

Nota: Este comando habilita el endpoint /api/testing/reset que es vital para los tests.

2. Frontend

El frontend debe estar servido para que Playwright pueda navegar por él.

Puerto esperado: 5173 (Vite default)

## En la terminal del Frontend (/frontend)

npm run dev

🚀 Instalación y Ejecución

Una vez que el Backend y Frontend están corriendo en sus respectivas terminales:

Entra a la carpeta de tests:

cd e2etests

Instala las dependencias (solo la primera vez):

npm install
npx playwright install --with-deps

Ejecuta las pruebas:

Comando

Descripción

npm test

Ejecuta todos los tests en modo consola (headless).

npm run test:ui

Recomendado. Abre una interfaz interactiva para ver los tests corriendo paso a paso, inspeccionar errores y ver el navegador en tiempo real.

npm run test:report

Genera y abre un reporte HTML detallado de la última ejecución.


Diseño y Estilo

Se usó la librería de estilos Material UI, con sus respectivos componentes (Box, Typography, Paper, Button, Grid, CircularProgres, etc) e íconos (Lock, PersonIcon, NumbersIcon, FingerprintIcon). 

Además, se implementaron varios componentes en la carpeta /frontend/src/components/ui para así mejorar el diseño de la aplicación.


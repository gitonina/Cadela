Pruebas End-to-End (E2E) - Cadela

Este directorio contiene las pruebas automatizadas de extremo a extremo para la aplicación Cadela, implementadas con Playwright.

El objetivo de estas pruebas es simular la interacción de un usuario real con la aplicación, asegurando que los flujos críticos (Login, Registro, Administración) funcionen correctamente integrados con el Backend y la Base de Datos.

📋 Prerrequisitos

Para ejecutar estas pruebas, el ecosistema completo debe estar corriendo en un modo especial de pruebas.

1. Backend en "Modo Test"

Las pruebas E2E requieren borrar y repoblar la base de datos constantemente. Por seguridad, esto solo se permite si el backend corre en modo test.

Puerto esperado: 3001

Base de Datos: test_cadela (MongoDB)

# En la terminal del Backend (/backend)

npm run start:test

Nota: Este comando habilita el endpoint /api/testing/reset que es vital para los tests.

2. Frontend

El frontend debe estar servido para que Playwright pueda navegar por él.

Puerto esperado: 5173 (Vite default)

# En la terminal del Frontend (/frontend)

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

# 🎫 Ticketing System - Frontend

Sistema de gestión de incidencias y tickets de soporte desarrollado con **Angular**. Esta aplicación ofrece una interfaz de usuario de alto nivel orientada a la eficiencia operativa, con un diseño "SaaS-ready" y funcionalidades avanzadas de gestión.

## 🚀 Funcionalidades Principales

### 🖥️ Gestión de Tickets (Dashboard)
* **Listado Avanzado:** Tabla optimizada con estados visuales animados y priorización por colores.
* **Buscador Inteligente:** Filtros dinámicos por título, estado y prioridad.
* **Acciones Rápidas:** Botón para alternar entre "Mis Tickets" y "Todos los Tickets" para una gestión personalizada.

### 🔍 Detalle del Ticket y Comunicación
* **Ticket Detail View:** Página dedicada con diseño de doble columna para separar la información técnica del historial.
* **Línea de Tiempo (Timeline):** Sistema de historial y comentarios para mantener una comunicación fluida entre el autor y el soporte.
* **Quick State Actions:** Botones de gestión rápida para cambiar el estado a "In Progress" o "Closed" con un solo clic desde el detalle.

### 📊 Reportes y Utilidades
* **Exportación a Excel:** Generación de reportes detallados en formato `.xlsx` utilizando la librería `xlsx`.
* **Urgencia Visual:** Sistema de alertas para tickets de alta prioridad con más de 24 horas de antigüedad.
* **Diseño Responsivo:** Interfaz adaptada para resoluciones de escritorio y dispositivos móviles mediante Tailwind CSS.

## 🛠️ Stack Tecnológico

* **Framework:** Angular (v17+)
* **Estilos:** Tailwind CSS (Diseño moderno, bordes redondeados, sombras dinámicas)
* **Manejo de Datos:** RxJS y HttpClient
* **Exportación:** Librería XLSX

## 🔌 Conexión con el Backend

Este frontend está diseñado para conectarse a una **REST API** desarrollada en Node.js/Express. El backend debe estar corriendo en un repositorio independiente.

**Endpoints principales consumidos:**
* `GET /api/tickets`: Obtención de tickets con soporte para paginación y filtros.
* `POST /api/comments`: Creación de nuevos comentarios vinculados a un ticket.
* `PUT /api/tickets/:id`: Actualización de estados y datos del ticket.


## 📦 Instalación y Uso

1.  **Clonar el repositorio:**
    ```bash
    git clone [https://github.com/tu-usuario/ticketing-frontend.git](https://github.com/tu-usuario/ticketing-frontend.git)
    ```
2.  **Instalar dependencias:**
    ```bash
    npm install
    ```
3.  **Correr el servidor de desarrollo:**
    ```bash
    ng serve
    ```
4.  Abrir el navegador en `http://localhost:4200`.

---
Desarrollado por Balti2003
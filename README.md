# Juego de Trivia con Procesamiento de Lenguaje Natural (NLP)
El presente proyecto consiste en el desarrollo de un **juego de trivia interactivo** que incorpora técnicas básicas de **Procesamiento de Lenguaje Natural (NLP)** para evaluar respuestas ingresadas por los usuarios en lenguaje natural. A diferencia de los juegos tradicionales que validan respuestas de forma estricta, este sistema permite analizar y comparar respuestas de manera flexible, reconociendo variaciones en la forma de expresión del usuario.

# Tecnologías Utilizadas
- **React**
  - Librería de JavaScript para la construcción de interfaces de usuario basadas en componentes.
  - Maneja la lógica del juego, estados y eventos.

- **Vite**
  - Herramienta moderna de desarrollo y construcción de aplicaciones frontend.
  - Permite un arranque rápido del proyecto y recarga en caliente.

- **Material UI (MUI)**
  - Biblioteca de componentes visuales basada en Material Design.
  - Utilizada para el diseño de la interfaz gráfica del juego.

- **React Router DOM**
  - Librería para la navegación entre distintas vistas de la aplicación.
  - Gestiona las rutas de inicio, juego y resultados.

- **Firebase Firestore**
  - Base de datos NoSQL en la nube.
  - Almacena las preguntas, respuestas y puntajes del juego.

# Objetivos
    -Generar preguntas dinámicas y personalizadas
Utilizar modelos de NLP para crear preguntas de trivia que varíen según el nivel del jugador, sus respuestas previas o temas seleccionados, evitando preguntas repetitivas.

    -Mejorar la interacción y fluidez del juego
Integrar NLP para que el juego pueda dar retroalimentación natural, explicaciones de respuestas y pistas generadas automáticamente, creando una experiencia similar a conversar con un asistente inteligente.

# Comandos Principales Utilizados en el Proyecto
## `npm create vite@latest trivia-nlp`
**Función:**  
Crea la estructura inicial del proyecto utilizando **Vite** como herramienta de desarrollo.  
Permite iniciar una aplicación **React** de forma rápida y moderna.

### Opciones seleccionadas en Vite
Durante la creación del proyecto se utilizaron las siguientes opciones en el asistente de Vite:

- **Framework seleccionado:** React  
- **Variante seleccionada:** JavaScript  
- **Uso de rolldown-vite (Experimental):** No  
- **Instalación de dependencias:** npm  
- **Inicio automático del servidor de desarrollo:** Sí  

Estas configuraciones permiten trabajar con una aplicación React moderna, optimizada y lista para el desarrollo del juego de trivia con Procesamiento de Lenguaje Natural (NLP).


---

## `cd trivia-nlp`
**Función:**  
Ingresa a la carpeta del proyecto recién creado para poder trabajar dentro de él.

---

## `npm install`
**Función:**  
Instala todas las dependencias básicas definidas en el proyecto, necesarias para que la aplicación funcione correctamente.

---

## `npm run dev`
**Función:**  
Inicia el servidor de desarrollo de Vite y ejecuta la aplicación en el navegador.  
Permite visualizar el proyecto en tiempo real mientras se desarrolla.

---

## `npm install @mui/material @mui/icons-material @emotion/react @emotion/styled`
**Función:**  
Instala **Material UI (MUI)** y sus dependencias para el diseño de la interfaz gráfica del juego.

---

## `npm install react-router-dom`
**Función:**  
Instala la librería encargada de gestionar la navegación entre las diferentes páginas de la aplicación (inicio, juego y resultados).

---

## `npm install firebase`
**Función:**  
Instala el SDK de **Firebase**, que permite conectar la aplicación con la base de datos Firestore y otros servicios en la nube.

---

## `npm install string-similarity compromise`
**Función:**  
Instala las librerías utilizadas para aplicar técnicas básicas de **Procesamiento de Lenguaje Natural (NLP)** y comparar respuestas en lenguaje natural.

---

## `mkdir src\components, src\data, src\pages, src\services`
**Función:**  
Crea la estructura de carpetas dentro del directorio `src` para organizar los componentes, los datos del proyecto, las páginas de la aplicación y los servicios como Firebase o lógica de acceso a datos.

---

## `npm run build`
**Función:**  
Compila la aplicación para producción, generando los archivos optimizados listos para su despliegue.

---

## `npm run preview`
**Función:**  
Permite visualizar localmente la versión de producción del proyecto antes de publicarlo.

---

## `touch .env.local`
**Función:**  
Crea el archivo de variables de entorno donde se configuran las credenciales de Firebase y otros datos sensibles.
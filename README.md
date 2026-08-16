# ImpulsaYA

# Role & Context

Actúa como un Desarrollador Full-Stack experto en React, Tailwind CSS y UX para la Generación Z. Construye la Web App funcional "ImpulsaIA", un mentor virtual e interactivo para la orientación vocacional de jóvenes.

# Visual Identity & Design System

- Primary Background: #0A1931 (Deep Blue)

- Secondary Surface/Cards: #1A3D63 (Dark Slate)

- Accent/Buttons: #4A7FA7 (Steel Blue)

- Highlights/Chips: #B3CFE5 (Soft Ice Blue)

- Text & Clean BG: #F6FAFD (Off-White)

- Mascot: Integra la imagen de un robot 3D amigable blanco con visor azul en el Onboarding y en el Chat ("Guía IA").

- Layout: Moderno, redondeado (rounded-2xl), tipografía sans-serif limpia y mobile-first.

# DYNAMIC STATE LOGIC (CRUCIAL)

- Crea un estado global (React Context / React State) para almacenar la información del usuario en tiempo real:

  `userProfile = { name: "", stage: "", interests: [], strengths: [], values: [], dreamText: "", selectedPath: null }`

- NINGÚN CONTENIDO DE RECOMENDACIÓN DEBE SER FIJO. Las tarjetas de "Explora", las sugerencias del Chat y las metas de "Mi Ruta" deben reaccionar y filtrarse dinámicamente según lo que el usuario seleccione en los pasos del Onboarding.

# Screen Flow Specification

## 1. Landing & Auth (Stages 1-3)

- Pantalla de bienvenida con el robot saludando, eslogan "Tu futuro no tiene que estar decidido hoy" y botón "Comenzar mi recorrido".

- Registro sencillo: Pide sólo Nombre de preferencia, Email y Password. Al guardar, saluda al usuario por su nombre.

## 2. Dynamic Onboarding Wizard (Stages 4-9)

Un formulario paso a paso con barra de progreso superior:

- Paso 1: ¿En qué etapa estás? (Secundaria, Recién graduado, Explorando, Replantando).

- Paso 2: Intereses (Chips interactivos: Tecnología, Arte, Salud, Deportes, Emprendimiento, Naturaleza, Comunicación).

- Paso 3: Fortalezas mediante situaciones prácticas (Liderar, Resolver, Crear, Escuchar).

- Paso 4: Valores (Seleccionar hasta 3: Estabilidad, Impacto, Libertad, etc.).

- Paso 5: Pregunta abierta: "¿Cómo imaginas tu vida ideal en 5 años?" (Textarea).

## 3. Dynamic Profile Synthesis & Self-Correction (Stages 10-11)

- Pantalla de carga animada con el robot analizando los datos.

- Genera una tarjeta "Tu Perfil" que muestre resumen de Intereses, Fortalezas y 3 Áreas Recomendadas personalizadas según las respuestas del usuario.

- Botón interactivo "✏️ Esto no me representa": Permite desmarcar o cambiar un interés sugerido para corregir a la IA antes de ir al Inicio.

## 4. Main Hub & Navigation (Stage 12)

- Bottom Navigation Bar fija con 4 pestañas: 🏠 Inicio | 🤖 Mi IA | 🧭 Explora | 🎯 Mi Ruta.

- Dashboard Principal: Saludo personalizado ("¡Hola, [Nombre]!"), acceso directo al Chat con el Robot, y recomendados dinámicos.

## 5. "Mi IA" Chat System (Stage 13)

- Interfaz de Chat conversacional con el avatar del Robot.

- Simula respuestas empáticas de la IA que utilicen el nombre del usuario y sus intereses seleccionados.

- Incluye Quick Replies (botones sobre el input): "Ver mis fortalezas", "Explorar opciones", "No sé qué hacer".

## 6. Explora & "Ponme a prueba" (Stage 14)

- Buscador y filtro por categorías (Carreras, Oficios, Emprendimiento, Cursos, Becas).

- Muestra opciones variadas según el perfil.

- Modal "🧪 Ponme a Prueba": Al hacer clic en una opción, abre un mini-reto interactivo de 2-3 preguntas prácticas. Al finalizar, muestra botones de reacción (😍 / 🙂 / 😐 / 🙅) para ajustar la afinidad.

## 7. Mi Ruta & Perfil (Stages 15-16)

- Roadmap vertical con checklist de progreso (Descubrimiento -> Exploración -> Mini Reto -> Reflexión).

- Vista de Perfil con estadísticas acumuladas ("Intereses descubiertos", "Habilidades identificadas") y controles de privacidad para borrar o editar datos.                                                                                                                         Lovable, te comparto el link del diseño visual de referencia creado en Figma para ImpulsaIA. Usa estas pantallas únicamente como guía visual (colores, disposición de elementos, distribución de tarjetas y estilo de botones).

Aplica el diseño visual de Figma respetando la siguiente lógica funcional:

Usa la paleta de colores oficial: Fondo #0A1931, Tarjetas #1A3D63, Botones #4A7FA7, Destacados #B3CFE5 y Textos #F6FAFD.

Integra el avatar del robot como la 'Guía IA' en las pantallas de bienvenida y en la interfaz de chat.

Asegúrate de que todos los datos sean dinámicos: los nombres, las recomendaciones y los cuestionarios deben cambiar y adaptarse según las selecciones de cada usuario en el registro (Onboarding).

Implementa la barra de navegación inferior con las 4 pestañas: 🏠 Inicio, 🤖 Mi IA, 🧭 Explora y 🎯 Mi Ruta.                                                                                                  https://www.figma.com/make/o57ffzB8koN9RnTf8g0HYv/ImpulsaIA-Mobile-App-Design?t=PAG66lMlQteLf2F9-20&fullscreen=1

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/ea9beb04-2f03-45ae-94ca-a8e23549e72b).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

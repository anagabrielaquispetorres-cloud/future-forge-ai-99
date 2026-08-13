/* ImpulsaYA — biblioteca local de contenido vocacional (100% offline, sin backend) */

export type Area =
  | "Tecnología"
  | "Arte y Diseño"
  | "Salud"
  | "Ciencias"
  | "Deportes"
  | "Emprendimiento"
  | "Naturaleza"
  | "Oficios Técnicos"
  | "Humanidades"
  | "Comunicación";

export const AREAS: { id: Area; emoji: string; tagline: string }[] = [
  { id: "Tecnología", emoji: "💻", tagline: "Crear soluciones digitales" },
  { id: "Arte y Diseño", emoji: "🎨", tagline: "Imaginar y dar forma" },
  { id: "Salud", emoji: "🩺", tagline: "Cuidar y acompañar" },
  { id: "Ciencias", emoji: "🔬", tagline: "Investigar y descubrir" },
  { id: "Deportes", emoji: "🏅", tagline: "Movimiento y rendimiento" },
  { id: "Emprendimiento", emoji: "🚀", tagline: "Crear tu propio camino" },
  { id: "Naturaleza", emoji: "🌱", tagline: "Cuidar el planeta" },
  { id: "Oficios Técnicos", emoji: "🛠️", tagline: "Hacer con las manos" },
  { id: "Humanidades", emoji: "📚", tagline: "Entender a la sociedad" },
  { id: "Comunicación", emoji: "🗣️", tagline: "Contar historias" },
];

/* ---------------- Intereses: +15 por área ---------------- */

export const INTERESTS_BY_AREA: Record<Area, string[]> = {
  "Tecnología": [
    "Programar apps", "Videojuegos", "Inteligencia artificial", "Ciberseguridad", "Datos y estadística",
    "Robótica", "Diseño web", "Redes y servidores", "Automatizar tareas", "Realidad virtual",
    "Impresión 3D", "Blockchain", "Drones", "Soporte técnico", "Apps móviles",
  ],
  "Arte y Diseño": [
    "Dibujo e ilustración", "Diseño gráfico", "Fotografía", "Animación 2D/3D", "Moda y textiles",
    "Música y producción", "Teatro", "Danza", "Tatuaje y body art", "Arquitectura",
    "Diseño de interiores", "Cerámica y artesanía", "Pintura mural", "Diseño de personajes", "Edición de video",
  ],
  "Salud": [
    "Primeros auxilios", "Nutrición", "Salud mental", "Anatomía", "Cuidado de adultos mayores",
    "Odontología", "Farmacia", "Laboratorio clínico", "Emergencias y ambulancia", "Fisioterapia",
    "Salud pública", "Enfermería", "Veterinaria", "Terapia del lenguaje", "Óptica y visión",
  ],
  "Ciencias": [
    "Matemáticas", "Física", "Química", "Astronomía", "Biología",
    "Genética", "Geología", "Estadística", "Neurociencia", "Energías renovables",
    "Ciencia de materiales", "Meteorología", "Oceanografía", "Nanotecnología", "Investigación de laboratorio",
  ],
  "Deportes": [
    "Fútbol", "Atletismo", "Natación", "Gimnasio y fuerza", "Yoga",
    "Artes marciales", "Ciclismo", "Básquet", "Vóley", "Deportes extremos",
    "Entrenamiento personal", "Arbitraje", "eSports", "Danza deportiva", "Montañismo",
  ],
  "Emprendimiento": [
    "Vender en redes", "Negocios de comida", "Moda y reventa", "Finanzas personales", "Comercio electrónico",
    "Marcas propias", "Startups", "Negocios sociales", "Turismo local", "Servicios freelance",
    "Logística y delivery", "Franquicias", "Importación", "Negocios digitales", "Eventos",
  ],
  "Naturaleza": [
    "Reciclaje", "Huertos urbanos", "Cambio climático", "Animales y fauna", "Bosques",
    "Agua y océanos", "Agricultura", "Turismo ecológico", "Energía solar", "Biodiversidad",
    "Compostaje", "Conservación", "Educación ambiental", "Aves", "Plantas medicinales",
  ],
  "Oficios Técnicos": [
    "Electricidad", "Mecánica automotriz", "Carpintería", "Gastronomía", "Costura",
    "Soldadura", "Refrigeración", "Construcción", "Barbería y estética", "Panadería y pastelería",
    "Plomería", "Mantenimiento industrial", "Joyería", "Mecánica de motos", "Instalación de paneles solares",
  ],
  "Humanidades": [
    "Historia", "Filosofía", "Derecho y justicia", "Psicología", "Educación",
    "Sociología", "Idiomas", "Literatura", "Antropología", "Política y ciudadanía",
    "Trabajo social", "Arqueología", "Género e igualdad", "Derechos humanos", "Geografía humana",
  ],
  "Comunicación": [
    "Redes sociales", "Periodismo", "Podcast", "Publicidad", "Radio y TV",
    "Escritura creativa", "Marketing digital", "Community manager", "Locución", "Storytelling",
    "Relaciones públicas", "Creación de contenido", "Streaming", "Guion", "Traducción",
  ],
};

export const ALL_INTERESTS: { id: string; area: Area }[] = (Object.keys(INTERESTS_BY_AREA) as Area[])
  .flatMap((area) => INTERESTS_BY_AREA[area].map((id) => ({ id, area })));

export const INTEREST_AREA: Record<string, Area> = Object.fromEntries(
  ALL_INTERESTS.map((i) => [i.id, i.area]),
);

export const STAGES = ["Secundaria", "Recién graduado", "Explorando", "Replanteando"] as const;

/* ---------------- Fortalezas: situaciones reales (+10) ---------------- */

export const STRENGTHS = [
  "Liderar", "Resolver", "Crear", "Escuchar", "Organizar",
  "Enseñar", "Persuadir", "Analizar", "Construir", "Perseverar",
] as const;

export const STRENGTH_SITUATIONS: {
  question: string;
  options: { label: string; strength: string }[];
}[] = [
  {
    question: "Tu grupo no se pone de acuerdo para un proyecto. ¿Qué haces?",
    options: [
      { label: "Organizo al equipo y reparto tareas", strength: "Liderar" },
      { label: "Propongo una solución concreta", strength: "Resolver" },
      { label: "Invento una idea distinta", strength: "Crear" },
      { label: "Escucho a cada quien primero", strength: "Escuchar" },
    ],
  },
  {
    question: "Un amigo está pasando un mal momento. Tú...",
    options: [
      { label: "Le armo un plan para salir adelante", strength: "Organizar" },
      { label: "Analizo con él qué se puede cambiar", strength: "Analizar" },
      { label: "Le propongo algo nuevo y divertido", strength: "Crear" },
      { label: "Lo acompaño en silencio y lo escucho", strength: "Escuchar" },
    ],
  },
  {
    question: "Te dan un problema sin instrucciones. ¿Cómo lo enfrentas?",
    options: [
      { label: "Reúno gente para atacarlo juntos", strength: "Liderar" },
      { label: "Lo divido en pasos lógicos", strength: "Analizar" },
      { label: "Experimento hasta que algo funcione", strength: "Crear" },
      { label: "Insisto aunque me tome días", strength: "Perseverar" },
    ],
  },
  {
    question: "En clase, alguien no entendió el tema. Tú...",
    options: [
      { label: "Se lo explico con mis palabras", strength: "Enseñar" },
      { label: "Le paso mis apuntes ordenados", strength: "Organizar" },
      { label: "Le hago un dibujo o esquema", strength: "Crear" },
      { label: "Le pregunto qué parte le cuesta", strength: "Escuchar" },
    ],
  },
  {
    question: "Se malogró algo en tu casa (mueble, cable, bici). ¿Qué haces?",
    options: [
      { label: "Lo desarmo y trato de arreglarlo", strength: "Construir" },
      { label: "Busco un tutorial y sigo los pasos", strength: "Resolver" },
      { label: "Lo transformo en otra cosa útil", strength: "Crear" },
      { label: "Lo intento hasta que salga", strength: "Perseverar" },
    ],
  },
  {
    question: "Tienes que vender entradas para un evento del cole. Tú...",
    options: [
      { label: "Convenzo hablando uno a uno", strength: "Persuadir" },
      { label: "Hago un plan de metas por día", strength: "Organizar" },
      { label: "Diseño una promo creativa", strength: "Crear" },
      { label: "Coordino a todo el salón", strength: "Liderar" },
    ],
  },
  {
    question: "Te dan una tabla llena de números. ¿Qué sientes?",
    options: [
      { label: "Curiosidad: busco patrones", strength: "Analizar" },
      { label: "Ganas de ordenarla y limpiarla", strength: "Organizar" },
      { label: "Ganas de graficarla bonito", strength: "Crear" },
      { label: "La reviso hasta entenderla", strength: "Perseverar" },
    ],
  },
  {
    question: "Un proyecto tuyo falló feo. ¿Qué haces al día siguiente?",
    options: [
      { label: "Empiezo de nuevo con lo aprendido", strength: "Perseverar" },
      { label: "Analizo exactamente qué falló", strength: "Analizar" },
      { label: "Pido feedback y escucho críticas", strength: "Escuchar" },
      { label: "Reúno al equipo y replanteo", strength: "Liderar" },
    ],
  },
  {
    question: "Te toca hablar frente a 100 personas. Tú...",
    options: [
      { label: "Me emociona convencerlos", strength: "Persuadir" },
      { label: "Preparo un guion detallado", strength: "Organizar" },
      { label: "Lo hago interactivo y didáctico", strength: "Enseñar" },
      { label: "Invento algo que nadie espera", strength: "Crear" },
    ],
  },
  {
    question: "Con tus manos y materiales libres por un día, tú...",
    options: [
      { label: "Construyo algo funcional", strength: "Construir" },
      { label: "Diseño algo lindo", strength: "Crear" },
      { label: "Arreglo algo que estaba roto", strength: "Resolver" },
      { label: "Enseño a otro a hacerlo", strength: "Enseñar" },
    ],
  },
  {
    question: "Tu equipo va perdiendo en el último minuto. Tú...",
    options: [
      { label: "Levanto el ánimo de todos", strength: "Liderar" },
      { label: "Cambio la estrategia al toque", strength: "Resolver" },
      { label: "Juego hasta el último segundo", strength: "Perseverar" },
      { label: "Escucho qué necesita cada uno", strength: "Escuchar" },
    ],
  },
  {
    question: "Te dan S/ 200 y una semana para generar más. Tú...",
    options: [
      { label: "Compro y revendo con estrategia", strength: "Persuadir" },
      { label: "Calculo costos y margen antes", strength: "Analizar" },
      { label: "Invento un producto propio", strength: "Crear" },
      { label: "Armo un plan con horarios", strength: "Organizar" },
    ],
  },
];

/* ---------------- Valores ---------------- */

export const VALUES = [
  "Estabilidad", "Impacto social", "Libertad", "Creatividad", "Dinero",
  "Aprendizaje", "Reconocimiento", "Equilibrio", "Familia", "Aventura",
];

/* ---------------- Oportunidades: +15 por área ---------------- */

export const CATEGORIES = [
  "Carreras", "Formación Técnica", "Trabajo", "Emprendimiento", "Cursos Gratis", "Becas", "Voluntariados",
] as const;
export type Category = (typeof CATEGORIES)[number];

export const CATEGORY_EMOJI: Record<Category, string> = {
  "Carreras": "🎓",
  "Formación Técnica": "🛠️",
  "Trabajo": "💼",
  "Emprendimiento": "🚀",
  "Cursos Gratis": "📚",
  "Becas": "🎓",
  "Voluntariados": "🤝",
};

export type Duration = "Corto plazo" | "Largo plazo";
export type Cost = "Gratuito" | "Con Beca" | "Pago";

export type Opportunity = {
  id: string;
  title: string;
  area: Area;
  category: Category;
  duration: Duration;
  cost: Cost;
  description: string;
  interests: string[];
  strengths: string[];
  emoji: string;
  link: { label: string; url: string };
  quiz: { q: string; options: string[] }[];
};

type Seed = [
  title: string,
  category: Category,
  duration: Duration,
  cost: Cost,
  description: string,
  interests: string,
  strengths: string,
];

const S = (
  t: string, c: Category, d: Duration, co: Cost, desc: string, i: string, st: string,
): Seed => [t, c, d, co, desc, i, st];

const SEEDS: Record<Area, Seed[]> = {
  "Tecnología": [
    S("Ingeniería de Software", "Carreras", "Largo plazo", "Pago", "Diseña y construye sistemas que usan miles de personas.", "Programar apps,Apps móviles", "Resolver,Analizar"),
    S("Ciencia de Datos", "Carreras", "Largo plazo", "Pago", "Convierte datos en decisiones para empresas y gobiernos.", "Datos y estadística,Inteligencia artificial", "Analizar,Resolver"),
    S("Ingeniería Mecatrónica", "Carreras", "Largo plazo", "Pago", "Une electrónica, mecánica y software en robots reales.", "Robótica,Drones", "Construir,Resolver"),
    S("Técnico en Redes y Soporte", "Formación Técnica", "Corto plazo", "Pago", "Salida laboral rápida instalando y manteniendo redes.", "Redes y servidores,Soporte técnico", "Resolver,Perseverar"),
    S("Técnico en Ciberseguridad", "Formación Técnica", "Corto plazo", "Pago", "Protege sistemas y detecta ataques informáticos.", "Ciberseguridad,Redes y servidores", "Analizar,Perseverar"),
    S("Desarrollador Web Junior", "Trabajo", "Corto plazo", "Gratuito", "Primer empleo creando sitios y landings para negocios.", "Diseño web,Programar apps", "Crear,Resolver"),
    S("QA Tester Junior", "Trabajo", "Corto plazo", "Gratuito", "Encuentra errores antes que los usuarios. Entrada sin carrera.", "Soporte técnico,Programar apps", "Analizar,Perseverar"),
    S("Agencia de automatizaciones con IA", "Emprendimiento", "Corto plazo", "Gratuito", "Vende automatizaciones simples a negocios de tu barrio.", "Automatizar tareas,Inteligencia artificial", "Persuadir,Crear"),
    S("Estudio indie de videojuegos", "Emprendimiento", "Largo plazo", "Gratuito", "Publica tu primer juego con un equipo pequeño.", "Videojuegos,Realidad virtual", "Crear,Perseverar"),
    S("CS50: Introducción a la Programación", "Cursos Gratis", "Corto plazo", "Gratuito", "El curso de Harvard que arranca desde cero.", "Programar apps,Videojuegos", "Analizar,Perseverar"),
    S("Fundamentos de IA (Google)", "Cursos Gratis", "Corto plazo", "Gratuito", "Aprende cómo funciona la IA y cómo usarla bien.", "Inteligencia artificial,Automatizar tareas", "Analizar,Crear"),
    S("Curso de Ciberseguridad Cisco", "Cursos Gratis", "Corto plazo", "Gratuito", "Bases de seguridad digital con certificado gratuito.", "Ciberseguridad,Redes y servidores", "Analizar,Resolver"),
    S("Beca Jóvenes STEM", "Becas", "Largo plazo", "Con Beca", "Financia estudios de ciencia y tecnología para menores de 25.", "Programar apps,Robótica,Datos y estadística", "Analizar,Perseverar"),
    S("Beca Mujeres en Tecnología", "Becas", "Corto plazo", "Con Beca", "Bootcamps y mentoría para mujeres que inician en tech.", "Programar apps,Diseño web", "Crear,Perseverar"),
    S("Voluntariado: Clases de compu para adultos", "Voluntariados", "Corto plazo", "Gratuito", "Enseña lo básico digital a adultos mayores de tu comunidad.", "Soporte técnico,Programar apps", "Enseñar,Escuchar"),
    S("Voluntariado en club de robótica escolar", "Voluntariados", "Corto plazo", "Gratuito", "Acompaña a escolares a armar su primer robot.", "Robótica,Impresión 3D", "Enseñar,Construir"),
  ],
  "Arte y Diseño": [
    S("Diseño Gráfico", "Carreras", "Largo plazo", "Pago", "Comunica ideas con color, forma y tipografía.", "Diseño gráfico,Dibujo e ilustración", "Crear,Escuchar"),
    S("Arquitectura", "Carreras", "Largo plazo", "Pago", "Diseña espacios donde la gente vive y se encuentra.", "Arquitectura,Diseño de interiores", "Crear,Analizar"),
    S("Diseño UX/UI", "Carreras", "Corto plazo", "Pago", "Haz que las apps sean fáciles y bonitas de usar.", "Diseño web,Diseño gráfico", "Crear,Escuchar"),
    S("Técnico en Animación Digital", "Formación Técnica", "Corto plazo", "Pago", "Da vida a personajes en 2D y 3D.", "Animación 2D/3D,Diseño de personajes", "Crear,Perseverar"),
    S("Técnico en Producción Musical", "Formación Técnica", "Corto plazo", "Pago", "Graba, mezcla y publica música propia o de otros.", "Música y producción,Edición de video", "Crear,Perseverar"),
    S("Asistente de producción audiovisual", "Trabajo", "Corto plazo", "Gratuito", "Entra al set y aprende grabando en proyectos reales.", "Edición de video,Fotografía", "Organizar,Crear"),
    S("Editor de video freelance", "Trabajo", "Corto plazo", "Gratuito", "Edita reels y videos para marcas desde tu casa.", "Edición de video,Animación 2D/3D", "Crear,Perseverar"),
    S("Marca de ropa propia", "Emprendimiento", "Corto plazo", "Gratuito", "Diseña, produce y vende tu primera colección cápsula.", "Moda y textiles,Diseño gráfico", "Crear,Persuadir"),
    S("Estudio de tatuajes o arte corporal", "Emprendimiento", "Largo plazo", "Pago", "Convierte tu trazo en un oficio artístico rentable.", "Tatuaje y body art,Dibujo e ilustración", "Crear,Perseverar"),
    S("Curso gratis de Illustrator y Canva", "Cursos Gratis", "Corto plazo", "Gratuito", "Domina herramientas de diseño desde cero.", "Diseño gráfico,Dibujo e ilustración", "Crear,Perseverar"),
    S("Fotografía con celular (curso libre)", "Cursos Gratis", "Corto plazo", "Gratuito", "Luz, encuadre y edición con lo que ya tienes.", "Fotografía,Edición de video", "Crear,Analizar"),
    S("Curso de Blender 3D", "Cursos Gratis", "Corto plazo", "Gratuito", "Modela y anima en 3D con software libre.", "Animación 2D/3D,Diseño de personajes", "Crear,Perseverar"),
    S("Beca de Artes y Cultura", "Becas", "Largo plazo", "Con Beca", "Financia formación artística y proyectos culturales.", "Pintura mural,Teatro,Música y producción", "Crear,Persuadir"),
    S("Beca de Conservatorio Municipal", "Becas", "Largo plazo", "Con Beca", "Estudia música con apoyo económico total o parcial.", "Música y producción,Danza", "Crear,Perseverar"),
    S("Voluntariado: Murales comunitarios", "Voluntariados", "Corto plazo", "Gratuito", "Pinta espacios públicos con colectivos vecinales.", "Pintura mural,Dibujo e ilustración", "Crear,Liderar"),
    S("Voluntariado en teatro para niños", "Voluntariados", "Corto plazo", "Gratuito", "Lleva obras y juegos escénicos a escuelas.", "Teatro,Danza", "Enseñar,Crear"),
  ],
  "Salud": [
    S("Medicina Humana", "Carreras", "Largo plazo", "Pago", "Diagnostica, trata y acompaña pacientes toda la vida.", "Anatomía,Emergencias y ambulancia", "Analizar,Perseverar"),
    S("Enfermería", "Carreras", "Largo plazo", "Pago", "Cuida y acompaña personas en momentos decisivos.", "Enfermería,Cuidado de adultos mayores", "Escuchar,Resolver"),
    S("Nutrición y Dietética", "Carreras", "Largo plazo", "Pago", "Diseña planes de alimentación con impacto real.", "Nutrición,Salud pública", "Analizar,Enseñar"),
    S("Técnico en Farmacia", "Formación Técnica", "Corto plazo", "Pago", "Trabaja en botica o laboratorio en menos de 2 años.", "Farmacia,Laboratorio clínico", "Organizar,Analizar"),
    S("Técnico en Emergencias Médicas", "Formación Técnica", "Corto plazo", "Pago", "Actúa en ambulancia y salva vidas en la calle.", "Emergencias y ambulancia,Primeros auxilios", "Resolver,Perseverar"),
    S("Auxiliar de cuidado geriátrico", "Trabajo", "Corto plazo", "Gratuito", "Empleo con alta demanda acompañando adultos mayores.", "Cuidado de adultos mayores,Enfermería", "Escuchar,Perseverar"),
    S("Asistente de consultorio dental", "Trabajo", "Corto plazo", "Gratuito", "Aprende odontología desde dentro del consultorio.", "Odontología,Primeros auxilios", "Organizar,Escuchar"),
    S("Centro de bienestar y masajes", "Emprendimiento", "Corto plazo", "Pago", "Servicio de terapias físicas por cuenta propia.", "Fisioterapia,Salud mental", "Escuchar,Persuadir"),
    S("Servicio de meal prep saludable", "Emprendimiento", "Corto plazo", "Gratuito", "Comida balanceada por suscripción en tu zona.", "Nutrición,Salud pública", "Organizar,Persuadir"),
    S("Primeros Auxilios (Cruz Roja online)", "Cursos Gratis", "Corto plazo", "Gratuito", "Aprende a reaccionar ante una emergencia.", "Primeros auxilios,Emergencias y ambulancia", "Resolver,Perseverar"),
    S("Curso de Salud Mental para jóvenes", "Cursos Gratis", "Corto plazo", "Gratuito", "Herramientas de autocuidado y apoyo entre pares.", "Salud mental,Terapia del lenguaje", "Escuchar,Enseñar"),
    S("Nutrición básica (curso abierto)", "Cursos Gratis", "Corto plazo", "Gratuito", "Fundamentos de alimentación y hábitos.", "Nutrición,Anatomía", "Analizar,Enseñar"),
    S("Beca en Ciencias de la Salud", "Becas", "Largo plazo", "Con Beca", "Apoyo completo para estudiar carreras de salud.", "Enfermería,Anatomía,Laboratorio clínico", "Perseverar,Analizar"),
    S("Beca Técnica en Salud Comunitaria", "Becas", "Corto plazo", "Con Beca", "Formación técnica gratuita con compromiso comunitario.", "Salud pública,Primeros auxilios", "Escuchar,Organizar"),
    S("Voluntariado en campañas de salud", "Voluntariados", "Corto plazo", "Gratuito", "Apoya jornadas médicas gratuitas en barrios.", "Salud pública,Primeros auxilios", "Escuchar,Organizar"),
    S("Voluntariado en albergue veterinario", "Voluntariados", "Corto plazo", "Gratuito", "Cuida animales rescatados y aprende manejo clínico.", "Veterinaria,Primeros auxilios", "Escuchar,Perseverar"),
  ],
  "Ciencias": [
    S("Física", "Carreras", "Largo plazo", "Pago", "Entiende las reglas del universo y aplícalas.", "Física,Astronomía", "Analizar,Perseverar"),
    S("Biotecnología", "Carreras", "Largo plazo", "Pago", "Usa biología y tecnología para crear soluciones.", "Genética,Biología", "Analizar,Crear"),
    S("Ingeniería Química", "Carreras", "Largo plazo", "Pago", "Transforma materia en productos a gran escala.", "Química,Ciencia de materiales", "Analizar,Resolver"),
    S("Técnico de Laboratorio", "Formación Técnica", "Corto plazo", "Pago", "Trabaja con muestras, reactivos y equipos.", "Investigación de laboratorio,Química", "Organizar,Analizar"),
    S("Técnico en Energías Renovables", "Formación Técnica", "Corto plazo", "Pago", "Instala y mantiene sistemas solares y eólicos.", "Energías renovables,Física", "Construir,Resolver"),
    S("Asistente de investigación", "Trabajo", "Corto plazo", "Gratuito", "Apoya proyectos científicos en universidades.", "Investigación de laboratorio,Estadística", "Analizar,Organizar"),
    S("Analista de datos junior", "Trabajo", "Corto plazo", "Gratuito", "Convierte números en informes útiles.", "Estadística,Matemáticas", "Analizar,Resolver"),
    S("Kits educativos de ciencia", "Emprendimiento", "Corto plazo", "Gratuito", "Vende experimentos armados para colegios.", "Química,Biología", "Crear,Persuadir"),
    S("Divulgación científica en redes", "Emprendimiento", "Corto plazo", "Gratuito", "Monetiza explicando ciencia de forma simple.", "Astronomía,Neurociencia", "Enseñar,Crear"),
    S("Khan Academy: Matemáticas completas", "Cursos Gratis", "Corto plazo", "Gratuito", "Refuerza desde álgebra hasta cálculo, gratis.", "Matemáticas,Estadística", "Analizar,Perseverar"),
    S("Curso abierto de Astronomía", "Cursos Gratis", "Corto plazo", "Gratuito", "Del sistema solar a los agujeros negros.", "Astronomía,Física", "Analizar,Perseverar"),
    S("Introducción a la Genética", "Cursos Gratis", "Corto plazo", "Gratuito", "ADN, herencia y biotecnología moderna.", "Genética,Biología", "Analizar,Crear"),
    S("Beca de Investigación Junior", "Becas", "Largo plazo", "Con Beca", "Financia tu participación en un proyecto científico.", "Investigación de laboratorio,Física,Genética", "Analizar,Perseverar"),
    S("Beca Olimpiadas de Ciencias", "Becas", "Corto plazo", "Con Beca", "Prepárate y compite con apoyo económico.", "Matemáticas,Química", "Perseverar,Analizar"),
    S("Voluntariado en feria científica escolar", "Voluntariados", "Corto plazo", "Gratuito", "Ayuda a escolares a diseñar sus experimentos.", "Biología,Química", "Enseñar,Organizar"),
    S("Voluntariado en monitoreo climático", "Voluntariados", "Corto plazo", "Gratuito", "Registra datos meteorológicos para proyectos abiertos.", "Meteorología,Estadística", "Analizar,Perseverar"),
  ],
  "Deportes": [
    S("Ciencias del Deporte", "Carreras", "Largo plazo", "Pago", "Entrena, previene lesiones y mide rendimiento.", "Entrenamiento personal,Atletismo", "Liderar,Analizar"),
    S("Educación Física", "Carreras", "Largo plazo", "Pago", "Forma hábitos de vida activa en escuelas.", "Fútbol,Yoga", "Enseñar,Liderar"),
    S("Fisioterapia Deportiva", "Carreras", "Largo plazo", "Pago", "Recupera atletas lesionados y mejora su técnica.", "Entrenamiento personal,Gimnasio y fuerza", "Escuchar,Resolver"),
    S("Técnico en Entrenamiento Personal", "Formación Técnica", "Corto plazo", "Pago", "Certifícate y entrena clientes en meses.", "Gimnasio y fuerza,Entrenamiento personal", "Liderar,Persuadir"),
    S("Técnico en Salvavidas y Natación", "Formación Técnica", "Corto plazo", "Pago", "Trabaja en piscinas, playas y clubes.", "Natación,Deportes extremos", "Resolver,Perseverar"),
    S("Monitor deportivo municipal", "Trabajo", "Corto plazo", "Gratuito", "Dirige talleres deportivos para niños y jóvenes.", "Fútbol,Básquet,Vóley", "Enseñar,Liderar"),
    S("Árbitro federado", "Trabajo", "Corto plazo", "Gratuito", "Gana por partido dirigido mientras estudias.", "Arbitraje,Fútbol", "Liderar,Perseverar"),
    S("Academia deportiva de barrio", "Emprendimiento", "Corto plazo", "Gratuito", "Arma tu escuelita y cobra por mensualidad.", "Fútbol,Vóley,Entrenamiento personal", "Liderar,Organizar"),
    S("Equipo de eSports", "Emprendimiento", "Corto plazo", "Gratuito", "Compite, transmite y busca patrocinios.", "eSports,Deportes extremos", "Perseverar,Persuadir"),
    S("Curso gratis de Nutrición Deportiva", "Cursos Gratis", "Corto plazo", "Gratuito", "Alimenta el rendimiento de forma científica.", "Gimnasio y fuerza,Atletismo", "Analizar,Enseñar"),
    S("Curso de Yoga y respiración", "Cursos Gratis", "Corto plazo", "Gratuito", "Practica y aprende a guiar sesiones básicas.", "Yoga,Danza deportiva", "Escuchar,Enseñar"),
    S("Primeros auxilios deportivos", "Cursos Gratis", "Corto plazo", "Gratuito", "Actúa ante lesiones en cancha.", "Atletismo,Artes marciales", "Resolver,Perseverar"),
    S("Beca Deportiva Universitaria", "Becas", "Largo plazo", "Con Beca", "Estudia gratis representando a tu universidad.", "Fútbol,Atletismo,Natación", "Perseverar,Liderar"),
    S("Beca de Alto Rendimiento", "Becas", "Largo plazo", "Con Beca", "Apoyo económico y técnico para competir.", "Artes marciales,Ciclismo", "Perseverar,Liderar"),
    S("Voluntariado en olimpiadas escolares", "Voluntariados", "Corto plazo", "Gratuito", "Organiza y arbitra competencias juveniles.", "Arbitraje,Atletismo", "Organizar,Liderar"),
    S("Voluntariado en deporte inclusivo", "Voluntariados", "Corto plazo", "Gratuito", "Acompaña a personas con discapacidad a entrenar.", "Natación,Básquet", "Escuchar,Enseñar"),
  ],
  "Emprendimiento": [
    S("Administración de Negocios", "Carreras", "Largo plazo", "Pago", "Aprende a dirigir, financiar y hacer crecer empresas.", "Startups,Finanzas personales", "Liderar,Organizar"),
    S("Marketing y Negocios Digitales", "Carreras", "Largo plazo", "Pago", "Vende y posiciona marcas en el mundo online.", "Negocios digitales,Comercio electrónico", "Persuadir,Crear"),
    S("Contabilidad y Finanzas", "Carreras", "Largo plazo", "Pago", "Ordena los números que sostienen todo negocio.", "Finanzas personales,Logística y delivery", "Analizar,Organizar"),
    S("Técnico en Gestión de Negocios", "Formación Técnica", "Corto plazo", "Pago", "Administra tu propio negocio con bases sólidas.", "Servicios freelance,Eventos", "Organizar,Liderar"),
    S("Técnico en Comercio Exterior", "Formación Técnica", "Corto plazo", "Pago", "Importa, exporta y mueve productos entre países.", "Importación,Logística y delivery", "Organizar,Analizar"),
    S("Vendedor / asesor comercial", "Trabajo", "Corto plazo", "Gratuito", "Primer empleo con comisiones y mucha práctica.", "Vender en redes,Moda y reventa", "Persuadir,Perseverar"),
    S("Community manager freelance", "Trabajo", "Corto plazo", "Gratuito", "Gestiona redes de negocios pequeños por mes.", "Negocios digitales,Vender en redes", "Crear,Organizar"),
    S("Tienda online con dropshipping", "Emprendimiento", "Corto plazo", "Gratuito", "Vende sin stock propio y prueba nichos rápido.", "Comercio electrónico,Vender en redes", "Persuadir,Analizar"),
    S("Negocio de comida rápida saludable", "Emprendimiento", "Corto plazo", "Pago", "De la cocina de casa a tus primeros clientes fijos.", "Negocios de comida,Turismo local", "Organizar,Persuadir"),
    S("Curso gratis: Cómo empezar un negocio", "Cursos Gratis", "Corto plazo", "Gratuito", "Del modelo de negocio a tus primeras ventas.", "Startups,Negocios sociales", "Persuadir,Organizar"),
    S("Finanzas personales para jóvenes", "Cursos Gratis", "Corto plazo", "Gratuito", "Aprende a ahorrar, presupuestar e invertir.", "Finanzas personales,Negocios digitales", "Analizar,Perseverar"),
    S("Marketing digital (curso abierto)", "Cursos Gratis", "Corto plazo", "Gratuito", "Redes, anuncios y contenido que vende.", "Vender en redes,Marcas propias", "Crear,Persuadir"),
    S("Beca Emprende Joven", "Becas", "Corto plazo", "Con Beca", "Capital semilla y mentoría para tu idea.", "Startups,Negocios sociales,Marcas propias", "Persuadir,Liderar"),
    S("Beca de Incubadora Universitaria", "Becas", "Largo plazo", "Con Beca", "Desarrolla tu startup con acompañamiento experto.", "Startups,Comercio electrónico", "Liderar,Analizar"),
    S("Voluntariado: asesoría a negocios de barrio", "Voluntariados", "Corto plazo", "Gratuito", "Ayuda a bodegas y talleres a digitalizarse.", "Negocios digitales,Vender en redes", "Enseñar,Persuadir"),
    S("Voluntariado en ferias de emprendimiento", "Voluntariados", "Corto plazo", "Gratuito", "Organiza espacios de venta para emprendedores.", "Eventos,Turismo local", "Organizar,Liderar"),
  ],
  "Naturaleza": [
    S("Ingeniería Ambiental", "Carreras", "Largo plazo", "Pago", "Resuelve problemas de agua, aire y residuos.", "Cambio climático,Agua y océanos", "Resolver,Analizar"),
    S("Biología / Conservación", "Carreras", "Largo plazo", "Pago", "Estudia y protege especies y ecosistemas.", "Biodiversidad,Animales y fauna", "Analizar,Perseverar"),
    S("Agronomía", "Carreras", "Largo plazo", "Pago", "Produce alimentos de forma eficiente y sostenible.", "Agricultura,Huertos urbanos", "Construir,Analizar"),
    S("Técnico Agropecuario", "Formación Técnica", "Corto plazo", "Pago", "Maneja cultivos y animales con criterio técnico.", "Agricultura,Compostaje", "Construir,Perseverar"),
    S("Técnico en Gestión de Residuos", "Formación Técnica", "Corto plazo", "Pago", "Diseña sistemas de reciclaje para municipios.", "Reciclaje,Compostaje", "Organizar,Resolver"),
    S("Guardaparques / guía de naturaleza", "Trabajo", "Corto plazo", "Gratuito", "Trabaja al aire libre cuidando áreas protegidas.", "Bosques,Conservación,Aves", "Perseverar,Enseñar"),
    S("Guía de turismo ecológico", "Trabajo", "Corto plazo", "Gratuito", "Lleva visitantes a rutas naturales de tu región.", "Turismo ecológico,Bosques", "Persuadir,Enseñar"),
    S("Huerto urbano comercial", "Emprendimiento", "Corto plazo", "Gratuito", "Cultiva y vende orgánico en tu ciudad.", "Huertos urbanos,Agricultura", "Construir,Persuadir"),
    S("Productos ecológicos y compostaje", "Emprendimiento", "Corto plazo", "Gratuito", "Convierte residuos en negocio circular.", "Compostaje,Reciclaje", "Crear,Organizar"),
    S("Curso gratis de Cambio Climático", "Cursos Gratis", "Corto plazo", "Gratuito", "Entiende la crisis climática y qué hacer.", "Cambio climático,Educación ambiental", "Analizar,Enseñar"),
    S("Curso de Huertos y agricultura urbana", "Cursos Gratis", "Corto plazo", "Gratuito", "Siembra en poco espacio y produce comida.", "Huertos urbanos,Plantas medicinales", "Construir,Perseverar"),
    S("Energía solar básica", "Cursos Gratis", "Corto plazo", "Gratuito", "Cómo funciona y se instala un panel solar.", "Energía solar,Cambio climático", "Construir,Analizar"),
    S("Beca Verde para Jóvenes", "Becas", "Largo plazo", "Con Beca", "Financia estudios ligados a sostenibilidad.", "Cambio climático,Biodiversidad,Conservación", "Analizar,Perseverar"),
    S("Beca de Conservación Marina", "Becas", "Corto plazo", "Con Beca", "Formación y campo en proyectos de océanos.", "Agua y océanos,Biodiversidad", "Perseverar,Analizar"),
    S("Voluntariado en reforestación", "Voluntariados", "Corto plazo", "Gratuito", "Planta y cuida árboles con brigadas locales.", "Bosques,Conservación", "Perseverar,Liderar"),
    S("Voluntariado en limpieza de playas y ríos", "Voluntariados", "Corto plazo", "Gratuito", "Jornadas de limpieza y educación ambiental.", "Agua y océanos,Reciclaje", "Organizar,Liderar"),
  ],
  "Oficios Técnicos": [
    S("Ingeniería Eléctrica", "Carreras", "Largo plazo", "Pago", "Diseña y opera sistemas de energía.", "Electricidad,Mantenimiento industrial", "Analizar,Construir"),
    S("Ingeniería Civil", "Carreras", "Largo plazo", "Pago", "Construye obras que duran décadas.", "Construcción,Soldadura", "Construir,Organizar"),
    S("Gastronomía Profesional", "Carreras", "Largo plazo", "Pago", "Cocina profesional, costos y gestión de cocina.", "Gastronomía,Panadería y pastelería", "Crear,Perseverar"),
    S("Técnico Electricista", "Formación Técnica", "Corto plazo", "Pago", "Oficio con demanda alta y buen ingreso rápido.", "Electricidad,Instalación de paneles solares", "Construir,Resolver"),
    S("Técnico Automotriz", "Formación Técnica", "Corto plazo", "Pago", "Diagnostica y repara autos y motos.", "Mecánica automotriz,Mecánica de motos", "Resolver,Construir"),
    S("Ayudante de cocina", "Trabajo", "Corto plazo", "Gratuito", "Entra a la cocina y sube de puesto con práctica.", "Gastronomía,Panadería y pastelería", "Perseverar,Organizar"),
    S("Técnico de mantenimiento", "Trabajo", "Corto plazo", "Gratuito", "Empleo estable en edificios, hoteles y fábricas.", "Mantenimiento industrial,Plomería", "Resolver,Perseverar"),
    S("Barbería o salón propio", "Emprendimiento", "Corto plazo", "Pago", "Un oficio que se paga solo con clientela fija.", "Barbería y estética,Costura", "Persuadir,Crear"),
    S("Taller de carpintería y muebles", "Emprendimiento", "Corto plazo", "Pago", "Diseña y vende muebles a medida.", "Carpintería,Construcción", "Construir,Crear"),
    S("Curso gratis de Electricidad básica", "Cursos Gratis", "Corto plazo", "Gratuito", "Instalaciones seguras paso a paso.", "Electricidad,Refrigeración", "Construir,Resolver"),
    S("Curso de Panadería casera", "Cursos Gratis", "Corto plazo", "Gratuito", "Masas, fermentos y costos básicos.", "Panadería y pastelería,Gastronomía", "Crear,Perseverar"),
    S("Curso de Costura y patronaje", "Cursos Gratis", "Corto plazo", "Gratuito", "Confecciona prendas desde cero.", "Costura,Joyería", "Crear,Perseverar"),
    S("Beca Técnico-Productiva (CETPRO)", "Becas", "Corto plazo", "Con Beca", "Formación en oficios totalmente subvencionada.", "Electricidad,Soldadura,Gastronomía", "Construir,Perseverar"),
    S("Beca Oficios del Futuro", "Becas", "Corto plazo", "Con Beca", "Especialización en energías y automatización.", "Instalación de paneles solares,Mantenimiento industrial", "Construir,Analizar"),
    S("Voluntariado: reparación comunitaria", "Voluntariados", "Corto plazo", "Gratuito", "Arregla electrodomésticos y muebles del barrio.", "Carpintería,Electricidad", "Construir,Enseñar"),
    S("Voluntariado en construcción de viviendas", "Voluntariados", "Corto plazo", "Gratuito", "Levanta casas con brigadas solidarias.", "Construcción,Soldadura", "Construir,Liderar"),
  ],
  "Humanidades": [
    S("Derecho", "Carreras", "Largo plazo", "Pago", "Defiende derechos y resuelve conflictos.", "Derecho y justicia,Política y ciudadanía", "Persuadir,Analizar"),
    S("Psicología", "Carreras", "Largo plazo", "Pago", "Comprende a las personas y acompaña su bienestar.", "Psicología,Trabajo social", "Escuchar,Analizar"),
    S("Educación / Docencia", "Carreras", "Largo plazo", "Pago", "Forma generaciones dentro y fuera del aula.", "Educación,Literatura", "Enseñar,Escuchar"),
    S("Técnico en Educación Inicial", "Formación Técnica", "Corto plazo", "Pago", "Acompaña la primera infancia con técnica.", "Educación,Psicología", "Enseñar,Escuchar"),
    S("Técnico Jurídico / Asistente legal", "Formación Técnica", "Corto plazo", "Pago", "Apoya estudios de abogados y notarías.", "Derecho y justicia,Historia", "Organizar,Analizar"),
    S("Tutor o profesor particular", "Trabajo", "Corto plazo", "Gratuito", "Gana enseñando lo que ya dominas.", "Educación,Idiomas", "Enseñar,Perseverar"),
    S("Promotor social de ONG", "Trabajo", "Corto plazo", "Gratuito", "Trabaja en terreno con comunidades.", "Trabajo social,Derechos humanos", "Escuchar,Liderar"),
    S("Academia de idiomas online", "Emprendimiento", "Corto plazo", "Gratuito", "Enseña idiomas por videollamada a tu ritmo.", "Idiomas,Educación", "Enseñar,Persuadir"),
    S("Proyecto social con impacto", "Emprendimiento", "Largo plazo", "Gratuito", "Crea una iniciativa que resuelva algo de tu comunidad.", "Trabajo social,Género e igualdad", "Liderar,Persuadir"),
    S("Curso gratis de Filosofía moderna", "Cursos Gratis", "Corto plazo", "Gratuito", "Piensa mejor con las grandes preguntas.", "Filosofía,Historia", "Analizar,Perseverar"),
    S("Inglés desde cero (curso libre)", "Cursos Gratis", "Corto plazo", "Gratuito", "Abre puertas laborales con un segundo idioma.", "Idiomas,Literatura", "Perseverar,Enseñar"),
    S("Derechos Humanos (curso abierto)", "Cursos Gratis", "Corto plazo", "Gratuito", "Marco legal y activismo ciudadano.", "Derechos humanos,Política y ciudadanía", "Persuadir,Analizar"),
    S("Beca de Ciencias Sociales", "Becas", "Largo plazo", "Con Beca", "Estudia carreras humanísticas con apoyo total.", "Sociología,Historia,Psicología", "Analizar,Perseverar"),
    S("Beca de Idiomas para jóvenes", "Becas", "Corto plazo", "Con Beca", "Certifica tu nivel de inglés sin costo.", "Idiomas,Literatura", "Perseverar,Enseñar"),
    S("Voluntariado en refuerzo escolar", "Voluntariados", "Corto plazo", "Gratuito", "Da clases de apoyo a escolares de tu zona.", "Educación,Idiomas", "Enseñar,Escuchar"),
    S("Voluntariado en derechos ciudadanos", "Voluntariados", "Corto plazo", "Gratuito", "Informa y acompaña en trámites y derechos.", "Derechos humanos,Trabajo social", "Escuchar,Persuadir"),
  ],
  "Comunicación": [
    S("Comunicación Audiovisual", "Carreras", "Largo plazo", "Pago", "Produce contenido para cine, TV y digital.", "Radio y TV,Guion", "Crear,Organizar"),
    S("Periodismo", "Carreras", "Largo plazo", "Pago", "Investiga y cuenta lo que importa.", "Periodismo,Escritura creativa", "Analizar,Persuadir"),
    S("Publicidad y Creatividad", "Carreras", "Largo plazo", "Pago", "Crea campañas que la gente recuerda.", "Publicidad,Storytelling", "Crear,Persuadir"),
    S("Técnico en Locución y Radio", "Formación Técnica", "Corto plazo", "Pago", "Voz, dicción y producción radial.", "Locución,Radio y TV", "Persuadir,Crear"),
    S("Técnico en Marketing Digital", "Formación Técnica", "Corto plazo", "Pago", "Campañas, métricas y contenido que convierte.", "Marketing digital,Community manager", "Analizar,Persuadir"),
    S("Community manager junior", "Trabajo", "Corto plazo", "Gratuito", "Gestiona la voz de una marca en redes.", "Community manager,Redes sociales", "Crear,Organizar"),
    S("Redactor de contenidos", "Trabajo", "Corto plazo", "Gratuito", "Escribe blogs y guiones desde casa.", "Escritura creativa,Storytelling", "Crear,Perseverar"),
    S("Podcast propio monetizado", "Emprendimiento", "Corto plazo", "Gratuito", "Construye audiencia y consigue auspicios.", "Podcast,Locución", "Crear,Persuadir"),
    S("Agencia de contenido para marcas", "Emprendimiento", "Corto plazo", "Gratuito", "Vende paquetes de reels y fotos a negocios.", "Creación de contenido,Marketing digital", "Persuadir,Organizar"),
    S("Curso gratis de Storytelling", "Cursos Gratis", "Corto plazo", "Gratuito", "Estructura historias que enganchan.", "Storytelling,Guion", "Crear,Persuadir"),
    S("Curso de Redes Sociales para marcas", "Cursos Gratis", "Corto plazo", "Gratuito", "Estrategia, calendario y métricas.", "Redes sociales,Community manager", "Organizar,Analizar"),
    S("Curso de Podcast desde cero", "Cursos Gratis", "Corto plazo", "Gratuito", "Graba, edita y publica tu programa.", "Podcast,Locución", "Crear,Perseverar"),
    S("Beca de Comunicación y Medios", "Becas", "Largo plazo", "Con Beca", "Estudia comunicación con financiamiento.", "Periodismo,Publicidad,Radio y TV", "Persuadir,Crear"),
    S("Beca de Creadores Digitales", "Becas", "Corto plazo", "Con Beca", "Equipamiento y mentoría para creadores.", "Creación de contenido,Streaming", "Crear,Persuadir"),
    S("Voluntariado en radio comunitaria", "Voluntariados", "Corto plazo", "Gratuito", "Produce y conduce programas locales.", "Radio y TV,Locución", "Crear,Liderar"),
    S("Voluntariado: comunicación para ONG", "Voluntariados", "Corto plazo", "Gratuito", "Difunde causas sociales en redes.", "Redes sociales,Escritura creativa", "Persuadir,Crear"),
  ],
};

/* ---------------- Mini retos: +10 preguntas por área ---------------- */

export const QUIZ_BY_AREA: Record<Area, { q: string; options: string[] }[]> = {
  "Tecnología": [
    { q: "Una app se cae con 1000 usuarios. ¿Por dónde empiezas?", options: ["Reviso los errores del servidor", "Reinicio y espero", "Le pregunto a alguien más"] },
    { q: "Tienes que aprender una herramienta nueva en 3 días. Tú...", options: ["Hago un mini proyecto real", "Veo videos sin practicar", "Lo dejo para después"] },
    { q: "Tu código funciona pero es un desorden. ¿Qué haces?", options: ["Lo ordeno y documento", "Lo dejo así, ya funciona", "Lo borro y empiezo de nuevo"] },
    { q: "Un usuario reporta un error que no puedes reproducir.", options: ["Le pido pasos y reviso logs", "Le digo que es su equipo", "Lo ignoro"] },
    { q: "¿Qué te emociona más de la tecnología?", options: ["Crear algo que la gente use", "El sueldo alto", "Que suena moderno"] },
    { q: "Te dan datos desordenados de 500 personas.", options: ["Los limpio y busco patrones", "Los copio tal cual", "Pido que lo haga otro"] },
    { q: "¿Puedes pasar 2 horas seguidas depurando un error?", options: ["Sí, hasta encontrarlo", "Máximo 20 minutos", "No, me frustro rápido"] },
    { q: "Un cliente cambia los requisitos a última hora.", options: ["Negocio alcance y ajusto", "Me enojo y no cambio nada", "Acepto todo sin plazos"] },
    { q: "Detectas una falla de seguridad en un sistema.", options: ["Reporto de inmediato al responsable", "La publico en redes", "No digo nada"] },
    { q: "¿Te gusta explicar temas técnicos a gente no técnica?", options: ["Sí, uso ejemplos simples", "Me cuesta pero lo intento", "Prefiero no hacerlo"] },
  ],
  "Arte y Diseño": [
    { q: "Un cliente rechaza tu diseño favorito. ¿Qué haces?", options: ["Pregunto qué no funcionó y propongo otra ruta", "Insisto en el mío", "Abandono el proyecto"] },
    { q: "Tienes que crear con solo 2 colores.", options: ["Es un reto que me motiva", "Me limita demasiado", "Uso más igual"] },
    { q: "¿Disfrutas rehacer un diseño 5 veces?", options: ["Sí, mejora cada vez", "Depende del ánimo", "No, me frustra"] },
    { q: "Se te acaban las ideas a mitad de un proyecto.", options: ["Busco referencias y bocetos", "Copio algo de internet", "Lo dejo incompleto"] },
    { q: "Debes entregar mañana y falta la mitad.", options: ["Priorizo lo esencial y entrego", "Entrego tarde", "Pido a alguien que lo haga"] },
    { q: "¿Qué parte disfrutas más de crear?", options: ["El proceso de experimentar", "Solo el resultado final", "Los likes que recibe"] },
    { q: "Te piden trabajar en un estilo que no es el tuyo.", options: ["Lo estudio y lo adapto", "Me niego", "Lo hago mal a propósito"] },
    { q: "Tu obra recibe críticas duras en público.", options: ["Rescato lo útil y sigo", "Me bloqueo semanas", "Discuto con todos"] },
    { q: "¿Organizarías tu propia exposición o portafolio?", options: ["Sí, ya lo pensé", "Tal vez algún día", "No me interesa mostrar"] },
    { q: "Tienes materiales reciclados y un tema libre.", options: ["Ya imagino tres ideas", "Necesito instrucciones", "Prefiero otra tarea"] },
  ],
  "Salud": [
    { q: "Un paciente está muy nervioso antes de un procedimiento.", options: ["Lo calmo y le explico paso a paso", "Sigo el protocolo sin hablar", "Llamo a otra persona"] },
    { q: "¿Aguantarías turnos largos de pie?", options: ["Sí, me adapto", "Creo que sí", "No, imposible"] },
    { q: "Ves un accidente en la calle.", options: ["Evalúo y pido ayuda de inmediato", "Me quedo mirando", "Me alejo"] },
    { q: "Un familiar te pide un consejo médico que no sabes.", options: ["Le digo que consulte a un profesional", "Invento una respuesta", "Busco en redes y afirmo"] },
    { q: "¿Te incomoda ver sangre o heridas?", options: ["No, puedo manejarlo", "Un poco, pero me acostumbro", "Sí, mucho"] },
    { q: "Debes explicar un tratamiento a alguien que no entiende.", options: ["Uso palabras simples y verifico", "Repito lo técnico", "Le doy un papel y ya"] },
    { q: "Trabajas en equipo y hay una emergencia.", options: ["Sigo instrucciones y aviso lo que veo", "Actúo por mi cuenta", "Me paralizo"] },
    { q: "¿Te importa la prevención más que la cura?", options: ["Sí, educar evita enfermedades", "Ambas por igual", "No lo había pensado"] },
    { q: "Un caso te afecta emocionalmente.", options: ["Busco apoyo y cuido mi salud mental", "Lo guardo todo", "Renuncio"] },
    { q: "Debes memorizar mucho contenido técnico.", options: ["Estudio con constancia", "Me cuesta pero lo intento", "No es lo mío"] },
  ],
  "Ciencias": [
    { q: "Tu experimento falla 3 veces seguidas.", options: ["Reviso variables y lo repito", "Cambio los datos", "Lo abandono"] },
    { q: "¿Qué haces con un resultado inesperado?", options: ["Lo investigo, puede ser un hallazgo", "Lo descarto", "Lo escondo"] },
    { q: "Debes leer 40 páginas de un paper en inglés.", options: ["Lo hago con calma y notas", "Solo el resumen", "Ni lo abro"] },
    { q: "Te piden medir algo con precisión milimétrica.", options: ["Me concentro y repito la medición", "Estimo rápido", "Pido que lo haga otro"] },
    { q: "¿Disfrutas las matemáticas aplicadas?", options: ["Sí, son una herramienta", "Solo si son fáciles", "No"] },
    { q: "Un compañero cuestiona tu hipótesis.", options: ["Pido evidencia y debato con datos", "Me ofendo", "Cambio de tema"] },
    { q: "Un proyecto científico toma 2 años.", options: ["Me motiva el largo plazo", "Prefiero cosas rápidas", "Me aburriría"] },
    { q: "¿Te gusta divulgar ciencia a gente común?", options: ["Sí, mucho", "A veces", "No es lo mío"] },
    { q: "Encuentras un error tuyo en un informe entregado.", options: ["Lo corrijo y aviso", "Espero que nadie lo note", "Culpo a otro"] },
    { q: "¿Registrarías datos todos los días por meses?", options: ["Sí, con método", "Difícil pero posible", "No"] },
  ],
  "Deportes": [
    { q: "Tu atleta o equipo se desmotiva a mitad de temporada.", options: ["Ajusto el plan y los motivo", "Los presiono más", "Los dejo solos"] },
    { q: "¿Te gusta medir el progreso con datos?", options: ["Sí, registro todo", "A veces", "No, voy por sensación"] },
    { q: "Alguien se lesiona en pleno entrenamiento.", options: ["Aplico primeros auxilios y paro todo", "Sigo el entrenamiento", "Espero a que pase"] },
    { q: "Entrenar a las 5 a.m. durante meses...", options: ["Puedo con la disciplina", "Solo unas semanas", "Imposible"] },
    { q: "Pierdes una competencia importante.", options: ["Analizo errores y vuelvo", "Me rindo un tiempo", "Culpo al árbitro"] },
    { q: "¿Podrías dirigir a un grupo de 20 niños?", options: ["Sí, me gusta liderar", "Con ayuda", "No"] },
    { q: "Un jugador rompe las reglas del equipo.", options: ["Hablo claro y aplico consecuencias", "Lo ignoro", "Lo expulso sin hablar"] },
    { q: "¿Estudiarías nutrición y fisiología?", options: ["Sí, mejora el rendimiento", "Lo básico", "No me interesa"] },
    { q: "Tu cuerpo pide descanso pero hay competencia.", options: ["Consulto y priorizo la salud", "Sigo igual", "Abandono todo"] },
    { q: "¿Disfrutas más competir o enseñar a competir?", options: ["Ambos, según el momento", "Solo competir", "Solo enseñar"] },
  ],
  "Emprendimiento": [
    { q: "Nadie compra tu producto la primera semana.", options: ["Hablo con clientes y ajusto la oferta", "Bajo el precio al azar", "Me rindo"] },
    { q: "¿Te incomoda vender cara a cara?", options: ["No, disfruto conversar", "Un poco al inicio", "Muchísimo"] },
    { q: "Tienes S/ 300 para empezar. ¿Qué haces?", options: ["Pruebo con poco y mido resultados", "Compro mucho stock", "Espero tener más"] },
    { q: "Un cliente se queja públicamente.", options: ["Respondo rápido y soluciono", "Borro el comentario", "No respondo"] },
    { q: "¿Llevas cuentas de tus gastos?", options: ["Sí, todo anotado", "Más o menos", "Nunca"] },
    { q: "Tu socio no cumple su parte.", options: ["Converso y redefino acuerdos", "Hago todo yo", "Rompo todo sin hablar"] },
    { q: "Aparece un competidor más barato.", options: ["Diferencio mi propuesta", "Copio su precio", "Cierro"] },
    { q: "¿Trabajarías sin sueldo fijo por un tiempo?", options: ["Sí, si hay proyección", "Solo unos meses", "No"] },
    { q: "Te ofrecen una idea de negocio ya probada.", options: ["La adapto a mi contexto", "La copio igual", "La rechazo"] },
    { q: "¿Qué te mueve más al emprender?", options: ["Resolver un problema real", "Ser mi propio jefe", "Hacerme rico rápido"] },
  ],
  "Naturaleza": [
    { q: "Un cultivo se enferma de golpe.", options: ["Investigo la causa antes de actuar", "Uso químicos sin revisar", "Lo abandono"] },
    { q: "¿Trabajarías al aire libre con sol o lluvia?", options: ["Sí, me encanta", "A veces", "Prefiero oficina"] },
    { q: "Ves a alguien tirando basura en un río.", options: ["Converso y propongo alternativas", "Lo grabo y lo insulto", "Sigo de largo"] },
    { q: "Tu barrio no recicla nada.", options: ["Organizo una campaña simple", "Reciclo solo yo", "No hago nada"] },
    { q: "¿Registrarías especies durante meses?", options: ["Sí, con paciencia", "Un tiempo corto", "No"] },
    { q: "Un proyecto ambiental necesita convencer a autoridades.", options: ["Preparo datos y propongo", "Protesto solamente", "Me retiro"] },
    { q: "¿Te interesa la relación clima-economía?", options: ["Sí, todo está conectado", "Un poco", "No"] },
    { q: "Debes acampar 3 días para un monitoreo.", options: ["Me apunto", "Depende de las condiciones", "No podría"] },
    { q: "¿Cambiarías tus hábitos por el planeta?", options: ["Ya lo estoy haciendo", "Algunos", "No creo que sirva"] },
    { q: "Te toca enseñar reciclaje a niños.", options: ["Lo hago con juegos", "Charla formal", "Prefiero no"] },
  ],
  "Oficios Técnicos": [
    { q: "No hay luz en toda la casa. ¿Primer paso?", options: ["Reviso el tablero y busco la falla", "Toco cables al azar", "Llamo y espero"] },
    { q: "¿Te gusta arreglar cosas con tus manos?", options: ["Sí, mucho", "A veces", "No"] },
    { q: "Un cliente quiere el trabajo para hoy mismo.", options: ["Evalúo tiempos reales y comprometo lo posible", "Digo que sí a todo", "No respondo"] },
    { q: "Te falta una herramienta a mitad del trabajo.", options: ["Busco alternativa segura o la consigo", "Improviso sin seguridad", "Dejo la obra"] },
    { q: "¿Usarías siempre equipo de protección?", options: ["Sí, sin excepción", "Casi siempre", "Me estorba"] },
    { q: "Cometes un error que dañó material.", options: ["Aviso y asumo el costo", "Lo tapo", "Culpo al material"] },
    { q: "¿Aceptarías trabajar de madrugada por una emergencia?", options: ["Sí, se paga bien", "A veces", "Nunca"] },
    { q: "Un aprendiz quiere que le enseñes.", options: ["Le enseño paso a paso", "Que mire y aprenda", "No tengo tiempo"] },
    { q: "Debes cotizar un trabajo grande.", options: ["Calculo materiales, horas y margen", "Doy un precio al ojo", "Cobro lo que me digan"] },
    { q: "¿Te motiva ver el resultado terminado?", options: ["Sí, es lo mejor", "Es solo trabajo", "No me fijo"] },
  ],
  "Humanidades": [
    { q: "Alguien llora frente a ti contándote su problema.", options: ["Escucho sin juzgar", "Doy consejos de inmediato", "Cambio de tema"] },
    { q: "Debes defender una postura contraria a la tuya.", options: ["Investigo y argumento con respeto", "Me niego", "La ridiculizo"] },
    { q: "¿Te gusta leer textos largos y densos?", options: ["Sí, disfruto profundizar", "Con resúmenes", "No"] },
    { q: "Ves una injusticia en tu colegio o trabajo.", options: ["Busco canales y la denuncio", "Comento con amigos", "Lo dejo pasar"] },
    { q: "Te toca enseñar a alguien que no quiere aprender.", options: ["Busco conectar con sus intereses", "Le exijo", "Me rindo"] },
    { q: "¿Te interesa entender por qué la gente actúa así?", options: ["Muchísimo", "A veces", "No"] },
    { q: "Un debate se pone tenso.", options: ["Bajo el tono y ordeno ideas", "Levanto la voz", "Me voy"] },
    { q: "Debes trabajar con comunidades muy distintas a ti.", options: ["Me adapto y aprendo de ellas", "Me cuesta", "Prefiero no"] },
    { q: "¿Escribirías un ensayo de 10 páginas?", options: ["Sí, si el tema me apasiona", "Con esfuerzo", "Jamás"] },
    { q: "Descubres que tu fuente era falsa.", options: ["Corrijo públicamente", "No digo nada", "Sigo igual"] },
  ],
  "Comunicación": [
    { q: "Un post tuyo no funcionó nada.", options: ["Analizo métricas y pruebo otro ángulo", "Lo borro y ya", "Insisto igual"] },
    { q: "¿Te gusta hablar frente a cámara?", options: ["Sí", "Con práctica", "Para nada"] },
    { q: "Tienes 30 segundos para contar una historia.", options: ["Voy directo al conflicto", "Empiezo por el contexto largo", "No sabría"] },
    { q: "Recibes un dato sin confirmar sobre algo grave.", options: ["Verifico con dos fuentes", "Lo publico rápido", "Lo comento en privado"] },
    { q: "Una marca te pide algo que no crees.", options: ["Lo converso y propongo otra ruta", "Lo hago igual", "Peleo públicamente"] },
    { q: "¿Escribirías todos los días aunque nadie lea?", options: ["Sí, es práctica", "A veces", "No"] },
    { q: "Tu entrevista se corta a mitad del vivo.", options: ["Improviso y continúo", "Me bloqueo", "Termino todo"] },
    { q: "Te toca cubrir un tema aburrido.", options: ["Busco el ángulo humano", "Lo hago mecánico", "Lo rechazo"] },
    { q: "¿Aceptas críticas a tu contenido?", options: ["Sí, mejoran mi trabajo", "Duelen pero escucho", "No las leo"] },
    { q: "Debes explicar algo complejo en un reel.", options: ["Lo simplifico con ejemplos", "Uso términos técnicos", "No lo intento"] },
  ],
};

/* ---------------- Recursos reales por área ---------------- */

export const RESOURCES: Record<Area, { label: string; url: string; note: string }[]> = {
  "Tecnología": [
    { label: "CS50 — Harvard (gratis)", url: "https://cs50.harvard.edu/x/", note: "Programación desde cero" },
    { label: "freeCodeCamp", url: "https://www.freecodecamp.org/espanol/", note: "Certificaciones gratuitas" },
    { label: "Google Skillshop", url: "https://skillshop.withgoogle.com/", note: "Cursos con certificado" },
  ],
  "Arte y Diseño": [
    { label: "Canva Design School", url: "https://www.canva.com/designschool/", note: "Diseño práctico gratis" },
    { label: "Blender Foundation", url: "https://www.blender.org/support/tutorials/", note: "3D libre y gratuito" },
    { label: "Domestika (cursos gratis)", url: "https://www.domestika.org/es/courses/free", note: "Creatividad aplicada" },
  ],
  "Salud": [
    { label: "OPS Campus Virtual", url: "https://www.campusvirtualsp.org/es", note: "Cursos de salud pública" },
    { label: "Cruz Roja — Primeros auxilios", url: "https://www.cruzroja.org/", note: "Formación en emergencias" },
    { label: "OMS — Cursos OpenWHO", url: "https://openwho.org/", note: "Certificados gratuitos" },
  ],
  "Ciencias": [
    { label: "Khan Academy", url: "https://es.khanacademy.org/", note: "Matemática y ciencias" },
    { label: "edX — Ciencias", url: "https://www.edx.org/", note: "Cursos universitarios gratis" },
    { label: "NASA STEM", url: "https://www.nasa.gov/stem/", note: "Retos y recursos" },
  ],
  "Deportes": [
    { label: "Olympic Movement Learning", url: "https://olympics.com/athlete365", note: "Formación deportiva" },
    { label: "Coursera — Ciencias del deporte", url: "https://www.coursera.org/", note: "Cursos auditables gratis" },
    { label: "Yoga con Adriene", url: "https://www.youtube.com/@yogawithadriene", note: "Práctica guiada" },
  ],
  "Emprendimiento": [
    { label: "Santander Open Academy", url: "https://www.santanderopenacademy.com/es/", note: "Becas y cursos gratis" },
    { label: "Google Actívate", url: "https://learndigital.withgoogle.com/activate", note: "Negocios digitales" },
    { label: "Y Combinator Startup School", url: "https://www.startupschool.org/", note: "Crea tu startup" },
  ],
  "Naturaleza": [
    { label: "PNUMA — Cursos ambientales", url: "https://www.unep.org/", note: "Clima y sostenibilidad" },
    { label: "FAO eLearning", url: "https://elearning.fao.org/", note: "Agricultura y alimentos" },
    { label: "iNaturalist", url: "https://www.inaturalist.org/", note: "Ciencia ciudadana" },
  ],
  "Oficios Técnicos": [
    { label: "SENA Sofia Plus", url: "https://oferta.senasofiaplus.edu.co/", note: "Oficios certificados gratis" },
    { label: "Fundación Carlos Slim — Capacítate", url: "https://capacitateparaelempleo.org/", note: "Oficios técnicos online" },
    { label: "YouTube — Escuela de oficios", url: "https://www.youtube.com/results?search_query=curso+oficios+t%C3%A9cnicos", note: "Práctica guiada" },
  ],
  "Humanidades": [
    { label: "Coursera — Humanidades", url: "https://www.coursera.org/browse/arts-and-humanities", note: "Cursos auditables" },
    { label: "British Council — Inglés gratis", url: "https://learnenglish.britishcouncil.org/", note: "Idiomas" },
    { label: "UNICEF Voluntariado", url: "https://www.unicef.org/", note: "Voluntariados juveniles" },
  ],
  "Comunicación": [
    { label: "Knight Center — Periodismo", url: "https://journalismcourses.org/es/", note: "Cursos gratuitos" },
    { label: "Meta Blueprint", url: "https://www.facebook.com/business/learn", note: "Marketing en redes" },
    { label: "Spotify for Creators", url: "https://creators.spotify.com/", note: "Lanza tu podcast" },
  ],
};

/* ---------------- Construcción del catálogo ---------------- */

const slug = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").slice(0, 40);

export const OPPORTUNITIES: Opportunity[] = (Object.keys(SEEDS) as Area[]).flatMap((area) =>
  SEEDS[area].map((seed, idx) => {
    const [title, category, duration, cost, description, interests, strengths] = seed;
    const bank = QUIZ_BY_AREA[area];
    const quiz = [0, 1, 2].map((k) => bank[(idx + k * 3) % bank.length]!);
    return {
      id: `${slug(area)}-${slug(title)}`,
      title,
      area,
      category,
      duration,
      cost,
      description,
      interests: interests.split(","),
      strengths: strengths.split(","),
      emoji: CATEGORY_EMOJI[category],
      link: RESOURCES[area][idx % RESOURCES[area].length]!,
      quiz,
    } satisfies Opportunity;
  }),
);

/* ---------------- Perfil de usuario ---------------- */

export type RouteMilestone = { id: string; title: string; detail: string; done: boolean };

export type UserProfile = {
  name: string;
  email: string;
  stage: string;
  interests: string[];
  strengths: string[];
  values: string[];
  dreamText: string;
  selectedPath: string | null;
  affinity: Record<string, number>;
  completedSteps: string[];
  completedChallenges: string[];
  dynamicRoute: RouteMilestone[];
  reflections: { id: string; opportunity: string; feeling: string; liked: string }[];
};

export const emptyProfile: UserProfile = {
  name: "",
  email: "",
  stage: "",
  interests: [],
  strengths: [],
  values: [],
  dreamText: "",
  selectedPath: null,
  affinity: {},
  completedSteps: [],
  completedChallenges: [],
  dynamicRoute: [],
  reflections: [],
};

export function userAreas(p: UserProfile): Area[] {
  const count = new Map<Area, number>();
  for (const i of p.interests) {
    const a = INTEREST_AREA[i];
    if (a) count.set(a, (count.get(a) ?? 0) + 1);
  }
  return [...count.entries()].sort((a, b) => b[1] - a[1]).map(([a]) => a);
}

export function scoreOpportunity(o: Opportunity, p: UserProfile) {
  let score = 0;
  const areas = userAreas(p);
  const areaIdx = areas.indexOf(o.area);
  if (areaIdx === 0) score += 6;
  else if (areaIdx > 0) score += 4;
  for (const i of o.interests) if (p.interests.includes(i)) score += 3;
  for (const s of o.strengths) if (p.strengths.includes(s)) score += 2;
  if (p.values.includes("Dinero") && o.category === "Trabajo") score += 1;
  if (p.values.includes("Impacto social") && o.category === "Voluntariados") score += 2;
  if (p.values.includes("Libertad") && o.category === "Emprendimiento") score += 2;
  if (p.values.includes("Estabilidad") && o.category === "Carreras") score += 1;
  if (p.stage === "Secundaria" && o.category === "Cursos Gratis") score += 1;
  score += p.affinity[o.id] ?? 0;
  return score;
}

export function rankedOpportunities(p: UserProfile) {
  return [...OPPORTUNITIES].sort((a, b) => scoreOpportunity(b, p) - scoreOpportunity(a, p));
}

export function recommendedAreas(p: UserProfile): Area[] {
  const areas = userAreas(p);
  if (areas.length >= 3) return areas.slice(0, 3);
  const extra = AREAS.map((a) => a.id).filter((a) => !areas.includes(a));
  return [...areas, ...extra].slice(0, 3);
}

export function alternativesFor(o: Opportunity, p: UserProfile) {
  return rankedOpportunities(p)
    .filter((x) => x.area !== o.area && x.category !== "Becas")
    .slice(0, 2);
}

export const ACHIEVEMENTS: { id: string; title: string; emoji: string; test: (p: UserProfile) => boolean }[] = [
  { id: "start", title: "Diste el primer paso", emoji: "🌟", test: (p) => p.interests.length > 0 },
  { id: "explorer", title: "Explorador curioso", emoji: "🧭", test: (p) => p.interests.length >= 5 },
  { id: "challenger", title: "Aceptaste el reto", emoji: "🧪", test: (p) => p.completedChallenges.length >= 1 },
  { id: "reflective", title: "Mente reflexiva", emoji: "🪞", test: (p) => p.reflections.length >= 1 },
  { id: "focus", title: "Camino en foco", emoji: "🎯", test: (p) => !!p.selectedPath },
  { id: "master", title: "Maratón de retos", emoji: "🏆", test: (p) => p.completedChallenges.length >= 3 },
];

export function globalProgress(p: UserProfile) {
  const checks = [
    p.interests.length > 0,
    p.strengths.length > 0,
    p.values.length > 0,
    p.dreamText.trim().length > 3,
    p.completedChallenges.length > 0,
    p.reflections.length > 0,
    !!p.selectedPath,
    p.dynamicRoute.some((m) => m.done),
  ];
  return Math.round((checks.filter(Boolean).length / checks.length) * 100);
}

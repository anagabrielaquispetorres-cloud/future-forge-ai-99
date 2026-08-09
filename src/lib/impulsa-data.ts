export type Interest =
  | "Tecnología"
  | "Arte"
  | "Salud"
  | "Deportes"
  | "Emprendimiento"
  | "Naturaleza"
  | "Comunicación";

export const INTERESTS: { id: Interest; emoji: string }[] = [
  { id: "Tecnología", emoji: "💻" },
  { id: "Arte", emoji: "🎨" },
  { id: "Salud", emoji: "🩺" },
  { id: "Deportes", emoji: "🏅" },
  { id: "Emprendimiento", emoji: "🚀" },
  { id: "Naturaleza", emoji: "🌱" },
  { id: "Comunicación", emoji: "🗣️" },
];

export const STAGES = ["Secundaria", "Recién graduado", "Explorando", "Replanteando"] as const;

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
      { label: "Le doy un plan de acción", strength: "Liderar" },
      { label: "Analizo qué se puede arreglar", strength: "Resolver" },
      { label: "Le propongo algo divertido y nuevo", strength: "Crear" },
      { label: "Lo acompaño y lo escucho", strength: "Escuchar" },
    ],
  },
  {
    question: "Te dan un problema sin instrucciones. ¿Cómo lo enfrentas?",
    options: [
      { label: "Reúno gente para atacarlo", strength: "Liderar" },
      { label: "Lo divido en pasos lógicos", strength: "Resolver" },
      { label: "Experimento hasta encontrar algo", strength: "Crear" },
      { label: "Pregunto a quien ya lo vivió", strength: "Escuchar" },
    ],
  },
];

export const VALUES = [
  "Estabilidad",
  "Impacto social",
  "Libertad",
  "Creatividad",
  "Dinero",
  "Aprendizaje",
  "Reconocimiento",
  "Equilibrio",
];

export type Category = "Carreras" | "Oficios" | "Emprendimiento" | "Cursos" | "Becas";

export type Opportunity = {
  id: string;
  title: string;
  category: Category;
  interests: Interest[];
  strengths: string[];
  description: string;
  emoji: string;
  quiz: { q: string; options: string[] }[];
};

export const OPPORTUNITIES: Opportunity[] = [
  {
    id: "dev",
    title: "Desarrollo de Software",
    category: "Carreras",
    interests: ["Tecnología"],
    strengths: ["Resolver", "Crear"],
    description: "Construye apps y sistemas que resuelven problemas reales.",
    emoji: "💻",
    quiz: [
      { q: "Una app se cae con 1000 usuarios. ¿Por dónde empiezas?", options: ["Reviso los errores del servidor", "Le pregunto a alguien", "Reescribo todo"] },
      { q: "¿Qué te motiva más?", options: ["Ver mi idea funcionando", "El sueldo", "El reconocimiento"] },
      { q: "¿Te gusta aprender solo con tutoriales?", options: ["Sí, mucho", "A veces", "Prefiero clases"] },
    ],
  },
  {
    id: "uxui",
    title: "Diseño UX/UI",
    category: "Carreras",
    interests: ["Arte", "Tecnología"],
    strengths: ["Crear", "Escuchar"],
    description: "Diseña experiencias digitales bonitas y fáciles de usar.",
    emoji: "🎨",
    quiz: [
      { q: "Un usuario no encuentra el botón. ¿Qué haces?", options: ["Observo cómo navega", "Le explico dónde está", "Cambio el color al azar"] },
      { q: "¿Disfrutas rehacer un diseño 5 veces?", options: ["Sí, mejora cada vez", "Depende", "No, me frustra"] },
    ],
  },
  {
    id: "enfermeria",
    title: "Enfermería",
    category: "Carreras",
    interests: ["Salud"],
    strengths: ["Escuchar", "Resolver"],
    description: "Cuida y acompaña personas en momentos decisivos.",
    emoji: "🩺",
    quiz: [
      { q: "Un paciente está nervioso. ¿Qué haces primero?", options: ["Lo calmo y escucho", "Sigo el protocolo", "Llamo a otro"] },
      { q: "¿Aguantas turnos largos de pie?", options: ["Sí", "Creo que sí", "No"] },
    ],
  },
  {
    id: "fisio",
    title: "Ciencias del Deporte",
    category: "Carreras",
    interests: ["Deportes", "Salud"],
    strengths: ["Liderar", "Escuchar"],
    description: "Entrena, previene lesiones y potencia el rendimiento.",
    emoji: "🏅",
    quiz: [
      { q: "Tu atleta se desmotiva. ¿Qué haces?", options: ["Ajusto su plan y lo motivo", "Lo dejo descansar", "Le exijo más"] },
      { q: "¿Te gusta medir progreso con datos?", options: ["Sí", "Algo", "No"] },
    ],
  },
  {
    id: "marketing",
    title: "Marketing Digital",
    category: "Cursos",
    interests: ["Comunicación", "Emprendimiento", "Arte"],
    strengths: ["Crear", "Liderar"],
    description: "Curso de 8 semanas: contenido, redes y campañas.",
    emoji: "📣",
    quiz: [
      { q: "Un post no funcionó. ¿Qué haces?", options: ["Analizo métricas y pruebo otro", "Lo borro", "Insisto igual"] },
      { q: "¿Te gusta hablar en cámara?", options: ["Sí", "Con práctica", "Para nada"] },
    ],
  },
  {
    id: "audiovisual",
    title: "Producción Audiovisual",
    category: "Oficios",
    interests: ["Arte", "Comunicación"],
    strengths: ["Crear"],
    description: "Cuenta historias con cámara, edición y sonido.",
    emoji: "🎬",
    quiz: [
      { q: "Tienes 24h para un video. ¿Qué priorizas?", options: ["Guion claro", "Efectos", "Música"] },
      { q: "¿Editar horas seguidas te relaja?", options: ["Sí", "A ratos", "No"] },
    ],
  },
  {
    id: "agro",
    title: "Agroecología y Sostenibilidad",
    category: "Carreras",
    interests: ["Naturaleza", "Emprendimiento"],
    strengths: ["Resolver", "Crear"],
    description: "Proyectos verdes con impacto ambiental real.",
    emoji: "🌱",
    quiz: [
      { q: "Un cultivo se enferma. ¿Qué haces?", options: ["Investigo la causa", "Uso químicos", "Lo abandono"] },
      { q: "¿Trabajarías al aire libre?", options: ["Sí, me encanta", "A veces", "Prefiero oficina"] },
    ],
  },
  {
    id: "negocio",
    title: "Lanza tu micro-negocio",
    category: "Emprendimiento",
    interests: ["Emprendimiento", "Comunicación"],
    strengths: ["Liderar", "Crear"],
    description: "De la idea a tus primeras ventas en 30 días.",
    emoji: "🚀",
    quiz: [
      { q: "Nadie compra tu producto. ¿Qué haces?", options: ["Hablo con clientes y ajusto", "Bajo el precio", "Me rindo"] },
      { q: "¿Te incomoda vender?", options: ["No", "Un poco", "Mucho"] },
    ],
  },
  {
    id: "tecnico-redes",
    title: "Técnico en Redes y Soporte",
    category: "Oficios",
    interests: ["Tecnología"],
    strengths: ["Resolver"],
    description: "Oficio técnico con alta demanda y salida rápida.",
    emoji: "🛠️",
    quiz: [
      { q: "No hay internet en la oficina. ¿Primer paso?", options: ["Reviso el router", "Llamo al proveedor", "Reinicio todo"] },
      { q: "¿Te gusta arreglar cosas con las manos?", options: ["Sí", "A veces", "No"] },
    ],
  },
  {
    id: "beca-stem",
    title: "Beca Jóvenes STEM",
    category: "Becas",
    interests: ["Tecnología", "Salud", "Naturaleza"],
    strengths: ["Resolver"],
    description: "Cubre estudios en ciencia y tecnología para menores de 25.",
    emoji: "🎓",
    quiz: [
      { q: "¿Tienes promedio y ganas de estudiar duro?", options: ["Sí", "Más o menos", "No"] },
      { q: "¿Podrías mudarte de ciudad?", options: ["Sí", "Tal vez", "No"] },
    ],
  },
  {
    id: "beca-arte",
    title: "Beca de Artes y Cultura",
    category: "Becas",
    interests: ["Arte", "Comunicación"],
    strengths: ["Crear"],
    description: "Financia formación artística y proyectos culturales.",
    emoji: "🖼️",
    quiz: [
      { q: "¿Tienes un portafolio propio?", options: ["Sí", "En proceso", "Todavía no"] },
      { q: "¿Presentarías tu obra en público?", options: ["Sí", "Con nervios", "No"] },
    ],
  },
  {
    id: "psico",
    title: "Psicología",
    category: "Carreras",
    interests: ["Salud", "Comunicación"],
    strengths: ["Escuchar"],
    description: "Comprende a las personas y acompaña su bienestar.",
    emoji: "🧠",
    quiz: [
      { q: "Alguien llora frente a ti. ¿Qué haces?", options: ["Escucho sin juzgar", "Doy consejos", "Cambio de tema"] },
      { q: "¿Te interesa la investigación?", options: ["Sí", "Algo", "No"] },
    ],
  },
];

export type UserProfile = {
  name: string;
  email: string;
  stage: string;
  interests: Interest[];
  strengths: string[];
  values: string[];
  dreamText: string;
  selectedPath: string | null;
  affinity: Record<string, number>;
  completedSteps: string[];
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
};

export function scoreOpportunity(o: Opportunity, p: UserProfile) {
  let score = 0;
  for (const i of o.interests) if (p.interests.includes(i)) score += 3;
  for (const s of o.strengths) if (p.strengths.includes(s)) score += 2;
  score += p.affinity[o.id] ?? 0;
  return score;
}

export function rankedOpportunities(p: UserProfile) {
  return [...OPPORTUNITIES].sort((a, b) => scoreOpportunity(b, p) - scoreOpportunity(a, p));
}

export function recommendedAreas(p: UserProfile): string[] {
  const map: Record<Interest, string[]> = {
    Tecnología: ["Tecnología e Innovación", "Datos y Software"],
    Arte: ["Diseño y Creatividad", "Industrias Culturales"],
    Salud: ["Salud y Cuidado", "Bienestar Humano"],
    Deportes: ["Deporte y Rendimiento", "Vida Activa"],
    Emprendimiento: ["Negocios y Emprendimiento", "Gestión de Proyectos"],
    Naturaleza: ["Medio Ambiente y Sostenibilidad", "Ciencias de la Tierra"],
    Comunicación: ["Comunicación y Medios", "Marketing y Contenido"],
  };
  const areas: string[] = [];
  for (const i of p.interests) for (const a of map[i]) if (!areas.includes(a)) areas.push(a);
  if (p.strengths.includes("Liderar")) areas.push("Liderazgo y Equipos");
  if (p.strengths.includes("Escuchar")) areas.push("Acompañamiento y Personas");
  return areas.slice(0, 3);
}

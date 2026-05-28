import { EducationalArticle, HormonalMetrics, BleedingLog } from './types';

export const INITIAL_METRICS: HormonalMetrics = {
  progesterona: 45, // MODERADA
  estrogenos: 75,   // OBSERVACIÓN
  insulina: 20,     // BAJA
  cortisol: 85,     // ALTA
  inflamacion: 70,  // OBSERVACIÓN
  digestion: 50     // MODERA
};

export const DEFAULT_LOGS: BleedingLog[] = [
  {
    id: '1',
    date: '2026-05-25',
    time: '08:00',
    bleedingLevel: 'Abundante',
    clots: 'Pequeños',
    painLevel: 7,
    emotionalState: 'Ansiedad',
    notes: 'Primer día de sangrado abundante con cólicos moderados.'
  },
  {
    id: '2',
    date: '2026-05-26',
    time: '14:30',
    bleedingLevel: 'Abundante',
    clots: 'Grandes',
    painLevel: 8,
    emotionalState: 'Fatiga',
    notes: 'Dolor pélvico persistente, preferí recostarme.'
  }
];

export const EDUCATIONAL_ARTICLES: EducationalArticle[] = [
  {
    id: 'art-1',
    title: 'Comprendiendo la Progesterona: Tu aliada de calma',
    readTime: '4 min',
    category: 'Soberanía Hormonal',
    summary: 'La progesterona es la hormona de la calma, el reposo y la maduración endometrial. Conoce cómo estimularla naturalmente.',
    content: 'La progesterona se produce principalmente tras la ovulación en el cuerpo lúteo. Actúa como el contrapeso natural del estrógeno. Cuando los niveles son bajos, podemos experimentar irritabilidad, insomnio y sangrados irregulares o abundantes. Para favorecerla, es clave un estilo de vida con bajo estrés, descanso reparador y un consumo adecuado de grasas saludables y zinc.',
    icon: 'spa'
  },
  {
    title: 'Metabolismo de Estrógenos y el papel del Hígado',
    id: 'art-2',
    readTime: '6 min',
    category: 'Nutrición Terapéutica',
    summary: 'Los estrógenos deben metabolizarse correctamente a través del hígado para evitar la hiperestrogenemia y cargas inflamatorias.',
    content: 'El hígado metaboliza los estrógenos a través de dos fases de desintoxicación. Si estas fases están lentas por exceso de azúcares, alcohol o baja ingesta de vegetales crucíferos (brócoli, coliflor), los estrógenos recirculan de forma más activa y nociva, aumentando los síntomas de inflamación uterina y flujo abundante. Consumir alimentos ricos en sulforafano promueve la vía saludable del 2-hidroxiestrógeno.',
    icon: 'nutrition'
  },
  {
    title: 'Cortisol alto y su impacto directo en el Ciclo',
    id: 'art-3',
    readTime: '5 min',
    category: 'Estrés y Energía',
    summary: 'El cortisol elevado puede bloquear la ovulación y "robar" progesterona, empeorando el dolor y la inflamación.',
    content: 'En condiciones de estrés crónico, el cuerpo prioriza la producción de cortisol por encima de las hormonas sexuales. Este fenómeno, conocido como "robo de pregnenolona", causa un déficit severo de progesterona. El resultado es un predominio estrogénico relativo que exacerba el sangrado menstrual profuso, los coágulos y los dolores intensos.',
    icon: 'psychology'
  },
  {
    title: 'Guía de Alimentación Antiinflamatoria',
    id: 'art-4',
    readTime: '7 min',
    category: 'Bienestar Diario',
    summary: 'Reduce los alimentos proinflamatorios para modular las prostaglandinas responsables del dolor y contracción uterina.',
    content: 'Las prostaglandinas inflamatorias estimulan contracciones uterinas intensas y dolorosas. Eliminar de forma temporal los lácteos tipo A1, los aceites de semillas refinados y el azúcar refinada ayuda radicalmente a regular la secreción de estas moléculas, traduciéndose en sangrados más ligeros y periodos mucho más cómodos.',
    icon: 'restaurant'
  }
];

export const ONBOARDING_STEPS = [
  {
    id: 1,
    title: 'Datos Personales',
    subtitle: 'Cuéntanos sobre ti',
    description: 'Comencemos con los datos básicos para personalizar tu experiencia.'
  },
  {
    id: 2,
    title: 'Intensidad de Sangrado',
    subtitle: '¿Cómo ha sido tu flujo?',
    description: 'La intensidad y regularidad de tu sangrado menstrual son indicadores clave.'
  },
  {
    id: 3,
    title: 'Carga Inflamatoria',
    subtitle: 'Tus hábitos alimenticios',
    description: 'La inflamación sistémica a menudo se origina en el intestino e influye directamente en el útero.'
  },
  {
    id: 4,
    title: 'Manejo del Estrés',
    subtitle: 'Tu día a día emocional',
    description: 'El estrés eleva el cortisol, bloqueando la producción natural de progesterona.'
  },
  {
    id: 5,
    title: 'Sueño y Energía',
    subtitle: 'Nivel de descanso',
    description: 'El reposo nocturno calibra tu producción hormonal y regenera los tejidos.'
  },
  {
    id: 6,
    title: 'Digestión',
    subtitle: 'Salud intestinal',
    description: 'Un intestino saludable asegura la excreción correcta de los estrógenos metabolizados.'
  },
  {
    id: 7,
    title: 'Historial Médico',
    subtitle: 'Diagnósticos previos',
    description: 'Esto nos permite ajustar el enfoque de análisis clínico y prevención.'
  }
];

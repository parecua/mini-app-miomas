export type AppScreen = 'WELCOME' | 'ONBOARDING' | 'DASHBOARD' | 'EMERGENCY';

export interface UserProfile {
  nombreCompleto: string;
  edad: string;
  pais: string;
  whatsapp: string;
  // Answers from steps 2-7
  flujoIntensidad: string;
  duracionCiclo: string;
  coagulosFrecuencia: string;
  lacteosYAzucar: string;
  estresNivel: number; // 0-10
  suenoHoras: string;
  energiaNivel: string;
  actividadFisica: string;
  saludDigestiva: string;
  historialMedico: string[];
}

export interface BleedingLog {
  id: string;
  date: string;
  time: string;
  bleedingLevel: 'Moderado' | 'Abundante' | 'Muy Abundante' | 'Crítico';
  clots: 'No' | 'Pequeños' | 'Grandes';
  painLevel: number; // 0-10
  emotionalState: string;
  notes: string;
}

export interface HormonalMetrics {
  progesterona: number; // percentage
  estrogenos: number; // percentage
  insulina: number; // percentage
  cortisol: number; // percentage
  inflamacion: number; // percentage
  digestion: number; // percentage
}

export interface EducationalArticle {
  id: string;
  title: string;
  readTime: string;
  category: string;
  summary: string;
  content: string;
  icon: string;
}

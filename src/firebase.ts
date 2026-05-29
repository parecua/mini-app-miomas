import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut, 
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  getDoc, 
  getDocFromServer, 
  setDoc, 
  updateDoc,
  collection, 
  getDocs, 
  writeBatch,
  query,
  where,
  deleteDoc,
  serverTimestamp
} from 'firebase/firestore';
import { UserProfile, BleedingLog } from './types';

// Web App's production Firebase configuration directly integrated
const clinicalFirebaseConfig = {
  apiKey: "AIzaSyAvIJwJDwQSM0qD4Oew_-ePko0r2ZvSosQ",
  authDomain: "miomas-ia.firebaseapp.com",
  projectId: "miomas-ia",
  storageBucket: "miomas-ia.firebasestorage.app",
  messagingSenderId: "11875500040",
  appId: "1:11875500040:web:b3a32d90f01962eed3d1bd"
};

// Initialize core Firebase Client Services
const app = initializeApp(clinicalFirebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// Section 3 strict error enum and interfaces
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Strictly validate connection at startup
async function testConnection() {
  try {
    const testDocRef = doc(db, 'test', 'connection');
    await getDocFromServer(testDocRef);
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error("Please check your Firebase configuration: Client is offline.");
    }
  }
}
testConnection();

// Trigger interactive Google Sign In Popup (preferred in this sandbox iframe environment)
export async function loginWithGoogle(): Promise<User> {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error('Google Auth Popup Error:', error);
    throw error;
  }
}

// Trigger Sign Out
export async function logoutUser() {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Sign out error:', error);
    throw error;
  }
}

// Synchronize all offline variables to the active Firebase user workspace
export async function syncLocalToCloud(userId: string) {
  try {
    const batch = writeBatch(db);

    // 1. Sync UserProfile
    const localProfileStr = localStorage.getItem('mi_salud_uterina_profile');
    if (localProfileStr) {
      const profile: UserProfile = JSON.parse(localProfileStr);
      const profileRef = doc(db, 'users', userId, 'profile', 'info');
      batch.set(profileRef, {
        ...profile,
        userId: userId,
        updatedAt: serverTimestamp()
      });
    }

    // 2. Sync Progress
    const localDaysStr = localStorage.getItem('salud_uterina_90_dias_progreso');
    const localVideosStr = localStorage.getItem('mi_salud_uterina_video_completed');
    const localJugoStr = localStorage.getItem('salud_uterina_jugo_mensual_core_drunk');

    const completedDays = localDaysStr ? JSON.parse(localDaysStr) : [];
    const completedVideos = localVideosStr ? JSON.parse(localVideosStr) : [];
    const coreJugoDrunk = localJugoStr === 'true';

    const progressRef = doc(db, 'users', userId, 'progress', 'state');
    batch.set(progressRef, {
      userId: userId,
      completedDays: Array.isArray(completedDays) ? completedDays : [],
      completedVideos: Array.isArray(completedVideos) ? completedVideos : [],
      coreJugoDrunk: !!coreJugoDrunk,
      updatedAt: serverTimestamp()
    });

    // 3. Sync BleedingLogs
    const localLogsStr = localStorage.getItem('mi_salud_uterina_logs');
    if (localLogsStr) {
      const logs: BleedingLog[] = JSON.parse(localLogsStr);
      for (const log of logs) {
        if (log.id && log.date) {
          const logRef = doc(db, 'users', userId, 'logs', log.id);
          batch.set(logRef, {
            id: log.id,
            userId: userId,
            date: log.date,
            time: log.time || '00:00',
            bleedingLevel: log.bleedingLevel,
            clots: log.clots,
            painLevel: Number(log.painLevel),
            emotionalState: log.emotionalState || '',
            notes: log.notes || '',
            createdAt: serverTimestamp()
          });
        }
      }
    }

    await batch.commit();
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `users/${userId}/sync`);
  }
}

// Download existing cloud state to local storage (in case patient changes browser or device)
export async function syncCloudToLocal(userId: string) {
  try {
    // 1. Fetch profile
    const profileRef = doc(db, 'users', userId, 'profile', 'info');
    const profileSnap = await getDoc(profileRef);
    if (profileSnap.exists()) {
      const dbProfile = profileSnap.data();
      // Remove metadata to keep clean type compatibility
      const cleanProfile: UserProfile = {
        nombreCompleto: dbProfile.nombreCompleto || '',
        edad: dbProfile.edad || '',
        pais: dbProfile.pais || '',
        whatsapp: dbProfile.whatsapp || '',
        flujoIntensidad: dbProfile.flujoIntensidad || 'Moderado',
        duracionCiclo: dbProfile.duracionCiclo || '28 días',
        coagulosFrecuencia: dbProfile.coagulosFrecuencia || 'No',
        lacteosYAzucar: dbProfile.lacteosYAzucar || 'Diario',
        estresNivel: Number(dbProfile.estresNivel) || 5,
        suenoHoras: dbProfile.suenoHoras || '7-8 horas',
        energiaNivel: dbProfile.energiaNivel || 'Media',
        actividadFisica: dbProfile.actividadFisica || 'Regular (2-3 veces/semana)',
        saludDigestiva: dbProfile.saludDigestiva || 'Regular con inflamación ocasional',
        historialMedico: dbProfile.historialMedico || [],
        suenoAfectadores: dbProfile.suenoAfectadores || [],
        suenoAfectadoresOtro: dbProfile.suenoAfectadoresOtro || '',
        emocionesPositivas: dbProfile.emocionesPositivas || [],
        emocionesNegativas: dbProfile.emocionesNegativas || [],
        emocionesOtro: dbProfile.emocionesOtro || '',
        fumaHabito: dbProfile.fumaHabito || 'No',
        vidaSocialComentarios: dbProfile.vidaSocialComentarios || '',
        valoracionSintomas: dbProfile.valoracionSintomas || {
          sintoma_sangrado_abundante: 0,
          sintoma_periodos_prolongados: 0,
          sintoma_coagulos_grandes: 0,
          sintoma_dolor_pelvico: 0,
          sintoma_inflamacion_abdominal: 0,
          sintoma_presion_uterina: 0,
          sintoma_fatiga_cansancio: 0,
          sintoma_mareos_debilidad: 0,
          sintoma_falta_concentracion: 0,
          sintoma_miccion_frecuente: 0,
          sintoma_estrenimiento: 0,
          sintoma_vaciado_incompleto: 0,
        }
      };
      localStorage.setItem('mi_salud_uterina_profile', JSON.stringify(cleanProfile));
    }

    // 2. Fetch progress
    const progressRef = doc(db, 'users', userId, 'progress', 'state');
    const progressSnap = await getDoc(progressRef);
    if (progressSnap.exists()) {
      const dbProgress = progressSnap.data();
      localStorage.setItem('salud_uterina_90_dias_progreso', JSON.stringify(dbProgress.completedDays || []));
      localStorage.setItem('mi_salud_uterina_video_completed', JSON.stringify(dbProgress.completedVideos || []));
      localStorage.setItem('salud_uterina_jugo_mensual_core_drunk', String(dbProgress.coreJugoDrunk || false));
    }

    // 3. Fetch bleeding logs
    const logsRef = collection(db, 'users', userId, 'logs');
    const querySnap = await getDocs(logsRef);
    if (!querySnap.empty) {
      const dbLogs: BleedingLog[] = [];
      querySnap.forEach((docSnap) => {
        const item = docSnap.data();
        dbLogs.push({
          id: item.id,
          date: item.date,
          time: item.time,
          bleedingLevel: item.bleedingLevel,
          clots: item.clots,
          painLevel: Number(item.painLevel),
          emotionalState: item.emotionalState,
          notes: item.notes
        });
      });
      
      // Sort desc by date and time
      dbLogs.sort((a, b) => b.date.localeCompare(a.date) || b.time.localeCompare(a.time));
      localStorage.setItem('mi_salud_uterina_logs', JSON.stringify(dbLogs));
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, `users/${userId}/sync`);
  }
}

// Single-purpose fast update helpers for reactive saves during action events
export async function saveProfileToCloud(userId: string, profile: UserProfile) {
  try {
    const profileRef = doc(db, 'users', userId, 'profile', 'info');
    await setDoc(profileRef, {
      ...profile,
      userId,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `users/${userId}/profile/info`);
  }
}

export async function saveProgressToCloud(userId: string, data: { completedDays: number[]; completedVideos: string[]; coreJugoDrunk: boolean }) {
  try {
    const progressRef = doc(db, 'users', userId, 'progress', 'state');
    await setDoc(progressRef, {
      ...data,
      userId,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `users/${userId}/progress/state`);
  }
}

export async function saveLogToCloud(userId: string, log: BleedingLog) {
  try {
    const logRef = doc(db, 'users', userId, 'logs', log.id);
    await setDoc(logRef, {
      id: log.id,
      userId,
      date: log.date,
      time: log.time || '00:00',
      bleedingLevel: log.bleedingLevel,
      clots: log.clots,
      painLevel: Number(log.painLevel),
      emotionalState: log.emotionalState || '',
      notes: log.notes || '',
      createdAt: serverTimestamp()
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `users/${userId}/logs/${log.id}`);
  }
}

export async function deleteLogFromCloud(userId: string, logId: string) {
  try {
    const logRef = doc(db, 'users', userId, 'logs', logId);
    await deleteDoc(logRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `users/${userId}/logs/${logId}`);
  }
}

/**
 * Normalizes user input (phone number or email string) for safe Firebase Auth.
 */
export function normalizeIdentifierToEmail(identifier: string): string {
  const trimmed = identifier.trim();
  if (trimmed.includes('@')) {
    return trimmed;
  }
  // Strip out any non-alphanumeric characters to get standard identifier digits
  const digits = trimmed.replace(/[^a-zA-Z0-9]/g, '');
  return `phone_${digits}@tumedicina.com`;
}


import { useState, useEffect } from 'react';
import { AppScreen, UserProfile, BleedingLog, HormonalMetrics } from './types';
import { INITIAL_METRICS, DEFAULT_LOGS } from './data';
import Header from './components/Header';
import WelcomeScreen from './components/WelcomeScreen';
import OnboardingScreen from './components/OnboardingScreen';
import DashboardScreen from './components/DashboardScreen';
import EmergencyScreen from './components/EmergencyScreen';
import AuthScreen from './components/AuthScreen';
import { auth, logoutUser, saveProfileToCloud, saveLogToCloud } from './firebase';

export function createDefaultProfile(overrides: Partial<UserProfile> = {}): UserProfile {
  return {
    nombreCompleto: '',
    edad: '',
    pais: '',
    whatsapp: '',
    flujoIntensidad: 'Moderado',
    duracionCiclo: '28 días',
    coagulosFrecuencia: 'No',
    lacteosYAzucar: 'Diario',
    estresNivel: 5,
    suenoHoras: '7-8 horas',
    energiaNivel: 'Media',
    actividadFisica: 'Regular (2-3 veces/semana)',
    saludDigestiva: 'Regular con inflamación ocasional',
    historialMedico: [],
    suenoAfectadores: [],
    suenoAfectadoresOtro: '',
    emocionesPositivas: [],
    emocionesNegativas: [],
    emocionesOtro: '',
    fumaHabito: 'No',
    vidaSocialComentarios: '',
    valoracionSintomas: {
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
    },
    ...overrides
  };
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('WELCOME');
  const [activeTab, setActiveTab] = useState<string>('inicio');
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState<boolean>(true);
  
  // Patient Profile state
  const [profile, setProfile] = useState<UserProfile>(createDefaultProfile());

  // Bleeding log entries state
  const [logs, setLogs] = useState<BleedingLog[]>(DEFAULT_LOGS);

  // Dynamic metrics
  const [metrics, setMetrics] = useState<HormonalMetrics>(INITIAL_METRICS);

  // Monitor Auth Changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setCurrentUser(firebaseUser);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Load from local storage on mount if available
  useEffect(() => {
    try {
      const storedProfile = localStorage.getItem('mi_salud_uterina_profile');
      const storedLogs = localStorage.getItem('mi_salud_uterina_logs');
      const storedScreen = localStorage.getItem('mi_salud_uterina_screen');
      
      if (storedProfile) {
        setProfile(JSON.parse(storedProfile));
      }
      if (storedLogs) {
        setLogs(JSON.parse(storedLogs));
      }
      if (storedScreen) {
        // Safe navigation restore
        const parsedScreen = storedScreen as AppScreen;
        if (parsedScreen === 'DASHBOARD' || parsedScreen === 'EMERGENCY' || parsedScreen === 'WELCOME') {
          setCurrentScreen(parsedScreen);
        }
      }
    } catch (e) {
      console.error('Error recovering storage', e);
    }
  }, []);

  // Re-sync local React states when cloud actions write directly to LocalStorage
  const reloadAllLocalData = () => {
    try {
      const storedProfile = localStorage.getItem('mi_salud_uterina_profile');
      const storedLogs = localStorage.getItem('mi_salud_uterina_logs');
      
      if (storedProfile) {
        const parsedProfile = JSON.parse(storedProfile);
        setProfile(parsedProfile);
        
        if (storedLogs) {
          const parsedLogs = JSON.parse(storedLogs);
          setLogs(parsedLogs);
          recalculateHormones(parsedLogs, parsedProfile);
        } else {
          recalculateHormones(logs, parsedProfile);
        }
      } else if (storedLogs) {
        const parsedLogs = JSON.parse(storedLogs);
        setLogs(parsedLogs);
        recalculateHormones(parsedLogs, profile);
      }
    } catch (e) {
      console.error('Error reloading local data after sync', e);
    }
  };

  // Recalibrate metrics dynamically when a new bleeding instance is registered
  const recalculateHormones = (currentLogs: BleedingLog[], currentProfile: UserProfile) => {
    let baseProgest = 45;
    let baseEstrog = 75;
    let baseInsulin = 20;
    let baseCortisol = 85;
    let baseInflam = 70;
    let baseDigestion = 50;

    // Adapt based on user's initial profiles
    if (currentProfile.estresNivel > 7) {
      baseCortisol += 10;
      baseProgest -= 8;
    }
    if (currentProfile.lacteosYAzucar === 'Diario') {
      baseInflam += 12;
    }
    if (currentProfile.historialMedico.includes('SOP (Síndrome Ovario Poliquístico)')) {
      baseInsulin += 35;
    }

    // Adaptations for NEW sections
    // 1. Negative emotions increase stress slightly and lower progesterone counters
    if (currentProfile.emocionesNegativas && currentProfile.emocionesNegativas.length > 0) {
      const addedStress = Math.min(15, currentProfile.emocionesNegativas.length * 2);
      baseCortisol += addedStress;
      baseProgest -= Math.min(8, currentProfile.emocionesNegativas.length * 1);
    }

    // 2. Tobacco habits increase overall inflammatory score
    if (currentProfile.fumaHabito === 'Sí, con frecuencia') {
      baseInflam += 15;
    } else if (currentProfile.fumaHabito === 'Sí, ocasionalmente') {
      baseInflam += 8;
    }

    // 3. 12-Symptom assessment ratings (valoracionSintomas scores: 0-4 per symptom)
    if (currentProfile.valoracionSintomas) {
      // A. Sangrado sintomas (1, 2, 3) -> feed Estrogens and Inflammation
      const bleedingPart = (currentProfile.valoracionSintomas.sintoma_sangrado_abundante || 0) +
                           (currentProfile.valoracionSintomas.sintoma_periodos_prolongados || 0) +
                           (currentProfile.valoracionSintomas.sintoma_coagulos_grandes || 0);
      baseEstrog += bleedingPart * 2;
      baseInflam += bleedingPart * 1;

      // B. Dolor & Inflamación sintomas (4, 5, 6) -> feed Inflammation
      const painPart = (currentProfile.valoracionSintomas.sintoma_dolor_pelvico || 0) +
                       (currentProfile.valoracionSintomas.sintoma_inflamacion_abdominal || 0) +
                       (currentProfile.valoracionSintomas.sintoma_presion_uterina || 0);
      baseInflam += painPart * 2;

      // C. Fatiga & Energía sintomas (7, 8, 9) -> feed Cortisol and reduce Progesterone
      const fatiguePart = (currentProfile.valoracionSintomas.sintoma_fatiga_cansancio || 0) +
                          (currentProfile.valoracionSintomas.sintoma_mareos_debilidad || 0) +
                          (currentProfile.valoracionSintomas.sintoma_falta_concentracion || 0);
      baseCortisol += fatiguePart * 1.5;
      baseProgest -= fatiguePart * 1;

      // D. Urinario & Intestinal sintomas (10, 11, 12) -> lower digestion efficiency
      const digestivePart = (currentProfile.valoracionSintomas.sintoma_miccion_frecuente || 0) +
                            (currentProfile.valoracionSintomas.sintoma_estrenimiento || 0) +
                            (currentProfile.valoracionSintomas.sintoma_vaciado_incompleto || 0);
      baseDigestion -= digestivePart * 2.5;
    }

    // Adapt based on user's logs
    currentLogs.forEach(log => {
      if (log.bleedingLevel === 'Crítico' || log.bleedingLevel === 'Muy Abundante') {
        baseInflam += 8;
        baseCortisol += 5;
        baseEstrog += 5;
        baseProgest -= 4;
      }
      if (log.painLevel > 7) {
        baseCortisol += 4;
        baseInflam += 4;
      }
    });

    // Clamp values between 5 and 95%
    const clamp = (val: number) => Math.max(5, Math.min(val, 95));

    setMetrics({
      progesterona: clamp(baseProgest),
      estrogenos: clamp(baseEstrog),
      insulina: clamp(baseInsulin),
      cortisol: clamp(baseCortisol),
      inflamacion: clamp(baseInflam),
      digestion: clamp(baseDigestion)
    });
  };

  // Recalibrate on initial load
  useEffect(() => {
    recalculateHormones(logs, profile);
  }, [logs, profile]);

  // Helper trigger to save profile
  const handleOnboardingComplete = (newProfile: UserProfile) => {
    setProfile(newProfile);
    setCurrentScreen('DASHBOARD');
    setActiveTab('inicio');
    
    // Recalculate metrics
    recalculateHormones(logs, newProfile);
    
    try {
      localStorage.setItem('mi_salud_uterina_profile', JSON.stringify(newProfile));
      localStorage.setItem('mi_salud_uterina_screen', 'DASHBOARD');
      
      // Auto-save to Firebase if the user is authenticated
      if (auth.currentUser) {
        saveProfileToCloud(auth.currentUser.uid, newProfile);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddLog = (newLog: BleedingLog) => {
    const updated = [newLog, ...logs];
    setLogs(updated);
    recalculateHormones(updated, profile);
    
    try {
      localStorage.setItem('mi_salud_uterina_logs', JSON.stringify(updated));
      
      // Auto-save log to Firebase if user is authenticated
      if (auth.currentUser) {
        saveLogToCloud(auth.currentUser.uid, newLog);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleResetSession = () => {
    // Clear state
    setProfile(createDefaultProfile());
    setLogs(DEFAULT_LOGS);
    setMetrics(INITIAL_METRICS);
    setCurrentScreen('WELCOME');
    
    try {
      localStorage.removeItem('mi_salud_uterina_profile');
      localStorage.removeItem('mi_salud_uterina_logs');
      localStorage.removeItem('mi_salud_uterina_screen');
    } catch (e) {
      console.error(e);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      setCurrentUser(null);
      setCurrentScreen('WELCOME');
    } catch (e) {
      console.error('Error logging out', e);
    }
  };

  const handleScreenChange = (screen: AppScreen) => {
    setCurrentScreen(screen);
    try {
      localStorage.setItem('mi_salud_uterina_screen', screen);
    } catch (e) {
      console.error(e);
    }
  };

  const handleAuthSuccess = () => {
    const storedProfile = localStorage.getItem('mi_salud_uterina_profile');
    if (storedProfile) {
      try {
        const parsed = JSON.parse(storedProfile);
        setProfile(parsed);
        setCurrentScreen('DASHBOARD');
      } catch (e) {
        setCurrentScreen('WELCOME');
      }
    } else if (auth.currentUser?.displayName) {
      const defaultProfile = createDefaultProfile({
        nombreCompleto: auth.currentUser.displayName,
        edad: '30',
        whatsapp: auth.currentUser.email?.includes('phone_') 
          ? auth.currentUser.email.replace('phone_', '').replace('@tumedicina.com', '') 
          : '',
      });
      setProfile(defaultProfile);
      localStorage.setItem('mi_salud_uterina_profile', JSON.stringify(defaultProfile));
      setCurrentScreen('DASHBOARD');
    } else {
      setCurrentScreen('WELCOME');
    }
  };

  const handleDemoBypass = (nombre: string, identifier: string) => {
    const resolvedEmail = identifier.trim().includes('@') 
      ? identifier.trim() 
      : `phone_${identifier.trim().replace(/[^a-zA-Z0-9]/g, '')}@tumedicina.com`;

    const demoUser = {
      uid: 'demo-local-user',
      displayName: nombre.trim() || 'Paciente',
      email: resolvedEmail,
      photoURL: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=60'
    };

    const initialProfile = createDefaultProfile({
      nombreCompleto: nombre.trim() || 'Paciente',
      edad: '30',
      whatsapp: identifier.includes('@') ? '' : identifier,
    });

    setProfile(initialProfile);
    localStorage.setItem('mi_salud_uterina_profile', JSON.stringify(initialProfile));
    setCurrentUser(demoUser);
    setCurrentScreen('DASHBOARD');
  };

  if (authLoading) {
    return (
      <div id="auth-loading-overlay" className="min-h-screen bg-[#fbf9f8] text-[#1b1c1c] font-sans flex flex-col items-center justify-center p-6 text-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#9b0044] to-[#C2185B] flex items-center justify-center text-white animate-pulse shadow-lg shadow-[#9b0044]/15">
          <svg className="w-6 h-6 animate-spin text-white" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        </div>
        <div className="space-y-1">
          <p className="text-[10px] font-bold text-[#880e4f] tracking-widest uppercase block">Tu Medicina</p>
          <p className="font-serif font-black text-lg text-slate-900 tracking-tight">Mi Salud Uterina</p>
          <p className="text-xs text-gray-500">Conectando con la base de datos segura de Firebase...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <AuthScreen onAuthSuccess={handleAuthSuccess} onDemoBypass={handleDemoBypass} />
    );
  }

  return (
    <div id="mi-salud-uterina-root" className="min-h-screen bg-[#fbf9f8] text-[#1b1c1c] font-sans antialiased">
      {/* Top Application Header */}
      <Header 
        currentScreen={currentScreen}
        onNavigate={handleScreenChange}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userName={profile.nombreCompleto}
        onReset={handleResetSession}
        user={currentUser}
        onLogout={handleLogout}
      />

      {/* Screen Render Switch */}
      <main className="min-h-screen pt-16">
        {currentScreen === 'WELCOME' && (
          <WelcomeScreen 
            onStart={() => handleScreenChange('ONBOARDING')} 
          />
        )}

        {currentScreen === 'ONBOARDING' && (
          <OnboardingScreen 
            onComplete={handleOnboardingComplete}
            onBackToWelcome={() => handleScreenChange('WELCOME')}
          />
        )}

        {currentScreen === 'DASHBOARD' && (
          <DashboardScreen 
            profile={profile}
            metrics={metrics}
            logs={logs}
            onAddLog={handleAddLog}
            onNavigateToEmergency={() => handleScreenChange('EMERGENCY')}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onSyncComplete={reloadAllLocalData}
          />
        )}

        {currentScreen === 'EMERGENCY' && (
          <EmergencyScreen 
            onBackToDashboard={() => handleScreenChange('DASHBOARD')}
            onAddLog={handleAddLog}
          />
        )}
      </main>
    </div>
  );
}

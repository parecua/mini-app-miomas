import { useState, useEffect } from 'react';
import { AppScreen, UserProfile, BleedingLog, HormonalMetrics } from './types';
import { INITIAL_METRICS, DEFAULT_LOGS } from './data';
import Header from './components/Header';
import WelcomeScreen from './components/WelcomeScreen';
import OnboardingScreen from './components/OnboardingScreen';
import DashboardScreen from './components/DashboardScreen';
import EmergencyScreen from './components/EmergencyScreen';
import { auth, saveProfileToCloud, saveLogToCloud } from './firebase';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('WELCOME');
  const [activeTab, setActiveTab] = useState<string>('inicio');
  const [currentUser, setCurrentUser] = useState<any>(null);
  
  // Patient Profile state
  const [profile, setProfile] = useState<UserProfile>({
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
    historialMedico: []
  });

  // Bleeding log entries state
  const [logs, setLogs] = useState<BleedingLog[]>(DEFAULT_LOGS);

  // Dynamic metrics
  const [metrics, setMetrics] = useState<HormonalMetrics>(INITIAL_METRICS);

  // Monitor Auth Changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setCurrentUser(firebaseUser);
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
    setProfile({
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
      historialMedico: []
    });
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

  const handleScreenChange = (screen: AppScreen) => {
    setCurrentScreen(screen);
    try {
      localStorage.setItem('mi_salud_uterina_screen', screen);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen bg-[#fbf9f8] text-[#1b1c1c] font-sans antialiased">
      {/* Top Application Header */}
      <Header 
        currentScreen={currentScreen}
        onNavigate={handleScreenChange}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userName={profile.nombreCompleto}
        onReset={handleResetSession}
      />

      {/* Screen Render Switch */}
      <main className="min-h-screen">
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

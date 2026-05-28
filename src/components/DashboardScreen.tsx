import { useState } from 'react';
import { UserProfile, BleedingLog, HormonalMetrics } from '../types';
import { EDUCATIONAL_ARTICLES } from '../data';
import { 
  AlertTriangle, 
  Droplet, 
  Flame, 
  Sparkles, 
  BookOpen, 
  TrendingUp, 
  Smile, 
  Plus, 
  User, 
  AlertCircle
} from 'lucide-react';
import BalanceIndicators from './BalanceIndicators';
import Progreso90Dias from './Progreso90Dias';
import StatusIndicatorCard from './StatusIndicatorCard';
import SymptomGraph from './SymptomGraph';
import SymptomLogCard from './SymptomLogCard';
import EducationalArticleCard from './EducationalArticleCard';
import ProfileDetailsCard from './ProfileDetailsCard';
import QuickLogModal from './QuickLogModal';
import EducationalVideos from './EducationalVideos';
import WeeklyInflammatoryScore from './WeeklyInflammatoryScore';
import FitoterapiaBotica from './FitoterapiaBotica';
import CloudSyncPanel from './CloudSyncPanel';

interface DashboardScreenProps {
  profile: UserProfile;
  metrics: HormonalMetrics;
  logs: BleedingLog[];
  onAddLog: (log: BleedingLog) => void;
  onNavigateToEmergency: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onSyncComplete: () => void;
}

export default function DashboardScreen({
  profile,
  metrics,
  logs,
  onAddLog,
  onNavigateToEmergency,
  activeTab,
  setActiveTab,
  onSyncComplete
}: DashboardScreenProps) {
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [showQuickLog, setShowQuickLog] = useState(false);

  return (
    <div id="dashboard-screen-root" className="min-h-screen pt-24 pb-28 px-4 md:px-6 bg-[#fbf9f8] max-w-[1240px] mx-auto select-none">
      
      {/* Tab Navigation header */}
      <div id="tab-navigation-bar" className="flex justify-center md:justify-start gap-4 mb-8 border-b border-gray-100 pb-3 font-sans">
        {['inicio', 'progreso', 'modulos', 'perfil'].map((tab) => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all ${
              activeTab === tab 
                ? 'bg-[#9b0044] text-white shadow-sm' 
                : 'text-[#6b5a60] hover:bg-[#f4dce4]/30'
            }`}
          >
            {tab === 'inicio' ? 'Inicio' : tab === 'progreso' ? 'Progreso' : tab === 'modulos' ? 'Módulos' : 'Perfil'}
          </button>
        ))}
      </div>

      {activeTab === 'inicio' && (
        <div id="inicio-tab-wrapper" className="space-y-8 animate-fade-in">
          {/* Welcome Dashboard Section */}
          <section id="welcome-dashboard-section" className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="font-serif font-bold text-3xl text-[#1b1c1c] mb-1">
                Mi Panel de Control Hormonal
              </h2>
              <p className="text-gray-500 font-sans text-xs md:text-sm max-w-2xl leading-relaxed">
                Aquí podrá observar la relación entre sus síntomas, su carga inflamatoria, posibles estímulos estrogénicos y su avance durante los 90 días.
              </p>
            </div>
            <button 
              type="button"
              onClick={() => setShowQuickLog(true)}
              className="mt-3 md:mt-0 bg-[#9b0044] hover:bg-[#c2185b] text-white text-xs font-semibold py-3 px-5 rounded-full flex items-center gap-1.5 shadow-md shadow-[#9b0044]/10 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Registrar Síntomas</span>
            </button>
          </section>

          {/* Warning Attention Alert Area */}
          <section id="critical-attention-warning">
            <div className="bg-white rounded-3xl border border-[#ba1a1a]/25 p-5 md:p-6 shadow-sm flex items-start gap-4 font-sans">
              <div className="p-3 bg-red-50 rounded-full shrink-0">
                <AlertTriangle className="text-[#ba1a1a] w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xs font-bold text-[#ba1a1a] uppercase tracking-widest">
                  Alerta de Atención
                </h3>
                <p className="text-xs md:text-sm text-[#1b1c1c] leading-relaxed">
                  Su cuerpo necesita atención, reposo y seguimiento. Los niveles reportados sugieren una carga inflamatoria elevada. Por favor, revise el protocolo de emergencia si el sangrado aumenta.
                </p>
                <button 
                  type="button"
                  onClick={onNavigateToEmergency}
                  className="text-xs text-[#9b0044] hover:underline font-semibold inline-flex items-center gap-1 pt-1 cursor-pointer"
                >
                  Ver protocolo de emergencia &rarr;
                </button>
              </div>
            </div>
          </section>

          {/* Main Content Layout Block */}
          <div id="dashboard-grid" className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Frame: Hormonal Indicators and 90 Days Progression */}
            <div id="left-column" className="lg:col-span-8 space-y-6">
              <WeeklyInflammatoryScore profile={profile} logs={logs} />
              <BalanceIndicators metrics={metrics} />
              <Progreso90Dias currentDay={12} />
            </div>

            {/* Right Frame: Status Cards */}
            <div id="right-column" className="lg:col-span-4 space-y-4">
              
              <CloudSyncPanel onSyncComplete={onSyncComplete} />
              
              <StatusIndicatorCard 
                title="Estado de Sangrado"
                status="Alerta"
                description="Día 3 del ciclo reportado con flujo intenso."
                icon={<Droplet className="w-5 h-5 shrink-0" />}
                borderColorClass="border-[#9b0044]"
                textColorClass="text-[#9b0044]"
              />

              <StatusIndicatorCard 
                title="Carga Inflamatoria"
                status="En Observación"
                description="Evite lácteos y azúcares procesados hoy."
                icon={<Flame className="w-5 h-5 shrink-0" />}
                borderColorClass="border-[#6b5a60]"
                textColorClass="text-[#6b5a60]"
              />

              <StatusIndicatorCard 
                title="Nivel de Energía"
                status="Estable"
                description="Buen momento para estiramientos suaves."
                icon={<Smile className="w-5 h-5 shrink-0" />}
                borderColorClass="border-emerald-500"
                textColorClass="text-emerald-600"
              />

              {/* Daily Promo Callout */}
              <div 
                onClick={() => setShowQuickLog(true)}
                className="bg-[#f4dce4]/70 border border-[#FCE4EC] p-6 rounded-3xl flex flex-col gap-3 shadow-sm hover:translate-y-[-2px] transition-transform cursor-pointer font-sans"
              >
                <h3 className="font-serif font-bold text-lg text-[#9b0044] leading-snug">
                  ¿Cómo te sientes hoy?
                </h3>
                <p className="text-xs text-[#594045] leading-relaxed">
                  Registrar tus síntomas diarios nos ayuda a refinar y actualizar el panel de control hormonal.
                </p>
                <button 
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowQuickLog(true);
                  }}
                  className="bg-[#9b0044] hover:bg-[#c2185b] text-white text-xs font-semibold py-2.5 px-5 rounded-full self-start transition-colors cursor-pointer"
                >
                  Registrar Ahora
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* HISTORIAL / PROGRESS TAB */}
      {activeTab === 'progreso' && (
        <div id="progreso-tab-wrapper" className="space-y-6 animate-fade-in font-sans">
          <div className="bg-white rounded-3xl p-6 border border-[#FCE4EC] soft-shadow">
            <h3 className="font-serif font-bold text-xl text-[#9b0044] mb-2">Historial de Registro de Síntomas</h3>
            <p className="text-xs text-gray-500 mb-6 leading-relaxed">
              Consulte y analice sus episodios anteriores para identificar tendencias inflamatorias o patrones estrogénicos.
            </p>

            {logs.length > 0 && <SymptomGraph />}

            {/* Logs List representation */}
            {logs.length === 0 ? (
              <div className="text-center py-12 text-gray-400 text-sm">
                No hay episodios registrados aún. Use el botón superior para ingresar su primer síntoma.
              </div>
            ) : (
              <div className="space-y-4">
                {logs.map((log) => (
                  <SymptomLogCard key={log.id} log={log} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODULES / ARTICLES TAB */}
      {activeTab === 'modulos' && (
        <div id="modulos-tab-wrapper" className="space-y-8 animate-fade-in">
          <div className="mb-6 font-sans">
            <h3 className="font-serif font-bold text-2xl text-[#9b0044]">Guías & Módulos Hormonales</h3>
            <p className="text-xs md:text-sm text-gray-500 leading-relaxed max-w-2xl mt-1">
              La educación es el primer paso de tu soberanía mensual. Descubre las bases biológicas y consejos alimentarios para regular tus niveles de estrógeno.
            </p>
          </div>

          {/* Fully interactive video masterclass and routine aula */}
          <EducationalVideos />

          {/* Recetario y Botica de Fitoterapia herbolaría */}
          <FitoterapiaBotica />

          <div className="space-y-3 font-sans mt-8">
            <h4 className="font-serif font-bold text-xl text-[#9b0044]">Artículos de Profundización</h4>
            <p className="text-xs text-gray-500">Haz clic sobre un artículo para expandir y leer la guía clínica completa.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {EDUCATIONAL_ARTICLES.map((art) => (
              <EducationalArticleCard 
                key={art.id} 
                article={art} 
                isSelected={selectedArticleId === art.id} 
                onToggle={() => setSelectedArticleId(selectedArticleId === art.id ? null : art.id)} 
              />
            ))}
          </div>
        </div>
      )}

      {/* USER PROFILE TAB */}
      {activeTab === 'perfil' && (
        <div id="perfil-tab-wrapper" className="space-y-6 animate-fade-in">
          <CloudSyncPanel onSyncComplete={onSyncComplete} />
          <ProfileDetailsCard profile={profile} />
        </div>
      )}

      {/* FLOAT SOS STICKY BUTTON */}
      <div className="fixed bottom-26 right-5 md:right-8 z-55 font-sans">
        <button 
          id="btn-sticky-sos"
          type="button"
          onClick={onNavigateToEmergency}
          className="bg-[#ba1a1a] text-white flex items-center gap-2.5 shadow-2xl py-4 px-6 md:px-8 rounded-full font-bold active:scale-95 hover:bg-[#93000a] transition-all cursor-pointer group hover:bg-[#93000a]"
        >
          <AlertCircle className="w-5 h-5 shrink-0 animate-bounce" />
          <span className="uppercase text-[11px] md:text-xs tracking-wider">
            SOS Sangrado Abundante
          </span>
        </button>
      </div>

      {/* STATIC BOTTOM NAVIGATION BAR FOR SMALL SCREENS */}
      <nav id="mobile-nav-bar" className="md:hidden fixed bottom-0 left-0 w-full z-45 flex justify-around items-center px-4 pb-4 pt-2.5 bg-white border-t border-gray-100 shadow-[0px_-4px_20px_rgba(194,24,91,0.04)]">
        {[
          { id: 'inicio', label: 'Inicio', icon: <Sparkles className="w-5 h-5" /> },
          { id: 'progreso', label: 'Progreso', icon: <TrendingUp className="w-5 h-5" /> },
          { id: 'modulos', label: 'Módulos', icon: <BookOpen className="w-5 h-5" /> },
          { id: 'perfil', label: 'Perfil', icon: <User className="w-5 h-5" /> }
        ].map((item) => (
          <button 
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all ${
              activeTab === item.id ? 'text-[#9b0044] font-bold' : 'text-gray-400'
            }`}
          >
            {item.icon}
            <span className="text-[10px] mt-0.5 font-sans">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* QUICK NEW LOG MODAL */}
      {showQuickLog && (
        <QuickLogModal 
          onAddLog={onAddLog} 
          onClose={() => setShowQuickLog(false)} 
        />
      )}
    </div>
  );
}

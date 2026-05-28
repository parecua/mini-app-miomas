import { useState } from 'react';
import { BleedingLog } from '../types';
import { 
  AlertOctagon, 
  Thermometer, 
  Scaling, 
  Droplets, 
  FileSpreadsheet, 
  CheckCircle2, 
  ArrowLeft,
  Plus
} from 'lucide-react';
import BreathingGuide from './BreathingGuide';
import EmergencyLogModal from './EmergencyLogModal';

interface EmergencyScreenProps {
  onBackToDashboard: () => void;
  onAddLog: (log: BleedingLog) => void;
}

export default function EmergencyScreen({ onBackToDashboard, onAddLog }: EmergencyScreenProps) {
  const [showLogModal, setShowLogModal] = useState(false);

  return (
    <div id="emergency-screen-root" className="min-h-screen pt-24 pb-16 px-4 md:px-6 bg-[#fbf9f8] max-w-[1240px] mx-auto select-none font-sans">
      
      {/* Back to index link */}
      <button 
        id="btn-back-to-dashboard"
        onClick={onBackToDashboard}
        className="flex items-center gap-2 mb-6 font-semibold text-xs text-[#9b0044] hover:bg-[#f4dce4]/30 px-3 py-1.5 rounded-full duration-200 transition-all cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Ir al Panel de Control</span>
      </button>

      {/* SOS Alert Disclaimer Block */}
      <section id="critical-alert-disclaimer" className="mb-8 font-sans">
        <div className="bg-[#ffdad6]/40 border border-[#ba1a1a]/30 p-5 md:p-6 rounded-3xl soft-shadow flex items-start gap-4 bg-white/65">
          <AlertOctagon className="text-[#ba1a1a] w-8 h-8 md:w-10 md:h-10 shrink-0" />
          <div className="space-y-1">
            <h3 className="text-xs md:text-sm font-bold text-[#ba1a1a] uppercase tracking-widest">
              Aviso Importante
            </h3>
            <p className="text-xs md:text-sm text-gray-700 leading-relaxed">
              Si el sangrado empapa toallas rápidamente, hay mareo, desmayo o palidez extrema, <span className="font-bold underline text-[#ba1a1a]">busque atención médica urgente e inmediata.</span>
            </p>
          </div>
        </div>
      </section>

      {/* Main Title heading */}
      <h2 id="emergency-title" className="font-serif font-bold text-2xl md:text-4xl text-[#9b0044] mb-6">
        Pasos a Seguir
      </h2>

      {/* Steps Bento Grid */}
      <div id="emergency-steps-grid" className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Step 1: breathing helper with dynamic animation */}
        <BreathingGuide />

        {/* Step 2: Thermal containment */}
        <div id="step-card-2" className="bg-white border border-[#FCE4EC] rounded-3xl p-6 soft-shadow font-sans">
          <div className="flex justify-between items-start mb-4">
            <span className="w-8 h-8 bg-[#f4dce4] text-[#9b0044] rounded-full flex items-center justify-center font-bold text-xs font-semibold">2</span>
            <Thermometer className="text-[#9b0044] w-7 h-7" />
          </div>
          <h3 className="font-serif font-bold text-lg md:text-xl text-[#1b1c1c] mb-2">Contención Térmica</h3>
          <p className="text-xs md:text-sm text-gray-500 leading-relaxed">
            Coloque compresas frías en el bajo vientre para promover la vasoconstricción local de las arterias arqueadas y reducir eficientemente el flujo sanguíneo excesivo. Accione calor únicamente en espalda baja para dolor lumbar.
          </p>
        </div>

        {/* Step 3: Drainage posture */}
        <div id="step-card-3" className="bg-white border border-[#FCE4EC] rounded-3xl p-6 soft-shadow font-sans">
          <div className="flex justify-between items-start mb-4">
            <span className="w-8 h-8 bg-[#f4dce4] text-[#9b0044] rounded-full flex items-center justify-center font-bold text-xs font-semibold">3</span>
            <Scaling className="text-[#9b0044] w-7 h-7" />
          </div>
          <h3 className="font-serif font-bold text-lg md:text-xl text-[#1b1c1c] mb-2">Postura de Drenaje</h3>
          <p className="text-xs md:text-sm text-gray-500 leading-relaxed">
            Acuéstese cómodamente y eleve las piernas ligeramente por encima del nivel del corazón (apoyadas en cojines o pared). Esto asegura el flujo sanguíneo cerebral preventivo y contrarresta bajas súbitas de presión arterial.
          </p>
        </div>

        {/* Step 4: Constant Hydration */}
        <div id="step-card-4" className="bg-white border border-[#FCE4EC] rounded-3xl p-6 soft-shadow font-sans">
          <div className="flex justify-between items-start mb-4">
            <span className="w-8 h-8 bg-[#f4dce4] text-[#9b0044] rounded-full flex items-center justify-center font-bold text-xs font-semibold">4</span>
            <Droplets className="text-[#9b0044] w-7 h-7" />
          </div>
          <h3 className="font-serif font-bold text-lg md:text-xl text-[#1b1c1c] mb-2">Hidratación Constante</h3>
          <p className="text-xs md:text-sm text-gray-500 leading-relaxed">
            Beba agua mineral o suero oral en sorbos pequeños y constantes para mitigar la pérdida de fluidos electrolíticos corporales, manteniendo la volemia y estabilizando el pulso general.
          </p>
        </div>

        {/* Step 5: Medical alert criteria span on full width */}
        <div id="step-card-5" className="md:col-span-2 bg-[#ffd9df] border border-[#ba1a1a]/15 rounded-3xl p-6 soft-shadow font-sans">
          <div className="flex justify-between items-start mb-4">
            <span className="w-8 h-8 bg-[#9b0044] text-white rounded-full flex items-center justify-center font-bold text-xs font-semibold">5</span>
            <FileSpreadsheet className="text-[#9b0044] w-7 h-7" />
          </div>
          
          <h3 className="font-serif font-bold text-lg md:text-xl text-[#1b1c1c] mb-3">Criterios de Alerta Médica Urgente</h3>
          <p className="text-xs text-gray-600 mb-4 leading-relaxed">
            Debe acudir a un centro médico si detecta cualquiera de estos indicadores severos:
          </p>

          <ul className="space-y-3">
            <li className="flex items-start gap-2 text-xs md:text-sm text-gray-700">
              <CheckCircle2 className="w-4.5 h-4.5 text-[#9b0044] shrink-0 mt-0.5" />
              <span>Sangrado de intensidad severa persistente por más de 2 horas continuas (ej. empapar toallas sanitarias en menos de 1 hora).</span>
            </li>
            <li className="flex items-start gap-2 text-xs md:text-sm text-gray-700">
              <CheckCircle2 className="w-4.5 h-4.5 text-[#9b0044] shrink-0 mt-0.5" />
              <span>Expulsión de coágulos de tamaño significativamente grande (ej. más de 3 cm de diámetro o comparables a una moneda de 2 euros).</span>
            </li>
            <li className="flex items-start gap-2 text-xs md:text-sm text-gray-700">
              <CheckCircle2 className="w-4.5 h-4.5 text-[#9b0044] shrink-0 mt-0.5" />
              <span>Dificultad respiratoria, dolor torácico, palpitaciones altas anormales o desmayos.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Primary Bleeding incident trigger section */}
      <section id="crisis-actions" className="mt-12 flex flex-col items-center">
        <button 
          type="button"
          onClick={() => setShowLogModal(true)}
          className="bg-[#c2185b] hover:bg-[#9b0044] text-white font-semibold text-sm tracking-wider px-8 py-4 rounded-full soft-shadow hover:opacity-95 active:scale-95 transition-all duration-200 shadow-lg flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-5 h-5" />
          <span>Registrar Episodio de Sangrado</span>
        </button>
        <p className="text-xs text-gray-400 font-medium font-sans mt-3">
          Sus datos ayudan a su especialista médico a tomar mejores decisiones clínicas.
        </p>
      </section>

      {/* QUICK FORM MODAL */}
      {showLogModal && (
        <EmergencyLogModal 
          onAddLog={onAddLog} 
          onClose={() => setShowLogModal(false)} 
        />
      )}
    </div>
  );
}

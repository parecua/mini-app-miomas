import { useState } from 'react';
import { UserProfile } from '../types';
import { ONBOARDING_STEPS } from '../data';
import { ArrowLeft, ArrowRight, ShieldCheck, HeartPulse } from 'lucide-react';

interface OnboardingScreenProps {
  onComplete: (profile: UserProfile) => void;
  onBackToWelcome: () => void;
}

// Sub-components for Onboarding Steps

interface Step1Props {
  formData: UserProfile;
  errors: { [key: string]: string };
  onChange: (updates: Partial<UserProfile>) => void;
}

function Step1PersonalDetails({ formData, errors, onChange }: Step1Props) {
  return (
    <div id="onboarding-step-1" className="space-y-4 animate-fade-in font-sans">
      <div>
        <label htmlFor="nombreCompleto" className="block text-xs font-semibold text-[#594045] mb-2 uppercase tracking-wider">
          Nombre Completo
        </label>
        <input 
          type="text" 
          id="nombreCompleto"
          placeholder="Ej. Ana García"
          value={formData.nombreCompleto}
          onChange={(e) => onChange({ nombreCompleto: e.target.value })}
          className={`w-full px-5 py-3.5 rounded-2xl bg-[#fbf9f8] border ${
            errors.nombreCompleto ? 'border-red-500' : 'border-gray-200'
          } focus:outline-none focus:ring-1 focus:ring-[#9b0044] focus:bg-white text-sm`}
        />
        {errors.nombreCompleto && (
          <span className="text-xs text-red-500 mt-1 block">{errors.nombreCompleto}</span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="edad" className="block text-xs font-semibold text-[#594045] mb-2 uppercase tracking-wider">
            Edad
          </label>
          <input 
            type="number" 
            id="edad"
            placeholder="28"
            value={formData.edad}
            onChange={(e) => onChange({ edad: e.target.value })}
            className={`w-full px-5 py-3.5 rounded-2xl bg-[#fbf9f8] border ${
              errors.edad ? 'border-red-500' : 'border-gray-200'
            } focus:outline-none focus:ring-1 focus:ring-[#9b0044] focus:bg-white text-sm`}
          />
          {errors.edad && (
            <span className="text-xs text-red-500 mt-1 block">{errors.edad}</span>
          )}
        </div>

        <div>
          <label htmlFor="pais" className="block text-xs font-semibold text-[#594045] mb-2 uppercase tracking-wider">
            País
          </label>
          <input 
            type="text" 
            id="pais"
            placeholder="México"
            value={formData.pais}
            onChange={(e) => onChange({ pais: e.target.value })}
            className={`w-full px-5 py-3.5 rounded-2xl bg-[#fbf9f8] border ${
              errors.pais ? 'border-red-500' : 'border-gray-200'
            } focus:outline-none focus:ring-1 focus:ring-[#9b0044] focus:bg-white text-sm`}
          />
          {errors.pais && (
            <span className="text-xs text-red-500 mt-1 block">{errors.pais}</span>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="whatsapp" className="block text-xs font-semibold text-[#594045] mb-2 uppercase tracking-wider">
          WhatsApp
        </label>
        <input 
          type="text" 
          id="whatsapp"
          placeholder="+ 52 1..."
          value={formData.whatsapp}
          onChange={(e) => onChange({ whatsapp: e.target.value })}
          className={`w-full px-5 py-3.5 rounded-2xl bg-[#fbf9f8] border ${
            errors.whatsapp ? 'border-red-500' : 'border-gray-200'
          } focus:outline-none focus:ring-1 focus:ring-[#9b0044] focus:bg-white text-sm`}
        />
        {errors.whatsapp && (
          <span className="text-xs text-red-500 mt-1 block">{errors.whatsapp}</span>
        )}
      </div>
    </div>
  );
}

interface Step2Props {
  formData: UserProfile;
  onChange: (updates: Partial<UserProfile>) => void;
}

function Step2SymptomFlow({ formData, onChange }: Step2Props) {
  return (
    <div id="onboarding-step-2" className="space-y-5 animate-fade-in font-sans">
      <div>
        <label className="block text-xs font-semibold text-[#594045] mb-3 uppercase tracking-wider">
          Intensidad típica de flujo
        </label>
        <div className="grid grid-cols-2 gap-2.5">
          {['Leve', 'Moderado', 'Abundante', 'Crítico'].map((level) => (
            <button
              key={level}
              type="button"
              onClick={() => onChange({ flujoIntensidad: level })}
              className={`px-4 py-3.5 rounded-2xl text-xs font-semibold text-center border transition-all ${
                formData.flujoIntensidad === level
                  ? 'bg-[#9b0044] text-white border-[#9b0044]'
                  : 'bg-[#fbf9f8] text-[#594045] border-gray-100 hover:bg-[#f4dce4]/20'
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-[#594045] mb-2 uppercase tracking-wider">
            Duración del Ciclo
          </label>
          <select 
            value={formData.duracionCiclo}
            onChange={(e) => onChange({ duracionCiclo: e.target.value })}
            className="w-full px-4 py-3.5 rounded-2xl bg-[#fbf9f8] border border-gray-200 text-xs focus:ring-1 focus:ring-[#9b0044] focus:outline-none"
          >
            <option>Menos de 21 días</option>
            <option>21 a 27 días</option>
            <option>28 días (Regular)</option>
            <option>29 a 35 días</option>
            <option>Más de 35 días / Irregular</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#594045] mb-2 uppercase tracking-wider">
            Presencia de Coágulos
          </label>
          <select 
            value={formData.coagulosFrecuencia}
            onChange={(e) => onChange({ coagulosFrecuencia: e.target.value })}
            className="w-full px-4 py-3.5 rounded-2xl bg-[#fbf9f8] border border-gray-200 text-xs focus:ring-1 focus:ring-[#9b0044] focus:outline-none"
          >
            <option>No, nunca</option>
            <option>Sí, pequeños (&lt; 1cm)</option>
            <option>Sí, grandes (&gt; 2-3cm)</option>
          </select>
        </div>
      </div>
    </div>
  );
}

interface Step3Props {
  formData: UserProfile;
  onChange: (updates: Partial<UserProfile>) => void;
}

function Step3Inflammation({ formData, onChange }: Step3Props) {
  return (
    <div id="onboarding-step-3" className="space-y-4 animate-fade-in font-sans">
      <div>
        <label className="block text-xs font-semibold text-[#594045] mb-3 uppercase tracking-wider">
          Consumo promedio de lácteos, gluten y azúcares procesados
        </label>
        <div className="space-y-2.5">
          {['Diario', 'Ocasional (1-2 veces/semana)', 'Muy bajo / Libre de estos'].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => onChange({ lacteosYAzucar: option })}
              className={`w-full px-5 py-3.5 rounded-2xl text-left border text-xs font-semibold transition-all flex justify-between items-center ${
                formData.lacteosYAzucar === option
                  ? 'bg-[#9b0044] text-white border-[#9b0044]'
                  : 'bg-[#fbf9f8] text-[#594045] border-gray-200 hover:bg-[#f4dce4]/20'
              }`}
            >
              <span>{option}</span>
              {formData.lacteosYAzucar === option && (
                <ShieldCheck className="w-4 h-4 text-white" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

interface Step4Props {
  formData: UserProfile;
  onChange: (updates: Partial<UserProfile>) => void;
}

function Step4StressAndEnergy({ formData, onChange }: Step4Props) {
  return (
    <div id="onboarding-step-4" className="space-y-5 animate-fade-in font-sans">
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-xs font-semibold text-[#594045] uppercase tracking-wider">
            Nivel de tensión o estrés auto-percibido
          </label>
          <span className="text-sm font-bold text-[#9b0044]">{formData.estresNivel} / 10</span>
        </div>
        <input 
          type="range" 
          min="1" 
          max="10"
          value={formData.estresNivel}
          onChange={(e) => onChange({ estresNivel: parseInt(e.target.value) })}
          className="w-full h-2.5 bg-[#f4dce4] rounded-lg appearance-none cursor-pointer accent-[#9b0044]"
        />
        <div className="flex justify-between text-[11px] text-gray-400 mt-1.5 font-sans">
          <span>Muy bajo / Calma</span>
          <span>Extremo / Ansiedad</span>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-[#594045] mb-2 uppercase tracking-wider">
          Energía matutina
        </label>
        <select 
          value={formData.energiaNivel}
          onChange={(e) => onChange({ energiaNivel: e.target.value })}
          className="w-full px-4 py-3.5 rounded-2xl bg-[#fbf9f8] border border-gray-200 text-xs focus:ring-1 focus:ring-[#9b0044] focus:outline-none"
        >
          <option>Alta (Me levanto con energía pura)</option>
          <option>Media (Tardía, necesito café o desayuno)</option>
          <option>Baja (Muy fatigada, me cuesta despertar)</option>
        </select>
      </div>
    </div>
  );
}

interface Step5Props {
  formData: UserProfile;
  onChange: (updates: Partial<UserProfile>) => void;
}

function Step5SleepAndExercise({ formData, onChange }: Step5Props) {
  return (
    <div id="onboarding-step-5" className="space-y-4 animate-fade-in font-sans">
      <div>
        <label className="block text-xs font-semibold text-[#594045] mb-2 uppercase tracking-wider">
          Horas de descanso promedio
        </label>
        <select 
          value={formData.suenoHoras}
          onChange={(e) => onChange({ suenoHoras: e.target.value })}
          className="w-full px-4 py-3.5 rounded-2xl bg-[#fbf9f8] border border-gray-200 text-xs focus:ring-1 focus:ring-[#9b0044] focus:outline-none"
        >
          <option>Mas de 8 horas</option>
          <option>7 a 8 horas (Recomendado)</option>
          <option>5 a 6 horas</option>
          <option>Menos de 5 horas / Insomnio</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-semibold text-[#594045] mb-2 uppercase tracking-wider">
          Fisico/Ejercicio semanal
        </label>
        <select 
          value={formData.actividadFisica}
          onChange={(e) => onChange({ actividadFisica: e.target.value })}
          className="w-full px-4 py-3.5 rounded-2xl bg-[#fbf9f8] border border-gray-200 text-xs focus:ring-1 focus:ring-[#9b0044] focus:outline-none"
        >
          <option>Regular (3+ veces por semana)</option>
          <option>Moderado (1-2 veces por semana)</option>
          <option>Casi nulo / Sedentario</option>
          <option>Exceso (Entrenamiento extremo / diario)</option>
        </select>
      </div>
    </div>
  );
}

interface Step6Props {
  formData: UserProfile;
  onChange: (updates: Partial<UserProfile>) => void;
}

function Step6Digestion({ formData, onChange }: Step6Props) {
  return (
    <div id="onboarding-step-6" className="space-y-4 animate-fade-in font-sans">
      <div>
        <label className="block text-xs font-semibold text-[#594045] mb-2 uppercase tracking-wider">
          ¿Cómo describirías tu digestión general?
        </label>
        <select 
          value={formData.saludDigestiva}
          onChange={(e) => onChange({ saludDigestiva: e.target.value })}
          className="w-full px-4 py-3.5 rounded-2xl bg-[#fbf9f8] border border-gray-200 text-xs focus:ring-1 focus:ring-[#9b0044] focus:outline-none"
        >
          <option>Excelente (Sin gases, evacuaciones diarias planas)</option>
          <option>Regular con inflamación ocasional (Gases ligeros)</option>
          <option>Muy lenta (Estreñimiento crónico / distensión extrema)</option>
          <option>Irritable (Evacuaciones sueltas frecuentes)</option>
        </select>
      </div>
    </div>
  );
}

interface Step7Props {
  formData: UserProfile;
  onToggleCondition: (cond: string) => void;
}

function Step7MedicalHistory({ formData, onToggleCondition }: Step7Props) {
  return (
    <div id="onboarding-step-7" className="space-y-4 animate-fade-in font-sans">
      <label className="block text-xs font-semibold text-[#594045] mb-2 uppercase tracking-wider">
        ¿Posee diagnóstico de alguna de estas condiciones? (Selección múltiple)
      </label>
      <div className="grid grid-cols-2 gap-2.5">
        {[
          'SOP (Síndrome Ovario Poliquístico)',
          'Endometriosis',
          'Miomas Uterinos',
          'Hipotiroidismo',
          'Adenomiosis',
          'Resistencia Insulina'
        ].map((cond) => {
          const active = formData.historialMedico.includes(cond);
          return (
            <button
              key={cond}
              type="button"
              onClick={() => onToggleCondition(cond)}
              className={`p-3.5 rounded-2xl text-left border transition-all relative text-xs font-semibold ${
                active
                  ? 'bg-[#c2185b] text-white border-[#c2185b]'
                  : 'bg-[#fbf9f8] text-[#594045] border-gray-200 hover:bg-[#f4dce4]/20'
              }`}
            >
              <span className="block pr-5 leading-normal">{cond}</span>
              {active && (
                <span className="absolute top-2 right-2 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
              )}
            </button>
          );
        })}
      </div>
      
      <div className="flex items-center gap-2 p-3 bg-[#e4e2e2]/20 rounded-2xl border border-gray-100 mt-4 text-[11px] text-[#594045]">
        <HeartPulse className="w-5 h-5 text-[#9b0044] shrink-0" />
        <span>Sus datos clínicos están estrictamente encriptados localmente en su dispositivo.</span>
      </div>
    </div>
  );
}

// Main Component

export default function OnboardingScreen({ onComplete, onBackToWelcome }: OnboardingScreenProps) {
  const [step, setStep] = useState(1);
  const totalSteps = ONBOARDING_STEPS.length;

  const [formData, setFormData] = useState<UserProfile>({
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

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateStep = () => {
    const newErrors: { [key: string]: string } = {};
    if (step === 1) {
      if (!formData.nombreCompleto.trim()) newErrors.nombreCompleto = 'El nombre es requerido';
      if (!formData.edad || parseInt(formData.edad) <= 0 || parseInt(formData.edad) > 120) {
        newErrors.edad = 'Ingrese una edad válida';
      }
      if (!formData.pais.trim()) newErrors.pais = 'El país es requerido';
      if (!formData.whatsapp.trim()) newErrors.whatsapp = 'El WhatsApp o teléfono es requerido';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateStep()) return;

    if (step < totalSteps) {
      setStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onComplete(formData);
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(prev => prev - 1);
    } else {
      onBackToWelcome();
    }
  };

  const updateFormData = (updates: Partial<UserProfile>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const toggleHistorial = (cond: string) => {
    setFormData(prev => {
      const current = [...prev.historialMedico];
      if (current.includes(cond)) {
        return { ...prev, historialMedico: current.filter(c => c !== cond) };
      } else {
        return { ...prev, historialMedico: [...current, cond] };
      }
    });
  };

  const progressPercentage = (step / totalSteps) * 100;

  return (
    <div id="onboarding-screen-wrapper" className="min-h-screen pt-24 pb-16 px-4 md:px-6 bg-[#fbf9f8] flex flex-col items-center select-none">
      <div id="onboarding-card-container" className="w-full max-w-xl bg-white rounded-3xl p-6 md:p-8 border border-[#FCE4EC] soft-shadow">
        
        {/* Step Progression Bar */}
        <div id="progress-indicator-header" className="flex justify-between items-center mb-3">
          <span className="text-[#9b0044] font-semibold text-xs uppercase tracking-widest font-sans">
            Paso {step} de {totalSteps}
          </span>
          <span className="text-gray-500 font-sans text-xs font-semibold">
            {ONBOARDING_STEPS[step - 1].title}
          </span>
        </div>

        {/* Progress bar outer */}
        <div id="progress-bar-outer" className="w-full h-2 bg-gray-100 rounded-full mb-8 overflow-hidden">
          <div 
            id="progress-bar-inner"
            style={{ width: `${progressPercentage}%` }}
            className="h-full bg-[#9b0044] rounded-full transition-all duration-300"
          />
        </div>

        {/* Step titles */}
        <div id="step-headings" className="mb-6">
          <h2 className="font-serif font-bold text-2xl md:text-3xl text-[#9b0044]">
            {ONBOARDING_STEPS[step - 1].subtitle}
          </h2>
          <p className="text-xs md:text-sm text-gray-500 mt-1 font-sans">
            {ONBOARDING_STEPS[step - 1].description}
          </p>
        </div>

        {/* Dynamic Form Step Content */}
        <div id="step-dynamic-content" className="min-h-[220px]">
          {step === 1 && (
            <Step1PersonalDetails 
              formData={formData} 
              errors={errors} 
              onChange={updateFormData} 
            />
          )}

          {step === 2 && (
            <Step2SymptomFlow 
              formData={formData} 
              onChange={updateFormData} 
            />
          )}

          {step === 3 && (
            <Step3Inflammation 
              formData={formData} 
              onChange={updateFormData} 
            />
          )}

          {step === 4 && (
            <Step4StressAndEnergy 
              formData={formData} 
              onChange={updateFormData} 
            />
          )}

          {step === 5 && (
            <Step5SleepAndExercise 
              formData={formData} 
              onChange={updateFormData} 
            />
          )}

          {step === 6 && (
            <Step6Digestion 
              formData={formData} 
              onChange={updateFormData} 
            />
          )}

          {step === 7 && (
            <Step7MedicalHistory 
              formData={formData} 
              onToggleCondition={toggleHistorial} 
            />
          )}
        </div>

        {/* Form Footer Action Buttons */}
        <div id="onboarding-controls" className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100 font-sans">
          <button
            type="button"
            onClick={handlePrev}
            className="flex items-center gap-2 px-5 py-3 rounded-full text-xs font-semibold text-[#9b0044] hover:bg-[#f4dce4]/30 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Atrás</span>
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="flex items-center gap-2 bg-[#9b0044] hover:bg-[#c2185b] text-white px-7 py-3 rounded-full text-xs font-semibold transition-all shadow-md shadow-[#9b0044]/10 cursor-pointer"
          >
            <span>{step === totalSteps ? 'Finalizar' : 'Siguiente'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

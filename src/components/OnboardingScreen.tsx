import { useState } from 'react';
import { UserProfile } from '../types';
import { ONBOARDING_STEPS } from '../data';
import { ArrowLeft, ArrowRight, ShieldCheck, HeartPulse } from 'lucide-react';
import { createDefaultProfile } from '../App';

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

function Step6SleepFactors({ formData, onChange }: Step6Props) {
  const options = [
    'Sangrado abundante por la noche',
    'Dolor o calambres pélvicos',
    'Fatiga o anemia',
    'Estrés y ansiedad',
    'Visitas frecuentes al baño',
    'Efectos secundarios de medicamentos',
    'Otro'
  ];

  const toggleOption = (opt: string) => {
    const list = formData.suenoAfectadores || [];
    const updated = list.includes(opt) ? list.filter(o => o !== opt) : [...list, opt];
    onChange({ suenoAfectadores: updated });
  };

  return (
    <div id="onboarding-step-6-sleep" className="space-y-4 animate-fade-in font-sans">
      <label className="block text-xs font-semibold text-[#594045] mb-2 uppercase tracking-wider">
        ¿Qué es lo que más afecta su sueño? (Selección múltiple)
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {options.map((opt) => {
          const active = (formData.suenoAfectadores || []).includes(opt);
          return (
            <button
              key={opt}
              type="button"
              onClick={() => toggleOption(opt)}
              className={`p-3.5 rounded-2xl text-left border transition-all text-xs font-semibold leading-relaxed flex items-center justify-between ${
                active
                  ? 'bg-[#9b0044] text-white border-[#9b0044]'
                  : 'bg-[#fbf9f8] text-[#594045] border-gray-100 hover:bg-[#f4dce4]/20'
              }`}
            >
              <span>{opt}</span>
              {active && (
                <span className="w-2 h-2 rounded-full bg-white shrink-0 ml-2" />
              )}
            </button>
          );
        })}
      </div>

      {(formData.suenoAfectadores || []).includes('Otro') && (
        <div className="animate-fade-in mt-3">
          <input
            type="text"
            placeholder="Escriba otra causa aquí..."
            value={formData.suenoAfectadoresOtro || ''}
            onChange={(e) => onChange({ suenoAfectadoresOtro: e.target.value })}
            className="w-full px-5 py-3.5 rounded-2xl bg-[#fbf9f8] border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#9b0044] focus:bg-white text-xs font-semibold"
          />
        </div>
      )}
    </div>
  );
}

interface Step7Props {
  formData: UserProfile;
  onChange: (updates: Partial<UserProfile>) => void;
}

function Step7Emotions({ formData, onChange }: Step7Props) {
  const positivas = [
    'Calma', 'Feliz', 'Agradecida', 'Motivada', 'Conectada', 
    'Esperanzada', 'Amada', 'Segura', 'Pacífica', 'Bendita', 'Energizada'
  ];

  const negativas = [
    'Triste', 'Solitaria', 'Ansiosa', 'Enojada', 'Irritable', 
    'Frustrada', 'Abrumada', 'Estresada', 'Desalentada', 'Aislada', 'Entumecida'
  ];

  const togglePositiva = (emo: string) => {
    const list = formData.emocionesPositivas || [];
    const updated = list.includes(emo) ? list.filter(e => e !== emo) : [...list, emo];
    onChange({ emocionesPositivas: updated });
  };

  const toggleNegativa = (emo: string) => {
    const list = formData.emocionesNegativas || [];
    const updated = list.includes(emo) ? list.filter(e => e !== emo) : [...list, emo];
    onChange({ emocionesNegativas: updated });
  };

  const hasOtro = (formData.emocionesPositivas || []).includes('Otro') || (formData.emocionesNegativas || []).includes('Otro');

  return (
    <div id="onboarding-step-7-emotions" className="space-y-5 animate-fade-in font-sans">
      <div>
        <span className="block text-[11px] font-bold text-emerald-700 mb-2.5 uppercase tracking-wider">
          EMOCIONES POSITIVAS
        </span>
        <div className="flex flex-wrap gap-2">
          {positivas.map((emo) => {
            const active = (formData.emocionesPositivas || []).includes(emo);
            return (
              <button
                key={emo}
                type="button"
                onClick={() => togglePositiva(emo)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                  active
                    ? 'bg-emerald-600 border-[#2e7d32] text-white shadow-sm'
                    : 'bg-[#e8f5e9]/60 hover:bg-[#e8f5e9] text-[#2e7d32] border-[#c8e6c9]/45'
                }`}
              >
                {emo}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <span className="block text-[11px] font-bold text-rose-700 mb-2.5 uppercase tracking-wider">
          EMOCIONES NEGATIVAS
        </span>
        <div className="flex flex-wrap gap-2 block">
          {negativas.map((emo) => {
            const active = (formData.emocionesNegativas || []).includes(emo);
            return (
              <button
                key={emo}
                type="button"
                onClick={() => toggleNegativa(emo)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                  active
                    ? 'bg-rose-600 border-[#c62828] text-white shadow-sm'
                    : 'bg-[#ffebee]/65 hover:bg-[#ffebee] text-[#c62828] border-[#ffcdd2]/45'
                }`}
              >
                {emo}
              </button>
            );
          })}
        </div>
      </div>

      <div className="pt-2 border-t border-gray-150/50">
        <label className="flex items-center gap-2.5 text-xs text-[#594045] font-semibold cursor-pointer mb-2">
          <input
            type="checkbox"
            checked={hasOtro}
            onChange={(e) => {
              const checked = e.target.checked;
              if (!checked) {
                // Clear word
                onChange({ 
                  emocionesPositivas: (formData.emocionesPositivas || []).filter(e => e !== 'Otro'),
                  emocionesNegativas: (formData.emocionesNegativas || []).filter(e => e !== 'Otro'),
                  emocionesOtro: '' 
                });
              } else {
                // Add to positive lists as flag
                onChange({ emocionesPositivas: [...(formData.emocionesPositivas || []), 'Otro'] });
              }
            }}
            className="rounded border-gray-300 text-[#9b0044] focus:ring-[#9b0044]"
          />
          <span>Otro</span>
        </label>

        {hasOtro && (
          <input
            type="text"
            placeholder="Especifica tus emociones recientes..."
            value={formData.emocionesOtro || ''}
            onChange={(e) => onChange({ emocionesOtro: e.target.value })}
            className="w-full px-5 py-3.5 rounded-2xl bg-[#fbf9f8] border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#9b0044] focus:bg-white text-xs font-semibold mt-2 animate-fade-in"
          />
        )}
      </div>
    </div>
  );
}

interface Step8Props {
  formData: UserProfile;
  onChange: (updates: Partial<UserProfile>) => void;
}

function Step8Tobacco({ formData, onChange }: Step8Props) {
  const options = [
    { label: 'NO', value: 'No' },
    { label: 'Sí, ocasionalmente', value: 'Sí, ocasionalmente' },
    { label: 'Sí, con frecuencia', value: 'Sí, con frecuencia' }
  ];

  return (
    <div id="onboarding-step-8-tobacco" className="space-y-4 animate-fade-in font-sans">
      <label className="block text-xs font-semibold text-[#594045] mb-2 uppercase tracking-wider">
        ¿Fuma usted?
      </label>
      <div className="space-y-3">
        {options.map((opt) => {
          const isSelected = formData.fumaHabito === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange({ fumaHabito: opt.value })}
              className={`w-full px-5 py-4 rounded-2xl border text-left font-semibold text-xs leading-normal transition-all flex items-center justify-between ${
                isSelected
                  ? 'bg-[#9b0044] text-white border-[#9b0044]'
                  : 'bg-[#fbf9f8] text-[#594045] border-gray-100 hover:bg-[#f4dce4]/20'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                  isSelected ? 'border-white' : 'border-[#9b0044]/40'
                }`}>
                  {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-white animate-fade-in" />}
                </div>
                <span>{opt.label}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

interface Step9Props {
  formData: UserProfile;
  onChange: (updates: Partial<UserProfile>) => void;
}

function Step9SocialLife({ formData, onChange }: Step9Props) {
  return (
    <div id="onboarding-step-9-social" className="space-y-4 animate-fade-in font-sans">
      <label className="block text-xs font-semibold text-[#594045] mb-1.5 uppercase tracking-wider">
        ¿Le gustaría compartir algo sobre su vida social o sus relaciones?
      </label>
      <textarea
        id="social-comments-input"
        rows={5}
        placeholder="Por ejemplo, el apoyo que recibe, las amistades, la dinámica familiar o los desafíos sociales."
        value={formData.vidaSocialComentarios || ''}
        onChange={(e) => onChange({ vidaSocialComentarios: e.target.value })}
        className="w-full p-4 rounded-2xl bg-[#fbf9f8] border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#9b0044] focus:bg-white text-xs font-medium leading-relaxed"
      />
    </div>
  );
}

interface Step10Props {
  formData: UserProfile;
  onChange: (updates: Partial<UserProfile>) => void;
}

function Step10SymptomAssessment({ formData, onChange }: Step10Props) {
  const categories = [
    {
      title: 'A. SÍNTOMAS DE SANGRADO',
      symptoms: [
        { key: 'sintoma_sangrado_abundante', label: '1. Sangrado menstrual abundante' },
        { key: 'sintoma_periodos_prolongados', label: '2. Períodos prolongados (más de 7 días)' },
        { key: 'sintoma_coagulos_grandes', label: '3. Coágulos grandes' }
      ]
    },
    {
      title: 'B. DOLOR E INFLAMACIÓN',
      symptoms: [
        { key: 'sintoma_dolor_pelvico', label: '4. Dolor pélvico' },
        { key: 'sintoma_inflamacion_abdominal', label: '5. Inflamación abdominal' },
        { key: 'sintoma_presion_uterina', label: '6. Sensación de presión uterina' }
      ]
    },
    {
      title: 'C. FATIGA Y ENERGÍA',
      symptoms: [
        { key: 'sintoma_fatiga_cansancio', label: '7. Fatiga o cansancio' },
        { key: 'sintoma_mareos_debilidad', label: '8. Mareos o debilidad' },
        { key: 'sintoma_falta_concentracion', label: '9. Falta de concentración' }
      ]
    },
    {
      title: 'D. SISTEMA URINARIO E INTESTINAL',
      symptoms: [
        { key: 'sintoma_miccion_frecuente', label: '10. Necesidad frecuente de orinar' },
        { key: 'sintoma_estrenimiento', label: '11. Estreñimiento' },
        { key: 'sintoma_vaciado_incompleto', label: '12. Sensación de vaciado incompleto' }
      ]
    }
  ];

  const scale = [
    { score: 0, label: 'Ninguno', emoji: '😊' },
    { score: 1, label: 'Muy leve', emoji: '🙂' },
    { score: 2, label: 'Moderado', emoji: '😐' },
    { score: 3, label: 'Importante', emoji: '😟' },
    { score: 4, label: 'Muy grave', emoji: '😫' }
  ];

  const updateSymptom = (sympKey: string, score: number) => {
    const current = { ...(formData.valoracionSintomas || {}) };
    current[sympKey] = score;
    onChange({ valoracionSintomas: current });
  };

  return (
    <div id="onboarding-step-10-symptoms" className="space-y-4 animate-fade-in font-sans">
      <div className="bg-[#fcf8f9] rounded-2xl p-3 border border-[#f4c6d6]/35 text-center">
        <h4 className="text-[10px] font-bold text-[#9b0044] uppercase tracking-wider mb-1">
          ESCALA DE VALORACIÓN DE SÍNTOMAS
        </h4>
        <p className="text-[10px] text-gray-500 leading-relaxed">
          Califique la gravedad de los siguientes síntomas:
        </p>
        <div id="symptom-legend-box" className="grid grid-cols-5 gap-0.5 mt-2 pt-2 border-t border-rose-100/50">
          {scale.map((item) => (
            <div key={item.score} className="flex flex-col items-center">
              <span className="text-base">{item.emoji}</span>
              <span className="text-[9px] text-[#880e4f] font-bold mt-0.5">{item.score}</span>
              <span className="text-[8px] text-gray-400 font-sans mt-0.5 hidden sm:inline leading-none">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
        {categories.map((cat, catI) => (
          <div key={catI} className="bg-[#fbf9f8]/40 rounded-2xl border border-gray-100 p-3 space-y-2">
            <h5 className="text-[10px] font-bold text-[#9b0044] tracking-wider uppercase border-b border-gray-100 pb-1">
              {cat.title}
            </h5>
            <div className="space-y-2.5">
              {cat.symptoms.map((symptom) => {
                const currentScore = (formData.valoracionSintomas || {})[symptom.key] ?? 0;
                return (
                  <div key={symptom.key} className="space-y-1 pb-1.5 border-b border-dotted border-gray-150 last:border-0 last:pb-0">
                    <span className="text-[11px] font-medium text-[#594045] block">
                      {symptom.label}
                    </span>
                    <div className="flex justify-between items-center bg-white p-1 rounded-full border border-gray-150">
                      {scale.map((item) => {
                        const isSelected = currentScore === item.score;
                        return (
                          <button
                            key={item.score}
                            type="button"
                            onClick={() => updateSymptom(symptom.key, item.score)}
                            className={`flex items-center justify-center rounded-full transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-[#9b0044] text-white p-1 shadow-sm w-7 h-7 scale-105'
                                : 'text-gray-400 hover:text-gray-850 p-1 w-7 h-7'
                            }`}
                            title={item.label}
                          >
                            <span className="text-xs">{item.emoji}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

interface Step11Props {
  formData: UserProfile;
  onChange: (updates: Partial<UserProfile>) => void;
}

function Step11Digestion({ formData, onChange }: Step11Props) {
  return (
    <div id="onboarding-step-11" className="space-y-4 animate-fade-in font-sans">
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

interface Step12Props {
  formData: UserProfile;
  onToggleCondition: (cond: string) => void;
}

function Step12MedicalHistory({ formData, onToggleCondition }: Step12Props) {
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
        <span>Sus datos clínicos están estrictamente protegidos de forma privada.</span>
      </div>
    </div>
  );
}

export default function OnboardingScreen({ onComplete, onBackToWelcome }: OnboardingScreenProps) {
  const [step, setStep] = useState(1);
  const totalSteps = ONBOARDING_STEPS.length;

  const [formData, setFormData] = useState<UserProfile>(createDefaultProfile());

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
      <div id="onboarding-card-container" className="w-full max-w-xl bg-white rounded-3xl p-6 md:p-8 border border-[#FCE4EC] soft-shadow font-sans">
        
        {/* Step Progression Bar */}
        <div id="progress-indicator-header" className="flex justify-between items-center mb-3">
          <span className="text-[#9b0044] font-semibold text-xs uppercase tracking-widest font-sans">
            Paso {step} de {totalSteps}
          </span>
          <span className="text-gray-550 font-sans text-xs font-semibold">
            {ONBOARDING_STEPS[step - 1].title}
          </span>
        </div>

        {/* Progress bar outer */}
        <div id="progress-bar-outer" className="w-full h-2 bg-gray-150 rounded-full mb-8 overflow-hidden">
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
            <Step6SleepFactors 
              formData={formData} 
              onChange={updateFormData} 
            />
          )}

          {step === 7 && (
            <Step7Emotions 
              formData={formData} 
              onChange={updateFormData} 
            />
          )}

          {step === 8 && (
            <Step8Tobacco 
              formData={formData} 
              onChange={updateFormData} 
            />
          )}

          {step === 9 && (
            <Step9SocialLife 
              formData={formData} 
              onChange={updateFormData} 
            />
          )}

          {step === 10 && (
            <Step10SymptomAssessment 
              formData={formData} 
              onChange={updateFormData} 
            />
          )}

          {step === 11 && (
            <Step11Digestion 
              formData={formData} 
              onChange={updateFormData} 
            />
          )}

          {step === 12 && (
            <Step12MedicalHistory 
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

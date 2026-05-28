import { UserProfile, BleedingLog } from '../types';
import { Flame, ShieldCheck, AlertCircle, Sparkles, Moon, HelpCircle } from 'lucide-react';
import { useState } from 'react';

interface WeeklyInflammatoryScoreProps {
  profile: UserProfile;
  logs: BleedingLog[];
}

export default function WeeklyInflammatoryScore({ profile, logs }: WeeklyInflammatoryScoreProps) {
  const [showExplanation, setShowExplanation] = useState(false);

  // 1. Stress Score based on Profile & last weekly behaviors
  const stressRaw = profile.estresNivel ?? 5;
  const stressScore = Math.min(100, Math.max(0, stressRaw * 10));

  // 2. Nutrition Score based on Profile responses
  let nutritionScore = 15;
  if (profile.lacteosYAzucar === 'Diario') {
    nutritionScore = 95;
  } else if (profile.lacteosYAzucar === 'Ocasional (1-2 veces/semana)' || profile.lacteosYAzucar.includes('Ocasional')) {
    nutritionScore = 50;
  }

  // 3. Sleep Score based on Profile
  let sleepScore = 15;
  const sleepValue = profile.suenoHoras ? profile.suenoHoras.toLowerCase() : '';
  if (sleepValue.includes('menos de 5') || sleepValue.includes('insomnio')) {
    sleepScore = 95;
  } else if (sleepValue.includes('5 a 6') || sleepValue.includes('5-6')) {
    sleepScore = 65;
  } else if (sleepValue.includes('mas de 8') || sleepValue.includes('más de 8')) {
    sleepScore = 10;
  }

  // 4. Pain Score from Profile flow and Logs
  let painScore = 30;
  if (logs && logs.length > 0) {
    const sum = logs.reduce((acc, log) => acc + log.painLevel, 0);
    const avg = sum / logs.length;
    painScore = Math.min(100, Math.max(0, Math.round(avg * 10)));
  } else {
    // Fallback on initial profile flow intensity
    const flow = profile.flujoIntensidad ? profile.flujoIntensidad.toLowerCase() : '';
    if (flow === 'crítico' || flow === 'critico') {
      painScore = 90;
    } else if (flow === 'abundante') {
      painScore = 70;
    } else if (flow === 'moderado') {
      painScore = 45;
    } else {
      painScore = 20;
    }
  }

  // Compute final weighted index
  // Stress: 25%, Nutrition: 30%, Sleep: 20%, Pain: 25%
  const totalScore = Math.round(
    (stressScore * 0.25) + 
    (nutritionScore * 0.3) + 
    (sleepScore * 0.2) + 
    (painScore * 0.25)
  );

  // Determine traffic light zone
  let trafficLight: 'VERD' | 'AMAR' | 'ROJO' = 'AMAR';
  let zoneTitle = 'Carga Inflamatoria Moderada';
  let zoneColor = 'text-amber-500';
  let zoneBadgeBg = 'bg-amber-50 border-amber-100 text-amber-700';
  let zoneDescription = 'Se observa carga inflamatoria latente. Reduzca azúcares, lácteos y aumente el descanso.';
  let zoneAction = 'Evitar cafeína por la tarde, infusiones de jengibre y cúrcuma recomendadas.';

  if (totalScore <= 35) {
    trafficLight = 'VERD';
    zoneTitle = 'Carga Inflamatoria Mínima (Óptimo)';
    zoneColor = 'text-emerald-500';
    zoneBadgeBg = 'bg-emerald-50 border-emerald-100 text-emerald-700';
    zoneDescription = 'Su cuerpo está respondiendo excelentemente a su régimen. No se percibe hiperestrogenemia activa.';
    zoneAction = 'Continuar con alimentación antioxidante y ejercicio de movilidad pélvica.';
  } else if (totalScore > 70) {
    trafficLight = 'ROJO';
    zoneTitle = 'Carga Inflamatoria Crítica';
    zoneColor = 'text-[#ba1a1a]';
    zoneBadgeBg = 'bg-red-50 border-red-150 text-[#ba1a1a]';
    zoneDescription = 'Alerta inflamatoria severa. Priorice el reposo, calor/frío terapéutico y retire lácteos por completo.';
    zoneAction = 'Aplicar protocolo térmico pélvico. Reposo absoluto de 90 días, respiración calmante.';
  }

  // Find the highest contributor for personalized warning advice
  const contributors = [
    { name: 'Nivel de estrés', score: stressScore, suggestion: 'Inicie la guía de respiración 4-7-8 dos veces diarias.' },
    { name: 'Alimentación ultraprocesada/lácteos', score: nutritionScore, suggestion: 'Reemplace el gluten y lácteos hoy por camote, quinoa e infusiones.' },
    { name: 'Defecto en descanso de sueño', score: sleepScore, suggestion: 'Intente dormir antes de las 10:30 PM para regular el cortisol matutino.' },
    { name: 'Dolores de vientre / espasmos', score: painScore, suggestion: 'Accione compresas frías/calientes pélvicas y evite sobreesfuerzos físicos.' }
  ];
  const highestContributor = [...contributors].sort((a, b) => b.score - a.score)[0];

  return (
    <div className="bg-white border border-[#FCE4EC] rounded-3xl p-6 soft-shadow font-sans space-y-5">
      
      {/* Header and toggleable details explanation */}
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5">
            <Flame className="w-5 h-5 text-[#9b0044] shrink-0 animate-pulse" />
            <h3 className="font-serif font-bold text-lg md:text-xl text-[#1b1c1c]">
              Semáforo de Carga Inflamatoria
            </h3>
          </div>
          <p className="text-xs text-gray-500 leading-relaxed max-w-xl">
            Cálculo algorítmico computado cruzando su estrés auto-percibido, alimentación proinflamatoria, horas de sueño e intensidad del dolor uterino reportados.
          </p>
        </div>
        
        <button
          type="button"
          onClick={() => setShowExplanation(!showExplanation)}
          className="text-gray-400 hover:text-[#9b0044] transition-colors p-1"
          title="Ver detalles de cálculo"
        >
          <HelpCircle className="w-5 h-5" />
        </button>
      </div>

      {showExplanation && (
        <div className="bg-[#fbf9f8] border border-[#f4dce4] p-4 rounded-2xl text-xs text-gray-600 leading-relaxed whitespace-pre-line animate-fade-in">
          <strong>¿Cómo se calcula este score?</strong>
          {"\n"}Cruzamos 4 variables de forma ponderada para analizar su estado celular:
          {"\n"}• <strong>Alimentación (30%):</strong> Consumo de lácteos, azúcares y gluten proinflamatorios de forma diaria.
          {"\n"}• <strong>Ginecología / Dolor (25%):</strong> Promedio de nivel de dolor pélvico de los registros vigentes.
          {"\n"}• <strong>Estrés (25%):</strong> Control del cortisol para evitar el robo de progesterona.
          {"\n"}• <strong>Sueño (20%):</strong> Horas de descanso profundo que asisten a la depuración hepática.
        </div>
      )}

      {/* Traffic Light Semaphore Visual UI Component */}
      <div className="bg-[#fbf9f8] p-5 rounded-3xl border border-gray-100 flex flex-col md:flex-row items-center gap-6 justify-between">
        
        {/* The 3-color light circles */}
        <div className="flex gap-4 md:flex-col shrink-0 items-center">
          <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 md:mb-1">
            Semáforo
          </div>
          <div className="flex md:flex-col gap-3 p-2 bg-gray-200/60 rounded-full md:rounded-3xl border border-gray-100 shadow-inner">
            {/* Red light */}
            <div 
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                trafficLight === 'ROJO' 
                  ? 'bg-red-500 text-white shadow-lg ring-4 ring-red-200 animate-pulse' 
                  : 'bg-red-950/20 text-red-500/40'
              }`}
              title="Carga Crítica"
            >
              <span className="text-[10px] font-bold">R</span>
            </div>

            {/* Orange/Yellow light */}
            <div 
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                trafficLight === 'AMAR' 
                  ? 'bg-amber-400 text-amber-950 shadow-lg ring-4 ring-amber-100 animate-pulse' 
                  : 'bg-amber-950/20 text-amber-500/40'
              }`}
              title="Carga Moderada"
            >
              <span className="text-[10px] font-bold">A</span>
            </div>

            {/* Green light */}
            <div 
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                trafficLight === 'VERD' 
                  ? 'bg-emerald-500 text-white shadow-lg ring-4 ring-emerald-100 animate-pulse' 
                  : 'bg-emerald-950/20 text-emerald-500/40'
              }`}
              title="Carga Mínima"
            >
              <span className="text-[10px] font-bold">V</span>
            </div>
          </div>
        </div>

        {/* Detailed Index value and action card */}
        <div className="space-y-3.5 w-full">
          <div className="flex flex-wrap items-baseline gap-2">
            <span className="text-3xl font-serif font-black text-[#1b1c1c]">{totalScore}</span>
            <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Puntos de Inflamación</span>
            
            <span className={`text-[10px] font-bold uppercase py-1 px-3 rounded-full border ${zoneBadgeBg} ml-auto`}>
              {trafficLight === 'VERD' ? 'Bajo' : trafficLight === 'AMAR' ? 'Moderado' : 'Crítico'}
            </span>
          </div>

          <div>
            <h4 className={`font-serif font-bold text-base ${zoneColor}`}>
              {zoneTitle}
            </h4>
            <p className="text-xs text-gray-600 leading-relaxed mt-0.5">
              {zoneDescription}
            </p>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-gray-100 space-y-2">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#9b0044] shrink-0" />
              <span className="text-[10px] font-bold text-[#ba1a1a] uppercase tracking-wider">
                Consejo Recomendado
              </span>
            </div>
            <p className="text-xs text-gray-700 leading-normal">
              {zoneAction}
            </p>
          </div>
        </div>
      </div>

      {/* Factor list breakdown scores */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        
        {/* Stress breakdown */}
        <div className="bg-[#fbf9f8] p-3.5 rounded-2xl border border-gray-50 flex flex-col justify-between">
          <span className="text-[10px] text-gray-400 block font-bold uppercase tracking-wider">Estrés</span>
          <div className="flex items-baseline gap-1 mt-1.5 mb-1">
            <span className="font-serif font-bold text-lg text-[#1b1c1c]">{stressScore}</span>
            <span className="text-[10px] text-gray-400">/100</span>
          </div>
          <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full ${
                stressScore > 70 ? 'bg-[#ba1a1a]' : stressScore > 35 ? 'bg-amber-400' : 'bg-emerald-500'
              }`}
              style={{ width: `${stressScore}%` }}
            />
          </div>
        </div>

        {/* Nutrition breakdown */}
        <div className="bg-[#fbf9f8] p-3.5 rounded-2xl border border-gray-50 flex flex-col justify-between">
          <span className="text-[10px] text-gray-400 block font-bold uppercase tracking-wider">Ultraproc.</span>
          <div className="flex items-baseline gap-1 mt-1.5 mb-1">
            <span className="font-serif font-bold text-lg text-[#1b1c1c]">{nutritionScore}</span>
            <span className="text-[10px] text-gray-400">/100</span>
          </div>
          <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full ${
                nutritionScore > 70 ? 'bg-[#ba1a1a]' : nutritionScore > 35 ? 'bg-amber-400' : 'bg-emerald-500'
              }`}
              style={{ width: `${nutritionScore}%` }}
            />
          </div>
        </div>

        {/* Sleep breakdown */}
        <div className="bg-[#fbf9f8] p-3.5 rounded-2xl border border-gray-50 flex flex-col justify-between">
          <span className="text-[10px] text-gray-400 block font-bold uppercase tracking-wider">Insomnio</span>
          <div className="flex items-baseline gap-1 mt-1.5 mb-1">
            <span className="font-serif font-bold text-lg text-[#1b1c1c]">{sleepScore}</span>
            <span className="text-[10px] text-gray-400">/100</span>
          </div>
          <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full ${
                sleepScore > 70 ? 'bg-[#ba1a1a]' : sleepScore > 35 ? 'bg-amber-400' : 'bg-emerald-500'
              }`}
              style={{ width: `${sleepScore}%` }}
            />
          </div>
        </div>

        {/* Pain level breakdown */}
        <div className="bg-[#fbf9f8] p-3.5 rounded-2xl border border-gray-50 flex flex-col justify-between">
          <span className="text-[10px] text-gray-400 block font-bold uppercase tracking-wider">Dolor Uterino</span>
          <div className="flex items-baseline gap-1 mt-1.5 mb-1">
            <span className="font-serif font-bold text-lg text-[#1b1c1c]">{painScore}</span>
            <span className="text-[10px] text-gray-400">/100</span>
          </div>
          <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full ${
                painScore > 70 ? 'bg-[#ba1a1a]' : painScore > 35 ? 'bg-amber-400' : 'bg-emerald-500'
              }`}
              style={{ width: `${painScore}%` }}
            />
          </div>
        </div>

      </div>

      {/* Focus Warning advice on critical contributor */}
      {totalScore > 35 && (
        <div className="p-4 rounded-2xl bg-rose-50/50 border border-[#f4dce4] text-xs flex items-start gap-2.5">
          <AlertCircle className="w-4.5 h-4.5 text-[#9b0044] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold text-[#ba1a1a]">Foco de mejora prioritario:</span>
            <p className="text-gray-600 leading-normal">
              Su factor con mayor incidencia es <strong className="text-gray-900">{highestContributor.name}</strong> ({highestContributor.score} pts). Sugerencia médica: {highestContributor.suggestion}
            </p>
          </div>
        </div>
      )}

    </div>
  );
}

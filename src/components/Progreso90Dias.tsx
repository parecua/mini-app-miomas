import { useState, useEffect } from 'react';
import { 
  Check, 
  Sparkles, 
  Moon, 
  Flame, 
  Droplets, 
  Coffee, 
  Heart, 
  Award, 
  BookOpen, 
  ChevronRight, 
  Compass, 
  User, 
  Shuffle 
} from 'lucide-react';

interface Progreso90DiasProps {
  currentDay?: number;
}

interface PhaseDetail {
  name: string;
  phaseId: 'menstrual' | 'folicular' | 'ovulatoria' | 'luteal';
  color: string;
  badgeBg: string;
  textColor: string;
  desc: string;
  diet: string;
  movement: string;
  remedy: string;
  tips: string;
}

// Map day into 28-day cycle phase parameters
const getDayPhase = (day: number): PhaseDetail => {
  const cycleDay = ((day - 1) % 28) + 1; // 1 to 28
  
  if (cycleDay <= 5) {
    return {
      name: 'Fase Menstrual (Días 1-5)',
      phaseId: 'menstrual',
      color: 'border-red-150 bg-red-50/70',
      badgeBg: 'bg-red-500 text-white',
      textColor: 'text-red-700',
      desc: 'El cuerpo se encuentra en depuración activa del endometrio. Los niveles de estrógenos y progesterona se hallan en sus mínimos biológicos. Tu útero requiere calor directo, sosiego y un metabolismo de reposo.',
      diet: 'Caldos de huesos de cocción lenta, alimentos calientes, sopas de remolacha y calabaza, infusión de jengibre y semillas de calabaza ricas en zinc.',
      movement: 'Relajación miofascial del suelo pélvico, posturas de descanso (Balasana/Postura del niño, Supta Baddha Konasana) y respiración diafragmática profunda.',
      remedy: 'Infusión templada de hojas de frambueso rojo y flores de manzanilla para inhibir los espasmos uterinos agudos por prostaglandinas.',
      tips: 'Aplica botellas de agua caliente sobre el bajo vientre, evita comidas excesivamente frías o crudas, y descansa al menos 8 horas.'
    };
  } else if (cycleDay <= 12) {
    return {
      name: 'Fase Folicular (Días 6-12)',
      phaseId: 'folicular',
      color: 'border-[#f4dce4] bg-[#f4dce4]/15',
      badgeBg: 'bg-[#9b0044] text-white',
      textColor: 'text-[#9b0044]',
      desc: 'Pico de producción biológica de estrógenos (estradiol). La glándula hipófisis libera FSH para promover la maduración folicular. Aumentan rápidamente tus niveles de resistencia física, la sensibilidad a la insulina y la salud cognitiva.',
      diet: 'Crucíferas (brócoli, coles de Bruselas), alimentos fermentados (chucrut, miso) facilitadores del filtrado hepático de estrógenos (fase 1 y 2), y jugos verdes.',
      movement: 'Entrenamiento de fuerza y resistencia media-alta, actividades aeróbicas más demandantes y estiramiento del psoas menor.',
      remedy: 'Té verde orgánico rico en antioxidantes y extracto de diente de león para descongestionar las vías metabólicas del hígado.',
      tips: 'Canaliza esta claridad mental para iniciar nuevos proyectos o resolver tareas complejas de planificación cognitiva.'
    };
  } else if (cycleDay <= 16) {
    return {
      name: 'Fase Ovulatoria (Días 13-16)',
      phaseId: 'ovulatoria',
      color: 'border-amber-200 bg-amber-50/70',
      badgeBg: 'bg-amber-500 text-white',
      textColor: 'text-amber-700',
      desc: 'Liberación del ovocito impulsada por el pico de la hormona luteinizante (LH). El estrógeno alcanza su clímax y el moco cervical se vuelve elástico y transparente (consistencia de clara de huevo). Te sientes desbordante de dinamismo y magnetismo social.',
      diet: 'Alimentos con altos antioxidantes (arándanos, moras, granada), vegetales de hojas oscuras crudos y semillas de ajonjolí (sésamo).',
      movement: 'Entrenamientos de alta intensidad (HIIT), danza del vientre, natación y dinámicas colectivas energizantes.',
      remedy: 'Elixir dorado de cúrcuma pura emulsionada en bebida de coco, pimienta negra y canela de Ceilán.',
      tips: 'Excelente semana para negociaciones, alocución pública, socializar y expresar tus emociones creativas abiertamente.'
    };
  } else {
    return {
      name: 'Fase Luteal (Días 17-28)',
      phaseId: 'luteal',
      color: 'border-teal-150 bg-teal-50/60',
      badgeBg: 'bg-teal-600 text-white',
      textColor: 'text-teal-800',
      desc: 'El folículo colapsado se convierte en el cuerpo lúteo, secretando progesterona. Esta hormona esencial sosiega tu sistema nervioso central, estabiliza la temperatura corporal alta y nutre la pared endometrial.',
      diet: 'Carbohidratos complejos de absorción lenta (camote, yuca, calabaza, quínoa) que promueven niveles estables de serotonina y evitan antojos proinflamatorios de azúcar.',
      movement: 'Yoga Vinyasa suave, Pilates técnico consciente, caminatas meditativas de conexión con la naturaleza, y estiramientos profundos de apertura de cadera.',
      remedy: 'Infusión nocturna de toronjil, pasiflora y flores de lavanda para mitigar fluctuaciones de humor y regular la progesterona.',
      tips: 'Fase propicia para volver tu mirada hacia adentro. Organiza agendas despejadas, huye de estímulos ruidosos y practica duchas tibias antes de acostarte.'
    };
  }
};

export default function Progreso90Dias({ currentDay = 12 }: Progreso90DiasProps) {
  const [selectedDay, setSelectedDay] = useState<number>(currentDay);
  const [activeTab, setActiveTab] = useState<'mes1' | 'mes2' | 'mes3'>('mes1');
  const [completedDays, setCompletedDays] = useState<number[]>([]);

  // Automatically switch tab according to selectedDay
  useEffect(() => {
    if (selectedDay <= 30) setActiveTab('mes1');
    else if (selectedDay <= 60) setActiveTab('mes2');
    else setActiveTab('mes3');
  }, [selectedDay]);

  // Load completed days from localStorage, populate defaults on clean installation
  useEffect(() => {
    try {
      const stored = localStorage.getItem('salud_uterina_90_dias_progreso');
      if (stored) {
        setCompletedDays(JSON.parse(stored));
      } else {
        // Default seed to make the experience real (days up to currentDay - 1 completed)
        const defaults = Array.from({ length: Math.min(90, currentDay - 1) }, (_, i) => i + 1);
        setCompletedDays(defaults);
        localStorage.setItem('salud_uterina_90_dias_progreso', JSON.stringify(defaults));
      }
    } catch (e) {
      console.error(e);
    }
  }, [currentDay]);

  const handleToggleCompleted = (day: number) => {
    let updated: number[];
    if (completedDays.includes(day)) {
      updated = completedDays.filter(d => d !== day);
    } else {
      updated = [...completedDays, day].sort((a,b) => a - b);
    }
    setCompletedDays(updated);
    try {
      localStorage.setItem('salud_uterina_90_dias_progreso', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const currentDetails = getDayPhase(selectedDay);
  const totalCompleted = completedDays.length;
  const percentage = Math.round((totalCompleted / 90) * 100);

  // Define days ranges for each Month
  const monthRanges = {
    mes1: { start: 1, end: 30, label: 'Mes 1 (Días 1-30)' },
    mes2: { start: 31, end: 60, label: 'Mes 2 (Días 31-60)' },
    mes3: { start: 61, end: 90, label: 'Mes 3 (Días 61-90)' }
  };

  const activeRange = monthRanges[activeTab];
  const daysArray = Array.from(
    { length: activeRange.end - activeRange.start + 1 },
    (_, i) => activeRange.start + i
  );

  return (
    <div className="bg-white border border-[#FCE4EC] rounded-3xl p-6 soft-shadow font-sans space-y-6">
      
      {/* Dynamic Progress indicator header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-50 pb-5">
        <div>
          <span className="text-[10px] font-bold text-[#ba1a1a] uppercase tracking-widest block mb-1">
            Plan Clínico Integral de Recuperación
          </span>
          <h3 className="font-serif font-bold text-xl md:text-2xl text-[#9b0044] flex items-center gap-1.5">
            <Compass className="w-5 h-5 text-[#9b0044] shrink-0" />
            Guía de Progreso de 90 Días
          </h3>
          <p className="text-xs text-gray-400 mt-1 max-w-lg leading-relaxed">
            Un ciclo de 3 meses para restablecer tu eje endocrino. Haz clic sobre cualquier día para consultar sus pautas específicas y marcarlo como completado.
          </p>
        </div>

        {/* Dynamic completed circle badge */}
        <div className="flex items-center gap-3 bg-[#fbf9f8] p-3 rounded-2xl border border-gray-100 shrink-0 w-full sm:w-auto">
          <div className="relative w-11 h-11 flex items-center justify-center shrink-0">
            {/* SVG circular progress track */}
            <svg className="absolute w-full h-full -rotate-90">
              <circle cx="22" cy="22" r="18" fill="transparent" stroke="#e5e7eb" strokeWidth="3" />
              <circle 
                cx="22" 
                cy="22" 
                r="18" 
                fill="transparent" 
                stroke="#9b0044" 
                strokeWidth="3.5" 
                strokeDasharray="113" 
                strokeDashoffset={113 - (113 * percentage) / 100}
                className="transition-all duration-500 stroke-linecap-round"
              />
            </svg>
            <span className="text-[11px] font-bold text-[#9b0044]">{percentage}%</span>
          </div>
          <div className="text-left font-sans">
            <div className="text-[10px] font-bold text-[#ba1a1a] uppercase tracking-wider">Tu Cumplimiento</div>
            <div className="text-xs text-slate-700 font-bold">{totalCompleted} / 90 días completados</div>
          </div>
        </div>
      </div>

      {/* Month selections Tabs menu */}
      <div className="flex bg-gray-100 p-1.5 rounded-2xl gap-1.5 border border-gray-100">
        {(Object.keys(monthRanges) as Array<keyof typeof monthRanges>).map((tabKey) => {
          const isActive = activeTab === tabKey;
          return (
            <button
              key={tabKey}
              type="button"
              onClick={() => {
                setActiveTab(tabKey);
                // Set default Day to the start of that tab range
                setSelectedDay(monthRanges[tabKey].start);
              }}
              className={`flex-1 text-center py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                isActive 
                  ? 'bg-white text-[#9b0044] shadow-sm' 
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              {monthRanges[tabKey].label}
            </button>
          );
        })}
      </div>

      {/* Grid selector area + Detailed day side panel info */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left component: Interactive Month Grid layout */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex justify-between items-center px-1">
            <span className="text-xs font-bold text-[#594045] uppercase tracking-wider block">
              Selección de Día
            </span>
            <span className="text-[11px] text-gray-400 font-semibold font-mono">
              Mostrando días {activeRange.start} al {activeRange.end}
            </span>
          </div>

          <div className="grid grid-cols-6 sm:grid-cols-10 lg:grid-cols-6 xl:grid-cols-6 gap-2.5 p-4 bg-[#fbf9f8] rounded-3xl border border-gray-100">
            {daysArray.map((dayNum) => {
              const isCompleted = completedDays.includes(dayNum);
              const isActiveToday = dayNum === currentDay;
              const isCurrentlySelected = dayNum === selectedDay;
              
              // Get color markers based on phase type for quick visual dots
              const phaseMarker = getDayPhase(dayNum);
              let dotColor = 'bg-gray-300';
              if (phaseMarker.phaseId === 'menstrual') dotColor = 'bg-red-400';
              else if (phaseMarker.phaseId === 'folicular') dotColor = 'bg-[#cbd5e1]'; // slate gray
              else if (phaseMarker.phaseId === 'ovulatoria') dotColor = 'bg-amber-400';
              else if (phaseMarker.phaseId === 'luteal') dotColor = 'bg-teal-500';

              return (
                <button
                  key={dayNum}
                  type="button"
                  onClick={() => setSelectedDay(dayNum)}
                  title={`Día ${dayNum} - ${phaseMarker.name}`}
                  className={`aspect-square rounded-2xl flex flex-col items-center justify-center relative transition-all cursor-pointer border ${
                    isCurrentlySelected
                      ? 'border-[#9b0044] bg-white text-[#9b0044] ring-2 ring-[#f4dce4]/90 font-black scale-105'
                      : isCompleted
                        ? 'bg-[#9b0044] border-[#9b0044] text-white hover:bg-[#c2185b]'
                        : isActiveToday
                          ? 'bg-[#f4dce4] border-[#9b0044]/40 text-[#9b0044] font-bold shadow-sm ring-2 ring-[#9b0044]/15 animate-pulse'
                          : 'bg-white border-gray-200 text-gray-600 hover:border-[#9b0044]'
                  }`}
                >
                  {/* Visual completed tick overlay */}
                  {isCompleted && !isCurrentlySelected && (
                    <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-emerald-500 text-white rounded-full flex items-center justify-center">
                      <Check className="w-1.5 h-1.5 stroke-[4]" />
                    </span>
                  )}
                  
                  {/* Number label */}
                  <span className="text-xs leading-none font-bold mt-1">{dayNum}</span>

                  {/* Tiny dot index under day to identify active cycle phase color */}
                  <span className={`w-1.5 h-1.5 rounded-full mt-1.5 ${dotColor}`} />
                </button>
              );
            })}
          </div>

          {/* Color Guides Legend */}
          <div className="bg-white p-3.5 rounded-2xl border border-dotted border-gray-150 flex flex-wrap gap-4 text-[10px] text-gray-500 font-bold uppercase tracking-wider justify-center">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400 inline-block" />
              <span>Fase Menstrual</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-300 inline-block" />
              <span>Fase Folicular</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
              <span>Fase Ovulatoria</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-500 inline-block" />
              <span>Fase Luteal</span>
            </span>
          </div>
        </div>

        {/* Right component: Information Detail pane about selectedDay */}
        <div className="lg:col-span-6 bg-[#fbf9f8] rounded-3xl p-5 md:p-6 border border-gray-150 space-y-5">
          <div className="flex items-center justify-between border-b border-gray-200 pb-3">
            <div className="space-y-0.5">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                Detalles del Día del Protocolo
              </span>
              <h4 className="font-serif font-black text-xl text-[#1b1c1c]">
                Día {selectedDay} de 90
              </h4>
            </div>

            {/* Checkmark mark as completed action trigger */}
            <button
              type="button"
              onClick={() => handleToggleCompleted(selectedDay)}
              className={`px-3.5 py-1.5 rounded-full text-[10px] font-bold uppercase transition-all flex items-center gap-1 cursor-pointer select-none ${
                completedDays.includes(selectedDay)
                  ? 'bg-emerald-500 text-white border-emerald-500 h-7'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-[#9b0044] hover:text-[#9b0044] h-7'
              }`}
            >
              <Check className="w-3.5 h-3.5" />
              <span>{completedDays.includes(selectedDay) ? 'Completado' : 'Marcar Hecho'}</span>
            </button>
          </div>

          {/* Phase Badge & general explanation */}
          <div className={`p-4 rounded-2xl border ${currentDetails.color} space-y-2`}>
            <div className="flex items-center gap-2">
              <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${currentDetails.badgeBg}`}>
                {currentDetails.name}
              </span>
              {selectedDay === currentDay && (
                <span className="text-[9px] font-bold uppercase text-[#9b0044] bg-white border border-[#9b0044] tracking-widest px-2 py-0.5 rounded-full animate-bounce">
                  Hoy
                </span>
              )}
            </div>
            <p className="text-xs md:text-sm text-gray-700 leading-relaxed font-sans">
              {currentDetails.desc}
            </p>
          </div>

          {/* Action columns detail cards grid */}
          <div className="space-y-4">
            
            {/* Diet advice */}
            <div className="bg-white p-4 rounded-2xl border border-gray-100 space-y-1">
              <div className="flex items-center gap-1.5">
                <Coffee className="w-4 h-4 text-[#9b0044]" />
                <span className="text-[10px] font-bold text-[#594045] uppercase tracking-wider">
                  Nutrición Celular Sugerida
                </span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                {currentDetails.diet}
              </p>
            </div>

            {/* Movement / physical training advice */}
            <div className="bg-white p-4 rounded-2xl border border-gray-100 space-y-1">
              <div className="flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-teal-600" />
                <span className="text-[10px] font-bold text-[#594045] uppercase tracking-wider">
                  Soberanía Corporal y Movimiento
                </span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                {currentDetails.movement}
              </p>
            </div>

            {/* Botanical infusion support */}
            <div className="bg-white p-4 rounded-2xl border border-gray-100 space-y-1">
              <div className="flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-red-500" />
                <span className="text-[10px] font-bold text-[#594045] uppercase tracking-wider">
                  Aliado Botánico / Fitoterapia recomendada
                </span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed font-sans italic">
                {currentDetails.remedy}
              </p>
            </div>

            {/* Lifestyle and quick tip */}
            <div className="bg-[#f4dce4]/10 p-4 rounded-2xl border border-dotted border-[#f4dce4] space-y-1">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#9b0044]" />
                <span className="text-[10px] font-bold text-[#9b0044] uppercase tracking-widest">
                  Consejo de Sabiduría Hormonal
                </span>
              </div>
              <p className="text-xs text-[#594045] leading-relaxed">
                {currentDetails.tips}
              </p>
            </div>

          </div>

          {/* Check off and proceed to next/prev quick helper buttons */}
          <div className="flex justify-between items-center gap-4 text-xs pt-1">
            <button
              type="button"
              disabled={selectedDay === 1}
              onClick={() => setSelectedDay(prev => Math.max(1, prev - 1))}
              className="text-gray-400 hover:text-gray-900 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer font-semibold flex items-center gap-1"
            >
              &larr; Anterior
            </button>

            <span className="text-[10px] font-mono text-gray-300">
              Usa el teclado o menú para navegar
            </span>

            <button
              type="button"
              disabled={selectedDay === 90}
              onClick={() => setSelectedDay(prev => Math.min(90, prev + 1))}
              className="text-[#9b0044] hover:text-[#c2185b] disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer font-semibold flex items-center gap-1"
            >
              Siguiente &rarr;
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}

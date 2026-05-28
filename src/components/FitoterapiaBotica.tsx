import { useState, useEffect } from 'react';
import { Leaf, Flame, Droplets, Coffee, Sparkles, AlertCircle, Check, BookOpen, X } from 'lucide-react';

interface RemedyItem {
  id: string;
  name: string;
  type: 'infusion' | 'receta';
  symptomCategory: 'dolor' | 'sangrado' | 'estres' | 'fatiga';
  duration: string;
  difficulty: string;
  ingredients: string[];
  preparation: string[];
  scientificReason: string;
  contraindications?: string;
}

const HERBAL_REMEDIES: RemedyItem[] = [
  {
    id: 'fito-1',
    name: 'Infusión Ancestral de Hojas de Frambueso y Jengibre',
    type: 'infusion',
    symptomCategory: 'dolor',
    duration: '10 min',
    difficulty: 'Muy Fácil',
    ingredients: [
      '1 cucharada de hojas secas de frambueso rojo (Rubus idaeus)',
      '3 rodajas finas de jengibre fresco',
      '1 taza de agua hirviendo',
      'Media cucharadita de miel de abeja cruda (opcional)'
    ],
    preparation: [
      'Hierva el agua junto con las rodajas de jengibre durante 3 minutos.',
      'Apague el fuego, agregue las hojas de frambueso rojo secas y cubra inmediatamente con una tapa.',
      'Deje reposar en infusión durante 7 minutos para concentrar los taninos y el fragarine.',
      'Cole y sirva caliente. Consuma sorbos lentos.'
    ],
    scientificReason: 'Las hojas de frambueso contienen fragarina, un alcaloide que tonifica los músculos de la pelvis y el útero, reduciendo espasmos, mientras el jengibre actúa como inhibidor natural de las prostaglandinas inflamatorias de tipo COX-2.',
    contraindications: 'Evitar si se sospecha de embarazo en el primer trimestre.'
  },
  {
    id: 'fito-2',
    name: 'Elixir de Cúrcuma, Canela y Pimienta Negra (Leche Dorada)',
    type: 'infusion',
    symptomCategory: 'dolor',
    duration: '8 min',
    difficulty: 'Fácil',
    ingredients: [
      '1 taza de bebida de almendras o coco (sin azúcar)',
      '1 cucharadita de cúrcuma pura en polvo',
      'Media cucharadita de canela de ceilán en polvo',
      'Una pizca de pimienta negra molida (esencial para absorber la curcumina)',
      'Aceite de coco virgen (un cuarto de cucharadita)'
    ],
    preparation: [
      'Caliente la bebida vegetal a fuego medio sin que llegue a hervir del todo.',
      'Agregue la cúrcuma, canela, pimienta negra molida y el aceite de coco virgen.',
      'Bata enérgicamente hasta emulsionar las grasas saludables con las especias.',
      'Beba caliente por la tarde.'
    ],
    scientificReason: 'La curcumina es un potente agente antiinflamatorio sistémico que actúa amortiguando la cascada de citoquinas inflamatorias culpables de la distensión endometrial.',
    contraindications: 'No tomar en dosis elevadas si consume anticoagulantes.'
  },
  {
    id: 'fito-3',
    name: 'Infusión de Mielenrama, Manzanilla y Ortiga (Detén-Flujo)',
    type: 'infusion',
    symptomCategory: 'sangrado',
    duration: '12 min',
    difficulty: 'Fácil',
    ingredients: [
      '1 cucharada de Mielenrama (Achillea millefolium)',
      '1 cucharadita de flores secas de manzanilla dulce',
      '1 cucharadita de ortiga verde deshidratada',
      '1 taza de agua purificada'
    ],
    preparation: [
      'Vierta el agua hirviendo directamente sobre la mezcla de hierbas en una taza o tetera.',
      'Selle herméticamente con una tapa para conservar los aceites esenciales del azuleno.',
      'Deje reposar por 10 minutos completos.',
      'Cole y beba tibio, se sugiere tomar 2 tazas al día en los días de mayor flujo.'
    ],
    scientificReason: 'La mielenrama es una de las plantas estípticas (hemostáticas) más respetadas en ginecología, que asiste a contraer suavemente el tejido vascular endometrial, regulando las hemorragias copiosas.',
    contraindications: 'Contraindicado en personas con alergia conocida a las asteráceas o con propensión a trombofilias.'
  },
  {
    id: 'fito-4',
    name: 'Tazón de Avena Antiinflamatoria de Chía, Cacao y Semillas de Calabaza',
    type: 'receta',
    symptomCategory: 'fatiga',
    duration: '15 min',
    difficulty: 'Fácil',
    ingredients: [
      'Media taza de avena integral sin gluten',
      '1 taza de leche de coco casera u agua',
      '1 cucharada de cacao crudo orgánico en polvo',
      '1 cucharada de semillas de calabaza (magnesio puro)',
      '1 cucharadita de semillas de chía hidratadas'
    ],
    preparation: [
      'Cocine la avena integral con el líquido y la canela a fuego lento hasta espesar suavemente.',
      'Retire del fuego y mezcle el cacao crudo en polvo hasta derretir de forma uniforme.',
      'Vierta en un tazón y decore con las semillas de calabaza crujientes y la chía gelificada.',
      'Disfrute como desayuno caliente y nutritivo.'
    ],
    scientificReason: 'Las semillas de calabaza aportan altos niveles de zinc y magnesio que relajan la fibra muscular uterina, mientras el cacao crudo estimula la producción de dopamina y aporta hierro de fácil asimilación vegetal.',
  },
  {
    id: 'fito-5',
    name: 'Pudín Relajante de Chía con Infusión Fría de Lavanda y Arándanos',
    type: 'receta',
    symptomCategory: 'estres',
    duration: '5 min',
    difficulty: 'Muy Fácil',
    ingredients: [
      '3 cucharadas de semillas de chía',
      '1 taza de infusión fría de lavanda y toronjil',
      'Media taza de arándanos frescos (antioxidantes directos)',
      'Una pizca de extracto de vainilla puro'
    ],
    preparation: [
      'Mezcle en un frasco de vidrio las semillas de chía, la infusión de lavanda fría y la vainilla.',
      'Agite fuertemente y deje reposar 15 minutos (o refrigere toda la noche).',
      'Sirva con los arándanos maduros prensados en la superficie.'
    ],
    scientificReason: 'La lavanda y el toronjil aportan linalool y ácido rosmarínico que modulan los receptores GABA del cerebro apagando la hiperreactividad del eje adrenal y aliviando el peso de los cólicos agudos.',
  }
];

export default function FitoterapiaBotica() {
  const [selectedCategory, setSelectedCategory] = useState<'todo' | 'dolor' | 'sangrado' | 'estres' | 'fatiga'>('todo');
  const [selectedRemedy, setSelectedRemedy] = useState<RemedyItem | null>(HERBAL_REMEDIES[0]);
  const [preparedRemedies, setPreparedRemedies] = useState<string[]>([]);
  const [showJugoModal, setShowJugoModal] = useState<boolean>(false);
  const [isCoreJugoDrunk, setIsCoreJugoDrunk] = useState<boolean>(() => {
    try {
      return localStorage.getItem('salud_uterina_jugo_mensual_core_drunk') === 'true';
    } catch (e) {
      return false;
    }
  });

  const handleToggleCoreJugo = () => {
    const newVal = !isCoreJugoDrunk;
    setIsCoreJugoDrunk(newVal);
    try {
      localStorage.setItem('salud_uterina_jugo_mensual_core_drunk', String(newVal));
    } catch (e) {}
  };

  const handleTogglePrepared = (id: string) => {
    if (preparedRemedies.includes(id)) {
      setPreparedRemedies(prev => prev.filter(r => r !== id));
    } else {
      setPreparedRemedies(prev => [...prev, id]);
    }
  };

  const filteredRemedies = selectedCategory === 'todo'
    ? HERBAL_REMEDIES
    : HERBAL_REMEDIES.filter(r => r.symptomCategory === selectedCategory);

  return (
    <div className="bg-white rounded-3xl border border-[#FCE4EC] p-6 soft-shadow font-sans space-y-6">
      
      {/* Component Title & Introduccion */}
      <div className="border-b border-gray-50 pb-4 flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <span className="text-[10px] font-bold text-[#ba1a1a] uppercase tracking-widest block mb-1">
            Herbolaria y Desayunos Celulares
          </span>
          <h3 className="font-serif font-bold text-xl md:text-2xl text-[#9b0044]">
            Recetario & Botica de Fitoterapia
          </h3>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {isCoreJugoDrunk && (
            <span className="flex items-center gap-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2.5 py-1 rounded-full border border-emerald-100">
              <Check className="w-3 h-3 stroke-[3]" /> Jugo Mensual Hecho
            </span>
          )}
          <div className="flex items-center gap-2 bg-[#f4dce4]/30 px-3.5 py-1.5 rounded-full text-xs text-[#9b0044] font-semibold">
            <Leaf className="w-4 h-4 text-[#9b0044] animate-bounce" />
            <span>Remedios probados: {preparedRemedies.length + (isCoreJugoDrunk ? 1 : 0)}</span>
          </div>
        </div>
      </div>

      <p className="text-xs md:text-sm text-gray-500 leading-relaxed max-w-2xl mt-1">
        Consulte nuestra botica aliada de ginecología integrativa. Filtre según el síntoma que más esté afectando su bienestar hormonal en este día y prepare soluciones 100% naturales en su cocina.
      </p>

      {/* Highlight Core Welcome Juice */}
      <div className="bg-gradient-to-r from-red-50 to-[#f4dce4]/30 p-4 border border-red-150 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1 text-left">
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-[#9b0044] text-white text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full animate-pulse flex items-center gap-1">
              <span>🥤</span> Bebida Obligatoria de Entrada
            </span>
            <h4 className="font-serif font-bold text-sm text-[#9b0044]">
              El Jugo Mensual Fundacional (Betabel, Apio, Sábila & Ajo)
            </h4>
          </div>
          <p className="text-[11px] text-gray-600 leading-normal max-w-2xl">
            Este jugo es el pilar de depuración biológica y nutrición celular ginecológica que toman todas las personas al ingresar. Activa tu metabolismo de reposo, desinflama el útero y purifica tus vías hormonales de forma laboral.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowJugoModal(true)}
          className="bg-[#9b0044] hover:bg-[#ba1a1a] text-white font-bold text-[11px] px-3.5 py-2.5 rounded-xl shrink-0 shadow-sm transition-colors cursor-pointer flex items-center gap-1"
        >
          <span>Ver Receta Paso a Paso</span>
          <span>&rarr;</span>
        </button>
      </div>

      {/* Sympton Quick Filters */}
      <div className="flex flex-wrap gap-2.5">
        {[
          { id: 'todo', label: 'Todos los Remedios', icon: null },
          { id: 'dolor', label: 'Dolor Cólico', icon: <Flame className="w-3.5 h-3.5" /> },
          { id: 'sangrado', label: 'Sangrado Abundante', icon: <Droplets className="w-3.5 h-3.5" /> },
          { id: 'estres', label: 'Estrés e Insomnio', icon: <BookOpen className="w-3.5 h-3.5" /> },
          { id: 'fatiga', label: 'Fatiga Menstrual', icon: <Coffee className="w-3.5 h-3.5" /> },
        ].map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => {
              setSelectedCategory(cat.id as any);
              // Auto select first of filtered list
              const filtered = cat.id === 'todo' ? HERBAL_REMEDIES : HERBAL_REMEDIES.filter(r => r.symptomCategory === cat.id);
              if (filtered.length > 0) {
                setSelectedRemedy(filtered[0]);
              }
            }}
            className={`px-4 py-2.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              selectedCategory === cat.id
                ? 'bg-[#9b0044] text-white shadow-sm'
                : 'bg-[#fbf9f8] text-[#594045] border border-gray-100 hover:bg-[#f4dce4]/20'
            }`}
          >
            {cat.icon}
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left column: Remedies List view */}
        <div className="lg:col-span-5 space-y-3.5">
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">
            Preparados Sugeridos ({filteredRemedies.length})
          </h4>

          <div className="space-y-2.5 max-h-[420px] overflow-y-auto pr-1">
            {filteredRemedies.map((rem) => {
              const isSelected = selectedRemedy?.id === rem.id;
              const isPrepared = preparedRemedies.includes(rem.id);

              return (
                <div
                  key={rem.id}
                  onClick={() => setSelectedRemedy(rem)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 text-left relative ${
                    isSelected
                      ? 'border-[#9b0044] bg-[#f4dce4]/10 ring-1 ring-[#f4dce4]'
                      : 'border-gray-150 bg-white hover:bg-[#fbf9f8]/40'
                  }`}
                >
                  <div className={`p-2.5 rounded-full shrink-0 ${
                    isSelected ? 'bg-[#9b0044] text-white' : 'bg-[#fbf9f8] text-gray-500'
                  }`}>
                    <Leaf className="w-4 h-4" />
                  </div>

                  <div className="space-y-1 w-full min-w-0 pr-6">
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block">
                      {rem.type === 'infusion' ? 'Infusión Terapéutica' : 'Receta antiinflamatoria'}
                    </span>
                    
                    <h5 className="font-serif font-bold text-xs md:text-sm text-[#1b1c1c] leading-snug line-clamp-2">
                      {rem.name}
                    </h5>

                    <div className="flex justify-between text-[10px] text-gray-400 font-semibold font-sans pt-1">
                      <span>Dificultad: {rem.difficulty}</span>
                      <span>{rem.duration}</span>
                    </div>
                  </div>

                  {isPrepared && (
                    <div className="absolute top-3 right-3 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center text-white" title="Preparado">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}

                </div>
              );
            })}
          </div>
        </div>

        {/* Right column: Detailed Recipe view */}
        <div className="lg:col-span-7 bg-[#fbf9f8] rounded-3xl p-5 md:p-6 border border-gray-150 space-y-5">
          {selectedRemedy ? (
            <div className="space-y-5 animate-fade-in text-left">
              
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-4">
                <span className="bg-[#f4dce4] text-[#9b0044] text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full">
                  {selectedRemedy.type === 'infusion' ? 'Infusión Aliada' : 'Botica Desayuno'}
                </span>
                
                {/* Prepare checkbox action button */}
                <button
                  type="button"
                  onClick={() => handleTogglePrepared(selectedRemedy.id)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 border cursor-pointer ${
                    preparedRemedies.includes(selectedRemedy.id)
                      ? 'bg-emerald-500 text-white border-emerald-500'
                      : 'bg-white text-gray-700 border-gray-200 hover:bg-[#f4dce4]/20 hover:text-[#9b0044]'
                  }`}
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>{preparedRemedies.includes(selectedRemedy.id) ? 'Remedio Preparado' : 'Marcar como Hecho'}</span>
                </button>
              </div>

              <div>
                <h4 className="font-serif font-bold text-lg md:text-xl text-[#9b0044] leading-snug mb-1">
                  {selectedRemedy.name}
                </h4>
                <div className="flex gap-4 text-xs text-gray-400 font-semibold pb-1">
                  <span>Preparación: {selectedRemedy.duration}</span>
                  <span>•</span>
                  <span>Dificultad: {selectedRemedy.difficulty}</span>
                </div>
              </div>

              {/* Ingredients List */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-[#594045] uppercase tracking-wider block">
                  Ingredientes Orgánicos Necenarios:
                </span>
                <ul className="space-y-1.5 text-xs md:text-sm text-gray-700 pl-1">
                  {selectedRemedy.ingredients.map((ing, k) => (
                    <li key={k} className="flex items-start gap-2">
                      <span className="text-emerald-500 font-bold">•</span>
                      <span>{ing}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Preparation Steps */}
              <div className="space-y-2.5">
                <span className="text-[10px] font-bold text-[#594045] uppercase tracking-wider block">
                  Instrucciones de Preparación Pasos:
                </span>
                <ol className="space-y-2.5 text-xs md:text-sm text-gray-700 pl-1">
                  {selectedRemedy.preparation.map((step, idx) => (
                    <li key={idx} className="flex gap-2.5 items-start">
                      <span className="w-5 h-5 bg-[#f4dce4] text-[#9b0044] rounded-full flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Scientific explanation callout */}
              <div className="p-4 bg-white rounded-2xl border border-gray-100 space-y-2">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#9b0044] shrink-0" />
                  <span className="text-[9px] font-bold text-[#9b0044] uppercase tracking-widest">
                    ¿Cuál es su respaldo e impacto biológico?
                  </span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed italic">
                  {selectedRemedy.scientificReason}
                </p>
              </div>

              {/* Scientific contraindications if applicable */}
              {selectedRemedy.contraindications && (
                <div className="p-3 bg-amber-50 rounded-2xl border border-amber-100 flex items-start gap-2 text-[10px] text-amber-800">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <p className="leading-normal">
                    <strong>Contraindicación importante:</strong> {selectedRemedy.contraindications}
                  </p>
                </div>
              )}

            </div>
          ) : (
            <div className="text-center py-16 text-gray-400 text-sm">
              Seleccione un remedio fitotéptico en el menú izquierdo para consultar detalles e instrucciones completas.
            </div>
          )}
        </div>

      </div>

      {/* CORE MONTHLY JUICE MODAL */}
      {showJugoModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#FCE4EC] animate-fade-in relative text-left">
            
            {/* Header decor */}
            <div className="bg-gradient-to-r from-[#9b0044] to-[#ba1a1a] p-6 text-white relative rounded-t-3xl">
              <button
                type="button"
                onClick={() => setShowJugoModal(false)}
                className="absolute top-4 right-4 text-white/80 hover:text-white bg-black/25 p-2 rounded-full transition-colors cursor-pointer"
                title="Cerrar receta"
              >
                <X className="w-5 h-5" />
              </button>
              <span className="text-[10px] font-black uppercase tracking-widest bg-white/20 px-2.5 py-1 rounded-full inline-block mb-2">
                🥤 Receta Obligatoria de Entrada
              </span>
              <h3 className="font-serif font-bold text-xl md:text-2xl leading-tight">
                El Jugo Mensual de Bienvenida
              </h3>
              <p className="text-xs text-red-100/90 leading-relaxed mt-1.5 max-w-xl font-sans">
                La bebida maestra de depuración y nutrición celular ginecológica indispensable para regular tu progesterona, desinflamar el útero y purificar el torrente linfático.
              </p>
            </div>

            {/* Modal Body */}
            <div className="p-6 md:p-8 space-y-6 font-sans">
              
              {/* Interactive tracker box */}
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50/50 p-4 rounded-2xl border border-emerald-100 flex items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <span className="text-[9px] font-bold text-emerald-800 uppercase tracking-widest block">Soberanía Activa</span>
                  <p className="text-xs text-slate-700 font-semibold text-left">¿Ya preparaste y tomaste tu Jugo Mensual hoy?</p>
                </div>
                <button
                  type="button"
                  onClick={handleToggleCoreJugo}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer select-none ${
                    isCoreJugoDrunk
                      ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                      : 'bg-white text-slate-700 border border-slate-200 hover:border-[#9b0044] hover:text-[#9b0044]'
                  }`}
                >
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>{isCoreJugoDrunk ? '¡Hecho hoy!' : 'Registrar Toma'}</span>
                </button>
              </div>

              {/* Exact Ingredients requested by user */}
              <div className="space-y-3">
                <div className="flex items-center gap-1.5 border-b border-gray-100 pb-1.5">
                  <Leaf className="w-4 h-4 text-[#9b0044]" />
                  <span className="text-xs font-bold text-[#594045] uppercase tracking-wider block">
                    Ingredientes del Jugo (1 Porción):
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                  {[
                    "1/2 vaso de jugo de betabel",
                    "1 trozo de apio (el tallo)",
                    "2 ramitas de perejil",
                    "5 uvas moradas",
                    "El jugo de 2 limones",
                    "1 trozo de piña",
                    "El jugo de 1 toronja",
                    "2 hojas de lechuga orejona",
                    "1 diente de ajo",
                    "1 trozo de sábila (solo la pulpa)"
                  ].map((ing, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-xs md:text-sm text-gray-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#9b0044]"></span>
                      <span>{ing}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step by Step Preparation instructions */}
              <div className="space-y-4">
                <span className="text-xs font-bold text-[#594045] uppercase tracking-wider block border-b border-gray-100 pb-1.5">
                  Instrucciones de Preparación Detalladas:
                </span>
                
                <ol className="space-y-3 text-xs md:text-sm text-gray-700 pl-1">
                  <li className="flex gap-3 items-start">
                    <span className="w-5 h-5 bg-[#f4dce4] text-[#9b0044] rounded-full flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">1</span>
                    <span className="leading-relaxed"><strong>Desinfección:</strong> Lave perfectamente todos los ingredientes frescos, en especial la lechuga, el perejil y el apio.</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <span className="w-5 h-5 bg-[#f4dce4] text-[#9b0044] rounded-full flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">2</span>
                    <span className="leading-relaxed"><strong>Extracción de Sábila:</strong> Con mucho cuidado extraiga el cristal transparente del trozo de sábila. Enjuáguelo muy bien bajo el chorro de agua fría abundante para retirar toda la aloína (el látex amarillento amargo).</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <span className="w-5 h-5 bg-[#f4dce4] text-[#9b0044] rounded-full flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">3</span>
                    <span className="leading-relaxed"><strong>Cítricos:</strong> Exprima al momento el jugo fresco de los dos limones y de la toronja en un vaso limpio.</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <span className="w-5 h-5 bg-[#f4dce4] text-[#9b0044] rounded-full flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">4</span>
                    <span className="leading-relaxed"><strong>Licuado:</strong> Vierta en la licuadora el 1/2 vaso de jugo de betabel, la pulpa limpia de la sábila, el diente de ajo pelado, el apio, el perejil, las hojas de lechuga orejona, las uvas, el trozo de piña y el jugo de cítricos.</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <span className="w-5 h-5 bg-[#f4dce4] text-[#9b0044] rounded-full flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">5</span>
                    <span className="leading-relaxed"><strong>Procesado completo:</strong> Licúe a máxima potencia durante aproximadamente 1 a 2 minutos hasta lograr un batido completamente terso, untuoso y sin grumos.</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <span className="w-5 h-5 bg-[#f4dce4] text-[#9b0044] rounded-full flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">6</span>
                    <span className="leading-relaxed"><strong>Consumo:</strong> Tómelo fresco de inmediato en ayunas para maximizar la asimilación celular de sus enzimas vivas y compuestos activos.</span>
                  </li>
                </ol>
              </div>

              {/* Biological Impact & Disclaimer */}
              <div className="p-4 bg-[#fbf9f8] rounded-2xl border border-gray-100 space-y-2">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#9b0044] shrink-0" />
                  <span className="text-[10px] font-bold text-[#9b0044] uppercase tracking-widest">
                    Justificación Biológica Ginecológica:
                  </span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed italic">
                  Este poderoso tónico ginecológico une potentes antioxidantes específicos y activadores del filtrado hepático. El betabel aporta óxido nítrico para mejorar la perfusión sanguínea pélvica; el ajo y la sábila purifican las barreras intestinales desactivando factores inflamatorios directos sobre el útero; la piña provee bromelina activa contra espasmos; y los cítricos blindan la inmunidad.
                </p>
              </div>

              {/* Warning */}
              <div className="p-3 bg-amber-50 rounded-2xl border border-amber-100 flex items-start gap-2.5 text-[10px] text-amber-800">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p className="leading-normal">
                  <strong>Precaución General:</strong> Evitar en caso de diarrea aguda o colitis irritable. No consumir si se toman fármacos anticoagulantes sin consultar antes a su profesional sanitario de confianza.
                </p>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="bg-gray-50 px-6 py-4 rounded-b-3xl flex justify-end border-t border-gray-100">
              <button
                type="button"
                onClick={() => setShowJugoModal(false)}
                className="bg-gray-950 hover:bg-gray-900 text-white text-xs font-bold px-6 py-2.5 rounded-xl transition-all cursor-pointer"
              >
                Entendido, Cerrar
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

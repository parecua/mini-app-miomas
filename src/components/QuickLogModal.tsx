import { FormEvent } from 'react';
import { BleedingLog } from '../types';
import { useSymptomForm } from '../hooks/useSymptomForm';

interface QuickLogModalProps {
  onAddLog: (log: BleedingLog) => void;
  onClose: () => void;
}

export default function QuickLogModal({ onAddLog, onClose }: QuickLogModalProps) {
  const {
    bleed,
    setBleed,
    clots,
    setClots,
    pain,
    setPain,
    emotion,
    setEmotion,
    notes,
    setNotes,
    handleSubmit
  } = useSymptomForm({
    initialBleed: 'Moderado',
    initialClots: 'No',
    initialPain: 5,
    initialEmotion: 'Calma',
    onAddLog,
    onSuccess: onClose
  });

  const onSubmit = (e: FormEvent) => {
    handleSubmit(e, 'Registro rápido diario.');
  };

  return (
    <div id="quick-log-modal-overlay" className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-59">
      <div id="quick-log-modal-card" className="bg-white rounded-3xl p-6 w-full max-w-lg shadow-2xl border border-[#f4dce4] animate-slide-up max-h-[90vh] overflow-y-auto">
        <h3 className="font-serif font-bold text-xl text-[#9b0044] mb-2">Registrar Síntomas Diarios</h3>
        <p className="text-xs text-gray-400 mb-5 font-sans">
          Proporcione los datos correspondientes a su nivel de dolor y flujo actual.
        </p>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3 font-sans">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">
                Nivel de Sangrado
              </label>
              <select 
                value={bleed}
                onChange={(e) => setBleed(e.target.value as any)}
                className="w-full text-xs px-3.5 py-3 rounded-xl border border-gray-100 bg-[#fbf9f8] focus:outline-none focus:ring-1 focus:ring-[#9b0044] focus:bg-white"
              >
                <option value="Moderado">Moderado</option>
                <option value="Abundante">Abundante</option>
                <option value="Muy Abundante">Muy Abundante</option>
                <option value="Crítico">Crítico</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">
                Coágulos
              </label>
              <select 
                value={clots}
                onChange={(e) => setClots(e.target.value as any)}
                className="w-full text-xs px-3.5 py-3 rounded-xl border border-gray-100 bg-[#fbf9f8] focus:outline-none focus:ring-1 focus:ring-[#9b0044] focus:bg-white"
              >
                <option value="No">No</option>
                <option value="Pequeños">Pequeños</option>
                <option value="Grandes">Grandes (&gt;3cm)</option>
              </select>
            </div>
          </div>

          <div className="font-sans">
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                Intensidad de dolor pélvico
              </label>
              <span className="text-xs font-bold text-[#ba1a1a]">{pain} / 10</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="10" 
              value={pain}
              onChange={(e) => setPain(parseInt(e.target.value))}
              className="w-full h-2 bg-[#f4dce4] rounded-lg cursor-pointer accent-[#9b0044]" 
            />
          </div>

          <div className="font-sans">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">
              Estado Emocional
            </label>
            <div className="flex flex-wrap gap-2 text-sans">
              {['Calma', 'Ansiedad', 'Miedo', 'Fatiga'].map((e) => (
                <button
                  key={e}
                  type="button"
                  onClick={() => setEmotion(e)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold border transition-colors ${
                    emotion === e 
                      ? 'bg-[#9b0044] text-white border-[#9b0044]' 
                      : 'bg-[#fbf9f8] text-gray-600 border-gray-100 hover:bg-[#f4dce4]/20'
                  }`}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>

          <div className="font-sans">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1 font-semibold">
              Notas u Observaciones
            </label>
            <textarea 
              rows={2}
              placeholder="Ej. Siento pesadez y dolor después de almorzar, reposo..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-4 py-3 text-xs rounded-xl border border-gray-100 bg-[#fbf9f8] focus:outline-none focus:bg-white focus:border-[#f4dce4]"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 font-sans">
            <button 
              type="button"
              onClick={onClose}
              className="px-5 py-3 rounded-full text-xs font-semibold text-gray-500 hover:bg-gray-50 cursor-pointer"
            >
              Cancelar
            </button>
            <button 
              type="submit"
              className="bg-[#9b0044] hover:bg-[#c2185b] text-white text-xs font-semibold px-6 py-3 rounded-full shadow-md shadow-[#9b0044]/10 cursor-pointer"
            >
              Guardar Registro
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

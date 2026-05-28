import { FormEvent, useState } from 'react';
import { BleedingLog } from '../types';
import { X } from 'lucide-react';
import { useSymptomForm } from '../hooks/useSymptomForm';

interface EmergencyLogModalProps {
  onAddLog: (log: BleedingLog) => void;
  onClose: () => void;
}

export default function EmergencyLogModal({ onAddLog, onClose }: EmergencyLogModalProps) {
  const [success, setSuccess] = useState(false);

  const handleSuccessTrigger = () => {
    setSuccess(true);
    setTimeout(() => {
      onClose();
    }, 2000);
  };

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
    initialBleed: 'Abundante',
    initialClots: 'Pequeños',
    initialPain: 7,
    initialEmotion: 'Ansiedad',
    onAddLog,
    onSuccess: handleSuccessTrigger
  });

  const onSubmit = (e: FormEvent) => {
    handleSubmit(e, 'Registro de crisis de sangrado abundante.');
  };

  return (
    <div id="emergency-log-modal-overlay" className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-59">
      <div id="emergency-log-modal-card" className="bg-white rounded-3xl p-6 w-full max-w-lg shadow-2xl border border-[#ffd9df] animate-slide-up max-h-[90vh] overflow-y-auto font-sans">
        
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-serif font-bold text-xl text-[#ba1a1a]">Registrar Episodio de Sangrado</h3>
          <button 
            type="button"
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg text-gray-400 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {success ? (
          <div className="py-8 text-center text-emerald-600 space-y-2 animate-fade-in">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-500 mx-auto flex items-center justify-center font-bold text-xl">
              ✓
            </div>
            <h4 className="font-bold text-sm">Registro Guardado</h4>
            <p className="text-xs text-gray-500 max-w-xs mx-auto">
              El episodio ha sido registrado en su historial de síntomas correctamente.
            </p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1">
                  Intensidad
                </label>
                <select 
                  value={bleed}
                  onChange={(e) => setBleed(e.target.value as any)}
                  className="w-full text-xs px-3.5 py-3 rounded-xl border border-gray-100 bg-[#fbf9f8] focus:outline-none focus:ring-1 focus:ring-[#ba1a1a]"
                >
                  <option value="Abundante">Abundante (empapa en &lt;2h)</option>
                  <option value="Muy Abundante">Muy Abundante (empapa en &lt;1h)</option>
                  <option value="Crítico">Crítico / Hemorragia Severa</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1">
                  Coágulos detectados
                </label>
                <select 
                  value={clots}
                  onChange={(e) => setClots(e.target.value as any)}
                  className="w-full text-xs px-3.5 py-3 rounded-xl border border-gray-100 bg-[#fbf9f8] focus:outline-none focus:ring-1 focus:ring-[#ba1a1a]"
                >
                  <option value="No">No</option>
                  <option value="Pequeños">Pequeños (&lt;1cm)</option>
                  <option value="Grandes">Grandes (&gt;3cm)</option>
                </select>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
                  Nivel de dolor pélvico actual
                </label>
                <span className="text-xs font-bold text-[#ba1a1a]">{pain} / 10</span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="10" 
                value={pain}
                onChange={(e) => setPain(parseInt(e.target.value))}
                className="w-full h-2 bg-[#ffd9df] rounded-lg cursor-pointer accent-[#ba1a1a]" 
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1.5">
                Estado de ánimo predominante
              </label>
              <div className="flex flex-wrap gap-2">
                {['Miedo', 'Ansiedad', 'Fatiga', 'Tranquila'].map((state) => (
                  <button
                    key={state}
                    type="button"
                    onClick={() => setEmotion(state)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold border transition-colors ${
                      emotion === state 
                        ? 'bg-[#ba1a1a] text-white border-[#ba1a1a]' 
                        : 'bg-[#fbf9f8] text-gray-65 border-gray-100 hover:bg-[#ffd9df]/60'
                    }`}
                  >
                    {state}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1">
                Observaciones sanitarias
              </label>
              <textarea 
                rows={2}
                placeholder="Escriba los detalles observados (ej. color del sangrado, contracciones uterinas intensas)..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-4 py-3 text-xs rounded-xl border border-gray-100 bg-[#fbf9f8] focus:outline-none focus:bg-white focus:border-[#ffd9df]"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
              <button 
                type="button"
                onClick={onClose}
                className="px-5 py-3 rounded-full text-xs font-semibold text-gray-400 hover:bg-gray-50 cursor-pointer"
              >
                Cerrar
              </button>
              <button 
                type="submit"
                className="bg-[#ba1a1a] hover:bg-[#93000a] text-white text-xs font-semibold px-6 py-3 rounded-full shadow-md cursor-pointer"
              >
                Guardar en el Historial
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

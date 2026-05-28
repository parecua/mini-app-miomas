import { useState, useEffect } from 'react';
import { Wind, Square, Play } from 'lucide-react';

export default function BreathingGuide() {
  const [breathingActive, setBreathingActive] = useState(false);
  const [breathPhase, setBreathPhase] = useState<'Inhala (4s)' | 'Retén (7s)' | 'Exhala (8s)' | 'Listo'>('Inhala (4s)');
  const [timeLeft, setTimeLeft] = useState(4);
  const [cycleCount, setCycleCount] = useState(0);

  useEffect(() => {
    let interval: any = null;
    if (breathingActive) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            // Trigger phase changes
            if (breathPhase === 'Inhala (4s)') {
              setBreathPhase('Retén (7s)');
              return 7;
            } else if (breathPhase === 'Retén (7s)') {
              setBreathPhase('Exhala (8s)');
              return 8;
            } else {
              setBreathPhase('Inhala (4s)');
              setCycleCount(c => c + 1);
              return 4;
            }
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [breathingActive, breathPhase]);

  const handleStartBreathing = () => {
    setBreathingActive(true);
    setBreathPhase('Inhala (4s)');
    setTimeLeft(4);
    setCycleCount(0);
  };

  const handleStopBreathing = () => {
    setBreathingActive(false);
    setBreathPhase('Inhala (4s)');
    setTimeLeft(4);
  };

  return (
    <div id="step-card-1" className="bg-white border border-[#FCE4EC] rounded-3xl p-6 soft-shadow flex flex-col justify-between font-sans">
      <div>
        <div className="flex justify-between items-start mb-4">
          <span className="w-8 h-8 bg-[#f4dce4] text-[#9b0044] rounded-full flex items-center justify-center font-bold text-xs">1</span>
          <Wind className="text-[#9b0044] w-7 h-7" />
        </div>
        <h3 className="font-serif font-bold text-lg md:text-xl text-[#1b1c1c] mb-2">Respiración 4-7-8</h3>
        <p className="text-xs md:text-sm text-gray-500 leading-relaxed mb-4">
          Inhala por 4 segundos, mantén el aire por 7 segundos, exhala lentamente por 8 segundos. Ayuda a calmar y reequilibrar el sistema nervioso central.
        </p>
      </div>

      {/* Core Interactive Breathing loop */}
      <div className="mt-4 p-4 rounded-2xl bg-[#fbf9f8] border border-gray-100 flex flex-col items-center">
        {breathingActive ? (
          <div className="flex flex-col items-center space-y-3.5 animate-pulse text-center w-full">
            <div className={`w-16 h-16 rounded-full bg-[#9b0044]/15 flex items-center justify-center transition-all duration-1000 ${
              breathPhase === 'Inhala (4s)' ? 'scale-125 bg-[#9b0044]/30' : 
              breathPhase === 'Retén (7s)' ? 'scale-110' : 'scale-95'
            }`}>
              <span className="text-[#9b0044] font-bold text-lg">{timeLeft}s</span>
            </div>
            <div>
              <p className="text-sm font-bold text-[#9b0044] uppercase">{breathPhase}</p>
              <p className="text-[10px] text-gray-400 mt-1">Ciclo actual: {cycleCount}</p>
            </div>
            <button 
              onClick={handleStopBreathing}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs font-semibold py-1.5 px-4 rounded-full flex items-center gap-1 cursor-pointer"
            >
              <Square className="w-3.5 h-3.5" />
              <span>Detener</span>
            </button>
          </div>
        ) : (
          <button 
            type="button"
            onClick={handleStartBreathing}
            className="w-full bg-[#f4dce4] hover:bg-[#9b0044] hover:text-white text-[#9b0044] transition-all text-xs font-bold py-3 px-5 rounded-full flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Iniciar Guía de Respiración</span>
          </button>
        )}
      </div>
    </div>
  );
}

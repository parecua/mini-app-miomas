import { BleedingLog } from '../types';

interface SymptomLogCardProps {
  key?: string;
  log: BleedingLog;
}

export default function SymptomLogCard({ log }: SymptomLogCardProps) {
  const isCritical = log.bleedingLevel === 'Crítico' || log.bleedingLevel === 'Muy Abundante';

  return (
    <div className="border border-[#FCE4EC] hover:border-[#9b0044] rounded-2xl p-4 md:p-5 transition-all bg-white hover:bg-[#fbf9f8]/50 flex flex-col md:flex-row justify-between gap-4 font-sans">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            {log.date} @ {log.time}
          </span>
          <span className={`text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
            isCritical
              ? 'bg-red-50 text-[#ba1a1a] border border-red-100'
              : 'bg-pink-50 text-[#9b0044] border border-pink-100'
          }`}>
            Sangrado: {log.bleedingLevel}
          </span>
        </div>
        
        <p className="text-sm font-medium text-[#1b1c1c] leading-relaxed">
          &ldquo;{log.notes}&rdquo;
        </p>

        <div className="flex flex-wrap gap-2 text-xs text-gray-500">
          <span>Coágulos: <strong>{log.clots}</strong></span>
          <span className="text-gray-300">|</span>
          <span>Dolor de vientre: <strong>{log.painLevel} / 10</strong></span>
          <span className="text-gray-300">|</span>
          <span>Estado: <strong>{log.emotionalState}</strong></span>
        </div>
      </div>
    </div>
  );
}

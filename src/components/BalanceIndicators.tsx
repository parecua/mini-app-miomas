import { HormonalMetrics } from '../types';

interface BalanceIndicatorsProps {
  metrics: HormonalMetrics;
}

interface IndicatorRowProps {
  label: string;
  value: number;
  statusText: string;
  barColorClass: string;
  textColorClass: string;
}

function IndicatorRow({ label, value, statusText, barColorClass, textColorClass }: IndicatorRowProps) {
  return (
    <div className="space-y-1.5 font-sans">
      <div className="flex justify-between text-xs md:text-sm">
        <span className="text-gray-700 font-medium">{label}</span>
        <span className={`${textColorClass} font-bold uppercase text-[11px] tracking-wider`}>
          {statusText}
        </span>
      </div>
      <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden relative">
        <div 
          style={{ width: `${value}%` }}
          className={`h-full ${barColorClass} rounded-full transition-all duration-500`}
        />
      </div>
    </div>
  );
}

export default function BalanceIndicators({ metrics }: BalanceIndicatorsProps) {
  return (
    <div className="bg-white border border-[#FCE4EC] rounded-3xl p-6 soft-shadow">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-serif font-bold text-lg md:text-xl text-[#9b0044]">
          Indicadores de Equilibrio
        </h3>
        <span className="text-[11px] text-gray-400 font-sans font-medium">
          Actualizado: Hoy 08:30 AM
        </span>
      </div>

      <div className="space-y-5">
        <IndicatorRow 
          label="Progesterona" 
          value={metrics.progesterona} 
          statusText="Moderada" 
          barColorClass="bg-[#6b5a60]/80" 
          textColorClass="text-[#6b5a60]" 
        />
        <IndicatorRow 
          label="Metabolismo Estrógenos" 
          value={metrics.estrogenos} 
          statusText="Observación" 
          barColorClass="bg-[#9b0044]" 
          textColorClass="text-[#9b0044]" 
        />
        <IndicatorRow 
          label="Insulina" 
          value={metrics.insulina} 
          statusText="Baja" 
          barColorClass="bg-emerald-500" 
          textColorClass="text-emerald-600" 
        />
        <IndicatorRow 
          label="Cortisol" 
          value={metrics.cortisol} 
          statusText="Alta" 
          barColorClass="bg-[#ba1a1a]" 
          textColorClass="text-[#ba1a1a]" 
        />
        <IndicatorRow 
          label="Inflamación" 
          value={metrics.inflamacion} 
          statusText="Observación" 
          barColorClass="bg-[#9b0044]/70" 
          textColorClass="text-[#9b0044]" 
        />
        <IndicatorRow 
          label="Digestión" 
          value={metrics.digestion} 
          statusText="Moderada" 
          barColorClass="bg-[#6b5a60]" 
          textColorClass="text-[#6b5a60]" 
        />
      </div>
    </div>
  );
}

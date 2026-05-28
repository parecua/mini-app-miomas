import { TrendingUp } from 'lucide-react';

export default function SymptomGraph() {
  return (
    <div className="mb-8 bg-[#fbf9f8] p-4 rounded-2xl border border-gray-100 font-sans">
      <h4 className="text-xs font-bold text-[#594045] uppercase tracking-wider mb-4 flex items-center gap-1">
        <TrendingUp className="w-4 h-4 text-[#9b0044]" />
        <span>Curva de Dolores & Tensión</span>
      </h4>
      
      {/* Visual SVG graph line */}
      <div className="relative h-28 w-full flex items-end">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 100" preserveAspectRatio="none">
          <path 
            d="M 50 80 Q 150 20, 250 50 T 450 15" 
            fill="none" 
            stroke="#9b0044" 
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path 
            d="M 50 80 Q 150 20, 250 50 T 450 15 L 450 100 L 50 100 Z" 
            fill="url(#gradient-shade-graph)" 
            opacity="0.12"
          />
          <defs>
            <linearGradient id="gradient-shade-graph" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#9b0044" />
              <stop offset="100%" stopColor="#ffffff" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Graph axes labels */}
        <div className="absolute left-0 bottom-0 text-[9px] text-gray-400">Moderado</div>
        <div className="absolute right-0 top-0 text-[9px] text-red-500 font-semibold">Alerta Máxima</div>
        <div className="absolute left-1/4 bottom-1 text-[9px] text-gray-400">Fase Lútea</div>
        <div className="absolute left-3/4 bottom-1 text-[9px] text-gray-400">Ovulación</div>
      </div>
    </div>
  );
}

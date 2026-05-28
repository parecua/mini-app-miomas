import { ReactNode } from 'react';

interface StatusIndicatorCardProps {
  title: string;
  status: string;
  description: string;
  icon: ReactNode;
  borderColorClass: string;
  textColorClass: string;
}

export default function StatusIndicatorCard({
  title,
  status,
  description,
  icon,
  borderColorClass,
  textColorClass
}: StatusIndicatorCardProps) {
  return (
    <div className={`bg-white ${borderColorClass} border-l-4 rounded-2xl p-5 soft-shadow font-sans`}>
      <div className={`flex items-center gap-2 ${textColorClass} mb-1.5`}>
        {icon}
        <span className="text-xs font-bold uppercase tracking-wider">{title}</span>
      </div>
      <h4 className="font-serif font-bold text-xl text-[#1b1c1c]">{status}</h4>
      <p className="text-xs text-gray-500 mt-1">
        {description}
      </p>
    </div>
  );
}

import { UserProfile } from '../types';
import { User, Clock, MapPin, PhoneCall } from 'lucide-react';

interface ProfileDetailsCardProps {
  profile: UserProfile;
}

export default function ProfileDetailsCard({ profile }: ProfileDetailsCardProps) {
  return (
    <div className="bg-white rounded-3xl p-6 border border-[#FCE4EC] soft-shadow max-w-2xl mx-auto font-sans">
      <h3 className="font-serif font-bold text-xl text-[#9b0044] mb-4">Información del Perfil de Salud</h3>
      
      <div className="space-y-4">
        <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-[#fbf9f8] border border-gray-100">
          <User className="text-[#9b0044] shrink-0 w-6 h-6" />
          <div>
            <span className="text-[10px] text-gray-400 block uppercase font-sans font-semibold">Nombre Completo</span>
            <span className="text-sm font-semibold text-[#1b1c1c]">{profile.nombreCompleto || 'Ana García'}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-[#fbf9f8] border border-gray-100">
            <Clock className="text-[#9b0044] shrink-0 w-6 h-6" />
            <div>
              <span className="text-[10px] text-gray-400 block uppercase font-sans font-semibold">Edad</span>
              <span className="text-sm font-semibold text-[#1b1c1c]">{profile.edad || '28'} años</span>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-[#fbf9f8] border border-gray-100">
            <MapPin className="text-[#9b0044] shrink-0 w-6 h-6" />
            <div>
              <span className="text-[10px] text-gray-400 block uppercase font-sans font-semibold">País</span>
              <span className="text-sm font-semibold text-[#1b1c1c]">{profile.pais || 'México'}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-[#fbf9f8] border border-gray-100">
          <PhoneCall className="text-[#9b0044] shrink-0 w-6 h-6" />
          <div>
            <span className="text-[10px] text-gray-400 block uppercase font-sans font-semibold">WhatsApp</span>
            <span className="text-sm font-semibold text-[#1b1c1c]">{profile.whatsapp || '+ 52 1...'}</span>
          </div>
        </div>

        {/* Conditions diagnosed block */}
        <div className="p-4 rounded-2xl border border-gray-100 bg-white space-y-3">
          <span className="text-[10px] text-gray-400 block uppercase font-sans font-semibold">Historial Clínico / SOP / Endometriosis</span>
          {profile.historialMedico && profile.historialMedico.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {profile.historialMedico.map((cond, i) => (
                <span key={i} className="bg-[#f4dce4] text-[#9b0044] text-xs font-semibold px-3 py-1 rounded-full">
                  {cond}
                </span>
              ))}
            </div>
          ) : (
            <span className="text-gray-500 text-xs text-sans">Sin diagnósticos hormonales reportados en el registro inicial.</span>
          )}
        </div>
      </div>
    </div>
  );
}

import { UserProfile } from '../types';
import { User, Clock, MapPin, PhoneCall, Brain, Moon, MessageSquare, Activity, Sparkles } from 'lucide-react';

interface ProfileDetailsCardProps {
  profile: UserProfile;
}

export default function ProfileDetailsCard({ profile }: ProfileDetailsCardProps) {
  const getSymptomLabelAndEmoji = (score: number) => {
    switch (score) {
      case 0: return { label: 'Ninguno', emoji: '😊' };
      case 1: return { label: 'Muy leve', emoji: '🙂' };
      case 2: return { label: 'Moderado', emoji: '😐' };
      case 3: return { label: 'Importante', emoji: '😟' };
      case 4: return { label: 'Muy grave', emoji: '😫' };
      default: return { label: 'Ninguno', emoji: '😊' };
    }
  };

  const hasSpecialEmotions = 
    (profile.emocionesPositivas && profile.emocionesPositivas.length > 0) ||
    (profile.emocionesNegativas && profile.emocionesNegativas.length > 0) ||
    profile.emocionesOtro;

  const hasSleepAfectadores = 
    (profile.suenoAfectadores && profile.suenoAfectadores.length > 0) || 
    profile.suenoAfectadoresOtro;

  return (
    <div id="profile-details-card" className="bg-white rounded-3xl p-6 border border-[#FCE4EC] soft-shadow max-w-2xl mx-auto font-sans space-y-6">
      <div>
        <h3 className="font-serif font-bold text-xl text-[#9b0044]">Información del Perfil de Salud</h3>
        <p className="text-gray-400 text-xs mt-0.5">Expediente ginecológico y clínico interactivo</p>
      </div>
      
      <div className="space-y-4">
        {/* Basic Details */}
        <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-[#fbf9f8] border border-gray-100">
          <User className="text-[#9b0044] shrink-0 w-6 h-6" />
          <div>
            <span className="text-[10px] text-gray-400 block uppercase font-sans font-semibold">Nombre Completo</span>
            <span className="text-sm font-semibold text-[#1b1c1c]">{profile.nombreCompleto || 'Paciente'}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-[#fbf9f8] border border-gray-100">
            <Clock className="text-[#9b0044] shrink-0 w-6 h-6" />
            <div>
              <span className="text-[10px] text-gray-400 block uppercase font-sans font-semibold">Edad</span>
              <span className="text-sm font-semibold text-[#1b1c1c]">{profile.edad || '30'} años</span>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-[#fbf9f8] border border-gray-100">
            <MapPin className="text-[#9b0044] shrink-0 w-6 h-6" />
            <div>
              <span className="text-[10px] text-gray-400 block uppercase font-sans font-semibold">País</span>
              <span className="text-sm font-semibold text-[#1b1c1c]">{profile.pais || 'No especificado'}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-[#fbf9f8] border border-gray-100">
          <PhoneCall className="text-[#9b0044] shrink-0 w-6 h-6" />
          <div>
            <span className="text-[10px] text-gray-400 block uppercase font-sans font-semibold">WhatsApp</span>
            <span className="text-sm font-semibold text-[#1b1c1c]">{profile.whatsapp || 'No especificado'}</span>
          </div>
        </div>

        {/* Conditions Diagnosed */}
        <div className="p-4 rounded-2xl border border-gray-100 bg-white space-y-2">
          <span className="text-[10px] text-gray-400 block uppercase font-sans font-semibold">Historial Clínico / Condiciones Diagnosticadas</span>
          {profile.historialMedico && profile.historialMedico.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {profile.historialMedico.map((cond, i) => (
                <span key={i} className="bg-[#f4dce4] text-[#9b0044] text-[11px] font-semibold px-3 py-1 rounded-full">
                  {cond}
                </span>
              ))}
            </div>
          ) : (
            <span className="text-gray-550 text-xs">Sin diagnósticos de ginecología reportados en el registro clínico.</span>
          )}
        </div>

        {/* Sleep disruption and quality */}
        <div className="p-4 rounded-2xl border border-gray-100 bg-white space-y-2">
          <div className="flex items-center gap-2">
            <Moon className="w-4 h-4 text-neutral-500 shrink-0" />
            <span className="text-[10px] text-gray-400 block uppercase font-sans font-semibold">Factores de Sueño y Descanso ({profile.suenoHoras || '7-8 horas'})</span>
          </div>
          {hasSleepAfectadores ? (
            <div className="space-y-1.5 pt-1">
              <span className="text-[11px] text-[#594045] font-medium block">Interrupciones de sueño reportadas:</span>
              <div className="flex flex-wrap gap-1.5">
                {(profile.suenoAfectadores || []).map((af, i) => (
                  <span key={i} className="bg-slate-50 text-slate-700 border border-slate-150/40 text-[10px] px-2.5 py-1 rounded-lg font-medium">
                    {af}
                  </span>
                ))}
                {profile.suenoAfectadoresOtro && (
                  <span className="bg-slate-50 text-slate-700 border border-slate-150/40 text-[10px] px-2.5 py-1 rounded-lg font-medium">
                    Otro: {profile.suenoAfectadoresOtro}
                  </span>
                )}
              </div>
            </div>
          ) : (
            <span className="text-gray-550 text-xs">No se reportaron factores que afecten su sueño.</span>
          )}
        </div>

        {/* Emotions registered */}
        <div className="p-4 rounded-2xl border border-gray-100 bg-white space-y-3">
          <div className="flex items-center gap-2">
            <Brain className="w-4 h-4 text-[#ba1a1a] shrink-0" />
            <span className="text-[10px] text-gray-400 block uppercase font-sans font-semibold">Equilibrio del Estado Emocional</span>
          </div>
          {hasSpecialEmotions ? (
            <div className="space-y-2.5">
              {profile.emocionesPositivas && profile.emocionesPositivas.length > 0 && (
                <div>
                  <span className="text-[9px] font-bold text-emerald-800 uppercase block mb-1">Emociones más frecuentes</span>
                  <div className="flex flex-wrap gap-1.5">
                    {profile.emocionesPositivas.map((emo, i) => (
                      <span key={i} className="bg-emerald-50 text-emerald-700 text-[10px] font-semibold px-2.5 py-0.5 rounded-full border border-emerald-100">
                        {emo}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {profile.emocionesNegativas && profile.emocionesNegativas.length > 0 && (
                <div>
                  <span className="text-[9px] font-bold text-rose-800 uppercase block mb-1">Desafíos emocionales reportados</span>
                  <div className="flex flex-wrap gap-1.5">
                    {profile.emocionesNegativas.map((emo, i) => (
                      <span key={i} className="bg-rose-50 text-rose-700 text-[10px] font-semibold px-2.5 py-0.5 rounded-full border border-rose-100">
                        {emo}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {profile.emocionesOtro && (
                <div className="text-[11px] text-gray-500 font-sans italic leading-relaxed bg-gray-50 p-2.5 rounded-xl border border-dashed border-gray-150">
                  Anotaciones adicionales: "{profile.emocionesOtro}"
                </div>
              )}
            </div>
          ) : (
            <span className="text-gray-550 text-xs">Sin registros emocionales reportados en el cuestionario inicial.</span>
          )}
        </div>

        {/* Habits (Tabaco + Alimentación) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl border border-gray-100 bg-white">
            <span className="text-[10px] text-gray-400 block uppercase font-sans font-semibold">Hábitos: Tabaco</span>
            <div className="flex items-center gap-2 mt-1.5">
              <Sparkles className="w-4 h-4 text-[#9b0044]" />
              <span className="text-xs font-bold text-[#594045]">{profile.fumaHabito || 'No'}</span>
            </div>
          </div>
          <div className="p-4 rounded-2xl border border-gray-100 bg-white">
            <span className="text-[10px] text-gray-400 block uppercase font-sans font-semibold">Hábitos: Lacteos y Azúcar</span>
            <div className="flex items-center gap-2 mt-1.5">
              <Activity className="w-4 h-4 text-[#9b0044]" />
              <span className="text-xs font-bold text-[#594045]">{profile.lacteosYAzucar || 'Diario'}</span>
            </div>
          </div>
        </div>

        {/* Social life dynamics */}
        <div className="p-4 rounded-2xl border border-gray-100 bg-white space-y-1.5">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-slate-500 shrink-0" />
            <span className="text-[10px] text-gray-400 block uppercase font-sans font-semibold">Vida Social, Pareja y Apoyo</span>
          </div>
          {profile.vidaSocialComentarios ? (
            <p className="text-xs text-gray-600 leading-relaxed italic bg-slate-50/50 p-3 rounded-xl border border-slate-100">
              "{profile.vidaSocialComentarios}"
            </p>
          ) : (
            <span className="text-gray-550 text-xs italic block pt-0.5 text-gray-400">Sin comentarios reportados.</span>
          )}
        </div>

        {/* Symptom Assessment map */}
        <div className="p-4 rounded-2xl border border-gray-100 bg-white space-y-3">
          <span className="text-[10px] text-gray-400 block uppercase font-sans font-semibold mb-1">Escala Clínica Inicial de Síntomas</span>
          {profile.valoracionSintomas ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {Object.entries(profile.valoracionSintomas).map(([key, val]) => {
                const spec = getSymptomLabelAndEmoji(val);
                const readableName = key
                  .replace('sintoma_sangrado_abundante', 'Sangrado abundante')
                  .replace('sintoma_periodos_prolongados', 'Períodos prolongados')
                  .replace('sintoma_coagulos_grandes', 'Coágulos grandes')
                  .replace('sintoma_dolor_pelvico', 'Dolor pélvico')
                  .replace('sintoma_inflamacion_abdominal', 'Inflamación abdominal')
                  .replace('sintoma_presion_uterina', 'Presión uterina')
                  .replace('sintoma_fatiga_cansancio', 'Fatiga menstrual')
                  .replace('sintoma_mareos_debilidad', 'Mareos / debilidad')
                  .replace('sintoma_falta_concentracion', 'Falta concentración')
                  .replace('sintoma_miccion_frecuente', 'Micción frecuente')
                  .replace('sintoma_estrenimiento', 'Estreñimiento')
                  .replace('sintoma_vaciado_incompleto', 'Vaciado incompleto');

                return (
                  <div key={key} className="flex justify-between items-center p-2 rounded-xl bg-slate-50/50 border border-gray-50">
                    <span className="text-[11px] font-medium text-slate-700 pr-2">{readableName}</span>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="text-sm" title={spec.label}>{spec.emoji}</span>
                      <span className="text-[10px] font-extrabold text-[#ba1a1a] bg-rose-50 border border-rose-100/40 rounded px-1.5 py-0.5">{val}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <span className="text-gray-550 text-xs">Sin registros de escala sintomática.</span>
          )}
        </div>
      </div>
    </div>
  );
}

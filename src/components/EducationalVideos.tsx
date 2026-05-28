import { useState, useRef, useEffect, MouseEvent } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, CheckCircle, Award, BookOpen, Clock, Heart } from 'lucide-react';

interface VideoLesson {
  id: string;
  title: string;
  duration: string;
  category: string;
  description: string;
  url: string;
  points: string[];
}

const VIDEO_LESSONS: VideoLesson[] = [
  {
    id: 'vid-1',
    title: 'Clase Magistral: Regulación de Estrógenos y Salud Hepática',
    duration: '12:45',
    category: 'Ginecología Natural',
    description: 'Aprende los mecanismos por los cuales el hígado filtra los estrógenos activos y cómo evitar la hiperestrogenemia mediante la alimentación cotidiana.',
    url: 'https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c054273b9e7c3ee9e2d08d3de6ca0038&profile_id=165&oauth2_token_id=57447761',
    points: [
      'Fases 1 y 2 de desintoxicación hepática de estrógenos de tipo metabólico.',
      'Suplementos clave: Diindolilmetano (DIM) y el papel de las verduras crucíferas (brócoli, berros, coles de Bruselas).',
      'Impacto nocivo de la recirculación intestinal de estrógenos a través de la enzima beta-glucoronidasa.'
    ]
  },
  {
    id: 'vid-2',
    title: 'Rutina Práctica: Movilización del Suelo Pélvico y Alivio Menstrual',
    duration: '08:32',
    category: 'Soberanía Corporal',
    description: 'Ejercicios de liberación miofascial y estiramientos suaves diseñados específicamente para abrir el espacio del útero y desinflamar la pelvis.',
    url: 'https://player.vimeo.com/external/434045526.sd.mp4?s=c13afc283fed2833e2b260027f31fcf549e3650a&profile_id=165&oauth2_token_id=57447761',
    points: [
      'Postura del niño (Balasana) con soporte para relajar los ligamentos uterinos.',
      'Movimientos pelvianos circulares para estimular la microcirculación arterial local.',
      'Estiramiento del psoas ilíaco para aliviar la tensión lumbar referida por dolores de matriz.'
    ]
  },
  {
    id: 'vid-3',
    title: 'Pranayama para el Alivio del Cólico y Reducción del Cortisol',
    duration: '06:15',
    category: 'Regulación Nerviosa',
    description: 'Sincronización respiratoria consciente para desactivar el sistema simpático y contrarrestar la isquemia uterina por vasoconstricción.',
    url: 'https://player.vimeo.com/external/459389137.sd.mp4?s=994b59e358eb23ce0f968df7262ba4a6f23f8cb2&profile_id=165&oauth2_token_id=57447761',
    points: [
      'Soplos lentos enfocados en modular la hormona liberadora de gonadotropina (GnRH).',
      'Disminución rápida de la adrenalina causante de espasmos endometriales.',
      'Práctica guiada en vivo de respiración de fuego mitigante de dolor.'
    ]
  }
];

export default function EducationalVideos() {
  const [currentVideo, setCurrentVideo] = useState<VideoLesson>(VIDEO_LESSONS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [completedVideos, setCompletedVideos] = useState<string[]>([]);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Load completed videos history from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('mi_salud_uterina_video_completed');
      if (stored) {
        setCompletedVideos(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Error recovering video progress', e);
    }
  }, []);

  const handlePlayPause = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(e => console.log('Interrupted player', e));
      setIsPlaying(true);
    }
  };

  const handleMuteToggle = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const duration = videoRef.current.duration;
    if (duration > 0) {
      const calculated = (current / duration) * 100;
      setProgress(calculated);
      
      // Auto complete video if 90% is watched
      if (calculated > 90 && !completedVideos.includes(currentVideo.id)) {
        const updated = [...completedVideos, currentVideo.id];
        setCompletedVideos(updated);
        try {
          localStorage.setItem('mi_salud_uterina_video_completed', JSON.stringify(updated));
        } catch (e) {
          console.error(e);
        }
      }
    }
  };

  const handleVideoSelect = (video: VideoLesson) => {
    setCurrentVideo(video);
    setIsPlaying(false);
    setProgress(0);
    if (videoRef.current) {
      videoRef.current.load();
    }
  };

  const handleReplay = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play().catch(e => console.log(e));
    setIsPlaying(true);
  };

  const handleProgressClick = (e: MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    videoRef.current.currentTime = percentage * videoRef.current.duration;
    setProgress(percentage * 100);
  };

  const isCurrentCompleted = completedVideos.includes(currentVideo.id);

  return (
    <div className="bg-white rounded-3xl border border-[#FCE4EC] p-6 soft-shadow font-sans space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 border-b border-gray-50 pb-4">
        <div>
          <span className="text-[10px] font-bold text-[#ba1a1a] uppercase tracking-widest block mb-1">
            Zona de Video Educación
          </span>
          <h3 className="font-serif font-bold text-xl md:text-2xl text-[#9b0044]">
            Aula Virtual de Salud Uterina
          </h3>
        </div>
        
        {/* Progress summary pill */}
        <div className="flex items-center gap-2 bg-[#f4dce4]/40 px-4 py-2 rounded-2xl border border-[#f4dce4]/60 text-xs text-[#9b0044] font-semibold">
          <Award className="w-4 h-4" />
          <span>Completados: {completedVideos.length} de {VIDEO_LESSONS.length}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Side: Video Player Screen & Stats */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* Custom HTML5 Video Player Frame */}
          <div className="relative rounded-2xl overflow-hidden bg-black aspect-video group shadow-lg border border-gray-100">
            <video
              ref={videoRef}
              src={currentVideo.url}
              onTimeUpdate={handleTimeUpdate}
              onEnded={() => setIsPlaying(false)}
              onClick={handlePlayPause}
              className="w-full h-full object-cover cursor-pointer"
              playsInline
            />

            {/* Simulated overlay play button when paused */}
            {!isPlaying && (
              <div 
                onClick={handlePlayPause}
                className="absolute inset-0 flex items-center justify-center bg-black/45 backdrop-blur-3xs cursor-pointer transition-opacity duration-300"
              >
                <div className="w-16 h-16 rounded-full bg-[#9b0044] text-white flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all duration-200">
                  <Play className="w-7 h-7 fill-white ml-1" />
                </div>
              </div>
            )}

            {/* Custom Control Bar at the Bottom */}
            <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col gap-2.5 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              
              {/* Progress Slider (clickable) */}
              <div 
                onClick={handleProgressClick}
                className="w-full h-1.5 bg-white/20 hover:h-2 rounded-full cursor-pointer relative transition-all"
              >
                <div 
                  style={{ width: `${progress}%` }}
                  className="h-full bg-[#9b0044] rounded-full absolute top-0 left-0"
                />
              </div>

              {/* Lower Control Actions */}
              <div className="flex items-center justify-between text-white text-xs">
                <div className="flex items-center gap-3">
                  <button 
                    type="button"
                    onClick={handlePlayPause}
                    className="p-1 hover:text-[#f4dce4] transition-colors"
                    title={isPlaying ? 'Pausar' : 'Reproducir'}
                  >
                    {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white" />}
                  </button>

                  <button 
                    type="button"
                    onClick={handleReplay}
                    className="p-1 hover:text-[#f4dce4] transition-colors"
                    title="Reiniciar"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>

                  <span className="text-[11px] font-mono text-gray-300">
                    {currentVideo.duration} mins
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button 
                    type="button"
                    onClick={handleMuteToggle}
                    className="p-1 hover:text-[#f4dce4] transition-colors"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>

                  {isCurrentCompleted && (
                    <span className="bg-emerald-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 uppercase tracking-wider">
                      <span>✓ Completada</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Lesson Metadata & Takeaway Points */}
          <div className="space-y-3.5 pt-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-[#f4dce4] text-[#9b0044] text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full">
                {currentVideo.category}
              </span>
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>Duración estimada: {currentVideo.duration} min</span>
              </span>
            </div>

            <h4 className="font-serif font-bold text-lg text-[#1b1c1c] leading-tight">
              {currentVideo.title}
            </h4>

            <p className="text-xs md:text-sm text-gray-500 leading-relaxed">
              {currentVideo.description}
            </p>

            {/* Learning points section */}
            <div className="bg-[#fbf9f8] p-4 rounded-2xl border border-gray-100 space-y-2.5">
              <h5 className="text-[11px] font-bold text-[#6b5a60] uppercase tracking-widest flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-[#9b0044]" />
                <span>Puntos Clave Clincas & Consejos</span>
              </h5>
              <ul className="space-y-2 text-xs md:text-sm text-gray-600">
                {currentVideo.points.map((point, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-[#9b0044] font-bold mt-0.5">•</span>
                    <span className="leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right Side: Quick selection menu */}
        <div className="lg:col-span-4 space-y-3">
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 px-1">
            Otras Lecciones en Video
          </h4>

          <div className="space-y-2.5">
            {VIDEO_LESSONS.map((video) => {
              const isSelected = video.id === currentVideo.id;
              const isCompleted = completedVideos.includes(video.id);

              return (
                <div
                  key={video.id}
                  onClick={() => handleVideoSelect(video)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 text-left ${
                    isSelected 
                      ? 'border-[#9b0044] bg-[#f4dce4]/15 ring-1 ring-[#f4dce4]' 
                      : 'border-gray-100 bg-white hover:bg-gray-50'
                  }`}
                >
                  <div className={`p-2.5 rounded-full shrink-0 ${
                    isSelected ? 'bg-[#9b0044] text-white' : 'bg-gray-100 text-[#6b5a60]'
                  }`}>
                    <Play className={`w-3.5 h-3.5 ${isSelected ? 'fill-current' : ''}`} />
                  </div>

                  <div className="space-y-1 w-full min-w-0">
                    <div className="flex justify-between items-start gap-1">
                      <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block truncate">
                        {video.category}
                      </span>
                      {isCompleted && (
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      )}
                    </div>
                    
                    <h5 className="font-serif font-bold text-xs text-[#1b1c1c] leading-tight line-clamp-2">
                      {video.title}
                    </h5>

                    <span className="text-[10px] text-gray-400 font-semibold font-mono block">
                      {video.duration} minutos
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Self care footer quote card */}
          <div className="bg-gradient-to-tr from-[#f4dce4]/20 to-transparent border border-dotted border-[#f4dce4] p-4 rounded-2xl text-center space-y-1">
            <Heart className="w-5 h-5 text-[#9b0044] mx-auto animate-pulse" />
            <p className="text-[11px] text-[#594045] font-serif italic leading-relaxed">
              &ldquo;Al educarte, retomas la dirección de tu ciclicidad.&rdquo;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

import { AlertTriangle } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
}

export default function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  const bgImage = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDv5lBFst0CZXOqnozSVF8NKMqQgLvTtKN9wl0JYuH3IlcGXBsPr6sCWb4aRjAtw7LOmxwgd4p15_aMzob2BXKFwRJrBDxPFpfuF7rU0zgv2KtpjmScf5D-zSwWPbdC671I1k0e4j5DFe_S6pilkAfwmm1g7qzQhz3gW1undtWCbASjuWgqY8Gv7sAciFEBiuePHdiU3UbcftZnqUC-9fH665sQ6supMGvrp_UasQBkijvYWzpvDFUgaicZiLsBAid2YVIBS1NRcw8';

  return (
    <div id="welcome-screen-container" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#fbf9f8] px-4 py-16">
      {/* Background with lily petal image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#fbf9f8] via-[#fbf9f8]/45 to-[#fbf9f8]"></div>
        <img 
          src={bgImage} 
          alt="Lirios relajantes de fondo" 
          className="w-full h-full object-cover opacity-25" 
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="relative z-10 w-full max-w-2xl text-center flex flex-col items-center select-none">
        {/* Label Tag */}
        <div id="welcome-tag" className="mb-4 animate-fade-in opacity-0">
          <span className="text-[#9b0044] font-semibold text-xs tracking-widest uppercase bg-[#f4dce4] px-4 py-1.5 rounded-full">
            Tu Compañero de Bienestar
          </span>
        </div>

        {/* Heading */}
        <h1 id="welcome-title" className="font-serif font-bold text-3xl md:text-5xl text-[#1b1c1c] max-w-xl mb-6 leading-tight animate-slide-up opacity-0">
          Bienvenida a su Panel de Salud Uterina
        </h1>

        {/* Central Description Card (Glassmorphism) */}
        <div id="welcome-glass-card" className="glass-morphism rounded-3xl p-6 md:p-8 soft-shadow mb-8 max-w-xl animate-slide-up opacity-0">
          <p className="font-sans text-base md:text-lg text-[#594045] leading-relaxed font-light">
            Este espacio fue creado para ayudarle a observar sus síntomas, conocer su cuerpo, identificar posibles detonantes hormonales y acompañarla durante un proceso natural de 90 días enfocado en equilibrio, bienestar y seguimiento.
          </p>
        </div>

        {/* Action Button */}
        <button 
          id="btn-start-evaluation"
          onClick={onStart}
          className="bg-[#c2185b] hover:bg-[#9b0044] text-white font-semibold text-sm tracking-wider px-10 py-4 rounded-full soft-shadow hover:opacity-95 active:scale-95 transition-all duration-200 shadow-lg shadow-[#9b0044]/20 animate-slide-up cursor-pointer"
        >
          Comenzar mi evaluación
        </button>

        {/* Medical Alert Warning */}
        <div id="medical-warning-box" className="mt-12 max-w-xl animate-fade-in opacity-0">
          <div className="flex items-start gap-3 p-4 bg-[#ffdad6]/40 border border-[#ba1a1a]/15 rounded-2xl text-left bg-white/40 backdrop-blur-xs">
            <AlertTriangle className="text-[#ba1a1a] shrink-0 w-5 h-5 mt-0.5" />
            <p className="font-sans text-xs text-[#594045] leading-relaxed">
              <strong className="text-[#ba1a1a] font-semibold">Aviso médico importante:</strong> Esta aplicación no sustituye la valoración médica profesional. Si presenta sangrado excesivo, desmayo, dolor intenso, fiebre o debilidad extrema, busque atención médica de emergencia inmediata.
            </p>
          </div>
        </div>
      </div>

      {/* Background Decorative Blurs */}
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#9b0044]/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#f4dce4]/40 rounded-full blur-3xl pointer-events-none"></div>
    </div>
  );
}

import { useState } from 'react';
import { Bell, Menu, X, ShieldAlert, BookOpen, Clock, Settings, LogOut, User } from 'lucide-react';

interface HeaderProps {
  currentScreen: string;
  onNavigate: (screen: 'WELCOME' | 'ONBOARDING' | 'DASHBOARD' | 'EMERGENCY') => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userName: string;
  onReset: () => void;
  user?: any;
  onLogout?: () => void;
}

export default function Header({
  currentScreen,
  onNavigate,
  activeTab,
  setActiveTab,
  userName,
  onReset,
  user,
  onLogout
}: HeaderProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 'n1',
      text: 'Alerta de Atención: Su cortisol reportado es elevado.',
      time: 'Hoy 08:30 AM',
      unread: true
    },
    {
      id: 'n2',
      text: 'Consejo diario: Evita lácteos y prefiere una infusión relajante.',
      time: 'Ayer',
      unread: false
    }
  ]);

  const avatarUrl = user?.photoURL || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=60';

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const hasUnread = notifications.some(n => n.unread);

  return (
    <>
      <header id="top-app-bar" className="fixed top-0 left-0 w-full z-40 bg-white/80 backdrop-blur-md shadow-[0px_4px_20px_rgba(194,24,91,0.04)] py-3 px-4 md:px-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          {currentScreen !== 'WELCOME' && (
            <button
              id="menu-btn"
              onClick={() => setDrawerOpen(true)}
              className="p-1.5 hover:bg-[#f4dce4] rounded-lg text-[#9b0044] transition-colors"
              aria-label="Abrir menú"
            >
              <Menu className="w-6 h-6" />
            </button>
          )}

          <div 
            onClick={() => onNavigate('DASHBOARD')}
            className="flex items-center gap-2 cursor-pointer"
          >
            <img 
              src={avatarUrl} 
              alt="Avatar" 
              className="w-10 h-10 rounded-full border-2 border-[#c2185b] object-cover" 
            />
            <span className="font-serif font-bold text-lg md:text-2xl text-[#9b0044] tracking-tight">
              Mi Salud Uterina
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 relative">
          <button 
            id="notif-btn"
            onClick={() => setNotifOpen(!notifOpen)}
            className="p-2 hover:bg-[#f4dce4]/40 rounded-full text-[#9b0044] transition-all relative active:scale-95 cursor-pointer"
            aria-label="Notificaciones"
          >
            <Bell className="w-6 h-6" />
            {hasUnread && (
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-[#ba1a1a] rounded-full ring-2 ring-white"></span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {notifOpen && (
            <div id="notif-dropdown" className="absolute right-0 top-12 w-80 bg-white rounded-xl shadow-xl border border-[#FCE4EC] py-3 z-50 animate-slide-up">
              <div className="flex justify-between items-center px-4 pb-2 border-b border-[#FCE4EC]">
                <span className="font-sans font-semibold text-xs text-[#594045] uppercase tracking-wider">Notificaciones</span>
                {hasUnread && (
                  <button 
                    onClick={markAllRead} 
                    className="text-[11px] text-[#9b0044] hover:underline"
                  >
                    Marcar leídas
                  </button>
                )}
              </div>
              <div className="max-h-60 overflow-y-auto pt-1">
                {notifications.map(n => (
                  <div 
                    key={n.id} 
                    className={`px-4 py-2.5 hover:bg-[#fbf9f8] transition-colors flex items-start gap-2 border-b border-[#fbf9f8] last:border-b-0 ${
                      n.unread ? 'bg-[#f4dce4]/20' : ''
                    }`}
                  >
                    <div className="w-1.5 h-1.5 bg-[#9b0044] rounded-full mt-1.5 shrink-0" />
                    <div>
                      <p className="text-xs text-[#1b1c1c] leading-relaxed">{n.text}</p>
                      <span className="text-[10px] text-gray-400 mt-1 block">{n.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Navigation Drawer */}
      <div 
        id="sidebar-overlay"
        className={`fixed inset-0 bg-black/40 backdrop-blur-xs z-50 transition-opacity duration-300 ${
          drawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setDrawerOpen(false)}
      >
        <aside 
          id="sidebar-container"
          className={`fixed inset-y-0 left-0 w-80 bg-white shadow-2xl p-6 flex flex-col justify-between transition-transform duration-300 transform ${
            drawerOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div>
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#9b0044] rounded-full flex items-center justify-center text-white font-serif font-bold text-lg">
                  U
                </div>
                <div>
                  <h3 className="font-serif font-bold text-[#9b0044] leading-tight">Mi Salud Uterina</h3>
                  <p className="text-xs text-[#594045]">Acompañante de Bienestar</p>
                </div>
              </div>
              <button 
                id="close-sidebar-btn"
                onClick={() => setDrawerOpen(false)}
                className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors"
                aria-label="Cerrar menú"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {(user?.displayName || userName) && (
              <div className="bg-[#f4dce4]/30 rounded-xl p-3.5 mb-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs text-[#594045] mb-0.5 font-medium font-sans">Paciente activa</p>
                    <p className="text-sm font-bold text-[#1b1c1c] font-sans">{user?.displayName || userName}</p>
                  </div>
                  <span className="text-[9px] bg-white text-[#9b0044] px-1.5 py-0.5 rounded-full border border-[#9b0044]/10 font-bold uppercase shrink-0 font-sans">
                    Tu Medicina
                  </span>
                </div>
                {user?.email && (
                  <p className="text-[10px] text-gray-500 truncate mt-1.5 font-mono">
                    {user.email.includes('phone_') 
                      ? `Tel: ${user.email.replace('phone_', '').replace('@tumedicina.com', '')}` 
                      : `Email: ${user.email}`}
                  </p>
                )}
                <div className="flex items-center gap-1.5 mt-2.5 text-[11px] text-[#9b0044] font-sans">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Ciclo de 90 Días: Día 12</span>
                </div>
              </div>
            )}

            <nav className="flex flex-col gap-1.5">
              <button
                id="drawer-nav-dashboard"
                onClick={() => {
                  onNavigate('DASHBOARD');
                  setActiveTab('inicio');
                  setDrawerOpen(false);
                }}
                className={`flex items-center gap-3.5 p-3 rounded-xl text-left font-medium text-sm transition-all ${
                  currentScreen === 'DASHBOARD' && activeTab === 'inicio'
                    ? 'bg-[#9b0044] text-white'
                    : 'text-gray-700 hover:bg-[#fbf9f8]'
                }`}
              >
                <User className="w-4.5 h-4.5" />
                <span>Indice & Control</span>
              </button>

              <button
                id="drawer-nav-progress"
                onClick={() => {
                  onNavigate('DASHBOARD');
                  setActiveTab('progreso');
                  setDrawerOpen(false);
                }}
                className={`flex items-center gap-3.5 p-3 rounded-xl text-left font-medium text-sm transition-all ${
                  currentScreen === 'DASHBOARD' && activeTab === 'progreso'
                    ? 'bg-[#9b0044] text-white'
                    : 'text-gray-700 hover:bg-[#fbf9f8]'
                }`}
              >
                <Clock className="w-4.5 h-4.5" />
                <span>Historial de Síntomas</span>
              </button>

              <button
                id="drawer-nav-modules"
                onClick={() => {
                  onNavigate('DASHBOARD');
                  setActiveTab('modulos');
                  setDrawerOpen(false);
                }}
                className={`flex items-center gap-3.5 p-3 rounded-xl text-left font-medium text-sm transition-all ${
                  currentScreen === 'DASHBOARD' && activeTab === 'modulos'
                    ? 'bg-[#9b0044] text-white'
                    : 'text-gray-700 hover:bg-[#fbf9f8]'
                }`}
              >
                <BookOpen className="w-4.5 h-4.5" />
                <span>Módulos de Lectura</span>
              </button>

              <button
                id="drawer-nav-emergency"
                onClick={() => {
                  onNavigate('EMERGENCY');
                  setDrawerOpen(false);
                }}
                className={`flex items-center gap-3.5 p-3 rounded-xl text-left font-medium text-sm transition-all text-[#ba1a1a] hover:bg-[#ba1a1a]/10 ${
                  currentScreen === 'EMERGENCY' ? 'bg-[#ba1a1a]/10 font-bold' : ''
                }`}
              >
                <ShieldAlert className="w-4.5 h-4.5" />
                <span>Protocolo de Emergencia</span>
              </button>
            </nav>
          </div>

          <div className="border-t border-gray-100 pt-4 space-y-2">
            {onLogout && (
              <button
                id="drawer-logout-btn"
                onClick={() => {
                  if (window.confirm('¿Desea cerrar su sesión segura de Firebase?')) {
                    onLogout();
                    setDrawerOpen(false);
                  }
                }}
                className="flex items-center gap-3 p-3 rounded-xl text-slate-700 hover:bg-slate-100 text-sm w-full transition-colors font-semibold cursor-pointer"
              >
                <LogOut className="w-4.5 h-4.5" />
                <span>Cerrar Sesión</span>
              </button>
            )}

            <button
              id="drawer-reset-btn"
              onClick={() => {
                if (window.confirm('¿Desea reiniciar su sesión y volver a realizar el registro inicial?')) {
                  onReset();
                  setDrawerOpen(false);
                }
              }}
              className="flex items-center gap-3 p-3 rounded-xl text-[#9b0044] text-sm hover:bg-[#f4dce4]/20 w-full transition-colors font-semibold cursor-pointer"
            >
              <Settings className="w-4.5 h-4.5" />
              <span>Reiniciar Evaluación</span>
            </button>
          </div>
        </aside>
      </div>
    </>
  );
}

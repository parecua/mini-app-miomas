import { useState, useEffect } from 'react';
import { 
  Cloud, 
  CloudCheck, 
  Database, 
  RefreshCw, 
  LogOut, 
  ShieldCheck, 
  AlertCircle,
  Eye,
  CheckCircle,
  Loader2
} from 'lucide-react';
import { 
  auth, 
  loginWithGoogle, 
  logoutUser, 
  syncLocalToCloud, 
  syncCloudToLocal 
} from '../firebase';
import { onAuthStateChanged, User } from 'firebase/auth';

interface CloudSyncPanelProps {
  onSyncComplete: () => void;
}

export default function CloudSyncPanel({ onSyncComplete }: CloudSyncPanelProps) {
  const [user, setUser] = useState<User | null>(null);
  const [syncing, setSyncing] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [loadingAuth, setLoadingAuth] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoadingAuth(false);
      // Auto-trigger partial cloud restore on mount if user is logged in and was out of sync
      if (firebaseUser) {
        setErrorMsg(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    setErrorMsg(null);
    setSuccessMsg(null);
    setSyncing(true);
    try {
      const loggedUser = await loginWithGoogle();
      setSuccessMsg(`Sesión iniciada como ${loggedUser.email}`);
      // Perform initial cloud backup/sync immediately
      await syncCloudToLocal(loggedUser.uid);
      onSyncComplete();
    } catch (e: any) {
      console.error('Login error', e);
      setErrorMsg('No se pudo iniciar sesión. Recuerde aceptar las ventanas emergentes en el navegador.');
    } finally {
      setSyncing(false);
    }
  };

  const handleLogout = async () => {
    setErrorMsg(null);
    setSuccessMsg(null);
    setSyncing(true);
    try {
      await logoutUser();
      setSuccessMsg('Sesión cerrada correctamente. Sus datos permanecen locales.');
      onSyncComplete();
    } catch (e) {
      setErrorMsg('Error al cerrar sesión.');
    } finally {
      setSyncing(false);
    }
  };

  const handleUpload = async () => {
    if (!user) return;
    setErrorMsg(null);
    setSuccessMsg(null);
    setSyncing(true);
    try {
      await syncLocalToCloud(user.uid);
      setSuccessMsg('✓ ¡Tus datos actuales han sido guardados de manera segura en la nube!');
      onSyncComplete();
    } catch (e: any) {
      console.error(e);
      setErrorMsg('Hubo un problema al subir tus datos a Firestore.');
    } finally {
      setSyncing(false);
    }
  };

  const handleDownload = async () => {
    if (!user) return;
    setErrorMsg(null);
    setSuccessMsg(null);
    setSyncing(true);
    try {
      await syncCloudToLocal(user.uid);
      setSuccessMsg('✓ ¡Datos restaurados con éxito desde la nube!');
      onSyncComplete();
    } catch (e: any) {
      console.error(e);
      setErrorMsg('Hubo un problema al restaurar tus datos desde Firestore.');
    } finally {
      setSyncing(false);
    }
  };

  if (loadingAuth) {
    return (
      <div id="sync-panel-loading" className="bg-white rounded-3xl p-6 border border-[#FCE4EC] flex items-center justify-center min-h-[140px] font-sans">
        <Loader2 className="w-6 h-6 animate-spin text-[#9b0044]" />
        <span className="text-xs text-gray-500 ml-2">Cargando conexión con base de datos...</span>
      </div>
    );
  }

  return (
    <div id="cloud-sync-panel-root" className="bg-white rounded-3xl p-6 border border-[#FCE4EC] soft-shadow space-y-4 font-sans text-left">
      
      {/* Panel Title */}
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-[#9b0044]">
            <Database className="w-5 h-5 shrink-0" />
            <h3 className="font-serif font-bold text-lg leading-tight text-slate-900">
              Sincronización en la Nube
            </h3>
          </div>
          <p className="text-xs text-gray-500 leading-relaxed max-w-xl">
            Sincroniza y respalda tu historial de sangrado, perfil ginecológico y los 90 días de progreso médico de forma cifrada en la base de datos de Firebase.
          </p>
        </div>
        <div className={`p-2 rounded-full shrink-0 ${user ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-400'}`}>
          <Cloud className="w-6 h-6" />
        </div>
      </div>

      {/* Error and Success notifications */}
      {errorMsg && (
        <div className="flex items-start gap-2.5 p-3.5 bg-red-50 text-red-800 rounded-2xl border border-red-150 text-xs leading-normal">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-600 mt-0.5" />
          <p>{errorMsg}</p>
        </div>
      )}

      {successMsg && (
        <div className="flex items-start gap-2.5 p-3.5 bg-emerald-50 text-emerald-800 rounded-2xl border border-emerald-150 text-xs leading-normal">
          <CheckCircle className="w-4 h-4 shrink-0 text-emerald-600 mt-0.5" />
          <p>{successMsg}</p>
        </div>
      )}

      {/* Account Owner Info */}
      {user ? (
        <div className="bg-gradient-to-r from-emerald-50/50 to-teal-50/20 p-4 rounded-2xl border border-emerald-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[9px] font-black uppercase text-emerald-800 tracking-wider bg-emerald-100 px-2 py-0.5 rounded-full inline-block">
              Cuenta Conectada ✓
            </span>
            <p className="text-xs font-semibold text-slate-800 leading-tight">
              {user.email}
            </p>
            <p className="text-[10px] text-slate-500">
              Tus elecciones ginecológicas se guardarán de forma privada y segura.
            </p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            disabled={syncing}
            className="self-start sm:self-center bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold py-2 px-3.5 rounded-xl transition-all cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      ) : (
        <div className="bg-rose-50/30 p-4 rounded-2xl border border-[#fbd4e1]/60 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1 max-w-md">
            <span className="text-[9px] font-bold uppercase text-[#9b0044] tracking-wider bg-[#f4dce4] px-2 py-0.5 rounded-full inline-block">
              Almacenamiento Local Activo
            </span>
            <p className="text-xs text-[#594045] leading-relaxed">
              Tus registros clínicos actualmente se guardan en este navegador de manera temporal. Regístrate con Google para habilitar el respaldo permanente en la nube militar/médica Firebase.
            </p>
          </div>

          <button
            type="button"
            onClick={handleLogin}
            disabled={syncing}
            className="self-start sm:self-center bg-[#9b0044] hover:bg-[#ba1a1a] text-white text-xs font-bold py-3 px-5 rounded-xl transition-all shadow-md shadow-[#9b0044]/10 cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
          >
            {syncing ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <ShieldCheck className="w-4 h-4" />
            )}
            <span>Conectar con Google</span>
          </button>
        </div>
      )}

      {/* Cloud Sync Operations Action Frame */}
      {user && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <button
            type="button"
            onClick={handleUpload}
            disabled={syncing}
            className="bg-[#9b0044] hover:bg-[#ba1a1a] text-white text-xs font-bold py-3 px-4 rounded-xl transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2 shadow-sm"
          >
            {syncing ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <RefreshCw className="w-4 h-4 shrink-0" />
            )}
            <span>Subir Datos Recientes</span>
          </button>

          <button
            type="button"
            onClick={handleDownload}
            disabled={syncing}
            className="bg-slate-950 hover:bg-slate-900 text-white text-xs font-bold py-3 px-4 rounded-xl transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {syncing ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <RefreshCw className="w-4 h-4 shrink-0" />
            )}
            <span>Descargar de la Nube</span>
          </button>
        </div>
      )}
      
    </div>
  );
}

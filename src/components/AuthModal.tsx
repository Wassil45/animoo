import React, { useState } from 'react';
import { X, Mail, Lock, User as UserIcon, Shield, Sparkles, LogIn, UserPlus } from 'lucide-react';
import { User } from '../types';
import { loginApi, registerApi } from '../services/api';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (user: User) => void;
  initialMode?: 'login' | 'register';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onAuthSuccess,
  initialMode = 'login',
}) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<'user' | 'admin'>('user');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (mode === 'login') {
        const res = await loginApi(email, password);
        onAuthSuccess(res.user);
        onClose();
      } else {
        const res = await registerApi(email, password, name, role);
        onAuthSuccess(res.user);
        onClose();
      }
    } catch (err: any) {
      setError(err?.message || 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  // Quick 1-click Demo Logins
  const handleDemoLogin = async (demoEmail: string, demoPass: string) => {
    setError(null);
    setLoading(true);
    try {
      const res = await loginApi(demoEmail, demoPass);
      onAuthSuccess(res.user);
      onClose();
    } catch (err: any) {
      setError(err?.message || 'Erreur connexion démo');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-200">
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-[#B70A3F] to-[#FF5E62] p-6 text-white relative">
          <button
            onClick={onClose}
            aria-label="Fermer"
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md flex items-center justify-center transition-all cursor-pointer"
          >
            <X className="w-4 h-4 text-white" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">🐾</span>
            <span className="font-extrabold tracking-tight text-xl">Animoo</span>
          </div>
          <h2 className="text-xl font-black">
            {mode === 'login' ? 'Connexion à votre espace' : 'Créer votre compte'}
          </h2>
          <p className="text-xs text-rose-100 mt-1">
            Rejoignez la communauté bienveillante des passionnés de chiens et chats
          </p>
        </div>

        <div className="p-6">
          {/* Tabs Switcher */}
          <div className="flex rounded-2xl bg-stone-100 p-1 mb-5">
            <button
              type="button"
              onClick={() => {
                setMode('login');
                setError(null);
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                mode === 'login'
                  ? 'bg-white text-stone-900 shadow-sm'
                  : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              Se connecter
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('register');
                setError(null);
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                mode === 'register'
                  ? 'bg-white text-stone-900 shadow-sm'
                  : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              S'inscrire
            </button>
          </div>

          {/* Quick Demo Access Buttons */}
          <div className="mb-5 p-3 rounded-2xl bg-rose-50/70 border border-rose-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-extrabold text-[#B70A3F] flex items-center gap-1 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                Accès Démo 1-Clic
              </span>
              <span className="text-[10px] text-rose-500 font-semibold">Test rapide</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleDemoLogin('admin@animoo.fr', 'admin123')}
                disabled={loading}
                className="py-2 px-2.5 rounded-xl bg-white hover:bg-stone-50 border border-rose-200 text-stone-800 text-[11px] font-bold shadow-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <Shield className="w-3.5 h-3.5 text-amber-600 fill-amber-100" />
                <span>👑 Admin</span>
              </button>

              <button
                type="button"
                onClick={() => handleDemoLogin('wassil@animoo.fr', 'user123')}
                disabled={loading}
                className="py-2 px-2.5 rounded-xl bg-white hover:bg-stone-50 border border-rose-200 text-stone-800 text-[11px] font-bold shadow-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <UserIcon className="w-3.5 h-3.5 text-rose-600" />
                <span>🐾 Utilisateur</span>
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {error && (
              <div className="p-3 rounded-xl bg-red-50 text-red-600 text-xs font-semibold border border-red-200">
                {error}
              </div>
            )}

            {mode === 'register' && (
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Nom complet / Duo
                </label>
                <div className="relative flex items-center">
                  <UserIcon className="w-4 h-4 text-stone-400 absolute left-3.5 pointer-events-none" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: Sophie & Pixel"
                    className="w-full pl-10 pr-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#B70A3F]/20 focus:border-[#B70A3F]"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Adresse Email</label>
              <div className="relative flex items-center">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 pointer-events-none" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre-email@exemple.com"
                  className="w-full pl-10 pr-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#B70A3F]/20 focus:border-[#B70A3F]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Mot de passe</label>
              <div className="relative flex items-center">
                <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 pointer-events-none" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#B70A3F]/20 focus:border-[#B70A3F]"
                />
              </div>
            </div>

            {mode === 'register' && (
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Rôle initial</label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setRole('user')}
                    className={`flex-1 py-2 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      role === 'user'
                        ? 'border-[#B70A3F] bg-rose-50 text-[#B70A3F]'
                        : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                    }`}
                  >
                    🐾 Utilisateur
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('admin')}
                    className={`flex-1 py-2 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      role === 'admin'
                        ? 'border-amber-500 bg-amber-50 text-amber-800'
                        : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                    }`}
                  >
                    🛡️ Administrateur
                  </button>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-[#B70A3F] to-[#FF5E62] text-white text-xs font-extrabold shadow-md hover:shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : mode === 'login' ? (
                <>
                  <LogIn className="w-4 h-4" />
                  <span>Se connecter</span>
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4" />
                  <span>Créer mon compte</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { X, Mail, Lock, User as UserIcon, LogIn, UserPlus } from 'lucide-react';
import { User } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (user: User) => void;
  onSignIn?: (email: string, password: string) => Promise<User>;
  onSignUp?: (email: string, password: string, name: string) => Promise<User>;
  initialMode?: 'login' | 'register';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onAuthSuccess,
  onSignIn,
  onSignUp,
  initialMode = 'login',
}) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (mode === 'login') {
        if (!onSignIn) {
          throw new Error('Service de connexion non disponible');
        }
        const user = await onSignIn(email.trim(), password);
        onAuthSuccess(user);
        onClose();
      } else {
        if (!name.trim()) {
          throw new Error('Veuillez renseigner votre nom complet ou duo');
        }
        if (!onSignUp) {
          throw new Error("Service d'inscription non disponible");
        }
        const user = await onSignUp(email.trim(), password, name.trim());
        onAuthSuccess(user);
        onClose();
      }
    } catch (err: any) {
      console.error('Erreur authentification:', err);
      let errorMsg = err?.message || 'Une erreur est survenue lors de la connexion';
      if (errorMsg.includes('Invalid login credentials')) {
        errorMsg = 'Adresse email ou mot de passe incorrect';
      } else if (errorMsg.includes('already registered')) {
        errorMsg = 'Un compte existe déjà avec cette adresse email';
      } else if (errorMsg.includes('Password should be at least')) {
        errorMsg = 'Le mot de passe doit comporter au moins 6 caractères';
      }
      setError(errorMsg);
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

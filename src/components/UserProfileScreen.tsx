import React, { useState } from 'react';
import { Pet, User } from '../types';
import { Camera, CheckCircle2, ShieldCheck, Heart, MapPin, Settings, LogOut, Plus, Sparkles, Shield } from 'lucide-react';
import { AnimooLogo } from './AnimooLogo';

interface UserProfileScreenProps {
  userPet: Pet;
  currentUser?: User | null;
  onUpdatePet: (updated: Pet) => void;
  onLogout: () => void;
  onOpenAdmin?: () => void;
  onOpenAuthModal?: () => void;
  isAvailableForPlaydates: boolean;
  onToggleAvailability: (available: boolean) => void;
}

export const UserProfileScreen: React.FC<UserProfileScreenProps> = ({
  userPet,
  currentUser,
  onUpdatePet,
  onLogout,
  onOpenAdmin,
  onOpenAuthModal,
  isAvailableForPlaydates,
  onToggleAvailability,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [petBio, setPetBio] = useState(userPet.bio);
  const [petName, setPetName] = useState(userPet.name);
  const [showToast, setShowToast] = useState(false);

  const handleSave = () => {
    onUpdatePet({
      ...userPet,
      name: petName,
      bio: petBio,
    });
    setIsEditing(false);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <div className="flex flex-col w-full pb-24 text-stone-900 select-none">
      {/* Top Banner & Header */}
      <div className="relative w-full h-44 bg-gradient-to-tr from-[#B70A3F] via-[#E11D48] to-rose-400 p-4 flex flex-col justify-between text-white">
        <div className="flex items-center justify-between">
          <AnimooLogo size="sm" variant="wordmark" className="text-white" />
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold hover:bg-white/30 transition-colors"
          >
            {isEditing ? 'Annuler' : 'Modifier'}
          </button>
        </div>

        {/* Floating availability indicator */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/30 backdrop-blur-md text-xs font-semibold">
            <span
              className={`w-2 h-2 rounded-full ${
                isAvailableForPlaydates ? 'bg-emerald-400 animate-pulse' : 'bg-stone-300'
              }`}
            />
            <span>{isAvailableForPlaydates ? 'En quête de playdates' : 'En pause'}</span>
          </div>
        </div>
      </div>

      {/* Profile Main Card */}
      <div className="px-4 -mt-12">
        <div className="bg-white rounded-3xl p-5 shadow-lg border border-stone-100 flex flex-col gap-4">
          {/* Avatar & Basic Identity */}
          <div className="flex items-start justify-between">
            <div className="relative -mt-12">
              <div className="w-24 h-24 rounded-3xl overflow-hidden ring-4 ring-white shadow-xl bg-stone-900">
                <img
                  src={userPet.photos[0]}
                  alt={userPet.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <button
                onClick={() => alert("Ajout de photo : vous pouvez importer d'autres photos de votre compagnon !")}
                className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-[#E11D48] text-white flex items-center justify-center shadow-md hover:bg-rose-700 transition-colors cursor-pointer"
              >
                <Camera className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-col items-end pt-1">
              <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">Compte Vérifié</span>
              <div className="flex items-center gap-1 text-emerald-600 font-bold text-xs mt-0.5">
                <ShieldCheck className="w-4 h-4" />
                <span>Passeport Canin Validé</span>
              </div>
            </div>
          </div>

          {/* Name & Breed */}
          {isEditing ? (
            <div className="flex flex-col gap-2">
              <div>
                <label className="text-[11px] font-bold text-stone-500">Nom du compagnon</label>
                <input
                  type="text"
                  value={petName}
                  onChange={(e) => setPetName(e.target.value)}
                  className="w-full text-base font-bold bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 mt-1"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-stone-500">Bio & Habitudes de jeu</label>
                <textarea
                  value={petBio}
                  onChange={(e) => setPetBio(e.target.value)}
                  rows={3}
                  className="w-full text-xs bg-stone-50 border border-stone-200 rounded-xl p-3 mt-1"
                />
              </div>
              <button
                onClick={handleSave}
                className="w-full py-2.5 rounded-xl bg-[#B70A3F] text-white font-bold text-xs shadow-md mt-1 cursor-pointer"
              >
                Sauvegarder les modifications
              </button>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black text-stone-900">
                  {userPet.name}, {userPet.age} ans
                </h1>
                <CheckCircle2 className="w-5 h-5 text-[#E11D48] fill-[#E11D48]" />
              </div>
              <p className="text-xs font-semibold text-rose-600 mt-0.5">
                {userPet.breed} • {userPet.locationName}
              </p>
              <p className="text-xs text-stone-600 leading-relaxed mt-2.5 bg-stone-50 p-3 rounded-2xl border border-stone-100">
                "{userPet.bio}"
              </p>
            </div>
          )}

          {/* Photos Reel */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                Galerie de photos ({userPet.photos.length})
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {userPet.photos.map((ph, idx) => (
                <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden shadow-sm bg-stone-100">
                  <img src={ph} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  {idx === 0 && (
                    <span className="absolute top-1.5 left-1.5 text-[9px] bg-black/60 backdrop-blur-sm text-white px-1.5 py-0.5 rounded-md font-bold">
                      Principale
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div>
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block mb-2">
              Traits de caractère
            </span>
            <div className="flex flex-wrap gap-1.5">
              {userPet.tags.map((t, i) => (
                <span key={i} className="px-3 py-1 rounded-full bg-rose-50 text-[#B70A3F] text-xs font-semibold">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Availability Toggle Box */}
          <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200/60 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-stone-800 block">
                Disponibilité playdates ce week-end
              </span>
              <span className="text-[11px] text-stone-500">
                Activez pour apparaître en tête des propositions
              </span>
            </div>
            <button
              onClick={() => onToggleAvailability(!isAvailableForPlaydates)}
              className={`w-11 h-6 rounded-full p-0.5 transition-colors relative flex items-center cursor-pointer ${
                isAvailableForPlaydates ? 'bg-[#B70A3F]' : 'bg-stone-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow transform transition-transform ${
                  isAvailableForPlaydates ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* If Admin: Quick Admin Gateway */}
          {currentUser?.role === 'admin' && onOpenAdmin && (
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-50 to-amber-100/70 border border-amber-300">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-amber-700 fill-amber-700" />
                  <span className="text-xs font-extrabold text-amber-900">Espace Administrateur</span>
                </div>
                <span className="text-[10px] bg-amber-500 text-white font-bold px-2 py-0.5 rounded-full">
                  Accès Total
                </span>
              </div>
              <p className="text-[11px] text-amber-800 mb-2.5">
                Vous avez les permissions pour gérer tous les animaux, modérer les utilisateurs et inspecter la base Neon Postgres.
              </p>
              <button
                onClick={onOpenAdmin}
                className="w-full py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Ouvrir le portail d'administration</span>
              </button>
            </div>
          )}

          {/* Owner details */}
          <div className="border-t border-stone-100 pt-3">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block mb-2">
              Compte utilisateur connecté
            </span>
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={currentUser?.avatar || userPet.ownerAvatar}
                  alt={currentUser?.name || userPet.ownerName}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-stone-200 shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div className="min-w-0">
                  <h3 className="text-xs font-bold text-stone-900 flex items-center gap-1.5 truncate">
                    <span>{currentUser?.name || userPet.ownerName}</span>
                    {currentUser?.role === 'admin' && (
                      <span className="text-[9px] bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded font-extrabold shrink-0">
                        ADMIN
                      </span>
                    )}
                  </h3>
                  <p className="text-[11px] text-stone-500 truncate">{currentUser?.email || 'wassil@animoo.fr'}</p>
                </div>
              </div>

              {onOpenAuthModal && (
                <button
                  onClick={onOpenAuthModal}
                  className="text-xs font-bold text-[#B70A3F] hover:underline cursor-pointer shrink-0"
                >
                  Changer
                </button>
              )}
            </div>
          </div>

          {/* Logout button */}
          <button
            onClick={onLogout}
            className="w-full py-3 rounded-2xl border border-rose-200 text-[#B70A3F] hover:bg-rose-50 font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer mt-2"
          >
            <LogOut className="w-4 h-4" />
            <span>Se déconnecter</span>
          </button>
        </div>
      </div>

      {showToast && (
        <div className="fixed bottom-20 inset-x-4 max-w-sm mx-auto z-50 p-3 bg-stone-900 text-white rounded-2xl text-center text-xs font-bold shadow-xl animate-fadeIn">
          ✓ Profil de {userPet.name} mis à jour avec succès !
        </div>
      )}
    </div>
  );
};

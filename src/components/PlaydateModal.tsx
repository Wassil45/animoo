import React, { useState } from 'react';
import { X, Calendar, MapPin, Sparkles, CheckCircle2 } from 'lucide-react';

interface PlaydateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPublishPlaydate: (plan: { park: string; date: string; time: string; theme: string }) => void;
}

export const PlaydateModal: React.FC<PlaydateModalProps> = ({
  isOpen,
  onClose,
  onPublishPlaydate,
}) => {
  const [park, setPark] = useState('Parc Montsouris');
  const [date, setDate] = useState('Samedi prochain');
  const [time, setTime] = useState('11h00');
  const [theme, setTheme] = useState('Session balle & jeux 🎾');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      onPublishPlaydate({ park, date, time, theme });
      setIsSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl border border-rose-100 flex flex-col gap-4 text-stone-900">
        <div className="flex items-center justify-between pb-2 border-b border-stone-100">
          <div className="flex items-center gap-1.5">
            <span className="text-xl">🐾</span>
            <h2 className="text-base font-extrabold">Proposer une Sortie Animoo</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-100 text-stone-500 hover:text-stone-900 flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {isSuccess ? (
          <div className="py-8 flex flex-col items-center justify-center text-center gap-2">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-1">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-base font-extrabold text-stone-900">Sortie Publiée !</h3>
            <p className="text-xs text-stone-500 max-w-[220px]">
              Les maîtres des environs ont été notifiés de votre playdate à {park} !
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div>
              <label className="text-xs font-bold text-stone-600 block mb-1">Lieu / Parc</label>
              <select
                value={park}
                onChange={(e) => setPark(e.target.value)}
                className="w-full text-xs bg-stone-50 border border-stone-200 rounded-xl p-2.5 font-medium outline-none focus:ring-2 focus:ring-rose-400"
              >
                <option value="Parc Montsouris (Paris 14e)">Parc Montsouris (Paris 14e)</option>
                <option value="Parc Monceau (Paris 8e)">Parc Monceau (Paris 8e)</option>
                <option value="Bois de Boulogne (Paris 16e)">Bois de Boulogne (Paris 16e)</option>
                <option value="Buttes-Chaumont (Paris 19e)">Buttes-Chaumont (Paris 19e)</option>
                <option value="Bois de Vincennes (Paris 12e)">Bois de Vincennes (Paris 12e)</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs font-bold text-stone-600 block mb-1">Quand</label>
                <select
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full text-xs bg-stone-50 border border-stone-200 rounded-xl p-2.5 font-medium"
                >
                  <option value="Aujourd'hui">Aujourd'hui</option>
                  <option value="Ce samedi">Ce samedi</option>
                  <option value="Ce dimanche">Ce dimanche</option>
                  <option value="Mercredi prochain">Mercredi prochain</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-stone-600 block mb-1">Heure</label>
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full text-xs bg-stone-50 border border-stone-200 rounded-xl p-2.5 font-medium"
                >
                  <option value="09h30">09h30</option>
                  <option value="11h00">11h00</option>
                  <option value="15h00">15h00</option>
                  <option value="17h30">17h30</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-stone-600 block mb-1">Activité prévue</label>
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="w-full text-xs bg-stone-50 border border-stone-200 rounded-xl p-2.5 font-medium"
              >
                <option value="Session balle & jeux 🎾">Session balle & jeux 🎾</option>
                <option value="Grande balade en forêt 🌲">Grande balade en forêt 🌲</option>
                <option value="Socialisation chiots & débutants 🐾">Socialisation chiots & débutants 🐾</option>
                <option value="Rencontre calme & sieste à l'ombre 🧺">Rencontre calme & sieste à l'ombre 🧺</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full h-12 rounded-full bg-gradient-to-r from-[#B70A3F] to-[#FF5E62] text-white font-bold text-xs shadow-md mt-2 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>Publier la Sortie Playdate</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

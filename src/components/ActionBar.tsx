import React from 'react';
import { RotateCcw, X, Star, Zap } from 'lucide-react';

interface ActionBarProps {
  onUndo: () => void;
  onDislike: () => void;
  onSuperlike: () => void;
  onLike: () => void;
  onBoost: () => void;
  canUndo?: boolean;
}

export const ActionBar: React.FC<ActionBarProps> = ({
  onUndo,
  onDislike,
  onSuperlike,
  onLike,
  onBoost,
  canUndo = true,
}) => {
  return (
    <div className="w-full pt-3 pb-2 flex items-center justify-center gap-3.5 select-none">
      {/* 1. Undo / Replay */}
      <button
        onClick={onUndo}
        disabled={!canUndo}
        aria-label="Annuler le dernier swipe"
        className={`w-11 h-11 rounded-full bg-white flex items-center justify-center shadow-[0_4px_14px_rgba(0,0,0,0.08)] active:scale-90 transition-all border border-stone-100 ${
          canUndo ? 'text-amber-500 hover:bg-amber-50 cursor-pointer' : 'text-stone-300 opacity-60 cursor-not-allowed'
        }`}
      >
        <RotateCcw className="w-5 h-5 stroke-[2.2]" />
      </button>

      {/* 2. Dislike (Nope X) */}
      <button
        onClick={onDislike}
        aria-label="Passer ce profil"
        className="w-14 h-14 rounded-full bg-white text-rose-500 hover:bg-rose-50 flex items-center justify-center shadow-[0_6px_20px_rgba(225,29,72,0.15)] active:scale-90 transition-all border border-rose-100 cursor-pointer"
      >
        <X className="w-7 h-7 stroke-[2.5]" />
      </button>

      {/* 3. Super-Paw (Star) */}
      <button
        onClick={onSuperlike}
        aria-label="Coup de cœur Super-Paw"
        className="w-12 h-12 rounded-full bg-white text-purple-600 hover:bg-purple-50 flex items-center justify-center shadow-[0_6px_18px_rgba(120,69,154,0.15)] active:scale-90 transition-all border border-purple-100 cursor-pointer"
      >
        <Star className="w-6 h-6 fill-purple-600 stroke-purple-600" />
      </button>

      {/* 4. Main Animoo Like (Heart & Paw signature) */}
      <button
        onClick={onLike}
        aria-label="Aimer et faire une demande de jeu"
        className="w-[66px] h-[66px] rounded-full bg-gradient-to-tr from-[#B70A3F] via-[#E11D48] to-[#FF5E62] text-white flex items-center justify-center shadow-[0_10px_26px_rgba(183,10,63,0.38)] active:scale-90 transition-all relative group cursor-pointer"
      >
        <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-15 transition-opacity" />
        {/* Custom Pet Paw */}
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-8 h-8 drop-shadow-sm"
        >
          <path d="M12 11.5C9.5 11.5 8 13.5 8 16C8 18 9.5 20 12 20C14.5 20 16 18 16 16C16 13.5 14.5 11.5 12 11.5Z" />
          <circle cx="7" cy="8.5" r="2.2" />
          <circle cx="17" cy="8.5" r="2.2" />
          <circle cx="10" cy="5" r="1.8" />
          <circle cx="14" cy="5" r="1.8" />
        </svg>
      </button>

      {/* 5. Boost (Lightning) */}
      <button
        onClick={onBoost}
        aria-label="Booster la visibilité dans le quartier"
        className="w-11 h-11 rounded-full bg-white text-indigo-500 hover:bg-indigo-50 flex items-center justify-center shadow-[0_4px_14px_rgba(99,102,241,0.15)] active:scale-90 transition-all border border-indigo-100 cursor-pointer"
      >
        <Zap className="w-5 h-5 fill-indigo-500 stroke-indigo-500" />
      </button>
    </div>
  );
};

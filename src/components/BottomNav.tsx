import React from 'react';
import { Flame, Heart, MessageCircle, User } from 'lucide-react';

export type TabId = 'discover' | 'matches' | 'chats' | 'profile';

interface BottomNavProps {
  currentTab: TabId;
  onTabChange: (tab: TabId) => void;
  matchesCount?: number;
  unreadChatsCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onTabChange,
  matchesCount = 3,
  unreadChatsCount = 1,
}) => {
  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-xl border-t border-stone-200/80 shadow-[0_-4px_20px_rgba(0,0,0,0.04)] pb-safe">
      <div className="max-w-lg md:max-w-xl mx-auto h-16 px-6 flex items-center justify-around">
        {/* Discover */}
        <button
          onClick={() => onTabChange('discover')}
          className={`flex flex-col items-center justify-center gap-1 min-w-[54px] min-h-[44px] transition-all active:scale-95 ${
            currentTab === 'discover' ? 'text-[#E11D48] font-bold' : 'text-stone-400 hover:text-stone-600'
          }`}
        >
          <Flame className={`w-6 h-6 ${currentTab === 'discover' ? 'fill-current' : ''}`} />
          <span className="text-[11px] tracking-tight">Discover</span>
        </button>

        {/* Matches */}
        <button
          onClick={() => onTabChange('matches')}
          className={`relative flex flex-col items-center justify-center gap-1 min-w-[54px] min-h-[44px] transition-all active:scale-95 ${
            currentTab === 'matches' ? 'text-[#E11D48] font-bold' : 'text-stone-400 hover:text-stone-600'
          }`}
        >
          <div className="relative">
            <Heart className={`w-6 h-6 ${currentTab === 'matches' ? 'fill-current' : ''}`} />
            {matchesCount > 0 && (
              <span className="absolute -top-1 -right-2 min-w-4 h-4 px-1 bg-[#E11D48] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm">
                {matchesCount}
              </span>
            )}
          </div>
          <span className="text-[11px] tracking-tight">Matches</span>
        </button>

        {/* Chats */}
        <button
          onClick={() => onTabChange('chats')}
          className={`relative flex flex-col items-center justify-center gap-1 min-w-[54px] min-h-[44px] transition-all active:scale-95 ${
            currentTab === 'chats' ? 'text-[#E11D48] font-bold' : 'text-stone-400 hover:text-stone-600'
          }`}
        >
          <div className="relative">
            <MessageCircle className={`w-6 h-6 ${currentTab === 'chats' ? 'fill-current' : ''}`} />
            {unreadChatsCount > 0 && (
              <span className="absolute -top-0.5 -right-1 w-2.5 h-2.5 bg-[#FF5E62] border-2 border-white rounded-full" />
            )}
          </div>
          <span className="text-[11px] tracking-tight">Chats</span>
        </button>

        {/* Profile */}
        <button
          onClick={() => onTabChange('profile')}
          className={`flex flex-col items-center justify-center gap-1 min-w-[54px] min-h-[44px] transition-all active:scale-95 ${
            currentTab === 'profile' ? 'text-[#E11D48] font-bold' : 'text-stone-400 hover:text-stone-600'
          }`}
        >
          <User className={`w-6 h-6 ${currentTab === 'profile' ? 'stroke-[2.5]' : ''}`} />
          <span className="text-[11px] tracking-tight">Profile</span>
        </button>
      </div>
    </nav>
  );
};

import React, { useState } from 'react';
import { Conversation, Pet } from '../types';
import { Search, SlidersHorizontal, Plus, Flame, CheckCheck, ChevronRight, CheckCircle2, ShieldCheck, ArrowRight, Heart, MessageCircle } from 'lucide-react';
import { FavoritesList } from './FavoritesList';

interface MatchesScreenProps {
  conversations: Conversation[];
  newMatchPets: Pet[];
  userPet: Pet;
  favorites: Pet[];
  onOpenConversation: (conversationId: string) => void;
  onOpenNewMatch: (pet: Pet) => void;
  onCreatePlaydate: () => void;
  onEditProfile: () => void;
  onToggleAvailability: (available: boolean) => void;
  isAvailableForPlaydates: boolean;
  onRemoveFavorite: (petId: string) => void;
  onOpenDetails: (pet: Pet) => void;
  onStartChatWithPet: (pet: Pet) => void;
  onGoToDiscover: () => void;
  activeSubTab?: 'conversations' | 'favorites';
  onSubTabChange?: (tab: 'conversations' | 'favorites') => void;
}

export const MatchesScreen: React.FC<MatchesScreenProps> = ({
  conversations,
  newMatchPets,
  userPet,
  favorites,
  onOpenConversation,
  onOpenNewMatch,
  onCreatePlaydate,
  onEditProfile,
  onToggleAvailability,
  isAvailableForPlaydates,
  onRemoveFavorite,
  onOpenDetails,
  onStartChatWithPet,
  onGoToDiscover,
  activeSubTab = 'conversations',
  onSubTabChange,
}) => {
  const [internalSubTab, setInternalSubTab] = useState<'conversations' | 'favorites'>(activeSubTab);
  const [searchQuery, setSearchQuery] = useState('');

  const currentSubTab = onSubTabChange ? activeSubTab : internalSubTab;
  const setSubTab = (tab: 'conversations' | 'favorites') => {
    if (onSubTabChange) {
      onSubTabChange(tab);
    } else {
      setInternalSubTab(tab);
    }
  };

  const filteredConversations = conversations.filter(
    (c) =>
      c.pet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.ownerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col w-full pb-24 text-stone-900 select-none">
      {/* Segmented Top Bar: Discussions vs Favoris */}
      <div className="px-4 pt-3 pb-1">
        <div className="flex items-center p-1 bg-stone-100 rounded-2xl shadow-inner">
          <button
            onClick={() => setSubTab('conversations')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              currentSubTab === 'conversations'
                ? 'bg-white text-[#B70A3F] shadow-sm'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Discussions & Matchs</span>
          </button>

          <button
            onClick={() => setSubTab('favorites')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              currentSubTab === 'favorites'
                ? 'bg-white text-[#B70A3F] shadow-sm'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${favorites.length > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
            <span>Mes Favoris</span>
            {favorites.length > 0 && (
              <span className="min-w-4 h-4 px-1 rounded-full bg-rose-100 text-[#B70A3F] text-[10px] font-extrabold flex items-center justify-center">
                {favorites.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* VIEW A: DEDICATED FAVORITES LIST */}
      {currentSubTab === 'favorites' ? (
        <FavoritesList
          favorites={favorites}
          onRemoveFavorite={onRemoveFavorite}
          onOpenDetails={onOpenDetails}
          onStartChat={onStartChatWithPet}
          onGoToDiscover={onGoToDiscover}
        />
      ) : (
        /* VIEW B: CONVERSATIONS & MATCHES */
        <>
          {/* Search & Filter Bar */}
          <div className="px-4 pt-3 pb-2 flex items-center gap-2.5">
            <div className="flex-1 flex items-center h-12 bg-stone-100 rounded-full px-4 gap-2.5 shadow-inner">
              <Search className="w-5 h-5 text-stone-400 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher un compagnon ou humain..."
                className="bg-transparent border-none outline-none w-full text-xs text-stone-800 placeholder:text-stone-400 font-medium"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="text-stone-400 text-xs">
                  ✕
                </button>
              )}
            </div>
            <button
              onClick={onCreatePlaydate}
              aria-label="Proposer une sortie"
              className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-stone-600 hover:text-rose-600 transition-all shadow-sm border border-stone-200/80 active:scale-95 cursor-pointer"
            >
              <SlidersHorizontal className="w-5 h-5" />
            </button>
          </div>

          {/* Section: Nouveaux Matchs & Stories Tray */}
          <div className="flex flex-col pt-2 pb-4">
            <div className="px-4 flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-1.5">
                <h2 className="text-lg font-bold text-stone-900">Nouveaux Matchs</h2>
                <span className="w-2 h-2 rounded-full bg-[#E11D48]" />
              </div>
              <button
                onClick={() => onOpenNewMatch(newMatchPets[0])}
                className="text-xs font-bold text-[#B70A3F] hover:underline cursor-pointer"
              >
                Tout voir ({newMatchPets.length})
              </button>
            </div>

            {/* Stories Horizontal Tray */}
            <div className="flex items-center gap-3.5 overflow-x-auto px-4 no-scrollbar py-1">
              {/* Add Story / Proposer une sortie */}
              <div
                onClick={onCreatePlaydate}
                className="flex flex-col items-center gap-1.5 flex-shrink-0 cursor-pointer group"
              >
                <div className="relative w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center transition-transform group-active:scale-95 shadow-sm border-2 border-dashed border-rose-300">
                  <div className="w-13 h-13 rounded-full bg-white flex items-center justify-center">
                    <Plus className="w-6 h-6 text-[#E11D48]" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-[#E11D48] text-white flex items-center justify-center shadow">
                    <Flame className="w-3 h-3 fill-current" />
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-stone-600">Sortie</span>
              </div>

              {/* Matches List */}
              {newMatchPets.map((pet, idx) => (
                <div
                  key={pet.id}
                  onClick={() => onOpenNewMatch(pet)}
                  className="flex flex-col items-center gap-1.5 flex-shrink-0 cursor-pointer group"
                >
                  <div className="relative w-16 h-16 rounded-full p-[2.5px] bg-gradient-to-tr from-[#B70A3F] via-[#FF5E62] to-amber-300 shadow-sm transition-transform group-active:scale-95">
                    <div className="w-full h-full rounded-full overflow-hidden bg-white">
                      <img
                        src={pet.photos[0]}
                        alt={pet.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    {idx === 0 && (
                      <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#E11D48] border-2 border-white flex items-center justify-center text-[9px] text-white font-bold">
                        ♥
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] font-bold text-stone-800">{pet.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Conversations */}
          <div className="flex flex-col px-4 pt-1">
            <div className="flex items-center justify-between mb-2.5">
              <h2 className="text-lg font-bold text-stone-900">Conversations</h2>
              <div className="flex items-center gap-1.5 px-3 py-1 bg-rose-50 text-[#B70A3F] rounded-full">
                <span className="text-xs">🐾</span>
                <span className="text-[11px] font-bold">Playdates actifs</span>
              </div>
            </div>

            {/* Chat List Items */}
            <div className="flex flex-col gap-2.5">
              {filteredConversations.map((conv) => (
                <div
                  key={conv.id}
                  onClick={() => onOpenConversation(conv.id)}
                  className="relative flex items-center gap-3.5 p-3.5 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all active:scale-[0.99] border border-stone-100 cursor-pointer group"
                >
                  {/* Pet Avatar + Duo Human Avatar */}
                  <div className="relative flex-shrink-0 w-14 h-14">
                    <div className="w-14 h-14 rounded-full overflow-hidden bg-stone-100 ring-2 ring-stone-100 shadow-inner">
                      <img
                        src={conv.pet.photos[0]}
                        alt={conv.pet.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full overflow-hidden bg-white p-0.5 shadow">
                      <img
                        src={conv.ownerAvatar}
                        alt={conv.ownerName}
                        className="w-full h-full rounded-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>

                  {/* Chat details */}
                  <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <div className="flex items-center justify-between mb-0.5">
                      <div className="flex items-center gap-1.5 truncate">
                        <span className="text-sm font-bold text-stone-900 truncate">
                          {conv.pet.name} & {conv.ownerName}
                        </span>
                        {conv.unreadCount > 0 && (
                          <span className="w-2 h-2 rounded-full bg-[#E11D48]" />
                        )}
                      </div>
                      <span
                        className={`text-[11px] font-semibold ${
                          conv.unreadCount > 0 ? 'text-[#B70A3F]' : 'text-stone-400'
                        }`}
                      >
                        {conv.timestamp}
                      </span>
                    </div>

                    <p
                      className={`text-xs truncate leading-snug ${
                        conv.unreadCount > 0 ? 'text-stone-900 font-bold' : 'text-stone-500'
                      }`}
                    >
                      {conv.lastMessage}
                    </p>

                    <div className="flex items-center gap-2 mt-1.5">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          conv.tagType === 'location'
                            ? 'bg-rose-100 text-[#B70A3F]'
                            : conv.tagType === 'energy'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-purple-100 text-purple-800'
                        }`}
                      >
                        {conv.tag}
                      </span>
                    </div>
                  </div>

                  {/* Trailing Icon / Unread badge */}
                  <div className="flex flex-col items-end justify-center pl-1">
                    {conv.unreadCount > 0 ? (
                      <span className="w-5 h-5 rounded-full bg-[#B70A3F] text-white text-[11px] font-bold flex items-center justify-center shadow-sm">
                        {conv.unreadCount}
                      </span>
                    ) : (
                      <CheckCheck className="w-4 h-4 text-stone-300 group-hover:text-rose-400 transition-colors" />
                    )}
                  </div>
                </div>
              ))}

              {filteredConversations.length === 0 && (
                <div className="text-center py-8 text-stone-400 text-xs">
                  Aucune conversation trouvée pour "{searchQuery}".
                </div>
              )}
            </div>
          </div>

          {/* Card: Mon Compagnon - Accès rapide Profil & Santé */}
          <div className="px-4 pt-4 pb-2">
            <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200/80 shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-between mb-3 relative z-10">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#B70A3F] fill-[#B70A3F]" />
                  <span className="text-xs font-bold text-stone-900">
                    Profil de {userPet.name} (En ligne)
                  </span>
                </div>
                <button
                  onClick={onEditProfile}
                  className="text-xs font-bold text-[#B70A3F] flex items-center gap-1 hover:underline cursor-pointer"
                >
                  <span>Modifier</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Quick Pet Mini-Card */}
              <div className="flex items-center gap-3.5 bg-white rounded-xl p-3 shadow-sm border border-stone-100 relative z-10">
                <div className="w-14 h-14 rounded-xl overflow-hidden bg-stone-100 flex-shrink-0">
                  <img
                    src={userPet.photos[0]}
                    alt={userPet.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="text-sm font-bold text-stone-900">
                      {userPet.name}, {userPet.age} ans
                    </span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" />
                  </div>
                  <p className="text-xs text-stone-500 truncate">
                    {userPet.breed} • Joueur & Câlin
                  </p>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <span className="text-[10px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded-full flex items-center gap-1 font-medium">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" /> Vaccins à jour
                    </span>
                    <span className="text-[10px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded-full font-medium">
                      Puce ✓
                    </span>
                  </div>
                </div>
              </div>

              {/* Playdate readiness toggle */}
              <div className="mt-3 pt-2 flex items-center justify-between text-stone-600 relative z-10 border-t border-stone-200/60">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      isAvailableForPlaydates ? 'bg-emerald-500 animate-pulse' : 'bg-stone-300'
                    }`}
                  />
                  <span className="text-xs font-medium text-stone-800">
                    Disponible pour des playdates ce week-end
                  </span>
                </div>
                <button
                  onClick={() => onToggleAvailability(!isAvailableForPlaydates)}
                  aria-label="Toggle statut disponibilité"
                  className={`w-10 h-6 rounded-full p-0.5 transition-colors relative flex items-center cursor-pointer ${
                    isAvailableForPlaydates ? 'bg-[#B70A3F]' : 'bg-stone-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white shadow transform transition-transform ${
                      isAvailableForPlaydates ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

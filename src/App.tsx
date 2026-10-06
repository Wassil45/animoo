import React, { useState, useEffect } from 'react';
import { Pet, Conversation, FilterOptions, PlaydatePlan, User } from './types';
import { CURRENT_USER_PET, MOCK_DISCOVER_PETS, INITIAL_CONVERSATIONS } from './data/mockPets';
import { TopHeader } from './components/TopHeader';
import { BottomNav, TabId } from './components/BottomNav';
import { SwipeCard } from './components/SwipeCard';
import { ActionBar } from './components/ActionBar';
import { AnimatchModal } from './components/AnimatchModal';
import { ProfileDetailModal } from './components/ProfileDetailModal';
import { FilterModal } from './components/FilterModal';
import { ChatView } from './components/ChatView';
import { MatchesScreen } from './components/MatchesScreen';
import { OnboardingScreen } from './components/OnboardingScreen';
import { UserProfileScreen } from './components/UserProfileScreen';
import { PlaydateModal } from './components/PlaydateModal';
import { AuthModal } from './components/AuthModal';
import { AdminDashboard } from './components/AdminDashboard';
import { MapPin, ShieldCheck } from 'lucide-react';
import { useAuth } from './hooks/useAuth';
import {
  checkDbHealth,
  fetchPets,
  fetchFavorites,
  saveFavoriteToApi,
  deleteFavoriteFromApi,
  fetchConversations,
  sendMessageToApi,
  fetchCurrentUserApi,
  logoutApi,
  DbStatus,
} from './services/api';

export default function App() {
  // Navigation & Screen states
  const [hasOnboarded, setHasOnboarded] = useState<boolean>(true);
  const [currentTab, setCurrentTab] = useState<TabId>('discover');
  const [matchesSubTab, setMatchesSubTab] = useState<'conversations' | 'favorites'>('conversations');
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);

  // Authentication & Admin state via useAuth
  const {
    user: currentUser,
    setUser: setCurrentUser,
    signIn: authSignIn,
    signUp: authSignUp,
    signOut: authSignOut,
  } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState<boolean>(false);

  // Database Connection Status
  const [dbStatus, setDbStatus] = useState<'connected' | 'offline' | 'checking'>('checking');

  // Pets & Favorites state (loaded from Neon Postgres)
  const [discoverPets, setDiscoverPets] = useState<Pet[]>(MOCK_DISCOVER_PETS);
  const [favorites, setFavorites] = useState<Pet[]>([MOCK_DISCOVER_PETS[0]]);

  // User Pet Profile state
  const [userPet, setUserPet] = useState<Pet>(CURRENT_USER_PET);
  const [isAvailableForPlaydates, setIsAvailableForPlaydates] = useState<boolean>(true);

  // Swiping state
  const [category, setCategory] = useState<'all' | 'dog' | 'cat'>('dog');
  const [cardIndex, setCardIndex] = useState<number>(0);
  const [swipeHistory, setSwipeHistory] = useState<{ pet: Pet; direction: 'left' | 'right' | 'superlike' }[]>([]);

  // Modals state
  const [animatchPet, setAnimatchPet] = useState<Pet | null>(null);
  const [detailPet, setDetailPet] = useState<Pet | null>(null);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState<boolean>(false);
  const [isPlaydateModalOpen, setIsPlaydateModalOpen] = useState<boolean>(false);

  // Filters state
  const [filters, setFilters] = useState<FilterOptions>({
    species: 'all',
    maxDistanceKm: 8,
    maxAge: 8,
    minEnergy: 'all',
    sterilizedOnly: false,
    verifiedOnly: false,
  });

  // Conversations & matches (loaded from Neon Postgres)
  const [conversations, setConversations] = useState<Conversation[]>(INITIAL_CONVERSATIONS);
  const [newMatches, setNewMatches] = useState<Pet[]>([
    MOCK_DISCOVER_PETS[0], // Nala
    MOCK_DISCOVER_PETS[1], // Rocky
    MOCK_DISCOVER_PETS[3], // Simba
    MOCK_DISCOVER_PETS[2], // Luna
    MOCK_DISCOVER_PETS[5], // Barney
  ]);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Initial load from Neon Postgres database
  useEffect(() => {
    async function loadDataFromNeon() {
      try {
        const [health, userMe] = await Promise.all([
          checkDbHealth(),
          fetchCurrentUserApi(),
        ]);
        setDbStatus(health.status);
        if (userMe) {
          setCurrentUser(userMe);
        }

        const [petsData, favoritesData, convsData] = await Promise.all([
          fetchPets(),
          fetchFavorites('user_milo'),
          fetchConversations(),
        ]);

        if (petsData && petsData.length > 0) {
          setDiscoverPets(petsData);
        }
        if (favoritesData) {
          setFavorites(favoritesData);
        }
        if (convsData && convsData.length > 0) {
          setConversations(convsData);
        }
      } catch (err) {
        console.warn('Erreur chargement Neon DB, fallback local actif :', err);
      }
    }

    loadDataFromNeon();
  }, []);

  const handleAuthSuccess = (user: User) => {
    setCurrentUser(user);
    if (user.role === 'admin') {
      showToast(`👑 Connecté en tant qu'Administrateur (${user.name})`);
    } else {
      showToast(`🐾 Bienvenue, ${user.name} !`);
    }
  };

  const handleLogout = async () => {
    await authSignOut();
    setIsAdminDashboardOpen(false);
    setIsAuthModalOpen(true);
    showToast('Déconnexion réussie.');
  };

  const handleRefreshPets = async () => {
    const updated = await fetchPets();
    if (updated && updated.length > 0) {
      setDiscoverPets(updated);
    }
  };

  const handleToggleFavorite = async (pet: Pet) => {
    const isCurrentlyFav = favorites.some((p) => p.id === pet.id);

    if (isCurrentlyFav) {
      // Optimistic update
      setFavorites((prev) => prev.filter((p) => p.id !== pet.id));
      showToast(`💔 ${pet.name} retiré des favoris`);
      // Sync with Neon Postgres
      await deleteFavoriteFromApi(pet.id, 'user_milo');
    } else {
      // Optimistic update
      setFavorites((prev) => [pet, ...prev]);
      showToast(`💖 ${pet.name} sauvegardé dans vos favoris !`);
      // Sync with Neon Postgres
      await saveFavoriteToApi(pet.id, 'user_milo');
    }
  };

  const handleOpenFavorites = () => {
    setActiveConversationId(null);
    setCurrentTab('matches');
    setMatchesSubTab('favorites');
  };

  // Filter discovery pets
  const filteredPets = discoverPets.filter((pet) => {
    if (category === 'dog' && pet.species !== 'dog') return false;
    if (category === 'cat' && pet.species !== 'cat') return false;
    if (pet.distanceKm > filters.maxDistanceKm) return false;
    if (pet.age > filters.maxAge) return false;
    if (filters.sterilizedOnly && !pet.sterilized) return false;
    if (filters.verifiedOnly && !pet.verified) return false;
    return true;
  });

  const activePet = filteredPets[cardIndex % filteredPets.length];
  const nextPet = filteredPets[(cardIndex + 1) % filteredPets.length];

  // Actions
  const handleSwipe = (direction: 'left' | 'right' | 'superlike') => {
    if (!activePet) return;

    setSwipeHistory((prev) => [...prev, { pet: activePet, direction }]);

    if (direction === 'right' || direction === 'superlike') {
      // Trigger celebratory Animatch!
      setAnimatchPet(activePet);
      if (direction === 'superlike') {
        showToast('⭐ Super-Paw envoyé avec succès !');
      }
    }

    setCardIndex((prev) => prev + 1);
  };

  const handleUndo = () => {
    if (swipeHistory.length === 0) return;
    const last = swipeHistory[swipeHistory.length - 1];
    setSwipeHistory((prev) => prev.slice(0, -1));
    setCardIndex((prev) => Math.max(0, prev - 1));
    showToast(`↩️ Swipe sur ${last.pet.name} annulé`);
  };

  const handleBoost = () => {
    showToast(`⚡ Profil de ${userPet.name} boosté pour 30 min dans votre quartier !`);
  };

  const handleStartChatFromMatch = (pet: Pet, initialMessage?: string) => {
    setAnimatchPet(null);

    // Check if conversation exists
    let existingConv = conversations.find((c) => c.pet.id === pet.id);
    if (!existingConv) {
      existingConv = {
        id: 'conv_' + pet.id,
        pet,
        ownerName: pet.ownerName,
        ownerAvatar: pet.ownerAvatar,
        lastMessage: initialMessage || 'Wouf ! Nouveau Animatch 🐾',
        timestamp: 'À l\'instant',
        unreadCount: 0,
        tag: `${pet.favoriteParks[0] || pet.locationName} • ${pet.distanceKm} km`,
        tagType: 'location',
        messages: [
          {
            id: 'm_' + Date.now(),
            sender: 'user',
            text: initialMessage || `Wouf ! Ravi de faire la connaissance de ${pet.name} 🐾 !`,
            timestamp: 'À l\'instant',
          },
        ],
      };
      setConversations((prev) => [existingConv!, ...prev]);
    } else if (initialMessage) {
      existingConv.messages.push({
        id: 'm_' + Date.now(),
        sender: 'user',
        text: initialMessage,
        timestamp: 'À l\'instant',
      });
      existingConv.lastMessage = initialMessage;
    }

    setActiveConversationId(existingConv.id);
    setCurrentTab('chats');
  };

  const handleSendMessage = async (conversationId: string, text: string, proposal?: PlaydatePlan) => {
    // 1. Optimistic update
    const optimisticMsg = {
      id: 'msg_' + Date.now(),
      sender: 'user' as const,
      text,
      timestamp: 'À l\'instant',
      playdateProposal: proposal,
    };

    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === conversationId) {
          return {
            ...c,
            lastMessage: text,
            timestamp: 'À l\'instant',
            messages: [...c.messages, optimisticMsg],
          };
        }
        return c;
      })
    );

    // 2. Persist to Neon Postgres backend
    await sendMessageToApi(conversationId, text, proposal);

    // 3. Simulate smart friendly auto-reply after 1.8s
    setTimeout(() => {
      setConversations((prev) =>
        prev.map((c) => {
          if (c.id === conversationId) {
            const petName = c.pet.name;
            const replies = [
              `Trop bien ! ${petName} a remué la queue dès que j'ai lu ton message 😄 On a trop hâte !`,
              `Parfait, c'est noté ! On prendra les friandises préférées de ${petName} 🦴`,
              `Carrément partants ! ${c.pet.favoriteParks[0] || 'Ce spot'} est super agréable pour les laisser se défouler.`,
            ];
            const randomReply = replies[Math.floor(Math.random() * replies.length)];
            const autoMsg = {
              id: 'reply_' + Date.now(),
              sender: 'pet' as const,
              text: randomReply,
              timestamp: 'À l\'instant',
            };
            return {
              ...c,
              lastMessage: randomReply,
              timestamp: 'À l\'instant',
              messages: [...c.messages, autoMsg],
            };
          }
          return c;
        })
      );
    }, 1800);
  };

  const handlePublishPlaydate = (plan: { park: string; date: string; time: string; theme: string }) => {
    showToast(`🐾 Sortie publiée à ${plan.park} (${plan.date}) !`);
  };

  const totalUnreadCount = conversations.reduce((acc, c) => acc + c.unreadCount, 0);

  // Active conversation if inside chat
  const activeConversation = conversations.find((c) => c.id === activeConversationId);

  return (
    <div className="min-h-screen bg-[#F6F3F1] flex flex-col items-center selection:bg-rose-100 selection:text-rose-600">
      {/* Main Responsive Production Application Container */}
      <div className="w-full max-w-lg md:max-w-xl min-h-screen bg-[#FCF9F8] shadow-sm md:shadow-2xl flex flex-col relative border-x border-stone-200/60">
        {/* SCREEN 1: ONBOARDING */}
        {!hasOnboarded ? (
          <OnboardingScreen
            onStart={(pref) => {
              setCategory(pref);
              setHasOnboarded(true);
            }}
          />
        ) : (
          <div className="flex-1 flex flex-col relative h-full overflow-hidden">
            {/* Top Header if not in full chat view */}
            {!activeConversationId && !isAdminDashboardOpen && (
              <TopHeader
                onOpenFilter={() => setIsFilterModalOpen(true)}
                onOpenProfile={() => setCurrentTab('profile')}
                onOpenFavorites={handleOpenFavorites}
                onOpenAdmin={() => setIsAdminDashboardOpen(true)}
                onOpenAuth={() => setIsAuthModalOpen(true)}
                currentUser={currentUser}
                favoritesCount={favorites.length}
                profileAvatarUrl={currentUser?.avatar || userPet.photos[0]}
                isFilterActive={filters.species !== 'all' || filters.maxDistanceKm < 8}
                dbStatus={dbStatus}
              />
            )}

            {/* TAB CONTENT OR ADMIN DASHBOARD */}
            {isAdminDashboardOpen && currentUser?.role === 'admin' ? (
              <main className="flex-1 overflow-y-auto no-scrollbar relative flex flex-col">
                <AdminDashboard
                  currentUser={currentUser}
                  pets={discoverPets}
                  onRefreshPets={handleRefreshPets}
                  onClose={() => setIsAdminDashboardOpen(false)}
                  onLogout={handleLogout}
                />
              </main>
            ) : (
              <main className="flex-1 overflow-y-auto no-scrollbar relative flex flex-col">
                {/* TAB 1: DISCOVER / TINDER SWIPE DECK */}
                {currentTab === 'discover' && !activeConversationId && (
                  <div className="flex flex-col w-full px-4 pt-3 pb-24">
                    {/* Category Switcher & Distance Location Row (Image 3) */}
                    <div className="flex items-center justify-between mb-3">
                      {/* Dog / Cat Pills */}
                      <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-full shadow-inner">
                        <button
                          onClick={() => {
                            setCategory('dog');
                            setCardIndex(0);
                          }}
                          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                            category === 'dog'
                              ? 'bg-white text-[#B70A3F] shadow-sm'
                              : 'text-stone-500 hover:text-stone-800'
                          }`}
                        >
                          <span>🐕</span>
                          <span>Chiens</span>
                          {category === 'dog' && <span className="w-1.5 h-1.5 rounded-full bg-[#B70A3F]" />}
                        </button>

                        <button
                          onClick={() => {
                            setCategory('cat');
                            setCardIndex(0);
                          }}
                          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                            category === 'cat'
                              ? 'bg-white text-[#B70A3F] shadow-sm'
                              : 'text-stone-500 hover:text-stone-800'
                          }`}
                        >
                          <span>🐈</span>
                          <span>Chats</span>
                          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-rose-100 text-rose-700 font-bold">
                            12
                          </span>
                        </button>
                      </div>

                      {/* Quick Location Badge */}
                      <button
                        onClick={() => setIsFilterModalOpen(true)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold transition-colors cursor-pointer"
                      >
                        <MapPin className="w-3.5 h-3.5 text-[#B70A3F]" />
                        <span>Paris 14e</span>
                        <span className="text-stone-400 font-normal">(&lt;{filters.maxDistanceKm}km)</span>
                      </button>
                    </div>

                    {/* Swipe Deck Canvas */}
                    <div className="relative w-full min-h-[500px] h-[540px] flex items-center justify-center my-1">
                      {/* Background Peek Card 2 */}
                      <div className="absolute inset-x-2 top-4 bottom-0 rounded-[28px] bg-stone-300 opacity-40 scale-[0.92] transition-transform pointer-events-none shadow-sm" />

                      {/* Background Peek Card 1 */}
                      {nextPet && (
                        <div className="absolute inset-x-1 top-2 bottom-1 rounded-[28px] bg-stone-900 overflow-hidden shadow-md scale-[0.96] opacity-90 transition-transform pointer-events-none">
                          <img
                            src={nextPet.photos[0]}
                            alt={nextPet.name}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                          <div className="absolute bottom-5 left-4 right-4 text-white">
                            <h3 className="text-2xl font-black">{nextPet.name}, {nextPet.age} ans</h3>
                            <p className="text-xs text-stone-300">{nextPet.breed} • {nextPet.distanceKm} km</p>
                          </div>
                        </div>
                      )}

                      {/* Active Swipe Card */}
                      {activePet ? (
                        <SwipeCard
                          pet={activePet}
                          isActive={true}
                          isFavorite={favorites.some((f) => f.id === activePet.id)}
                          onToggleFavorite={handleToggleFavorite}
                          onSwipe={handleSwipe}
                          onOpenDetails={(p) => setDetailPet(p)}
                        />
                      ) : (
                        <div className="w-full h-full rounded-[28px] bg-white border border-stone-200 flex flex-col items-center justify-center p-6 text-center shadow-md">
                          <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center text-3xl mb-3">
                            🐾
                          </div>
                          <h3 className="text-lg font-black text-stone-900">Plus de profils aux alentours !</h3>
                          <p className="text-xs text-stone-500 mt-1 max-w-[220px]">
                            Élargissez votre rayon de recherche pour découvrir d'autres compagnons de balade.
                          </p>
                          <button
                            onClick={() => {
                              setFilters((f) => ({ ...f, maxDistanceKm: 25 }));
                              setCardIndex(0);
                            }}
                            className="mt-4 px-5 py-2.5 rounded-full bg-[#B70A3F] text-white text-xs font-bold shadow-md cursor-pointer hover:bg-rose-700"
                          >
                            Élargir le rayon à 25 km
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Floating Swipe Action Bar */}
                    <ActionBar
                      onUndo={handleUndo}
                      onDislike={() => handleSwipe('left')}
                      onSuperlike={() => handleSwipe('superlike')}
                      onLike={() => handleSwipe('right')}
                      onBoost={handleBoost}
                      canUndo={swipeHistory.length > 0}
                    />

                    {/* Trust Banner */}
                    <div className="mt-2 flex items-center justify-center gap-1.5 text-stone-500 text-[11px] font-medium">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#B70A3F]" />
                      <span>Charte de bienveillance canine Animoo respectée</span>
                    </div>
                  </div>
                )}

                {/* TAB 2: MATCHES & CONVERSATIONS & FAVORITES (Image 7 + Favoris) */}
                {(currentTab === 'matches' || (currentTab === 'chats' && !activeConversationId)) && (
                  <MatchesScreen
                    conversations={conversations}
                    newMatchPets={newMatches}
                    userPet={userPet}
                    favorites={favorites}
                    activeSubTab={matchesSubTab}
                    onSubTabChange={(tab) => setMatchesSubTab(tab)}
                    onOpenConversation={(id) => {
                      setActiveConversationId(id);
                      setCurrentTab('chats');
                    }}
                    onOpenNewMatch={(pet) => {
                      handleStartChatFromMatch(pet);
                    }}
                    onCreatePlaydate={() => setIsPlaydateModalOpen(true)}
                    onEditProfile={() => setCurrentTab('profile')}
                    isAvailableForPlaydates={isAvailableForPlaydates}
                    onToggleAvailability={(val) => {
                      setIsAvailableForPlaydates(val);
                      showToast(val ? '✓ Vous êtes visible pour les playdates' : 'Compte en pause');
                    }}
                    onRemoveFavorite={async (petId) => {
                      setFavorites((prev) => prev.filter((p) => p.id !== petId));
                      showToast('💔 Compagnon retiré des favoris');
                      await deleteFavoriteFromApi(petId, 'user_milo');
                    }}
                    onOpenDetails={(pet) => setDetailPet(pet)}
                    onStartChatWithPet={(pet) => handleStartChatFromMatch(pet)}
                    onGoToDiscover={() => setCurrentTab('discover')}
                  />
                )}

                {/* TAB 3: INSIDE CHAT VIEW */}
                {currentTab === 'chats' && activeConversation && (
                  <ChatView
                    conversation={activeConversation}
                    onBack={() => setActiveConversationId(null)}
                    onSendMessage={handleSendMessage}
                  />
                )}

                {/* TAB 4: PET USER PROFILE */}
                {currentTab === 'profile' && (
                  <UserProfileScreen
                    userPet={userPet}
                    currentUser={currentUser}
                    onUpdatePet={(p) => setUserPet(p)}
                    onLogout={handleLogout}
                    onOpenAdmin={() => setIsAdminDashboardOpen(true)}
                    onOpenAuthModal={() => setIsAuthModalOpen(true)}
                    isAvailableForPlaydates={isAvailableForPlaydates}
                    onToggleAvailability={setIsAvailableForPlaydates}
                  />
                )}
              </main>
            )}

            {/* Bottom Nav Bar (hidden when inside an active conversation or in Admin Dashboard) */}
            {!activeConversationId && !isAdminDashboardOpen && (
              <BottomNav
                currentTab={currentTab}
                onTabChange={(tab) => {
                  setCurrentTab(tab);
                  setActiveConversationId(null);
                  if (tab === 'matches') {
                    setMatchesSubTab('conversations');
                  }
                }}
                matchesCount={newMatches.length}
                unreadChatsCount={totalUnreadCount}
              />
            )}
          </div>
        )}

        {/* MODAL 0: AUTHENTICATION / LOGIN / REGISTER */}
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          onAuthSuccess={handleAuthSuccess}
          onSignIn={authSignIn}
          onSignUp={authSignUp}
        />

        {/* MODAL 1: ANIMATCH CELEBRATION (Image 5) */}
        {animatchPet && (
          <AnimatchModal
            userPet={userPet}
            matchedPet={animatchPet}
            isOpen={true}
            onClose={() => setAnimatchPet(null)}
            onStartChat={handleStartChatFromMatch}
          />
        )}

        {/* MODAL 2: PET FULL PROFILE DOSSIER */}
        {detailPet && (
          <ProfileDetailModal
            pet={detailPet}
            isOpen={true}
            isFavorite={detailPet ? favorites.some((f) => f.id === detailPet.id) : false}
            onToggleFavorite={handleToggleFavorite}
            onClose={() => setDetailPet(null)}
            onLike={(p) => {
              handleSwipe('right');
              setDetailPet(null);
            }}
            onDislike={(p) => {
              handleSwipe('left');
              setDetailPet(null);
            }}
          />
        )}

        {/* MODAL 3: PREFERENCES & FILTER SHEET */}
        <FilterModal
          isOpen={isFilterModalOpen}
          onClose={() => setIsFilterModalOpen(false)}
          filters={filters}
          onChangeFilters={(f) => setFilters(f)}
        />

        {/* MODAL 4: PROPOSER UNE SORTIE / PLAYDATE */}
        <PlaydateModal
          isOpen={isPlaydateModalOpen}
          onClose={() => setIsPlaydateModalOpen(false)}
          onPublishPlaydate={handlePublishPlaydate}
        />

        {/* TOAST POPUP */}
        {toastMessage && (
          <div className="fixed top-16 inset-x-6 max-w-xs mx-auto z-50 p-3 bg-stone-900/95 backdrop-blur-md text-white rounded-2xl text-center text-xs font-bold shadow-2xl animate-bounce">
            {toastMessage}
          </div>
        )}
      </div>
    </div>
  );
}

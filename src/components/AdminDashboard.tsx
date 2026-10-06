import React, { useState, useEffect } from 'react';
import { Pet, User, AdminStats } from '../types';
import {
  Shield,
  Users,
  Heart,
  MessageSquare,
  Sparkles,
  CheckCircle2,
  Trash2,
  Plus,
  ArrowLeft,
  RefreshCw,
  Search,
  Database,
  ExternalLink,
  ShieldCheck,
  Check,
  X,
} from 'lucide-react';
import {
  fetchAdminStatsApi,
  fetchAdminUsersApi,
  updateAdminUserRoleApi,
  deleteAdminUserApi,
  adminCreatePetApi,
  adminDeletePetApi,
  adminToggleVerifyPetApi,
} from '../services/api';

interface AdminDashboardProps {
  currentUser: User;
  pets: Pet[];
  onRefreshPets: () => void;
  onClose: () => void;
  onLogout: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  currentUser,
  pets,
  onRefreshPets,
  onClose,
  onLogout,
}) => {
  const [activeTab, setActiveTab] = useState<'pets' | 'users' | 'system'>('pets');
  const [stats, setStats] = useState<AdminStats>({
    totalPets: pets.length,
    totalUsers: 2,
    totalMatches: 8,
    totalFavorites: 4,
    totalConversations: 2,
  });
  const [usersList, setUsersList] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [isAddPetModalOpen, setIsAddPetModalOpen] = useState(false);

  // New Pet Form State
  const [newPetName, setNewPetName] = useState('');
  const [newPetAge, setNewPetAge] = useState('2');
  const [newPetSpecies, setNewPetSpecies] = useState<'dog' | 'cat'>('dog');
  const [newPetBreed, setNewPetBreed] = useState('');
  const [newPetOwner, setNewPetOwner] = useState(currentUser.name);
  const [newPetBio, setNewPetBio] = useState('');
  const [newPetPhoto, setNewPetPhoto] = useState(
    'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80'
  );

  const loadAdminData = async () => {
    setLoading(true);
    try {
      const [statsData, usersData] = await Promise.all([
        fetchAdminStatsApi(),
        fetchAdminUsersApi(),
      ]);
      setStats(statsData);
      setUsersList(usersData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAdminData();
  }, []);

  const handleToggleVerify = async (petId: string) => {
    await adminToggleVerifyPetApi(petId);
    onRefreshPets();
  };

  const handleDeletePet = async (petId: string) => {
    if (confirm('Voulez-vous vraiment supprimer cet animal de la plateforme ?')) {
      await adminDeletePetApi(petId);
      onRefreshPets();
    }
  };

  const handleToggleUserRole = async (user: User) => {
    const newRole = user.role === 'admin' ? 'user' : 'admin';
    await updateAdminUserRoleApi(user.id, newRole);
    loadAdminData();
  };

  const handleDeleteUser = async (userId: string) => {
    if (confirm('Supprimer définitivement cet utilisateur ?')) {
      await deleteAdminUserApi(userId);
      loadAdminData();
    }
  };

  const handleCreatePet = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPetName || !newPetBreed) return;

    await adminCreatePetApi({
      id: 'pet_' + Date.now(),
      name: newPetName,
      age: parseFloat(newPetAge) || 2,
      species: newPetSpecies,
      breed: newPetBreed,
      distanceKm: 2.5,
      locationName: 'Paris 14e • Parc Montsouris',
      gender: 'Mâle',
      sterilized: true,
      matchScore: 96,
      temperamentTitle: 'Sociable & Joueur',
      temperamentDetail: 'Très affectueux et adore les rencontres au parc.',
      photos: [newPetPhoto],
      tags: ['🎾 Joueur', '🐕 Sociable', '🌲 Adore le parc'],
      bio: newPetBio || 'Compagnon énergique et curieux qui cherche de nouveaux copains.',
      verified: true,
      vaccinesUpToDate: true,
      chipped: true,
      ownerName: newPetOwner,
      ownerAge: 28,
      ownerAvatar: currentUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      ownerBio: 'Passionné de balades canines.',
      favoriteParks: ['Parc Montsouris', 'Bois de Vincennes'],
    });

    setIsAddPetModalOpen(false);
    onRefreshPets();
    // Reset
    setNewPetName('');
    setNewPetBreed('');
    setNewPetBio('');
  };

  const filteredPets = pets.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.breed.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.ownerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col w-full min-h-screen bg-stone-100 text-stone-900 select-none pb-20">
      {/* Top Banner */}
      <div className="bg-stone-900 text-white px-5 py-4 flex items-center justify-between shadow-md sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all cursor-pointer"
            title="Retour à l'application"
          >
            <ArrowLeft className="w-4 h-4 text-white" />
          </button>
          <div>
            <div className="flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-amber-400 fill-amber-400" />
              <h1 className="text-base font-extrabold tracking-tight">Portail Administrateur</h1>
              <span className="text-[10px] bg-amber-400/20 text-amber-300 font-bold px-2 py-0.5 rounded-full border border-amber-400/30">
                PROD
              </span>
            </div>
            <p className="text-[11px] text-stone-400">
              Connecté : <strong className="text-stone-200">{currentUser.name}</strong> ({currentUser.email})
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={loadAdminData}
            title="Rafraîchir les données"
            className="w-9 h-9 rounded-full bg-stone-800 hover:bg-stone-700 flex items-center justify-center text-stone-300 transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-full bg-[#B70A3F] hover:bg-rose-700 text-white text-xs font-bold shadow-sm transition-all cursor-pointer"
          >
            Mode Application 🐾
          </button>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="p-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white p-3.5 rounded-2xl border border-stone-200/80 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-50 text-[#B70A3F] flex items-center justify-center text-xl">
            🐾
          </div>
          <div>
            <span className="text-xl font-black text-stone-900">{stats.totalPets}</span>
            <p className="text-[11px] font-semibold text-stone-500">Compagnons</p>
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-stone-200/80 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xl font-black text-stone-900">{usersList.length || stats.totalUsers}</span>
            <p className="text-[11px] font-semibold text-stone-500">Utilisateurs</p>
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-stone-200/80 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Heart className="w-5 h-5 fill-current" />
          </div>
          <div>
            <span className="text-xl font-black text-stone-900">{stats.totalFavorites}</span>
            <p className="text-[11px] font-semibold text-stone-500">Favoris sauvés</p>
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-stone-200/80 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xl font-black text-stone-900">{stats.totalConversations}</span>
            <p className="text-[11px] font-semibold text-stone-500">Playdates</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 mb-3">
        <div className="flex bg-stone-200 p-1 rounded-2xl">
          <button
            onClick={() => setActiveTab('pets')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              activeTab === 'pets' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            🐾 Compagnons ({pets.length})
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              activeTab === 'users' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            👥 Utilisateurs ({usersList.length})
          </button>
          <button
            onClick={() => setActiveTab('system')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              activeTab === 'system' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            ⚙️ Système & DB
          </button>
        </div>
      </div>

      {/* TAB 1: PETS MANAGEMENT */}
      {activeTab === 'pets' && (
        <div className="px-4 space-y-3">
          <div className="flex items-center gap-2">
            <div className="flex-1 relative flex items-center">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher par nom, race ou maître..."
                className="w-full pl-9 pr-3 py-2 bg-white border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#B70A3F]/20"
              />
            </div>
            <button
              onClick={() => setIsAddPetModalOpen(true)}
              className="py-2 px-3 rounded-xl bg-[#B70A3F] hover:bg-rose-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Nouveau Compagnon</span>
            </button>
          </div>

          <div className="grid grid-cols-1 gap-2.5">
            {filteredPets.map((pet) => (
              <div
                key={pet.id}
                className="bg-white p-3 rounded-2xl border border-stone-200 shadow-sm flex items-center justify-between gap-3 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-stone-100 shrink-0">
                    <img
                      src={pet.photos[0]}
                      alt={pet.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-sm font-bold text-stone-900 truncate">{pet.name}</h3>
                      <span className="text-[10px] text-stone-500 font-semibold">
                        ({pet.species === 'dog' ? 'Chien' : 'Chat'}, {pet.age} ans)
                      </span>
                      {pet.verified && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 fill-emerald-100 shrink-0" />
                      )}
                    </div>
                    <p className="text-[11px] text-stone-500 truncate">
                      {pet.breed} • Maître : <strong>{pet.ownerName}</strong>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => handleToggleVerify(pet.id)}
                    title={pet.verified ? 'Retirer la certification' : 'Certifier ce profil'}
                    className={`px-2.5 py-1 rounded-xl text-[11px] font-bold border transition-colors cursor-pointer flex items-center gap-1 ${
                      pet.verified
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-stone-50 text-stone-500 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    <ShieldCheck className="w-3 h-3" />
                    <span>{pet.verified ? 'Certifié ✓' : 'Non vérifié'}</span>
                  </button>

                  <button
                    onClick={() => handleDeletePet(pet.id)}
                    title="Supprimer cet animal"
                    className="w-8 h-8 rounded-xl bg-stone-100 hover:bg-red-50 text-stone-400 hover:text-red-600 flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: USERS MODERATION */}
      {activeTab === 'users' && (
        <div className="px-4 space-y-2.5">
          <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
            <div className="p-3 bg-stone-50 border-b border-stone-200 flex items-center justify-between">
              <span className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                Utilisateurs enregistrés ({usersList.length})
              </span>
              <span className="text-[11px] text-stone-500">Rôles & Permissions</span>
            </div>

            <div className="divide-y divide-stone-100">
              {usersList.map((user) => (
                <div key={user.id} className="p-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80'}
                      alt=""
                      className="w-10 h-10 rounded-full object-cover shrink-0 border"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-stone-900 truncate">{user.name}</span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                            user.role === 'admin'
                              ? 'bg-amber-100 text-amber-900 border border-amber-300'
                              : 'bg-stone-100 text-stone-600'
                          }`}
                        >
                          {user.role === 'admin' ? '👑 Admin' : '🐾 Utilisateur'}
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-500 truncate">{user.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleToggleUserRole(user)}
                      className="px-2.5 py-1 rounded-xl text-[11px] font-bold border border-stone-200 hover:bg-stone-50 text-stone-700 transition-colors cursor-pointer"
                    >
                      {user.role === 'admin' ? 'Définir Utilisateur' : 'Promouvoir Admin'}
                    </button>

                    {user.id !== currentUser.id && (
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="w-8 h-8 rounded-xl bg-stone-100 hover:bg-red-50 text-stone-400 hover:text-red-600 flex items-center justify-center transition-colors cursor-pointer"
                        title="Supprimer l'utilisateur"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SYSTEM & DATABASE */}
      {activeTab === 'system' && (
        <div className="px-4 space-y-3">
          <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm space-y-3">
            <div className="flex items-center gap-2">
              <Database className="w-5 h-5 text-emerald-600" />
              <h3 className="text-sm font-extrabold text-stone-900">Base de Données Neon Postgres</h3>
            </div>
            <p className="text-xs text-stone-600">
              Les tables PostgreSQL suivantes sont gérées et synchronisées en direct avec votre cluster :
            </p>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-200">
                <span className="font-bold text-stone-900">Table: pets</span>
                <p className="text-[11px] text-stone-500">{pets.length} lignes actives</p>
              </div>
              <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-200">
                <span className="font-bold text-stone-900">Table: users</span>
                <p className="text-[11px] text-stone-500">{usersList.length} comptes</p>
              </div>
              <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-200">
                <span className="font-bold text-stone-900">Table: favorites</span>
                <p className="text-[11px] text-stone-500">{stats.totalFavorites} liaisons</p>
              </div>
              <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-200">
                <span className="font-bold text-stone-900">Table: conversations</span>
                <p className="text-[11px] text-stone-500">{stats.totalConversations} discussions</p>
              </div>
            </div>

            <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
              <span>Protocole : <strong>HTTPS Serverless (Port 443)</strong></span>
              <span className="text-emerald-600 font-bold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Opérationnel
              </span>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ADD PET */}
      {isAddPetModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-extrabold text-stone-900 flex items-center gap-1.5">
                <span>🐾</span>
                <span>Ajouter un Compagnon</span>
              </h3>
              <button
                onClick={() => setIsAddPetModalOpen(false)}
                className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4 text-stone-600" />
              </button>
            </div>

            <form onSubmit={handleCreatePet} className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-stone-700 mb-1">Nom de l'animal</label>
                  <input
                    type="text"
                    required
                    value={newPetName}
                    onChange={(e) => setNewPetName(e.target.value)}
                    placeholder="Ex: Cookie"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-stone-700 mb-1">Âge (ans)</label>
                  <input
                    type="number"
                    step="0.5"
                    required
                    value={newPetAge}
                    onChange={(e) => setNewPetAge(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-stone-700 mb-1">Espèce</label>
                  <select
                    value={newPetSpecies}
                    onChange={(e) => setNewPetSpecies(e.target.value as any)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs"
                  >
                    <option value="dog">Chien 🐕</option>
                    <option value="cat">Chat 🐈</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-stone-700 mb-1">Race</label>
                  <input
                    type="text"
                    required
                    value={newPetBreed}
                    onChange={(e) => setNewPetBreed(e.target.value)}
                    placeholder="Ex: Berger Australien"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-stone-700 mb-1">Nom du propriétaire</label>
                <input
                  type="text"
                  required
                  value={newPetOwner}
                  onChange={(e) => setNewPetOwner(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-stone-700 mb-1">URL de la photo</label>
                <input
                  type="url"
                  required
                  value={newPetPhoto}
                  onChange={(e) => setNewPetPhoto(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-stone-700 mb-1">Bio / Tempérament</label>
                <textarea
                  rows={2}
                  value={newPetBio}
                  onChange={(e) => setNewPetBio(e.target.value)}
                  placeholder="Présentation du compagnon..."
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#B70A3F] text-white text-xs font-bold shadow-md hover:bg-rose-700 transition-colors cursor-pointer"
              >
                Créer et Publier le Profil
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

import { Pet, Conversation } from '../types';

export const CURRENT_USER_PET: Pet = {
  id: 'user_pet_milo',
  name: 'Milo',
  age: 2,
  species: 'dog',
  breed: 'Berger Australien énergique',
  distanceKm: 0,
  locationName: 'Paris 14e',
  gender: 'Mâle',
  sterilized: true,
  matchScore: 99,
  temperamentTitle: 'Haute énergie & Très joueur',
  temperamentDetail: 'Toujours prêt pour courir à toute allure et attraper des balles.',
  photos: [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBvr8KCThSqKrj3y49_z_zDl9pEXT6dVGeSKnBm6JBf7Z4167RXVyerlw5niPWc39_OtxMkIsPHveMfSJ_WRldTOfeemMl20S-idCTw75C_SjlHi6nt7yoQyjCBtoybmeQZ60jeYD8QZ-J97WCgI2XXhSIuNtb-lLsOa6hAzlIAwwKyqKM8mp9PP7EFV9wB9sYx_3LHzs-EwFLF11hxtPtw76XKN7BbBu6rFhXcbkWS6DknDQ1th_4M',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuATxP3A3W2UiGAcXsHRXFUormOmFKcN6nzZhItF6d4fW1C2CElVPFsY6BCE6o6QdWXbjUlDtowwZhBkuqyN0WtjImRqgosjpGKZuyRHrfYoATPMDWcZWHsuYuejA94OcZgjkQixeed6hVQBo-nsIKSC9GYaRie1PjYC2jYvSvUotZ0RdG6tnTzLfYj6WwbRXkxM22c5Ef-bhclYj_g7yutiuvKGX4r8RwoDeZjo0KJOZ6B7yTxhMh7Q',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuATWD_JANg9L4ETke_81cfwHZNx0hQx22axqzr-7WmL0bxOXfsyJ4s5CBLPZdW5wVEdFattAl7v5DbeaCr4qxHovubzkoB8xj83N22YD0RuiLVIYExxvw-YkavDbqXbjeMbb8M6lVHyczYZ83zYy_4N3kLYKYzawTmdRFiPEOy1NVHzM8zZDDW9TIJwcRSqWxS1KdELiMcebmAn0u-DGrpq5dN7lPdqs7qGSz1Lt8katBMFkD08q97Z'
  ],
  tags: ['🎾 Balle non-stop', '🌊 Adore nager', '🐕 Très sociable', '🌳 Balades en forêt'],
  bio: 'Toujours partant pour courir à toute allure et partager un bâton au parc ! Cherche copain dynamique pour longues sessions jeux. 🐶⚡',
  verified: true,
  vaccinesUpToDate: true,
  chipped: true,
  ownerName: 'Wassil',
  ownerAge: 27,
  ownerAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCrrmEtbmRNs74Hq7XjSN8b1bJzv5bG5p_ePWzsnsE6TQnyq7MN9E098L7gHG2MkLxhXT--OuHfeTWRBLLDIDAdpfyEAebrr3UYsuVVbIaDp4UwNS0Laf61aLEQhV6xDFdvMgu5Ikq4d_vd1WJx8E8RHR0la4kNx5U4Boy1g4_pSp_j4z-e3BTUnE6iYuc6oNBG--bYsVegR8e8YRWOjEYxJ6maK94kLpqeYgiujS1iZxf3iXAUE_7W',
  ownerBio: 'Architecte à Paris, passionné de rando et fan absolu de balades canines.',
  favoriteParks: ['Parc Montsouris', 'Parc Monceau', 'Bois de Vincennes']
};

export const MOCK_DISCOVER_PETS: Pet[] = [
  {
    id: 'pet_nala',
    name: 'Nala',
    age: 1.5,
    species: 'dog',
    breed: 'Golden Retriever joyeuse',
    distanceKm: 1.8,
    locationName: 'Square Batignolles • Paris 17e',
    gender: 'Femelle',
    sterilized: true,
    matchScore: 98,
    temperamentTitle: 'Joueur & Sociable',
    temperamentDetail: 'Chiens très joueurs & sociables, adorent courir ensemble.',
    photos: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA3ZrWgjbJWLM2MCLSgtEeZ_tMA9aH47uO4hhGIFunkUWjjJL3-4Tc8MGXLxQsTyxl3zkylXi_QrC6--9hvAHLznf-TD0atwHEQxzazGvi1t-H8Oib0zWkjXjVTPGzv2g2JYSwDPon9hIRKtU_gJOkDTwAeB5qleOsB-YwbHF1NXhdSdrit-fdRX_fsLee8AKdVjgX5NcL2Q4AaCo5AWzTxrISwJAVAN6_ntYoBB8TP9Umwms7nT8o5',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAZD_GhrfBeDXTeencpatz-tBfExQstUl0lZSFRxOXc583ORtVw4278X9h_LXzUCRahAxWkxil2oXmHiYxPmFNTNu3hpp1rdIXIdl5yexvD1Hch0Lufzl3CcGojyhj0IbpO3cA1OVVe05xEHiZr-OAkvRq7sHhKp60RR9Y2Jz60_mwPomNnGdpzNxsaWnr3OVWyfwnukuF8jzg1xnftSTQDPO2pGgjDq2bekB0_wsxoE_IgN2SFcQui',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAU9_a_S3YtX_6kpWzHNCiuSPzFv-tLCTTKnPe45huLkwIJF2s9_o-Yh96EyH8EdlsycyRcbwVhDJCh37oSr5Lhp9FX9dYtBw0Mc3a_mOMZpxwsQcXd3TWAgcyAkz3iAYly0N-hVA1eYr8e0C7IBAxYqnsonj7J7XACo-5pOK0qn5GMwClsG8v48HZhIX63gwnbzGLLXytsXHxuaJAj0lsTCi1GsgsRv3Ljw29hIza5yne1vNkfxA03'
    ],
    tags: ['🎾 Adore la balle', '⚡ Haute énergie', '🐕 Ok congénères', '☀️ Passion soleil'],
    bio: 'Une vraie boule d\'amour et d\'énergie ! Nala ne refuse jamais un sprint après une balle de tennis ou une baignade improviste.',
    verified: true,
    vaccinesUpToDate: true,
    chipped: true,
    ownerName: 'Sophie',
    ownerAge: 26,
    ownerAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCrrmEtbmRNs74Hq7XjSN8b1bJzv5bG5p_ePWzsnsE6TQnyq7MN9E098L7gHG2MkLxhXT--OuHfeTWRBLLDIDAdpfyEAebrr3UYsuVVbIaDp4UwNS0Laf61aLEQhV6xDFdvMgu5Ikq4d_vd1WJx8E8RHR0la4kNx5U4Boy1g4_pSp_j4z-e3BTUnE6iYuc6oNBG--bYsVegR8e8YRWOjEYxJ6maK94kLpqeYgiujS1iZxf3iXAUE_7W',
    ownerBio: 'Graphiste freelance, toujours en vadrouille dans les parcs parisiens avec Nala.',
    favoriteParks: ['Parc Monceau', 'Square des Batignolles', 'Bois de Boulogne']
  },
  {
    id: 'pet_rocky',
    name: 'Rocky',
    age: 3,
    species: 'dog',
    breed: 'Bouledogue Français rigolo',
    distanceKm: 2.4,
    locationName: 'Parc des Buttes-Chaumont • Paris 19e',
    gender: 'Mâle',
    sterilized: true,
    matchScore: 92,
    temperamentTitle: 'Rigolo & Expressif',
    temperamentDetail: 'Adore faire des sprints de 10 minutes puis une sieste à l\'ombre.',
    photos: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAEvP3FBW85MPHRqEcqOaARXkvVyoqYcEVWQIFywzdnzZ_u1Qz6UOD1ItOlhn-JK-7Wxl04h1ru3okSmoh4UgRTEA-H1NfAsjyDUiJxPxVaZ2-umQ-Hmiz2jnRyeKlkC7pRRg9g0AZw1Mv6ehVl1wnstxZkgQeUp_ZxJwiWQqSOUUuzaVtv4NnaxG_OsV2a4xnZH0pCe-3BWLTRoulm8e-om_7WrQlVSG7ltUOIS-bifTy0zR0GGS4F',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAcpwUlXAOPF9hn-GmxnMP_Eo-df4rk9y4qckNgfWUqPpnT6fVuBm0YSHcbcGqDVsHVXfVsESEoRsym5hwnMYAGKQfPh68T-QgKiXcfcQE-jfIVEc8RNfUXLgqzF9V9xmIl_32xCHtE9h5BXzxa8EAmsJt4gJtP4nhCR7hmH6alrvrDhDwTiTFfJTgNrSCRodpznaBdDMR9XMxF5VZN37ATAknEVXeV3Ko6kV5uXwTR4B5IPzLUDO3y'
    ],
    tags: ['🥏 Fan de frisbee', '🛋️ Champion de sieste', '🧀 Accro au fromage'],
    bio: 'Petit format mais grosse personnalité ! Rocky ronfle comme un tracteur et fait rire tout le quartier. Toujours partant pour un goûter canin.',
    verified: true,
    vaccinesUpToDate: true,
    chipped: true,
    ownerName: 'Thomas',
    ownerAge: 31,
    ownerAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDwauhDdNh-vo96j2Ilg4b77a52nkDoUUriZpogu1k52bkL272Xdnu89hIqMUPvZQ8AAdszlxpem9d8LT2N9fDlgN06SAubgP5jjKHhE9khp6vOfSf6jGBjPMS_R0dtjVsng60fA-9EJpStjd5BtQjHQpyfdMvfcx8u2p-BCNlaZpOyt0ofEL923QbiV0yvAJY2tJM8ao8m1k_f5gzjr05BKYOk8weJMRy3SLKkPWOzSrlmJzOvOBMA',
    ownerBio: 'Ingénieur son, Rocky m\'accompagne souvent au studio d\'enregistrement.',
    favoriteParks: ['Buttes-Chaumont', 'Canal Saint-Martin']
  },
  {
    id: 'pet_luna_dog',
    name: 'Luna',
    age: 1,
    species: 'dog',
    breed: 'Border Collie vive',
    distanceKm: 2.1,
    locationName: 'Bois de Vincennes • 12e',
    gender: 'Femelle',
    sterilized: true,
    matchScore: 96,
    temperamentTitle: 'Ultra sportive & Agile',
    temperamentDetail: 'Capte tout en 2 secondes, passionnée de parcours d\'obstacles.',
    photos: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD9csiqOPJkFERM4LlwdgeF7gGvNTHltGfZvQto9-mW2duyLcQeAkLxFeZFf6lgriBddVRM2kYAtIBTk6tkaNoP7bsr5-bDwyER-Q97m2yXZUHnVuBGayHnUA4RDMM0Qgq-GD_w2sksoHrom8ZXi4EFKZyhSXr4q6aHK-8__RvZzMIoVKQR9r8XhSc0Kjkx5qbiDDtGOeteLma5sRtB_jddy1iKrd69LS0hKN06EyiiGBA0LuzsDsR4',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAcWXP0htEPZGcZ4glx0xBqJh_BL6Z5MUPNHyJcK1xiMbOd5H0iljWXr1165jsKI1NoFGsLCwOXkqM6L0rtOrGINpPwZSIQ9NkLLBOYFspxCsMh8qq2gzcFaLiH35u3hQSi2CQmlxsVj5v9kw5DyRhHgholAOA7zZDdbgSfGo2FcjS0kJ3NA8EujTGJFxUVjT5J5Ck816h2BBvkk9JJvZl7wOiy1-Q9SP0Qy5PhwnDKUn5aHe8IhILs'
    ],
    tags: ['🏃‍♀️ Canicross', '🧠 Agility pro', '👀 Regard hypnotique'],
    bio: 'Une sportive née ! Si vous cherchez un compagnon pour un footing ou une session de frisbee intense, Luna est votre meilleure alliée.',
    verified: true,
    vaccinesUpToDate: true,
    chipped: true,
    ownerName: 'Antoine',
    ownerAge: 29,
    ownerAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDwauhDdNh-vo96j2Ilg4b77a52nkDoUUriZpogu1k52bkL272Xdnu89hIqMUPvZQ8AAdszlxpem9d8LT2N9fDlgN06SAubgP5jjKHhE9khp6vOfSf6jGBjPMS_R0dtjVsng60fA-9EJpStjd5BtQjHQpyfdMvfcx8u2p-BCNlaZpOyt0ofEL923QbiV0yvAJY2tJM8ao8m1k_f5gzjr05BKYOk8weJMRy3SLKkPWOzSrlmJzOvOBMA',
    ownerBio: 'Coureur amateur de semi-marathon, passionné d\'éducation positive.',
    favoriteParks: ['Bois de Vincennes', 'Parc Floral']
  },
  {
    id: 'pet_simba_cat',
    name: 'Simba',
    age: 2,
    species: 'cat',
    breed: 'Bengal royal',
    distanceKm: 0.9,
    locationName: 'Le Marais • Paris 4e',
    gender: 'Mâle',
    sterilized: true,
    matchScore: 94,
    temperamentTitle: 'Curieux & Joueur',
    temperamentDetail: 'Sort en laisse et harnais, adore les rencontres avec d\'autres matous.',
    photos: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCFg_As0qgqEh5OVob97rWUmA36MWkvsf1dge5ePpqwitTeiigKGnyvc3IdWmuFp1TRybd1tgQt2beULRPnvX2iFMym9Xbfq-ym2xfQqzKdosZEVfjz9s68i7fSxaxe0d6SpU4FJ3w2QiirLeY7FJKoz0mbebLFSF9g0_EG78nvXYMohzB50d-ezG7s27o8oSrvaKkWfgyi9QPbX2EIUyLQvwkdzzh3kxniqvmUGYhMd-bE4C0T2rkm',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDTXQVPHcwC7h7yvnZXQvpQRoYL5ADIDB6w0GwFfjdNhqgcW3BvGzO926HroP2fUAHav8KZ6NIgp2O3OdzNci1w6PJ_x18vet0j22VPx11wdiKErUNYgxxQheuw0cGQZxL2RtYB0trt17_C-Y4_KZ4fUSaJX8LNDuSbxr_o9sxDytiJLyFbC78xZMyo9eiRI7VV75MaZl80rLJ7MVdvqESDdXAGj2ceg_uM-VEd33tt6uojypoTwebp'
    ],
    tags: ['🐆 Pelage léopard', '🦮 Habitué au harnais', '🌿 Adore l\'herbe à chat'],
    bio: 'Un petit félin aux allures de panthère ! Simba adore explorer les cours intérieures calmes et faire des séances de plumeau avec de nouveaux copains.',
    verified: true,
    vaccinesUpToDate: true,
    chipped: true,
    ownerName: 'Camille',
    ownerAge: 25,
    ownerAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDeItMV8NLz5lVPa3PJuuMP6--RWbb_1V0rvMOE0I8Bd3GKobltYEyc2pohREGZN30kxwwxdnoHQLTAidaXzSR7PxfDGiChvU-QTlkVaJl3JFWUg5_d5b7yxZjmBpYcD2oBLKH_7ss5L5gXMhaLyAxUNlrxkMTv4mYoZTajNtfLwQ21_ycKeXsD6TZ0q869ccLvl0FQcl6vCGHGX8iddGfHaNwZEgYu9vshNMece7dI2kiqJ1vDFVUT',
    ownerBio: 'Styliste d\'intérieur dans le Marais, adepte des cafés félins.',
    favoriteParks: ['Place des Vosges', 'Square Georges-Cain']
  },
  {
    id: 'pet_luna_cat',
    name: 'Luna',
    age: 3,
    species: 'cat',
    breed: 'British Shorthair argentée',
    distanceKm: 0.8,
    locationName: 'Saint-Germain-des-Prés • 6e',
    gender: 'Femelle',
    sterilized: true,
    matchScore: 91,
    temperamentTitle: 'Calme & Câline',
    temperamentDetail: 'Douce, affectueuse, fan de siestes au soleil.',
    photos: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDbk61UB07cTb61kKzwnC42Nkz89x24aLd3yTE-NymOU4_qxrxGcD6fuJcm05p_FGMbnGXhjWo8ahANyzFIqMiUGHkYNqlHfVxusIKiNTm0GdDvBTsBFfdwqu-vLa6D7-vot7UV_ZO6IdpRH8JVrDT_kN141CnISDzRRPrLo3pGusjYXtUr_sRA9XNDQVxnWf7Rdl8fXmDIuD4eZQvGoB7tVPCxDzS5XTKoRJ-h9cbZYezhg0tc5iaL'
    ],
    tags: ['👑 Regard d\'ambre', '🧶 Laser lover', '💤 Adore les siestes'],
    bio: 'Véritable reine de la maison ! Luna apprécie les après-midi tranquilles et observe le monde avec beaucoup de noblesse et de douceur.',
    verified: true,
    vaccinesUpToDate: true,
    chipped: true,
    ownerName: 'Éléonore',
    ownerAge: 28,
    ownerAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDeItMV8NLz5lVPa3PJuuMP6--RWbb_1V0rvMOE0I8Bd3GKobltYEyc2pohREGZN30kxwwxdnoHQLTAidaXzSR7PxfDGiChvU-QTlkVaJl3JFWUg5_d5b7yxZjmBpYcD2oBLKH_7ss5L5gXMhaLyAxUNlrxkMTv4mYoZTajNtfLwQ21_ycKeXsD6TZ0q869ccLvl0FQcl6vCGHGX8iddGfHaNwZEgYu9vshNMece7dI2kiqJ1vDFVUT',
    ownerBio: 'Conservatrice de musée, passionnée d\'art contemporain.',
    favoriteParks: ['Jardin du Luxembourg']
  },
  {
    id: 'pet_barney_dog',
    name: 'Barney',
    age: 2,
    species: 'dog',
    breed: 'Welsh Corgi Pembroke',
    distanceKm: 3.2,
    locationName: 'Parc Monceau • Paris 8e',
    gender: 'Mâle',
    sterilized: true,
    matchScore: 89,
    temperamentTitle: 'Jovial & Court sur pattes',
    temperamentDetail: 'Toujours souriant, adore les balades en groupe.',
    photos: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDq1E58DVhSFpvvE6-BFwdpl-gVtI1jxhsdoBk9n5fIamf-irRkFV9ebiXA4V7BabE1EeQI8dEnr8D0JPTjg6PtZubU76vCNLnNRIz2_lqrCBjhxadWrxfdkBVjRX7VVyLRJ7ycYBNRU62zH8p5AXmgT71dE6rAkDwUpH8NxMBR7xXgMNff9Ko3ApmWM0Xe_kNKXatXP3XsHpPMwcaXaL_tQDFCyyurix9xha75vQjnwqo8Bob_vsZX'
    ],
    tags: ['🦊 Tête de renard', '🐾 Petites pattes véloces', '🥖 Fan de friandises'],
    bio: 'Court sur pattes mais géant de cœur ! Barney a de l\'énergie à revendre et adore se faire de nouveaux potes canins pour courir dans l\'herbe.',
    verified: true,
    vaccinesUpToDate: true,
    chipped: true,
    ownerName: 'Julien',
    ownerAge: 33,
    ownerAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDwauhDdNh-vo96j2Ilg4b77a52nkDoUUriZpogu1k52bkL272Xdnu89hIqMUPvZQ8AAdszlxpem9d8LT2N9fDlgN06SAubgP5jjKHhE9khp6vOfSf6jGBjPMS_R0dtjVsng60fA-9EJpStjd5BtQjHQpyfdMvfcx8u2p-BCNlaZpOyt0ofEL923QbiV0yvAJY2tJM8ao8m1k_f5gzjr05BKYOk8weJMRy3SLKkPWOzSrlmJzOvOBMA',
    ownerBio: 'Boulanger passionné, fan des balades matinales à l\'aube.',
    favoriteParks: ['Parc Monceau', 'Square des Batignolles']
  }
];

export const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv_nala',
    pet: MOCK_DISCOVER_PETS[0], // Nala
    ownerName: 'Sophie',
    ownerAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCrrmEtbmRNs74Hq7XjSN8b1bJzv5bG5p_ePWzsnsE6TQnyq7MN9E098L7gHG2MkLxhXT--OuHfeTWRBLLDIDAdpfyEAebrr3UYsuVVbIaDp4UwNS0Laf61aLEQhV6xDFdvMgu5Ikq4d_vd1WJx8E8RHR0la4kNx5U4Boy1g4_pSp_j4z-e3BTUnE6iYuc6oNBG--bYsVegR8e8YRWOjEYxJ6maK94kLpqeYgiujS1iZxf3iXAUE_7W',
    lastMessage: 'Super ! Milo est disponible samedi matin au parc ? 🐾',
    timestamp: '5 min',
    unreadCount: 1,
    tag: 'Parc Monceau • 1.2 km',
    tagType: 'location',
    messages: [
      {
        id: 'm1',
        sender: 'user',
        text: 'Wouf ! Milo a adoré le profil de Nala, ils ont exactement la même passion pour les balles de tennis ! 🎾',
        timestamp: 'Hier à 18:24'
      },
      {
        id: 'm2',
        sender: 'pet',
        text: 'Coucou ! Ah génial haha, Nala en a toujours une dans la gueule quand on se promène 😄',
        timestamp: 'Hier à 18:30'
      },
      {
        id: 'm3',
        sender: 'pet',
        text: 'Super ! Milo est disponible samedi matin au parc ? 🐾',
        timestamp: 'Il y a 5 min',
        playdateProposal: {
          id: 'p1',
          parkName: 'Parc Monceau',
          dateStr: 'Samedi 10 Octobre',
          timeStr: '10h30',
          activity: 'Balade & Jeu de balle',
          status: 'pending'
        }
      }
    ]
  },
  {
    id: 'conv_rocky',
    pet: MOCK_DISCOVER_PETS[1], // Rocky
    ownerName: 'Thomas',
    ownerAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDwauhDdNh-vo96j2Ilg4b77a52nkDoUUriZpogu1k52bkL272Xdnu89hIqMUPvZQ8AAdszlxpem9d8LT2N9fDlgN06SAubgP5jjKHhE9khp6vOfSf6jGBjPMS_R0dtjVsng60fA-9EJpStjd5BtQjHQpyfdMvfcx8u2p-BCNlaZpOyt0ofEL923QbiV0yvAJY2tJM8ao8m1k_f5gzjr05BKYOk8weJMRy3SLKkPWOzSrlmJzOvOBMA',
    lastMessage: 'Haha oui il adore aussi courir après les frisbees ! 🥏',
    timestamp: 'Il y a 2h',
    unreadCount: 0,
    tag: 'Énergie élevée ⚡',
    tagType: 'energy',
    messages: [
      {
        id: 'm1',
        sender: 'user',
        text: 'Salut Thomas ! Rocky a une bonne bouille, il s\'entend bien avec les bergers dynamiques ?',
        timestamp: '14:15'
      },
      {
        id: 'm2',
        sender: 'pet',
        text: 'Haha oui il adore aussi courir après les frisbees ! 🥏 Dès qu\'un chien le course gentiment il est aux anges.',
        timestamp: '14:40'
      }
    ]
  },
  {
    id: 'conv_simba',
    pet: MOCK_DISCOVER_PETS[3], // Simba
    ownerName: 'Camille',
    ownerAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDeItMV8NLz5lVPa3PJuuMP6--RWbb_1V0rvMOE0I8Bd3GKobltYEyc2pohREGZN30kxwwxdnoHQLTAidaXzSR7PxfDGiChvU-QTlkVaJl3JFWUg5_d5b7yxZjmBpYcD2oBLKH_7ss5L5gXMhaLyAxUNlrxkMTv4mYoZTajNtfLwQ21_ycKeXsD6TZ0q869ccLvl0FQcl6vCGHGX8iddGfHaNwZEgYu9vshNMece7dI2kiqJ1vDFVUT',
    lastMessage: 'À bientôt pour le café chats ! Hâte de le voir ☕🐱',
    timestamp: 'Hier',
    unreadCount: 0,
    tag: 'Playdate d\'intérieur',
    tagType: 'indoor',
    messages: [
      {
        id: 'm1',
        sender: 'user',
        text: 'Hello Camille ! Impressionnant le pelage de Simba, il a l\'air hyper curieux !',
        timestamp: 'Mercredi'
      },
      {
        id: 'm2',
        sender: 'pet',
        text: 'À bientôt pour le café chats ! Hâte de le voir ☕🐱 On testera une petite séance découverte dans le salon.',
        timestamp: 'Hier'
      }
    ]
  }
];

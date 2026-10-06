import React, { useState } from 'react';
import { AnimooLogo } from './AnimooLogo';
import { Smartphone, CheckCircle2, MapPin, Zap, Crown } from 'lucide-react';

interface OnboardingScreenProps {
  onStart: (speciesPreference: 'dog' | 'cat') => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onStart }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [preference, setPreference] = useState<'dog' | 'cat'>('dog');

  const slides = [
    {
      id: 'dog_slide',
      name: 'Milo, 2 ans',
      breed: 'Golden Retriever • À 1.2 km de vous',
      status: "Plein d'énergie",
      statusIcon: '⚡',
      tags: ['🎾 Fan de balle', '🐶 Très sociable'],
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAU9_a_S3YtX_6kpWzHNCiuSPzFv-tLCTTKnPe45huLkwIJF2s9_o-Yh96EyH8EdlsycyRcbwVhDJCh37oSr5Lhp9FX9dYtBw0Mc3a_mOMZpxwsQcXd3TWAgcyAkz3iAYly0N-hVA1eYr8e0C7IBAxYqnsonj7J7XACo-5pOK0qn5GMwClsG8v48HZhIX63gwnbzGLLXytsXHxuaJAj0lsTCi1GsgsRv3Ljw29hIza5yne1vNkfxA03',
    },
    {
      id: 'cat_slide',
      name: 'Luna, 3 ans',
      breed: 'British Shorthair • À 800 m de vous',
      status: 'Calme & Câlin',
      statusIcon: '👑',
      tags: ['🧶 Laser lover', '💤 Adore les siestes'],
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDbk61UB07cTb61kKzwnC42Nkz89x24aLd3yTE-NymOU4_qxrxGcD6fuJcm05p_FGMbnGXhjWo8ahANyzFIqMiUGHkYNqlHfVxusIKiNTm0GdDvBTsBFfdwqu-vLa6D7-vot7UV_ZO6IdpRH8JVrDT_kN141CnISDzRRPrLo3pGusjYXtUr_sRA9XNDQVxnWf7Rdl8fXmDIuD4eZQvGoB7tVPCxDzS5XTKoRJ-h9cbZYezhg0tc5iaL',
    },
  ];

  const handleSelectDog = () => {
    setPreference('dog');
    setCurrentSlide(0);
  };

  const handleSelectCat = () => {
    setPreference('cat');
    setCurrentSlide(1);
  };

  return (
    <div className="w-full min-h-screen bg-[#FCF9F8] text-[#1B1C1C] flex flex-col justify-between px-5 pt-3 pb-8 select-none">
      {/* Brand Header */}
      <header className="flex flex-col items-center justify-center pt-2 pb-4 text-center">
        <AnimooLogo size="lg" showTagline={true} />
      </header>

      {/* Pet Profile Preview Carousel */}
      <section className="relative w-full overflow-hidden my-1">
        <div
          className="flex transition-transform duration-500 ease-out will-change-transform"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, idx) => (
            <div key={slide.id} className="w-full flex-shrink-0 px-1">
              <div className="relative w-full aspect-[4/5] max-h-[340px] rounded-3xl overflow-hidden shadow-xl bg-stone-200">
                <img
                  src={slide.image}
                  alt={slide.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

                {/* Trait Overlay Pill */}
                <div className="absolute top-3.5 right-3.5 backdrop-blur-md bg-black/40 border border-white/10 rounded-full px-3 py-1 flex items-center gap-1.5 text-white">
                  <span className="text-xs">{slide.statusIcon}</span>
                  <span className="text-xs font-semibold tracking-wide">{slide.status}</span>
                </div>

                {/* Pet Information Details */}
                <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-1 text-white">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold">{slide.name}</span>
                    <span className="w-5 h-5 rounded-full bg-[#E11D48] flex items-center justify-center">
                      <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                    </span>
                  </div>
                  <p className="text-xs text-white/90 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-rose-400" />
                    <span>{slide.breed}</span>
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    {slide.tags.map((t, i) => (
                      <span
                        key={i}
                        className="bg-white/25 backdrop-blur-sm px-2.5 py-1 rounded-full text-[11px] font-semibold"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Dots */}
        <div className="flex items-center justify-center gap-2 mt-3.5">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCurrentSlide(idx);
                setPreference(idx === 0 ? 'dog' : 'cat');
              }}
              aria-label={`Slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                currentSlide === idx ? 'w-6 bg-[#B70A3F]' : 'w-2 bg-stone-300 hover:bg-stone-400'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Pitch Hook Section */}
      <section className="my-3 text-center px-2">
        <h1 className="text-xl font-extrabold text-stone-900 tracking-tight leading-snug">
          Trouvez le compagnon de jeu idéal pour votre chien ou chat
        </h1>
        <p className="text-xs text-stone-500 mt-1.5 leading-relaxed">
          Faites glisser, rencontrez des maîtres passionnés et organisez des balades inoubliables.
        </p>
      </section>

      {/* Quick Pet Preference Selector */}
      <div className="bg-stone-100 p-1 rounded-full flex items-center justify-between gap-1 shadow-inner mb-4">
        <button
          onClick={handleSelectDog}
          className={`flex-1 py-2.5 px-3 rounded-full flex items-center justify-center gap-2 font-bold text-xs transition-all cursor-pointer ${
            preference === 'dog'
              ? 'bg-white text-[#B70A3F] shadow-sm'
              : 'text-stone-500 hover:text-stone-900'
          }`}
        >
          <span className="text-base">🐶</span>
          <span>Pour mon Chien</span>
        </button>
        <button
          onClick={handleSelectCat}
          className={`flex-1 py-2.5 px-3 rounded-full flex items-center justify-center gap-2 font-bold text-xs transition-all cursor-pointer ${
            preference === 'cat'
              ? 'bg-white text-[#B70A3F] shadow-sm'
              : 'text-stone-500 hover:text-stone-900'
          }`}
        >
          <span className="text-base">🐱</span>
          <span>Pour mon Chat</span>
        </button>
      </div>

      {/* Authentication Buttons */}
      <div className="flex flex-col gap-2.5 w-full">
        {/* Primary CTA: Phone login */}
        <button
          onClick={() => onStart(preference)}
          className="w-full h-13 rounded-full bg-gradient-to-r from-[#B70A3F] via-[#E11D48] to-[#FF5E62] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-rose-500/25 active:scale-[0.98] transition-all cursor-pointer"
        >
          <Smartphone className="w-5 h-5" />
          <span>Continuer avec un numéro</span>
        </button>

        {/* Secondary Social Connectors */}
        <div className="grid grid-cols-2 gap-2.5 w-full">
          {/* Apple */}
          <button
            onClick={() => onStart(preference)}
            className="h-11 rounded-full bg-white text-stone-900 flex items-center justify-center gap-2 shadow-sm border border-stone-200/80 active:scale-95 transition-all text-xs font-bold cursor-pointer hover:bg-stone-50"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.93-2.85-.9.04-1.99.6-2.64 1.35-.57.65-1.07 1.71-.93 2.73 1 .08 2.03-.49 2.64-1.23z" />
            </svg>
            <span>Apple</span>
          </button>

          {/* Google */}
          <button
            onClick={() => onStart(preference)}
            className="h-11 rounded-full bg-white text-stone-900 flex items-center justify-center gap-2 shadow-sm border border-stone-200/80 active:scale-95 transition-all text-xs font-bold cursor-pointer hover:bg-stone-50"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
            </svg>
            <span>Google</span>
          </button>
        </div>
      </div>

      {/* Sign In Prompt & Legal Disclaimers */}
      <footer className="mt-4 flex flex-col items-center gap-1.5 text-center">
        <p className="text-xs text-stone-600">
          Vous avez déjà un compte ?{' '}
          <button
            onClick={() => onStart(preference)}
            className="text-[#B70A3F] font-bold hover:underline cursor-pointer ml-1"
          >
            Se connecter
          </button>
        </p>
        <p className="text-[10px] text-stone-400 max-w-[280px] leading-tight">
          En continuant, vous acceptez les Conditions d'utilisation et la Politique de confidentialité d'Animoo.
        </p>
      </footer>
    </div>
  );
};

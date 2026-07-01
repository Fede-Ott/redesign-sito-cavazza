import { Palette, BookOpen, Radio, Landmark } from 'lucide-react';
import { type Lang } from '../i18n';

interface CulturaHubPageProps {
  language: Lang;
  onNavigate: (section: 'biblioteca' | 'anteros' | 'tolomeo' | 'radio') => void;
}

export function CulturaHubPage({ language, onNavigate }: CulturaHubPageProps) {
  const t = (key: string) => {
    const translations: Record<string, { it: string; en: string }> = {
      'page.title': { it: "Cultura & Media", en: "Culture & Media" },
      'page.subtitle': { it: "Arte, Letteratura, Musica e Comunicazione accessibili a tutti", en: "Art, Literature, Music and Communication accessible to all" },
      'biblioteca.title': { it: "Biblioteca", en: "Library" },
      'biblioteca.subtitle': { it: "Oltre 7.000 contenuti accessibili", en: "Over 7,000 accessible contents" },
      'biblioteca.desc': { it: "Audiolibri, files audio, volumi Braille e risorse digitali. Servizio gratuito di prestito per persone non vedenti e ipovedenti.", en: "Audiobooks, audio files, Braille volumes and digital resources. Free lending service for blind and visually impaired people." },
      'anteros.title': { it: "Museo Tattile Anteros", en: "Anteros Tactile Museum" },
      'anteros.subtitle': { it: "L'arte della pittura attraverso il tatto", en: "The art of painting through touch" },
      'anteros.desc': { it: "40 opere in bassorilievo prospettico che rendono accessibile la pittura ai non vedenti. Dalla classicità alla contemporaneità.", en: "40 works in perspective bas-relief that make painting accessible to the blind. From classical to contemporary." },
      'tolomeo.title': { it: "Museo Tolomeo", en: "Tolomeo Museum" },
      'tolomeo.subtitle': { it: "Un modo diverso di guardare il mondo", en: "A different way of looking at the world" },
      'tolomeo.desc': { it: "Installazione intermediale che racconta la storia dell'Istituto attraverso gli oggetti che hanno reso libere e indipendenti le persone.", en: "Intermedia installation that tells the history of the Institute through objects that have made people free and independent." },
      'radio.title': { it: "Radio Oltre", en: "Radio Oltre" },
      'radio.subtitle': { it: "La voce dell'inclusione", en: "The voice of inclusion" },
      'radio.desc': { it: "La prima radio italiana dedicata all'inclusione. Programmi, podcast, interviste e musica per abbattere le barriere.", en: "The first Italian radio dedicated to inclusion. Programs, podcasts, interviews and music to break down barriers." },
      'explore': { it: "Esplora", en: "Explore" }
    };
    return translations[key]?.[language] || key;
  };

  const sections = [
    {
      id: 'biblioteca' as const,
      icon: BookOpen,
      title: t('biblioteca.title'),
      subtitle: t('biblioteca.subtitle'),
      description: t('biblioteca.desc'),
      accentColor: '#D91919',
      bgColor: '#FFEDED'
    },
    {
      id: 'anteros' as const,
      icon: Palette,
      title: t('anteros.title'),
      subtitle: t('anteros.subtitle'),
      description: t('anteros.desc'),
      accentColor: '#AD46FF',
      bgColor: '#F5EDFF'
    },
    {
      id: 'tolomeo' as const,
      icon: Landmark,
      title: t('tolomeo.title'),
      subtitle: t('tolomeo.subtitle'),
      description: t('tolomeo.desc'),
      accentColor: '#FF6900',
      bgColor: '#FFF0E5'
    },
    {
      id: 'radio' as const,
      icon: Radio,
      title: t('radio.title'),
      subtitle: t('radio.subtitle'),
      description: t('radio.desc'),
      accentColor: '#00C950',
      bgColor: '#E5FFF0'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="cultura-hero relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #135DCD 0%, #D75220 100%)' }}>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white">
            {t('page.title')}
          </h1>
          <p className="text-xl md:text-2xl text-white/85 max-w-3xl mx-auto">
            {t('page.subtitle')}
          </p>
        </div>
      </section>

      {/* Grid Sections */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {sections.map((section, index) => (
            <button
              key={section.id}
              onClick={() => onNavigate(section.id)}
              className="group relative overflow-hidden rounded-xl p-8 text-left transition-all hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-primary/50 min-h-[360px] flex flex-col"
              style={{
                animationDelay: `${index * 100}ms`,
                backgroundColor: section.bgColor,
                border: `2px solid ${section.accentColor}33`,
              }}
            >
              {/* Accent Bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 rounded-t-xl" style={{ backgroundColor: section.accentColor }}></div>

              {/* Icon */}
              <div className="relative w-20 h-20 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform" style={{ backgroundColor: section.accentColor }}>
                <section.icon className="w-12 h-12 text-white" aria-hidden="true" />
              </div>

              {/* Content */}
              <div className="relative flex-1 flex flex-col">
                <h2 className="text-3xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {section.title}
                </h2>
                <p className="text-lg font-medium text-muted-foreground mb-4">
                  {section.subtitle}
                </p>
                <p className="text-base leading-relaxed mb-6 flex-1">
                  {section.description}
                </p>

                {/* CTA */}
                <div className="flex items-center gap-2 font-bold text-lg group-hover:gap-4 transition-all" style={{ color: section.accentColor }}>
                  <span>{t('explore')}</span>
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </div>
              </div>

              {/* Decorative Element */}
              <div className="absolute bottom-0 right-0 w-32 h-32 rounded-tl-full opacity-10" style={{ backgroundColor: section.accentColor }}></div>
            </button>
          ))}
        </div>
      </section>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .grid > button {
          animation: fadeInUp 0.6s ease-out backwards;
        }
      `}</style>
    </div>
  );
}
